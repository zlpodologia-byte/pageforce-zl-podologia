import { test } from "@playwright/test";

test("debug jelly localized over card", async ({ page }) => {
  await page.goto("http://localhost:3001/work");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);

  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(300);

  // Tag the first visible card so we can find it after cursor move
  const cardBox = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("article[data-case-card-index]"));
    const visible = cards.find((c) => {
      const r = c.getBoundingClientRect();
      return r.top > 0 && r.top < innerHeight - 200 && r.width > 100;
    }) as HTMLElement | undefined;
    if (!visible) return null;
    visible.setAttribute("data-test-card", "1");
    const r = visible.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  if (!cardBox) throw new Error("no card");
  console.log("CARD:", cardBox);

  const cx = cardBox.x + cardBox.w / 2;
  const cy = cardBox.y + 80;  // near top so overlay visibly appears
  await page.mouse.move(cx, cy, { steps: 15 });
  await page.waitForTimeout(500);

  const state = await page.evaluate(() => {
    const card = document.querySelector("[data-test-card='1']") as HTMLElement;
    if (!card) return null;
    const outer = card.querySelector("[data-jelly-surface]") as HTMLElement | null;
    const overlay = card.querySelector("[data-jelly-overlay]") as HTMLElement | null;
    const outerCS = outer ? getComputedStyle(outer) : null;
    const overlayCS = overlay ? getComputedStyle(overlay) : null;
    return {
      outerStyleInline: outer?.getAttribute("style"),
      outerVars: {
        x: outerCS?.getPropertyValue("--jelly-x"),
        y: outerCS?.getPropertyValue("--jelly-y"),
        op: outerCS?.getPropertyValue("--jelly-opacity"),
      },
      overlayInlineStyle: overlay?.getAttribute("style"),
      overlayComputed: overlayCS ? {
        opacity: overlayCS.opacity,
        filter: overlayCS.filter,
        mask: overlayCS.maskImage || (overlayCS as any).webkitMaskImage,
      } : null,
    };
  });
  console.log("STATE:", JSON.stringify(state, null, 2));
  await page.screenshot({ path: "test-results/jelly-over-card.png", fullPage: false });
});
