import { expect, test } from "@playwright/test";

const neighborhoodPages = [
  {
    path: "/podologia-aldeota",
    h1: "Podologia para pacientes da Aldeota",
    source: "neighborhood_aldeota",
    localityText: "pacientes da Aldeota",
  },
  {
    path: "/podologia-centro-fortaleza",
    h1: "Podologia para pacientes do Centro de Fortaleza",
    source: "neighborhood_centro_fortaleza",
    localityText: "pacientes do Centro de Fortaleza",
  },
  {
    path: "/podologia-cidade-dos-funcionarios",
    h1: "Podologia para pacientes da Cidade dos Funcionários",
    source: "neighborhood_cidade_dos_funcionarios",
    localityText: "pacientes da Cidade dos Funcionários",
  },
  {
    path: "/podologia-maraponga",
    h1: "Podologia para pacientes da Maraponga",
    source: "neighborhood_maraponga",
    localityText: "pacientes da Maraponga",
  },
  {
    path: "/podologia-messejana",
    h1: "Podologia para pacientes de Messejana",
    source: "neighborhood_messejana",
    localityText: "pacientes de Messejana",
  },
] as const;

test.describe("ZL neighborhood pages", () => {
  for (const pageData of neighborhoodPages) {
    test(`publishes ethical neighborhood page ${pageData.path}`, async ({
      page,
    }) => {
      await page.goto(pageData.path);

      await expect(page).toHaveURL(new RegExp(`${pageData.path}$`));
      await expect(
        page.getByRole("heading", { level: 1, name: pageData.h1 }),
      ).toBeVisible();

      const body = page.locator("body");
      await expect(body).toContainText(pageData.localityText);
      await expect(body).toContainText("ZL Podologia fica na Parquelândia");
      await expect(body).toContainText("não temos unidade nesse bairro");
      await expect(body).toContainText("Av. Bezerra de Menezes, 2203");
      await expect(body).toContainText("unha encravada");

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

  test("neighborhood pages expose schema and sitemap entries", async ({
    page,
  }) => {
    for (const pageData of neighborhoodPages) {
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
    for (const pageData of neighborhoodPages) {
      expect(sitemapXml).toContain(
        `https://www.zlpodologia.com.br${pageData.path}`,
      );
    }
  });

  test("neighborhood page trailing slash redirects to canonical path", async ({
    page,
  }) => {
    await page.goto("/podologia-aldeota/");
    await expect(page).toHaveURL(/\/podologia-aldeota$/);
  });
});
