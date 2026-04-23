import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/work"] as const;
const VIEWPORTS = [
  { width: 360, height: 800 },
  { width: 480, height: 900 },
  { width: 640, height: 960 },
  { width: 768, height: 1024 },
  { width: 960, height: 1080 },
  { width: 1280, height: 900 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
] as const;

for (const route of ROUTES) {
  for (const viewport of VIEWPORTS) {
    test(`responsive ${route} @ ${viewport.width}px`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize(viewport);
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => window.scrollTo(0, 0));

      const hasNoHorizontalScroll = await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      );

      expect(hasNoHorizontalScroll).toBe(true);
      await expect(page.locator("[data-menu-button]")).toBeVisible();

      const heading = page.locator("main h1, [data-page-heading]").first();
      await expect(heading).toBeVisible();

      const headingWithinViewport = await heading.evaluate((node) => {
        const rect = node.getBoundingClientRect();

        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.right <= window.innerWidth + 1 &&
          rect.bottom <= window.innerHeight + 1
        );
      });

      expect(headingWithinViewport).toBe(true);
    });
  }
}
