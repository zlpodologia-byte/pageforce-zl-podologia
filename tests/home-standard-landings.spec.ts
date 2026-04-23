import { expect, test } from "@playwright/test";

const STANDARD_THUMBS = [
  { slug: "clinica", href: "/lab/clinica-landing" },
  { slug: "odontologia", href: "/lab/odontologia-landing" },
  { slug: "estetica", href: "/lab/estetica-landing" },
] as const;

test("home exposes three standard landing thumbs", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await page.waitForLoadState("networkidle");

  const section = page.locator("[data-section='standard-landings']");
  await expect(section).toBeVisible();

  const thumbs = section.locator("[data-standard-thumb]");
  await expect(thumbs).toHaveCount(3);

  for (const item of STANDARD_THUMBS) {
    await expect(
      page.locator(`[data-standard-thumb='${item.slug}']`),
    ).toHaveAttribute("href", item.href);
  }
});
