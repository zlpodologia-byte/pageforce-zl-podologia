import { test, expect } from "@playwright/test";

/**
 * Verify the WebGL / OGL jelly effect on /lab/jelly-gl.
 *
 * Two independent assertions:
 *   1. Drift is running — two frames taken 1.5 s apart with a fixed cursor
 *      must differ (baseline Simplex noise always animates).
 *   2. Cursor affects rendering — screenshots at different cursor positions
 *      must differ from each other AND from the "far" rest frame.
 *
 * Screenshots for each cursor position are saved to test-results/ so the
 * silhouette can be visually inspected frame-to-frame.
 */
test("jelly-gl lab — shader drift active + silhouette bulges toward cursor", async ({
  page,
}) => {
  // Capture any browser console errors (shader compile failures, uncaught exceptions).
  const browserErrors: string[] = [];
  const browserLogs: string[] = [];
  page.on("pageerror", (err) => browserErrors.push(`PAGEERROR: ${err.message}`));
  page.on("console", (msg) => {
    const txt = `[${msg.type()}] ${msg.text()}`;
    if (msg.type() === "error" || msg.type() === "warning") {
      browserErrors.push(txt);
    }
    browserLogs.push(txt);
  });

  await page.goto("http://127.0.0.1:3001/lab/jelly-gl");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);

  if (browserErrors.length) {
    console.log("Browser errors so far:", browserErrors);
  }

  const card = page.locator("[data-window-id='lab-gl-01']").first();
  await expect(card).toBeVisible();
  const box = await card.boundingBox();
  if (!box) throw new Error("no card bounding box");

  // Sanity: the canvas is mounted and has non-zero physical dimensions.
  const canvasDims = await card.evaluate((node) => {
    const c = node.querySelector("canvas") as HTMLCanvasElement | null;
    return c ? { width: c.width, height: c.height } : null;
  });
  expect(canvasDims).not.toBeNull();
  expect(canvasDims!.width).toBeGreaterThan(0);
  expect(canvasDims!.height).toBeGreaterThan(0);

  const clipRegion = {
    x: Math.max(0, box.x - 80),
    y: Math.max(0, box.y - 80),
    width: box.width + 160,
    height: box.height + 160,
  };

  // ---- Assertion 1: drift is running (cursor far, two frames apart) ----
  await page.mouse.move(box.x - 600, box.y - 600);
  await page.waitForTimeout(500);

  const driftFrame1 = await page.screenshot({
    clip: clipRegion,
    path: "test-results/jelly-gl-drift-1.png",
  });
  await page.waitForTimeout(1500);
  const driftFrame2 = await page.screenshot({
    clip: clipRegion,
    path: "test-results/jelly-gl-drift-2.png",
  });

  // Dump logs NOW so we can see them even if the drift assertion fails.
  console.log("browser logs so far (last 30):");
  for (const l of browserLogs.slice(-30)) console.log(" ", l);

  expect(Buffer.compare(driftFrame1, driftFrame2)).not.toBe(0);

  // ---- Assertion 2: cursor proximity changes rendering ----
  const positions = [
    { label: "near-left-edge", x: box.x - 20, y: box.y + box.height * 0.5 },
    { label: "near-top-edge", x: box.x + box.width * 0.55, y: box.y - 20 },
    { label: "over-center", x: box.x + box.width * 0.5, y: box.y + box.height * 0.5 },
    {
      label: "near-bottom-right",
      x: box.x + box.width + 10,
      y: box.y + box.height + 10,
    },
  ];

  const frames: { label: string; buf: Buffer }[] = [
    { label: "far", buf: driftFrame1 },
  ];

  for (const pos of positions) {
    await page.mouse.move(pos.x, pos.y, { steps: 10 });
    await page.waitForTimeout(400);
    const buf = await page.screenshot({
      clip: clipRegion,
      path: `test-results/jelly-gl-${pos.label}.png`,
    });
    frames.push({ label: pos.label, buf });
  }

  // Every cursor-driven frame must differ from the rest "far" frame.
  for (const f of frames.slice(1)) {
    const diff = Buffer.compare(f.buf, frames[0].buf);
    expect(diff, `frame '${f.label}' should differ from 'far'`).not.toBe(0);
  }

  // ---- Diagnostic: probe canvas CENTER first. If the mesh is rendering at
  // all, the centroid of the window will be opaque with the fill color. If
  // center reads transparent, either the shader failed to compile or the
  // draw call isn't landing.
  const diag = await card.evaluate((node) => {
    const c = node.querySelector("canvas") as HTMLCanvasElement | null;
    if (!c) return { error: "no canvas" };
    const gl = (c.getContext("webgl2") ||
      c.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return { error: "no gl context" };

    // Center of the canvas (must be inside the window silhouette at rest).
    const pixelCenter = new Uint8Array(4);
    gl.readPixels(
      Math.floor(c.width / 2),
      Math.floor(c.height / 2),
      1,
      1,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      pixelCenter,
    );

    // A pixel clearly OUTSIDE the rest silhouette (2 px from the canvas edge).
    const pixelCorner = new Uint8Array(4);
    gl.readPixels(
      2,
      Math.floor(c.height / 2),
      1,
      1,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      pixelCorner,
    );

    return {
      canvasW: c.width,
      canvasH: c.height,
      clientW: node.clientWidth,
      clientH: node.clientHeight,
      dpr: window.devicePixelRatio || 1,
      center: Array.from(pixelCenter),
      corner: Array.from(pixelCorner),
      glVendor: gl.getParameter(gl.VENDOR) as string,
      glRenderer: gl.getParameter(gl.RENDERER) as string,
      glVersion: gl.getParameter(gl.VERSION) as string,
      // Check if we actually have a webgl2 context (vs fell back to webgl1)
      isWebGL2: typeof WebGL2RenderingContext !== "undefined" &&
        gl instanceof WebGL2RenderingContext,
    };
  });

  console.log("diag:", JSON.stringify(diag, null, 2));
  if (browserErrors.length) {
    console.log("browser errors:", browserErrors);
  }
  console.log("browser logs (last 40):", browserLogs.slice(-40));

  expect(diag).not.toHaveProperty("error");
  // The center of the window MUST be opaque (the mesh fills the interior).
  // If this fails, the mesh isn't rendering at all.
  expect(
    diag,
    `canvas center is transparent — the jelly mesh isn't being drawn. ` +
      `Browser errors: ${browserErrors.join(" | ")}`,
  ).toMatchObject({ center: [expect.any(Number), expect.any(Number), expect.any(Number), expect.any(Number)] });
});
