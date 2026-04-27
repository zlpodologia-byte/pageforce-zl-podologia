import { expect, test } from "@playwright/test";

const servicePages = [
  {
    path: "/ortonixia-fortaleza",
    h1: "Órtese para unha em Fortaleza",
    source: "service_orthosis_page",
    requiredText: [
      "R$ 60 por unha",
      "R$ 100 por unha",
      "unha que volta a encravar",
      "correção de curvatura",
      "ZL Podologia fica na Parquelândia",
    ],
  },
  {
    path: "/podoprofilaxia-fortaleza",
    h1: "Podoprofilaxia em Fortaleza",
    source: "service_podoprofilaxia_page",
    requiredText: [
      "R$ 100 dinheiro",
      "R$ 105 cartão",
      "corte técnico",
      "desbaste de calos e calosidades",
      "ZL Podologia fica na Parquelândia",
    ],
  },
  {
    path: "/pe-diabetico-fortaleza",
    h1: "Cuidado para pé diabético em Fortaleza",
    source: "service_diabetic_page",
    requiredText: [
      "R$ 120",
      "não substitui acompanhamento médico",
      "diabetes exige cuidado contínuo",
      "sensibilidade",
      "ZL Podologia fica na Parquelândia",
    ],
  },
] as const;

test.describe("ZL remaining service pages", () => {
  for (const pageData of servicePages) {
    test(`publishes ${pageData.path}`, async ({ page }) => {
      await page.goto(pageData.path);

      await expect(page).toHaveURL(new RegExp(`${pageData.path}$`));
      await expect(
        page.getByRole("heading", { level: 1, name: pageData.h1 }),
      ).toBeVisible();

      const body = page.locator("body");
      for (const text of pageData.requiredText) {
        await expect(body).toContainText(text);
      }

      const cta = page.locator(
        `a[href*="/api/wa"][href*="source=${pageData.source}"]`,
      );
      await expect(cta).toHaveCount(2);

      const canonical = page.locator(
        `link[rel="canonical"][href="https://www.zlpodologia.com.br${pageData.path}"]`,
      );
      await expect(canonical).toHaveCount(1);
    });
  }

  test("service pages expose schema and sitemap entries", async ({ page }) => {
    for (const pageData of servicePages) {
      await page.goto(pageData.path);

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
    }

    const sitemap = await page.request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    const sitemapXml = await sitemap.text();
    for (const pageData of servicePages) {
      expect(sitemapXml).toContain(
        `https://www.zlpodologia.com.br${pageData.path}`,
      );
    }
  });

  test("service page trailing slash redirects to canonical path", async ({
    page,
  }) => {
    await page.goto("/ortonixia-fortaleza/");
    await expect(page).toHaveURL(/\/ortonixia-fortaleza$/);
  });
});
