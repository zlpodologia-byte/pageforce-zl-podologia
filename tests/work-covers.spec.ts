import { expect, test } from "@playwright/test";

test("work cards use loaded local cover assets", async ({ page }) => {
  await page.goto("/work");
  await page.waitForLoadState("networkidle");

  const coverState = await page.evaluate(() => {
    const cards = Array.from(
      document.querySelectorAll("article[data-case-card-index]"),
    ).slice(0, 6);

    return cards.map((card) => {
      const image = card.querySelector(
        "img[alt*=' - ']",
      ) as HTMLImageElement | null;

      return {
        alt: image?.alt ?? null,
        src: image?.currentSrc ?? image?.src ?? null,
        complete: image?.complete ?? false,
        naturalWidth: image?.naturalWidth ?? 0,
      };
    });
  });

  expect(coverState.length).toBeGreaterThan(0);

  for (const cover of coverState) {
    expect(cover.alt).toBeTruthy();
    expect(cover.src).toContain("/cases/");
    expect(cover.complete).toBe(true);
    expect(cover.naturalWidth).toBeGreaterThan(0);
  }
});
