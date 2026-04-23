import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "test-results", "zl-evidencias");
const BASE_URL = process.env.ZL_BASE_URL ?? "http://localhost:3001";

function out(name) {
  return join(OUT_DIR, `zl-v7-refine-${name}.png`);
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

async function shootByText(page, name, text, maxOffsetParent = 6) {
  // finds the section ancestor that contains a given paragraph text
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

async function shootDesktopViewport(browser, width, height, tag) {
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
  await page.waitForTimeout(1200);

  await shoot(page, `${tag}-full`, null, { fullPage: true });
  await shoot(page, `${tag}-hero`, null);

  // Faixa fiduciaria
  await shoot(page, `${tag}-fiduciary`, "section[aria-label*='Faixa']");

  // Sintomas — find by text
  await shootByText(page, `${tag}-sintomas`, "comece por aqui");

  // Service explorer
  await shoot(page, `${tag}-explorer`, "#servicos");

  // Storyteller
  await shoot(page, `${tag}-storyteller`, "#storyteller-encravada");

  // Biosseguranca
  await shoot(page, `${tag}-biosseguranca`, "#biosseguranca");

  // Ambiente
  await shoot(page, `${tag}-ambiente`, "#ambiente");

  // Equipe
  await shoot(page, `${tag}-equipe`, "#equipe");

  // Jornada — by eyebrow text
  await shootByText(page, `${tag}-jornada`, "quem passou pela zl");

  // Cases — by eyebrow text
  await shootByText(page, `${tag}-cases`, "prova visual honesta");

  // Pricing — by eyebrow text
  await shootByText(page, `${tag}-pricing`, "valores e clareza");

  // Quiz
  await shoot(page, `${tag}-quiz`, "#quiz");

  // FAQ
  await shootByText(page, `${tag}-faq`, "perguntas frequentes");

  // Final CTA
  await shoot(page, `${tag}-final-cta`, "#fechar");

  // Footer
  await shoot(page, `${tag}-footer`, "footer");

  await ctx.close();
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  try {
    // Desktop: 1024, 1440, 1920 (skipping 375 since that is a mobile width)
    await shootDesktopViewport(browser, 1024, 900, "desktop-1024");
    await shootDesktopViewport(browser, 1440, 900, "desktop-1440");
    await shootDesktopViewport(browser, 1920, 1080, "desktop-1920");

    // Mobile
    const ctxMobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
      reducedMotion: "reduce",
    });
    const pageMobile = await ctxMobile.newPage();
    await pageMobile.goto(`${BASE_URL}/lab/zl-podologia`, {
      waitUntil: "networkidle",
      timeout: 90_000,
    });
    await pageMobile.waitForTimeout(1200);

    await shoot(pageMobile, "mobile-full", null, { fullPage: true });
    await shoot(pageMobile, "mobile-hero", null);

    await pageMobile.$eval("#servicos", (el) =>
      el.scrollIntoView({ block: "start" })
    );
    await pageMobile.waitForTimeout(400);
    await shoot(pageMobile, "mobile-explorer", "#servicos");

    await pageMobile.$eval("#storyteller-encravada", (el) =>
      el.scrollIntoView({ block: "start" })
    );
    await pageMobile.waitForTimeout(400);
    await shoot(pageMobile, "mobile-storyteller", "#storyteller-encravada");

    await pageMobile.$eval("#biosseguranca", (el) =>
      el.scrollIntoView({ block: "start" })
    );
    await pageMobile.waitForTimeout(400);
    await shoot(pageMobile, "mobile-biosseguranca", "#biosseguranca");

    await pageMobile.$eval("#equipe", (el) =>
      el.scrollIntoView({ block: "start" })
    );
    await pageMobile.waitForTimeout(400);
    await shoot(pageMobile, "mobile-equipe", "#equipe");

    // Cases — find section
    await shootByText(pageMobile, "mobile-cases", "prova visual honesta");

    await pageMobile.$eval("#fechar", (el) =>
      el.scrollIntoView({ block: "start" })
    );
    await pageMobile.waitForTimeout(400);
    await shoot(pageMobile, "mobile-final-cta", "#fechar");

    await ctxMobile.close();
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
