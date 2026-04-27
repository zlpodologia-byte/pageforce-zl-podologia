import { expect, test } from "@playwright/test";

test.describe("ZL unha encravada page", () => {
  test("publishes a dedicated high-intent service page", async ({ page }) => {
    await page.goto("/unha-encravada-fortaleza");

    await expect(page).toHaveURL(/\/unha-encravada-fortaleza$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Unha encravada em Fortaleza",
      }),
    ).toBeVisible();

    const body = page.locator("body");
    await expect(body).toContainText("Grau 1: a partir de R$ 150");
    await expect(body).toContainText("Graus 2 e 3: a partir de R$ 200");
    await expect(body).toContainText("Quando procurar médico");
    await expect(body).toContainText("não substitui avaliação médica");
    await expect(body).toContainText("ZL Podologia fica na Parquelândia");

    const cta = page.locator(
      'a[href*="/api/wa"][href*="source=service_ingrown_page"]',
    );
    await expect(cta).toHaveCount(2);

    const canonical = page.locator(
      'link[rel="canonical"][href="https://www.zlpodologia.com.br/unha-encravada-fortaleza"]',
    );
    await expect(canonical).toHaveCount(1);
  });

  test("exposes service schema and appears in the sitemap", async ({
    page,
  }) => {
    await page.goto("/unha-encravada-fortaleza");

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
      "https://www.zlpodologia.com.br/unha-encravada-fortaleza",
    );
  });
});
