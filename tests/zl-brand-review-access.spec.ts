import { expect, test } from "@playwright/test";

test.describe("ZL brand and review access", () => {
  test("exposes crawlable favicon metadata for Google Search", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.locator('link[rel="icon"][href="/favicon.ico"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('link[rel="icon"][href="/favicon-48x48.png"]'),
    ).toHaveCount(1);

    const favicon = await page.request.get("/favicon-48x48.png");
    expect(favicon.ok()).toBe(true);
    expect(favicon.headers()["content-type"]).toContain("image/png");
  });

  test("redirects short review link to the Google review form", async ({
    page,
  }) => {
    const response = await page.request.get("/avaliar", {
      maxRedirects: 0,
    });

    expect(response.status()).toBe(302);
    expect(response.headers().location).toBe(
      "https://g.page/r/CYP0sOt7Hr89EBM/review",
    );
  });
});
