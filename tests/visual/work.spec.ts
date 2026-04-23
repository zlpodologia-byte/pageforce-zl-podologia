import { expect, test } from "@playwright/test";
import {
  DEFAULT_VISUAL_VIEWPORTS,
  SCREENSHOT_OPTIONS,
  gotoAndFreeze,
} from "./utils";

for (const viewport of DEFAULT_VISUAL_VIEWPORTS) {
  test(`work visual baseline ${viewport.label}`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });
    await gotoAndFreeze(page, "/work");

    await expect(page).toHaveScreenshot(
      [`work-${viewport.label}-${viewport.width}x${viewport.height}.png`],
      SCREENSHOT_OPTIONS,
    );
  });
}
