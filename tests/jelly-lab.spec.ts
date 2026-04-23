import { test, expect } from "@playwright/test";

/**
 * Verify the path-bulge jelly effect on the lab page.
 * Captures three screenshots with the cursor at different positions relative to
 * the target window so the path `d` attribute (the actual perimeter shape) can
 * be compared frame to frame.
 */
test("jelly lab — perimeter bulges toward cursor", async ({ page }) => {
  await page.goto("http://127.0.0.1:3001/lab/jelly");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(400);

  const card = page.locator("[aria-label='01']").first();
  await expect(card).toBeVisible();

  const box = await card.boundingBox();
  if (!box) throw new Error("no card bounding box");

  const positions = [
    { label: "far", x: box.x - 500, y: box.y - 500 },
    { label: "near-left-edge", x: box.x - 20, y: box.y + box.height * 0.35 },
    { label: "near-top-edge", x: box.x + box.width * 0.55, y: box.y - 20 },
    { label: "over-center", x: box.x + box.width * 0.5, y: box.y + box.height * 0.5 },
    { label: "near-bottom-right", x: box.x + box.width + 10, y: box.y + box.height + 10 },
  ];

  const results: Array<{ label: string; dSample: string; dMinMax: { minX: number; maxX: number; minY: number; maxY: number } }> = [];

  for (const pos of positions) {
    await page.mouse.move(pos.x, pos.y, { steps: 10 });
    await page.waitForTimeout(350);

    const state = await card.evaluate((node) => {
      const pathEl = node.querySelector("path");
      if (!pathEl) return null;
      const d = pathEl.getAttribute("d") ?? "";
      const coords = Array.from(d.matchAll(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g))
        .map((m) => ({ x: Number(m[1]), y: Number(m[2]) }));
      const xs = coords.map((c) => c.x);
      const ys = coords.map((c) => c.y);
      return {
        d: d.slice(0, 120),
        minX: Math.min(...xs),
        maxX: Math.max(...xs),
        minY: Math.min(...ys),
        maxY: Math.max(...ys),
      };
    });
    if (!state) throw new Error("no path");

    results.push({
      label: pos.label,
      dSample: state.d,
      dMinMax: { minX: state.minX, maxX: state.maxX, minY: state.minY, maxY: state.maxY },
    });

    await page.screenshot({
      path: `test-results/jelly-lab-${pos.label}.png`,
      clip: {
        x: Math.max(0, box.x - 80),
        y: Math.max(0, box.y - 80),
        width: box.width + 160,
        height: box.height + 160,
      },
    });
  }

  for (const r of results) {
    console.log(
      `${r.label.padEnd(22)} min(${r.dMinMax.minX.toFixed(1)}, ${r.dMinMax.minY.toFixed(1)}) max(${r.dMinMax.maxX.toFixed(1)}, ${r.dMinMax.maxY.toFixed(1)})  d=${r.dSample}`,
    );
  }

  // Sanity assertions: when the cursor is far the perimeter must sit at resting bounds;
  // when it's near an edge the perimeter must extend past the resting bounds in that direction.
  const far = results.find((r) => r.label === "far")!;
  const leftNear = results.find((r) => r.label === "near-left-edge")!;
  const topNear = results.find((r) => r.label === "near-top-edge")!;
  const brNear = results.find((r) => r.label === "near-bottom-right")!;

  // Resting minX should be ~0, minY ~0, maxX ~280, maxY ~360 (defaults).
  // Near left edge: the left bulges outward (negative X).
  expect(leftNear.dMinMax.minX).toBeLessThan(far.dMinMax.minX - 3);
  // Near top edge: top bulges upward (negative Y).
  expect(topNear.dMinMax.minY).toBeLessThan(far.dMinMax.minY - 3);
  // Near bottom-right: bottom-right protrudes (larger maxX, maxY).
  expect(brNear.dMinMax.maxX).toBeGreaterThan(far.dMinMax.maxX + 3);
  expect(brNear.dMinMax.maxY).toBeGreaterThan(far.dMinMax.maxY + 3);
});
