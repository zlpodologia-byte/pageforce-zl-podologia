import { expect, test } from "@playwright/test";

const wellnessPages = [
  {
    path: "/reflexologia-podal-fortaleza",
    h1: "Reflexologia podal em Fortaleza",
    title: "Reflexologia Podal em Fortaleza | ZL Podologia",
    source: "service_reflexology_page",
    service: "reflexologia_podal",
    waText: "vim pela página de reflexologia podal",
    requiredText: [
      "R$ 80 a R$ 100",
      "R$ 100 a R$ 150",
      "Jannié",
      "R$ 180",
      "ZL Podologia fica na Parquelândia",
    ],
  },
  {
    path: "/massagem-relaxante-pes-fortaleza",
    h1: "Massagem relaxante nos pés em Fortaleza",
    title: "Massagem Relaxante nos Pés em Fortaleza | ZL Podologia",
    source: "service_massage_page",
    service: "massagem_relaxante_pes",
    waText: "vim pela página de massagem relaxante nos pés",
    requiredText: [
      "R$ 100 a R$ 150",
      "Jannié",
      "ZL Podologia fica na Parquelândia",
      "Momento Essencial",
    ],
  },
] as const;

test.describe("ZL wellness pages", () => {
  for (const pageData of wellnessPages) {
    test(`publishes ${pageData.path}`, async ({ page }) => {
      await page.goto(pageData.path);

      await expect(page).toHaveURL(new RegExp(`${pageData.path}$`));
      await expect(page).toHaveTitle(pageData.title);
      await expect(
        page.getByRole("heading", { level: 1, name: pageData.h1 })
      ).toBeVisible();

      const body = page.locator("body");
      for (const text of pageData.requiredText) {
        await expect(body).toContainText(text);
      }

      const ctas = page.locator(
        `a[href*="/api/wa"][href*="source=${pageData.source}"]`
      );
      await expect(ctas).toHaveCount(2);

      const firstHref = await ctas.first().getAttribute("href");
      const waUrl = new URL(firstHref!, "http://127.0.0.1:3001");
      expect(waUrl.searchParams.get("text")).toContain(pageData.waText);

      const canonical = page.locator(
        `link[rel="canonical"][href="https://www.zlpodologia.com.br${pageData.path}"]`
      );
      await expect(canonical).toHaveCount(1);
    });
  }

  test("wellness pages expose schema and sitemap entries", async ({
    page,
  }) => {
    for (const pageData of wellnessPages) {
      await page.goto(pageData.path);

      const schemas = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((nodes) =>
          nodes.map((node) => JSON.parse(node.textContent ?? "{}"))
        );

      const graphTypes = schemas.flatMap((schema) =>
        Array.isArray(schema["@graph"])
          ? schema["@graph"].map((item: { "@type"?: string }) => item["@type"])
          : [schema["@type"]]
      );

      expect(graphTypes).toContain("Service");
      expect(graphTypes).toContain("FAQPage");
      expect(graphTypes).toContain("BreadcrumbList");
    }

    const sitemap = await page.request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    const sitemapXml = await sitemap.text();
    for (const pageData of wellnessPages) {
      expect(sitemapXml).toContain(
        `https://www.zlpodologia.com.br${pageData.path}`
      );
    }
    expect(sitemapXml).not.toContain("/api/wa");
  });

  test("wellness pages link to each other and podoprofilaxia links back", async ({
    page,
  }) => {
    await page.goto("/reflexologia-podal-fortaleza");
    await expect(
      page.locator('a[href="/massagem-relaxante-pes-fortaleza"]').first()
    ).toBeVisible();

    await page.goto("/massagem-relaxante-pes-fortaleza");
    await expect(
      page.locator('a[href="/reflexologia-podal-fortaleza"]').first()
    ).toBeVisible();

    await page.goto("/podoprofilaxia-fortaleza");
    await expect(
      page.locator('a[href="/reflexologia-podal-fortaleza"]').first()
    ).toBeVisible();
  });

  test("homepage links to both wellness pages", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator('a[href="/reflexologia-podal-fortaleza"]').first()
    ).toBeVisible();
    await expect(
      page.locator('a[href="/massagem-relaxante-pes-fortaleza"]').first()
    ).toBeVisible();
  });

  test("wa redirect carries noindex header", async ({ request }) => {
    const response = await request.get(
      "/api/wa?source=service_reflexology_page&text=teste",
      { maxRedirects: 0 }
    );
    expect([307, 308]).toContain(response.status());
    expect(response.headers()["x-robots-tag"]).toContain("noindex");
  });

  test("service pages fire service_view and tracked wa_click", async ({
    page,
  }) => {
    const serverEvents: Array<Record<string, unknown>> = [];

    await page.route("**/api/zl-events", async (route) => {
      const body = route.request().postDataJSON() as Record<string, unknown>;
      serverEvents.push(body);
      await route.fulfill({ status: 204, body: "" });
    });

    // Evita navegacao externa ao clicar no CTA do hero.
    await page.route("**/api.whatsapp.com/**", async (route) => {
      await route.abort();
    });

    await page.addInitScript(() => {
      window.dataLayer = [];
    });

    await page.goto("/reflexologia-podal-fortaleza");
    await page.waitForLoadState("networkidle");

    const dataLayer = await page.evaluate(() => window.dataLayer ?? []);
    expect(dataLayer).toContainEqual(
      expect.objectContaining({
        event: "service_view",
        service: "reflexologia_podal",
      })
    );

    await page
      .locator('[data-cta-placement="hero"] a[href*="/api/wa"]')
      .first()
      .click();

    await expect
      .poll(() =>
        serverEvents.some(
          (event) =>
            event.event === "wa_click" &&
            event.service === "reflexologia_podal" &&
            event.source === "service_reflexology_page" &&
            event.placement === "hero" &&
            typeof event.page_path === "string" &&
            (event.page_path as string).includes(
              "/reflexologia-podal-fortaleza"
            )
        )
      )
      .toBe(true);
  });

  test("wellness trailing slash redirects to canonical path", async ({
    page,
  }) => {
    await page.goto("/reflexologia-podal-fortaleza/");
    await expect(page).toHaveURL(/\/reflexologia-podal-fortaleza$/);
  });
});
