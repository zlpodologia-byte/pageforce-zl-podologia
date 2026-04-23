import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "test-results", "zl-evidencias");
const BASE_URL = process.env.ZL_BASE_URL ?? "http://localhost:3002";

function out(name) {
  return join(OUT_DIR, `zl-v7a-${name}.png`);
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

async function run() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  try {
    // ------------------------------------------------------------------
    // Desktop 1440x900
    // ------------------------------------------------------------------
    const ctxDesktop = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const pageDesktop = await ctxDesktop.newPage();
    await pageDesktop.goto(`${BASE_URL}/lab/zl-podologia`, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });
    await pageDesktop.waitForTimeout(1200);

    await shoot(pageDesktop, "desktop-full", null, { fullPage: true });
    await shoot(pageDesktop, "desktop-hero", null);

    // Fiduciary bar — look for section after hero
    await pageDesktop.evaluate(() =>
      window.scrollTo(0, document.querySelector("section[aria-label*='Faixa']")?.offsetTop ?? 800)
    );
    await pageDesktop.waitForTimeout(600);
    await shoot(
      pageDesktop,
      "desktop-fiduciary-bar",
      "section[aria-label*='Faixa']"
    );

    await shoot(pageDesktop, "desktop-explorer", "#servicos");
    await shoot(
      pageDesktop,
      "desktop-storyteller",
      "#storyteller-encravada"
    );
    await shoot(pageDesktop, "desktop-biosseguranca", "#biosseguranca");
    await shoot(pageDesktop, "desktop-ambiente", "#ambiente");
    await shoot(pageDesktop, "desktop-equipe", "#equipe");

    // Jornada do heroi — find by text content
    const jornadaHandle = await pageDesktop.evaluateHandle(() => {
      const spans = Array.from(document.querySelectorAll("p"));
      const eyebrow = spans.find((s) =>
        (s.textContent || "").toLowerCase().includes("quem passou pela zl")
      );
      return eyebrow ? eyebrow.closest("section") : null;
    });
    try {
      await jornadaHandle.asElement()?.scrollIntoViewIfNeeded();
      await pageDesktop.waitForTimeout(350);
      await jornadaHandle.asElement()?.screenshot({
        path: out("desktop-jornada"),
      });
      console.log("[zl-shoot] OK desktop-jornada");
    } catch {
      console.warn("[zl-shoot] desktop-jornada skipped");
    }

    // Quiz — steps
    await pageDesktop.$eval("#quiz", (el) =>
      el.scrollIntoView({ block: "start" })
    );
    await pageDesktop.waitForTimeout(500);
    await shoot(pageDesktop, "desktop-quiz-step1", "#quiz");
    // Click first option of first question (dor)
    await pageDesktop.click("#quiz button[aria-pressed='false']");
    await pageDesktop.waitForTimeout(300);
    await shoot(pageDesktop, "desktop-quiz-step2", "#quiz");
    await pageDesktop.click("#quiz button[aria-pressed='false']");
    await pageDesktop.waitForTimeout(300);
    await shoot(pageDesktop, "desktop-quiz-step3", "#quiz");
    await pageDesktop.click("#quiz button[aria-pressed='false']");
    await pageDesktop.waitForTimeout(400);
    await shoot(pageDesktop, "desktop-quiz-result", "#quiz");

    // FAQ
    const faqHandle = await pageDesktop.evaluateHandle(() => {
      const p = Array.from(document.querySelectorAll("p")).find((s) =>
        (s.textContent || "")
          .toLowerCase()
          .includes("perguntas frequentes")
      );
      return p ? p.closest("section") : null;
    });
    try {
      await faqHandle.asElement()?.scrollIntoViewIfNeeded();
      await pageDesktop.waitForTimeout(350);
      await faqHandle.asElement()?.screenshot({
        path: out("desktop-faq"),
      });
      console.log("[zl-shoot] OK desktop-faq");
    } catch {
      console.warn("[zl-shoot] desktop-faq skipped");
    }

    // Final CTA
    await shoot(pageDesktop, "desktop-final-cta", "#fechar");
    // Footer
    await shoot(pageDesktop, "desktop-footer", "footer");

    await ctxDesktop.close();

    // ------------------------------------------------------------------
    // Mobile 390x844
    // ------------------------------------------------------------------
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
      timeout: 60_000,
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
    await shoot(
      pageMobile,
      "mobile-storyteller",
      "#storyteller-encravada"
    );

    await pageMobile.$eval("#biosseguranca", (el) =>
      el.scrollIntoView({ block: "start" })
    );
    await pageMobile.waitForTimeout(400);
    await shoot(pageMobile, "mobile-biosseguranca", "#biosseguranca");

    await pageMobile.$eval("#fechar", (el) =>
      el.scrollIntoView({ block: "start" })
    );
    await pageMobile.waitForTimeout(400);
    await shoot(pageMobile, "mobile-final-cta", "#fechar");

    // Sticky
    await pageMobile.evaluate(() => window.scrollTo(0, 2000));
    await pageMobile.waitForTimeout(600);
    await shoot(pageMobile, "mobile-sticky-cta", null);

    await ctxMobile.close();

    // ------------------------------------------------------------------
    // Politica de imagens
    // ------------------------------------------------------------------
    const ctxPolitica = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const pagePolitica = await ctxPolitica.newPage();
    await pagePolitica.goto(
      `${BASE_URL}/lab/zl-podologia/politica-de-imagens`,
      {
        waitUntil: "networkidle",
        timeout: 60_000,
      }
    );
    await pagePolitica.waitForTimeout(600);
    await shoot(pagePolitica, "politica-de-imagens", null, {
      fullPage: true,
    });
    await ctxPolitica.close();
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
