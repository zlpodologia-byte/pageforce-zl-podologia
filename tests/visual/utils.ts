import type { Page } from "@playwright/test";

export interface VisualViewport {
  label: string;
  width: number;
  height: number;
}

export const DEFAULT_VISUAL_VIEWPORTS: readonly VisualViewport[] = [
  { label: "desktop", width: 1440, height: 900 },
  { label: "tablet", width: 768, height: 1024 },
  { label: "mobile", width: 390, height: 844 },
] as const;

export const CASE_DETAIL_VIEWPORTS: readonly VisualViewport[] = [
  { label: "desktop", width: 1440, height: 900 },
  { label: "mobile", width: 390, height: 844 },
] as const;

export const SCREENSHOT_OPTIONS = {
  animations: "disabled" as const,
  caret: "hide" as const,
  maxDiffPixelRatio: 0.002,
};

export async function gotoAndFreeze(page: Page, pathname: string) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(pathname, { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.readyState === "complete");
  await page.waitForFunction(() => (document.fonts ? document.fonts.status === "loaded" : true));
  await freezeAnimations(page);
}

export async function freezeAnimations(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => {
    window.scrollTo(0, 0);

    for (const animation of document.getAnimations()) {
      try {
        animation.finish();
      } catch {
        animation.cancel();
      }
    }
  });
  await page.waitForTimeout(100);
}
