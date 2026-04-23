import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "test-results", "zl-evidencias");
const BASE_URL = process.env.ZL_BASE_URL ?? "http://localhost:3030";

function out(name) {
  return join(OUT_DIR, `zl-v8-merge-${name}.png`);
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

  // Full + hero
  await shoot(page, `${tag}-full`, null, { fullPage: true });
  await shoot(page, `${tag}-hero`, null);

  // v8-merge novas secoes
  await shoot(
    page,
    `${tag}-proof-strip`,
    "section[aria-label*='prova editorial']"
  );
  await shoot(
    page,
    `${tag}-comparativa`,
    "#comparativa"
  );

  // ExactScene-wrapped sections
  await shoot(page, `${tag}-storyteller`, "#storyteller-encravada");
  await shoot(page, `${tag}-ambiente`, "#ambiente");
  await shoot(page, `${tag}-equipe`, "#equipe");
  await shootByText(page, `${tag}-cases`, "prova visual honesta");

  // Outros mantidos
  await shoot(
    page,
    `${tag}-fiduciary`,
    "section[aria-label*='Faixa fiduciaria']"
  );
  await shoot(page, `${tag}-biosseguranca`, "#biosseguranca");
  await shoot(page, `${tag}-explorer`, "#servicos");
  await shootByText(page, `${tag}-pricing`, "valores e clareza");
  await shoot(page, `${tag}-final-cta`, "#fechar");

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

  await shoot(page, "mobile-full", null, { fullPage: true });
  await shoot(page, "mobile-hero", null);

  await shoot(
    page,
    "mobile-proof-strip",
    "section[aria-label*='prova editorial']"
  );
  await shoot(page, "mobile-comparativa", "#comparativa");
  await shoot(page, "mobile-storyteller", "#storyteller-encravada");
  await shootByText(page, "mobile-cases", "prova visual honesta");

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
