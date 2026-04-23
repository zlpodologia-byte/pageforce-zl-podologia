import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const HERO_VERBS = ["Captar", "Converter", "Responder", "Organizar", "Medir"] as const;

test.describe("home — hello-monday motion parity", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero cycles 5 verbs within 20s", async ({ page }) => {
    const headline = page.locator("h1").first();
    await expect(headline).toBeVisible();

    const seen = new Set<string>();
    const start = Date.now();
    while (Date.now() - start < 20_000 && seen.size < HERO_VERBS.length) {
      const text = ((await headline.textContent()) ?? "").trim();
      if (text) {
        seen.add(text);
      }
      await page.waitForTimeout(120);
    }

    expect(seen.size).toBeGreaterThanOrEqual(HERO_VERBS.length);
    for (const verb of HERO_VERBS) {
      expect(seen).toContain(verb);
    }
  });

  test("CaseCard exposes data-jelly-surface", async ({ page }) => {
    const surfaces = page.locator("[data-case-card-index] [data-jelly-surface]");
    const count = await surfaces.count();
    expect(count).toBeGreaterThan(0);
  });

  test("hovering a card lifts --jelly-opacity above 0", async ({ page }) => {
    const card = page.locator("[data-case-card-index]").first();
    const overlay = card.locator("[data-jelly-overlay]").first();
    const box = await card.boundingBox();
    if (!box) throw new Error("no card bounding box");

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, {
      steps: 10,
    });
    await page.waitForTimeout(550);

    const opacity = await overlay.evaluate((el) => {
      const raw = getComputedStyle(el).getPropertyValue("--jelly-opacity").trim();
      return parseFloat(raw) || 0;
    });

    expect(opacity).toBeGreaterThan(0);
  });

  test("entry from left vs top yields different mask-image origins", async ({ page }) => {
    const card = page.locator("[data-case-card-index]").first();
    const overlay = card.locator("[data-jelly-overlay]").first();
    const box = await card.boundingBox();
    if (!box) throw new Error("no card bounding box");

    // Park cursor away first.
    await page.mouse.move(0, 0);
    await page.waitForTimeout(50);

    // Left entry: approach from off-screen left, cross the left edge.
    await page.mouse.move(box.x - 60, box.y + box.height / 2);
    await page.mouse.move(box.x + 6, box.y + box.height / 2, { steps: 6 });
    await page.waitForTimeout(60);
    const maskLeft = await overlay.evaluate(
      (el) => (el as HTMLElement).style.maskImage || (el as HTMLElement).style.webkitMaskImage,
    );

    // Reset: leave card, wait > 300ms (entry timer) before re-entering.
    await page.mouse.move(box.x + box.width + 80, box.y + box.height / 2);
    await page.waitForTimeout(450);

    // Top entry: approach from above, cross the top edge.
    await page.mouse.move(box.x + box.width / 2, box.y - 60);
    await page.mouse.move(box.x + box.width / 2, box.y + 6, { steps: 6 });
    await page.waitForTimeout(60);
    const maskTop = await overlay.evaluate(
      (el) => (el as HTMLElement).style.maskImage || (el as HTMLElement).style.webkitMaskImage,
    );

    expect(maskLeft).toContain("0% 50%");
    expect(maskTop).toContain("50% 0%");
    expect(maskLeft).not.toBe(maskTop);
  });

  test("menu-button JellyBorder path d animates between frames", async ({ page }) => {
    const button = page.locator("[data-menu-button]").first();
    await expect(button).toBeVisible();

    const path = button
      .locator("xpath=ancestor::div[2]")
      .locator("svg path")
      .first();

    const d1 = await path.getAttribute("d");
    await page.waitForTimeout(620);
    const d2 = await path.getAttribute("d");

    expect(d1).toBeTruthy();
    expect(d2).toBeTruthy();
    expect(d1).not.toBe(d2);
  });
});

const AXE_ROUTES = ["/", "/services", "/diagnostic", "/about", "/stories"] as const;

test.describe("a11y — axe per page", () => {
  for (const route of AXE_ROUTES) {
    test(`${route} has no axe violations`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });
  }
});
