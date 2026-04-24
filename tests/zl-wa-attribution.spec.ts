import { expect, test } from "@playwright/test";

test.describe("ZL WhatsApp attribution", () => {
  test("landing WhatsApp links use internal attribution redirect", async ({
    page,
  }) => {
    await page.goto("/?utm_source=google&utm_medium=cpc&utm_campaign=zl-teste");
    await page.waitForLoadState("networkidle");

    const links = await page
      .locator('a[href*="/api/wa"]')
      .evaluateAll((anchors) =>
        anchors.map((anchor) => ({
          href: (anchor as HTMLAnchorElement).href,
          label: anchor.textContent?.replace(/\s+/g, " ").trim(),
        }))
      );

    expect(links.length).toBeGreaterThan(6);

    const first = new URL(links[0].href);
    expect(first.pathname).toBe("/api/wa");
    expect(first.searchParams.get("source")).toBeTruthy();
    expect(first.searchParams.get("text")).toContain("ZL Podologia");
    expect(first.search).not.toMatch(/Origem|landing v7|utm_content/);
  });

  test("redirect keeps tracking internal and patient message clean", async ({
    request,
  }) => {
    const response = await request.get(
      "/api/wa?source=explorer_reflexology&text=Oi%2C%20quero%20reflexologia%20na%20ZL%20Podologia.",
      { maxRedirects: 0 }
    );

    expect([307, 308]).toContain(response.status());

    const location = response.headers().location;
    expect(location).toBeTruthy();

    const destination = new URL(location!);
    expect(destination.origin).toBe("https://api.whatsapp.com");
    expect(destination.pathname).toBe("/send");
    expect(destination.searchParams.get("phone")).toBe("5585994358505");
    expect(destination.searchParams.get("text")).toBe(
      "Oi, quero reflexologia na ZL Podologia."
    );
    expect(destination.search).not.toMatch(
      /source|Origem|utm_|explorer_reflexology/
    );
  });

  test("service choices and detail tabs publish funnel events", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.dataLayer = [];
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator("#servicos").scrollIntoViewIfNeeded();

    await page
      .locator("#servicos button")
      .filter({ hasText: "Reflexologia" })
      .first()
      .click();

    await page
      .locator('#servicos [role="tab"]')
      .filter({ hasText: "Preço e agendar" })
      .click();

    const events = await page.evaluate(() => window.dataLayer ?? []);

    expect(events).toContainEqual(
      expect.objectContaining({
        event: "service_select",
        service: "reflexology",
        source: "service_menu",
      })
    );

    expect(events).toContainEqual(
      expect.objectContaining({
        event: "tab_select",
        service: "reflexology",
        tab: "agendar",
      })
    );
  });
});
