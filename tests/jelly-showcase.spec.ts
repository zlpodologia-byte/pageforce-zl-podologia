import { test } from "@playwright/test";

test("jelly showcase: cursor at 3 positions on one card", async ({ page }) => {
  await page.goto("http://localhost:3001/work");
  await page.waitForLoadState("networkidle");
  const card = page.locator("article[data-case-card-index]").nth(2);
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);

  const cardBox = await card.evaluate((node) => {
    const element = node as HTMLElement;
    element.setAttribute("data-test-card", "1");
    const r = element.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  if (!cardBox) throw new Error("no card");
  console.log("CARD:", cardBox);

  // Force max displacement on ALL filters (override scale so effect is obvious in screenshot)
  await page.evaluate(() => {
    for (const d of Array.from(document.querySelectorAll("feDisplacementMap"))) {
      d.setAttribute("scale", "60");
    }
    for (const t of Array.from(document.querySelectorAll("feTurbulence"))) {
      t.setAttribute("baseFrequency", "0.025 0.03");
    }
  });

  // Position cursor at 3 locations + screenshot each
  const positions = [
    { label: "upper-left", dx: 0.25, dy: 0.25 },
    { label: "center", dx: 0.5, dy: 0.5 },
    { label: "lower-right", dx: 0.75, dy: 0.75 },
  ];

  for (const p of positions) {
    const x = cardBox.x + cardBox.w * p.dx;
    const y = cardBox.y + cardBox.h * p.dy;
    await page.mouse.move(x, y, { steps: 8 });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `test-results/jelly-${p.label}.png`,
      clip: {
        x: Math.max(0, cardBox.x - 20),
        y: Math.max(0, cardBox.y - 20),
        width: cardBox.w + 40,
        height: cardBox.h + 40,
      },
    });
    const state = await page.evaluate(() => {
      const card = document.querySelector("[data-test-card='1']") as HTMLElement;
      const surface = card?.querySelector("[data-jelly-surface]") as HTMLElement | null;
      const cs = surface ? getComputedStyle(surface) : null;
      return {
        x: cs?.getPropertyValue("--jelly-x"),
        y: cs?.getPropertyValue("--jelly-y"),
        op: cs?.getPropertyValue("--jelly-opacity"),
      };
    });
    console.log(`${p.label}:`, state);
  }
});
