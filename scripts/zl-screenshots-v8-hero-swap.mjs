import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "test-results", "zl-evidencias");
// v8-hero-swap: padrao 3040 (prod `next start`) ou override via ZL_BASE_URL.
const BASE_URL = process.env.ZL_BASE_URL ?? "http://localhost:3043";

function out(name) {
  return join(OUT_DIR, `zl-v8-hero-swap-${name}.png`);
}

async function shoot(page, name, selector, opts = {}) {
  if (selector) {
    const el = await page.$(selector);
    if (!el) {
      console.warn(`[zl-shoot] missing selector ${selector} for ${name}`);
      return;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await el.screenshot({ path: out(name), ...opts });
  } else {
    await page.screenshot({ path: out(name), ...opts });
  }
  console.log("[zl-shoot] OK", name);
}

async function shootByText(page, name, text) {
  const handle = await page.evaluateHandle((lookup) => {
    const spans = Array.from(document.querySelectorAll("p, h2, h3"));
    const target = spans.find((s) =>
      (s.textContent || "").toLowerCase().includes(lookup.toLowerCase())
    );
    if (!target) return null;
    let cur = target;
    for (let i = 0; i < 6 && cur; i += 1) {
      if (cur.tagName === "SECTION") return cur;
      cur = cur.parentElement;
    }
    return target.closest("section");
  }, text);
  try {
    const el = handle.asElement();
    if (!el) {
      console.warn(`[zl-shoot] skip ${name}: no section matching "${text}"`);
      return;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await el.screenshot({ path: out(name) });
    console.log("[zl-shoot] OK", name);
  } catch (err) {
    console.warn(`[zl-shoot] ${name} skipped:`, err.message);
  }
}

async function shootHeroZoomBadgeSquiggle(page, name) {
  // Frame apertado no canto bottom-right da foto para evidenciar
  // badge Fortaleza + squiggle SVG.
  const box = await page.evaluate(() => {
    const hero = document.querySelector("section");
    if (!hero) return null;
    const img = hero.querySelector("img[alt*='Zulcarina']");
    if (!img) return null;
    const r = img.getBoundingClientRect();
    return {
      x: Math.max(0, r.left - 20),
      y: Math.max(0, r.bottom - r.height * 0.55),
      width: Math.min(window.innerWidth - Math.max(0, r.left - 20), r.width + 40),
      height: Math.min(window.innerHeight, r.height * 0.6 + 20),
    };
  });
  if (!box) {
    console.warn(`[zl-shoot] hero-zoom skipped: img not found`);
    return;
  }
  try {
    await page.screenshot({ path: out(name), clip: box });
    console.log("[zl-shoot] OK", name);
  } catch (err) {
    console.warn(`[zl-shoot] hero-zoom skipped (clip):`, err.message);
  }
}

async function shootTopbar(page, name) {
  const box = await page.evaluate(() => {
    const header = document.querySelector("section header");
    if (!header) return null;
    const r = header.getBoundingClientRect();
    return {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: Math.min(window.innerHeight, r.bottom + 40),
    };
  });
  if (!box) {
    console.warn(`[zl-shoot] topbar skipped`);
    return;
  }
  try {
    await page.screenshot({ path: out(name), clip: box });
    console.log("[zl-shoot] OK", name);
  } catch (err) {
    console.warn(`[zl-shoot] topbar skipped (${name}):`, err.message);
  }
}

async function dismissCookieBanner(page) {
  const accept = page.getByRole("button", { name: /Aceitar/i });
  if ((await accept.count()) > 0) {
    try {
      await accept.first().click({ timeout: 2000 });
      await page.waitForTimeout(250);
    } catch {
      // Banner nao bloqueia a captura quando ja estiver aceito.
    }
  }
}

async function shootDesktop(browser, width, height, tag) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE_URL}/lab/zl-podologia`, {
    waitUntil: "networkidle",
    timeout: 90_000,
  });
  await page.waitForTimeout(1500);
  await dismissCookieBanner(page);

  await shoot(page, `${tag}-full`, null, { fullPage: true });
  await shoot(page, `${tag}-hero`, null);
  await shootHeroZoomBadgeSquiggle(page, `${tag}-hero-zoom-badge-squiggle`);
  await shootTopbar(page, `${tag}-topbar`);

  if (width === 1440) {
    await shootByText(page, `${tag}-legitimacy`, "Legitimidade logo no topo");
    await shootByText(page, `${tag}-decision`, "Antes do cardapio");
    await shootByText(page, `${tag}-value`, "Valores e fechamento");
    await shoot(page, `${tag}-ambiente`, "#ambiente");
  }

  await ctx.close();
}

async function shootMobile(browser) {
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE_URL}/lab/zl-podologia`, {
    waitUntil: "networkidle",
    timeout: 90_000,
  });
  await page.waitForTimeout(1500);
  await dismissCookieBanner(page);

  await shoot(page, "mobile-full", null, { fullPage: true });
  await shoot(page, "mobile-hero", null);
  await shootTopbar(page, "mobile-topbar");

  await ctx.close();
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  try {
    await shootDesktop(browser, 1440, 900, "desktop-1440");
    await shootDesktop(browser, 1920, 1080, "desktop-1920");
    await shootMobile(browser);
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
