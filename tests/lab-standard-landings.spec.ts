import { expect, test } from "@playwright/test";

const LANDINGS = [
  {
    slug: "clinica",
    path: "/lab/clinica-landing",
    primaryHref: "/contact?origin=clinica-landing",
    diagnosticHref: "/diagnostic?from=clinica-landing",
  },
  {
    slug: "odontologia",
    path: "/lab/odontologia-landing",
    primaryHref: "/contact?origin=odontologia-landing",
    diagnosticHref: "/diagnostic?from=odontologia-landing",
  },
  {
    slug: "estetica",
    path: "/lab/estetica-landing",
    primaryHref: "/contact?origin=estetica-landing",
    diagnosticHref: "/diagnostic?from=estetica-landing",
  },
] as const;

test.describe("lab standard landings", () => {
  for (const landing of LANDINGS) {
    test(`${landing.slug} renders the standard landing skeleton`, async ({
      page,
    }) => {
      const response = await page.goto(landing.path);
      expect(response?.status()).toBe(200);

      await expect(page.locator("main h1").first()).toBeVisible();
      await expect(page.locator("[data-section]")).toHaveCount(6);
      await expect(
        page.locator("[data-testid='landing-primary-cta']").first(),
      ).toHaveAttribute("href", landing.primaryHref);
      await expect(
        page.locator("[data-testid='landing-diagnostic-cta']").first(),
      ).toHaveAttribute("href", landing.diagnosticHref);
    });
  }
});
