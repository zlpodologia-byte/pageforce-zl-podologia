import { expect, test } from "@playwright/test";

test.describe("reduced motion", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("home hero illustration stays visible and static", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const illustration = page.locator(".hero-figures-root");
    await expect(illustration).toBeVisible();
    await expect(illustration).toHaveAttribute("data-paused", "true");

    const heroBlobCanvas = page.locator("canvas[aria-hidden='true']").first();
    const initialFrame = await heroBlobCanvas.evaluate((node) =>
      (node as HTMLCanvasElement).toDataURL(),
    );

    await page.waitForTimeout(1000);

    const runningAnimations = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((animation) => animation.playState === "running").length,
    );
    const frozenFrame = await heroBlobCanvas.evaluate((node) =>
      (node as HTMLCanvasElement).toDataURL(),
    );

    expect(runningAnimations).toBe(0);
    expect(frozenFrame).toBe(initialFrame);
  });

  test("work grid does not mount jelly overlay", async ({ page }) => {
    await page.goto("/work");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("[data-jelly-surface]").first()).toBeVisible();
    await expect(page.locator("[data-jelly-overlay]")).toHaveCount(0);
  });
});
