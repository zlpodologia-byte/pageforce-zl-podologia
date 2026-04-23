import { expect, test } from "@playwright/test";

/**
 * Showcase Model pages — milestone acceptance specs.
 *
 * One param-per-slug rollout of 3 assertions per page (200 + breadcrumb,
 * disclaimer, diagnostic CTA) plus a 404 probe for invalid slugs.
 */
const LABELS = [
  "Clínicas & saúde",
  "Odontologia",
  "Estética & beleza",
  "Diagnóstico por imagem",
  "Pet shop & veterinária",
  "Comércio & varejo regional",
  "Serviços gerais",
  "Marcenaria & oficinas",
  "Agrícola & agronegócio",
  "Escritórios especializados",
];
const SLUGS = [
  "clinica",
  "odontologia",
  "estetica",
  "diagnostico",
  "pet",
  "comercio",
  "servicos",
  "marcenaria",
  "agro",
  "escritorios",
] as const;

test.describe("showcase model pages", () => {
  for (let i = 0; i < SLUGS.length; i++) {
    const slug = SLUGS[i];
    const label = LABELS[i];

    test(`model page /${slug} renders label ${label}`, async ({ page }) => {
      const response = await page.goto(`/showcases/${slug}`);
      expect(response?.status()).toBe(200);
      await page.waitForLoadState("networkidle");
      // Breadcrumb contém o label (H1 é o hookLine, não o label — por design).
      await expect(
        page.locator("nav[aria-label='Breadcrumb']"),
      ).toContainText(label);
    });

    test(`model page /${slug} has illustrative disclaimer`, async ({
      page,
    }) => {
      await page.goto(`/showcases/${slug}`);
      await page.waitForLoadState("networkidle");
      await expect(
        page.locator(
          "text=Modelo demonstrativo · os números são ilustrativos",
        ),
      ).toBeVisible();
    });

    test(`model page /${slug} primary CTA links to diagnostic`, async ({
      page,
    }) => {
      await page.goto(`/showcases/${slug}`);
      await page.waitForLoadState("networkidle");
      const cta = page.locator("[data-testid='showcase-model-cta-primary']");
      await expect(cta).toHaveAttribute(
        "href",
        `/diagnostic?from=showcases/${slug}`,
      );
    });
  }

  test("invalid slug returns 404", async ({ page }) => {
    const response = await page.goto("/showcases/xyz-notfound", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(404);
  });
});
