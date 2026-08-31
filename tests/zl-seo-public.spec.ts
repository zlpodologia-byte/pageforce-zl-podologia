import { expect, test } from "@playwright/test";
import { PUBLIC_STATIC_ROUTES, SITE_URL, absoluteSiteUrl } from "../lib/site";

function extractLocations(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function collectReferenceIds(value: unknown, ids: string[] = []): string[] {
  if (Array.isArray(value)) {
    for (const item of value) collectReferenceIds(item, ids);
  } else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (
        (key === "provider" || key === "publisher") &&
        child &&
        typeof child === "object" &&
        "@id" in child &&
        typeof child["@id"] === "string"
      ) {
        ids.push(child["@id"]);
      }
      collectReferenceIds(child, ids);
    }
  }
  return ids;
}

function findFaqPage(value: unknown): Record<string, unknown> | undefined {
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findFaqPage(item);
      if (match) return match;
    }
  } else if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (record["@type"] === "FAQPage") return record;
    for (const child of Object.values(record)) {
      const match = findFaqPage(child);
      if (match) return match;
    }
  }
  return undefined;
}

const clusterPaths = [
  "/unha-encravada-fortaleza",
  "/onicomicose-fortaleza",
  "/ortonixia-fortaleza",
  "/podoprofilaxia-fortaleza",
  "/pe-diabetico-fortaleza",
  "/podologia-aldeota",
  "/podologia-centro-fortaleza",
  "/podologia-cidade-dos-funcionarios",
  "/podologia-maraponga",
  "/podologia-messejana",
] as const;

test("serves the complete llms.txt as plain text", async ({ request }) => {
  const response = await request.get("/llms.txt");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/plain");
  const body = await response.text();
  expect((body.match(/^### Pergunta/gm) ?? []).length).toBe(500);
});

test("publishes crawler-specific robots rules and the canonical sitemap", async ({
  request,
}) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toMatch(/User-Agent: OAI-SearchBot\s+Allow: \//);
  expect(body).toMatch(/User-Agent: ChatGPT-User\s+Allow: \//);
  expect(body).toMatch(/User-Agent: \*\s+Allow: \/\s+Disallow: \/api\//);
  expect(body).not.toContain("GPTBot");
  expect(body).toContain(
    "Sitemap: https://www.zlpodologia.com.br/sitemap.xml",
  );
});

test("keeps the sitemap limited to canonical public routes", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  const locations = extractLocations(xml);
  expect(locations).toEqual(PUBLIC_STATIC_ROUTES.map(absoluteSiteUrl));
  expect(locations).toHaveLength(12);
  expect(xml).not.toContain("<lastmod>");
  for (const location of locations) {
    const url = new URL(location);
    expect(url.search).toBe("");
    expect(url.hash).toBe("");
  }
});

test("publishes route canonicals without legacy meta keywords", async ({ page }) => {
  for (const pathname of PUBLIC_STATIC_ROUTES) {
    await page.goto(pathname);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      pathname === "/" ? SITE_URL : absoluteSiteUrl(pathname),
    );
  }

  await page.goto("/");
  await expect(page.locator('meta[name="keywords"]')).toHaveCount(0);
});

test("links the home body to every service and neighborhood cluster page", async ({
  page,
}) => {
  await page.goto("/");
  const cluster = page.locator("[data-zl-home-seo-cluster]");
  await expect(cluster).toBeVisible();

  for (const pathname of clusterPaths) {
    await expect(cluster.locator(`a[href="${pathname}"]`)).toHaveCount(1);
  }
});

test("keeps every cluster route discoverable from the home footer", async ({
  page,
}) => {
  await page.goto("/");
  const footerLinks = page.locator("[data-zl-seo-footer-links]");
  await expect(footerLinks).toBeVisible();

  for (const pathname of clusterPaths) {
    await expect(footerLinks.locator(`a[href="${pathname}"]`)).toHaveCount(1);
  }
});

test("keeps the hero as the only high-priority image on the home", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.getByAltText(
    "Zucarina, podóloga da ZL Podologia Fortaleza, em atendimento clínico com jaleco branco, touca, máscara, óculos e luvas, segurando o pé da paciente com precisão",
    { exact: true },
  );
  const logo = page.getByAltText("Logo da ZL Podologia");

  await expect(hero).toHaveAttribute("fetchpriority", "high");
  await expect(logo).not.toHaveAttribute("fetchpriority", "high");
  await expect(page.locator('img[fetchpriority="high"]')).toHaveCount(1);
});

test("uses a truthful business type and consistent entity references", async ({
  page,
}) => {
  await page.goto("/");
  const rawJsonLd = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const documents = rawJsonLd.map((value) => JSON.parse(value) as unknown);
  const serialized = JSON.stringify(documents);
  const businessId = "https://www.zlpodologia.com.br#business";

  expect(serialized).not.toContain("MedicalBusiness");
  expect(serialized).toContain(businessId);
  const referenceIds = documents.flatMap((document) =>
    collectReferenceIds(document),
  );
  expect(referenceIds.length).toBeGreaterThan(0);
  expect(new Set(referenceIds)).toEqual(new Set([businessId]));
});

test("connects every service and neighborhood page to related canonical routes", async ({
  page,
}) => {
  const servicePaths = [
    "/unha-encravada-fortaleza",
    "/onicomicose-fortaleza",
    "/ortonixia-fortaleza",
    "/podoprofilaxia-fortaleza",
    "/pe-diabetico-fortaleza",
  ];
  const neighborhoodPaths = PUBLIC_STATIC_ROUTES.filter((pathname) =>
    pathname.startsWith("/podologia-"),
  );
  const publicRoutes = new Set<string>(PUBLIC_STATIC_ROUTES);

  for (const pathname of servicePaths) {
    await page.goto(pathname);
    const section = page.locator("[data-zl-related-links]");
    await expect(section.getByRole("heading", { name: "Continue sua pesquisa" })).toBeVisible();
    const hrefs = await section.locator("a").evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")),
    );
    expect(hrefs.length).toBeGreaterThanOrEqual(2);
    expect(hrefs.every((href) => href !== null && publicRoutes.has(href))).toBe(true);
  }

  for (const pathname of neighborhoodPaths) {
    await page.goto(pathname);
    await expect(page.locator("body")).toContainText(
      "atendimento ocorre na clínica da Parquelândia",
    );
    const hrefs = await page
      .locator("[data-zl-related-links] a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(hrefs.length).toBeGreaterThanOrEqual(3);
    expect(hrefs).toContain("/");
  }
});

test("keeps visible FAQ copy aligned with FAQPage JSON-LD", async ({ page }) => {
  const faqPaths = PUBLIC_STATIC_ROUTES.filter(
    (pathname) => pathname !== "/politica-de-imagens",
  );

  for (const pathname of faqPaths) {
    await page.goto(pathname);
    const visibleQuestions = await page
      .locator("[data-zl-faq-question]")
      .allTextContents();
    const visibleAnswers = await page
      .locator("[data-zl-faq-answer]")
      .allTextContents();
    expect(visibleQuestions.length).toBeGreaterThan(0);
    expect(visibleAnswers).toHaveLength(visibleQuestions.length);

    const documents = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) =>
        nodes.map((node) => JSON.parse(node.textContent ?? "{}") as unknown),
      );
    const faqPage = findFaqPage(documents);
    expect(faqPage).toBeDefined();
    const mainEntity = faqPage?.mainEntity as Array<{
      name: string;
      acceptedAnswer: { text: string };
    }>;
    expect(mainEntity.map((item) => item.name)).toEqual(
      visibleQuestions.map((item) => item.trim()),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      visibleAnswers.map((item) => item.trim()),
    );
  }
});
