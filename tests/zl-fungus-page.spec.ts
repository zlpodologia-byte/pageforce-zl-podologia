import { expect, test } from "@playwright/test";

test.describe("ZL onicomicose page", () => {
  test("publishes a dedicated fungus service page", async ({ page }) => {
    await page.goto("/onicomicose-fortaleza");

    await expect(page).toHaveURL(/\/onicomicose-fortaleza$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Fungo na unha em Fortaleza",
      }),
    ).toBeVisible();

    const body = page.locator("body");
    await expect(body).toContainText("onicomicose");
    await expect(body).toContainText("R$ 100 por unha por sessão");
    await expect(body).toContainText("não é tratamento de sessão única");
    await expect(body).toContainText("laser pode entrar como apoio");
    await expect(body).toContainText("sem promessa de cura rápida");
    await expect(body).toContainText("ZL Podologia fica na Parquelândia");

    const cta = page.locator(
      'a[href*="/api/wa"][href*="source=service_fungus_page"]',
    );
    await expect(cta).toHaveCount(2);

    const canonical = page.locator(
      'link[rel="canonical"][href="https://www.zlpodologia.com.br/onicomicose-fortaleza"]',
    );
    await expect(canonical).toHaveCount(1);
  });

  test("exposes service schema and appears in the sitemap", async ({
    page,
  }) => {
    await page.goto("/onicomicose-fortaleza");

    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) =>
        nodes.map((node) => JSON.parse(node.textContent ?? "{}")),
      );

    const graphTypes = schemas.flatMap((schema) =>
      Array.isArray(schema["@graph"])
        ? schema["@graph"].map((item: { "@type"?: string }) => item["@type"])
        : [schema["@type"]],
    );

    expect(graphTypes).toContain("Service");
    expect(graphTypes).toContain("FAQPage");
    expect(graphTypes).toContain("BreadcrumbList");

    const sitemap = await page.request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain(
      "https://www.zlpodologia.com.br/onicomicose-fortaleza",
    );
  });
});
