import { expect, test } from "@playwright/test";
import {
  CASE_DETAIL_VIEWPORTS,
  SCREENSHOT_OPTIONS,
  gotoAndFreeze,
} from "./utils";

const CASE_PATH = "/work/north-star-observatory";

for (const viewport of CASE_DETAIL_VIEWPORTS) {
  test(`case detail visual baseline ${viewport.label}`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });
    await gotoAndFreeze(page, CASE_PATH);

    await expect(page).toHaveScreenshot(
      [
        `case-detail-north-star-observatory-${viewport.label}-${viewport.width}x${viewport.height}.png`,
      ],
      SCREENSHOT_OPTIONS,
    );
  });
}
