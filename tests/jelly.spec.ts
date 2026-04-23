import { test, expect } from "@playwright/test";

/**
 * Visual verification script for the localized jelly hover effect.
 * Records a video of the cursor sweeping across cards and asserts
 * that the mask CSS vars are being driven by the rAF loop.
 *
 * Run:  npx playwright test tests/jelly.spec.ts --headed
 * Video is saved to test-results/ as an mp4.
 */
test("jelly follows cursor across work grid", async ({ page }) => {
  await page.goto("http://localhost:3001/work");
  await page.waitForLoadState("networkidle");
  const card = page.locator("article[data-case-card-index]").nth(2);
  await card.scrollIntoViewIfNeeded();
  await expect(card).toBeVisible();
  await card.evaluate((node) => {
    (node as HTMLElement).setAttribute("data-test-card", "1");
  });
  const box = await card.boundingBox();
  if (!box) throw new Error("No card bounds");

  // Sweep cursor across the card's media area in 20 steps
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = box.x + box.width * t;
    const y = box.y + box.height * 0.3;
    await page.mouse.move(x, y, { steps: 2 });
    await page.waitForTimeout(80);
  }

  // Finish with the pointer comfortably inside the active area so the
  // provider has a stable in-card state when we read the CSS vars.
  await page.mouse.move(box.x + box.width * 0.35, box.y + box.height * 0.35, {
    steps: 6,
  });
  await page.waitForTimeout(160);

  // After sweep, read --jelly-opacity and --jelly-x from the jelly overlay of the first card
  const jellyVars = await page.evaluate(() => {
    const article = document.querySelector("[data-test-card='1']");
    const overlay = article?.querySelector("[data-jelly-overlay]") as HTMLElement | null;
    const surface = article?.querySelector("[data-jelly-surface]") as HTMLElement | null;
    if (!overlay) return null;
    const overlayStyles = getComputedStyle(overlay);
    const surfaceStyles = surface ? getComputedStyle(surface) : null;
    return {
      opacity: surfaceStyles?.getPropertyValue("--jelly-opacity") ?? "",
      x: surfaceStyles?.getPropertyValue("--jelly-x") ?? "",
      y: surfaceStyles?.getPropertyValue("--jelly-y") ?? "",
      filter: overlay.style.filter,
    };
  });

  console.log("Jelly vars after sweep:", jellyVars);

  // Assert the opacity is > 0 (overlay visible) and filter is applied
  expect(jellyVars?.filter).toMatch(/jelly-/);
  expect(parseFloat(jellyVars?.opacity || "0")).toBeGreaterThan(0);
});
