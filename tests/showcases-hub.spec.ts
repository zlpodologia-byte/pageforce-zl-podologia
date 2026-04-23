import { expect, test } from "@playwright/test";

/**
 * Showcase Hub — milestone acceptance specs.
 *
 * Slugs and labels are inlined (not imported from lib/showcases.ts) to keep
 * the spec decoupled from the ESM module under app/.
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

test.describe("showcases hub", () => {
  test("hub renders 10 thumbs with accessible names", async ({ page }) => {
    await page.goto("/showcases");
    await page.waitForLoadState("networkidle");
    const thumbs = page.locator("[data-showcase-thumb]");
    await expect(thumbs).toHaveCount(10);
    // Cada thumb tem aria-label no formato "Modelo para {label}"
    for (const label of LABELS) {
      await expect(
        page.locator(`[aria-label="Modelo para ${label}"]`),
      ).toHaveCount(1);
    }
  });

  test("hovering a thumb swaps preview hookline within 400ms", async ({
    page,
  }) => {
    await page.goto("/showcases");
    await page.waitForLoadState("networkidle");
    // The H2 with data-testid="showcase-preview-label" renders the active
    // showcase's hookLine — it's the voice of the vertical and it's unique
    // per showcase, which is what makes it a reliable swap assertion.
    const previewHeadline = page.locator(
      "[data-testid='showcase-preview-label']",
    );
    await expect(previewHeadline).toContainText(
      "Agendamento que não se perde no WhatsApp.",
    );

    const agro = page.locator("[data-showcase-thumb='agro']");
    await agro.hover();
    await expect(previewHeadline).toContainText(
      "Do talhão ao contrato",
      { timeout: 400 },
    );
  });

  test("primary preview CTA routes to /showcases/:slug", async ({ page }) => {
    await page.goto("/showcases");
    await page.waitForLoadState("networkidle");
    // O primary CTA do preview stage aponta pro slug ativo (clinica por default)
    const cta = page.locator("[data-testid='showcase-preview-cta-primary']");
    await expect(cta).toHaveAttribute("href", "/showcases/clinica");
    await cta.click();
    await page.waitForURL("**/showcases/clinica");
    await expect(page).toHaveURL(/\/showcases\/clinica$/);
  });

  test("reduced-motion pins thumb transforms", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/showcases");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300);

    // Pega o transform computado do primeiro thumb
    const thumb = page.locator("[data-showcase-thumb='clinica']");
    const t1 = await thumb.evaluate(
      (el) => getComputedStyle(el as HTMLElement).transform,
    );

    // Espera 800ms — sob reduced motion, o rAF nem roda
    await page.waitForTimeout(800);
    const t2 = await thumb.evaluate(
      (el) => getComputedStyle(el as HTMLElement).transform,
    );

    expect(t2).toBe(t1);
    await context.close();
  });

  // Keeps SLUGS referenced so type-checkers don't flag it as unused if the
  // spec gets extended.
  test("inlined SLUGS array stays in sync with hub count", async ({ page }) => {
    await page.goto("/showcases");
    await page.waitForLoadState("networkidle");
    expect(SLUGS.length).toBe(10);
    for (const slug of SLUGS) {
      await expect(
        page.locator(`[data-showcase-thumb='${slug}']`),
      ).toHaveCount(1);
    }
  });
});
