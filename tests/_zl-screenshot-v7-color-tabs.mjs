import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const URL = process.env.ZL_URL ?? "http://localhost:3000/lab/zl-podologia";
const OUT_DIR = path.resolve(process.cwd(), "test-results/zl-evidencias");

/*
 * V7-COLOR-TABS — refino visual sobre v7-refine.
 *
 * Cobre:
 *  - BLOCO A: Equipe revertida (Zulcarina com foto pro, Jannie placeholder)
 *  - BLOCO B: Paleta azul bebe — rose/salmao substituidos
 *  - BLOCO C: Abas internas no Service Explorer (atendimento/protocolo/agendar)
 *  - BLOCO D: Pass final de whitespace
 *
 * Sufixos: zl-v7-color-tabs-<secao>-<desktop|mobile>[-<state>]
 */

async function clickServiceTab(page, label) {
  // Tabs do ServiceExplorer sao os botoes com aria-pressed dentro de #servicos.
  const buttons = await page.locator("#servicos button[aria-pressed]").all();
  for (const b of buttons) {
    const txt = ((await b.textContent()) ?? "").toLowerCase();
    if (txt.includes(label.toLowerCase())) {
      await b.click({ force: true });
      return true;
    }
  }
  return false;
}

async function clickInternalTab(page, label) {
  // Tabs internas (role=tab) dentro do card ativo.
  const tabs = await page.locator('#servicos [role="tab"]').all();
  for (const t of tabs) {
    const txt = ((await t.textContent()) ?? "").toLowerCase();
    if (txt.includes(label.toLowerCase())) {
      await t.click({ force: true });
      return true;
    }
  }
  return false;
}

const desktopShots = [
  {
    name: "v7-color-tabs-desktop-full",
    fullPage: true,
  },
  {
    name: "v7-color-tabs-desktop-hero",
    afterAction: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
    },
  },
  {
    name: "v7-color-tabs-desktop-fiduciary",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector('[aria-label*="Faixa fiduciaria"]');
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-color-tabs-desktop-trust",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const h2s = Array.from(document.querySelectorAll("h2"));
        const match = h2s.find((h) =>
          (h.textContent ?? "").toLowerCase().includes("antes mesmo")
        );
        if (match) match.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(700);
    },
  },
  {
    name: "v7-color-tabs-desktop-symptoms",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#sintomas");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  // Foco especial: 3 estados das abas internas do Service Explorer
  // sobre o mesmo servico (Unha encravada = default).
  {
    name: "v7-color-tabs-desktop-explorer-ingrown-tab-atendimento",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
      await clickServiceTab(page, "unha encravada");
      await page.waitForTimeout(300);
      await clickInternalTab(page, "atendimento");
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-color-tabs-desktop-explorer-ingrown-tab-protocolo",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
      await clickServiceTab(page, "unha encravada");
      await page.waitForTimeout(300);
      await clickInternalTab(page, "protocolo");
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-color-tabs-desktop-explorer-ingrown-tab-agendar",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
      await clickServiceTab(page, "unha encravada");
      await page.waitForTimeout(300);
      await clickInternalTab(page, "preco");
      await page.waitForTimeout(500);
    },
  },
  // Outros servicos para ver as tabs com sub-variantes
  {
    name: "v7-color-tabs-desktop-explorer-podoprofilaxia",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
      await clickServiceTab(page, "podoprofilaxia");
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-color-tabs-desktop-explorer-laser",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
      await clickServiceTab(page, "laserterapia");
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-color-tabs-desktop-storyteller",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#storyteller-encravada");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-color-tabs-desktop-biosseguranca",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#biosseguranca");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-color-tabs-desktop-ambiente",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#ambiente");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-color-tabs-desktop-equipe",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#equipe");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-color-tabs-desktop-jornada",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const h2s = Array.from(document.querySelectorAll("h2"));
        const match = h2s.find((h) =>
          (h.textContent ?? "").toLowerCase().includes("historias curtas")
        );
        if (match) match.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-color-tabs-desktop-cases",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const h2s = Array.from(document.querySelectorAll("h2"));
        const match = h2s.find((h) =>
          (h.textContent ?? "").toLowerCase().includes("antes e depois entra")
        );
        if (match) match.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-color-tabs-desktop-pricing",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const h2s = Array.from(document.querySelectorAll("h2"));
        const match = h2s.find((h) =>
          (h.textContent ?? "").toLowerCase().includes("precificacao oficial")
        );
        if (match) match.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-color-tabs-desktop-quiz",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#quiz");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-color-tabs-desktop-faq",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const h2s = Array.from(document.querySelectorAll("h2"));
        const match = h2s.find((h) =>
          (h.textContent ?? "").toLowerCase().includes("perguntam antes")
        );
        if (match) match.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-color-tabs-desktop-final-cta",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#fechar");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  // Desktop 1920 wide
  {
    name: "v7-color-tabs-desktop-1920-hero",
    viewport: { width: 1920, height: 1080 },
    afterAction: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-color-tabs-desktop-1920-explorer",
    viewport: { width: 1920, height: 1080 },
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-color-tabs-desktop-1920-equipe",
    viewport: { width: 1920, height: 1080 },
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#equipe");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(500);
    },
  },
];

const mobileShots = [
  { name: "v7-color-tabs-mobile-full", fullPage: true },
  {
    name: "v7-color-tabs-mobile-hero",
    afterAction: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
    },
  },
  {
    name: "v7-color-tabs-mobile-explorer-ingrown-tab-atendimento",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
      await clickServiceTab(page, "unha encravada");
      await page.waitForTimeout(300);
      await clickInternalTab(page, "atendimento");
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-color-tabs-mobile-explorer-ingrown-tab-protocolo",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
      await clickServiceTab(page, "unha encravada");
      await page.waitForTimeout(300);
      await clickInternalTab(page, "protocolo");
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-color-tabs-mobile-explorer-ingrown-tab-agendar",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
      await clickServiceTab(page, "unha encravada");
      await page.waitForTimeout(300);
      await clickInternalTab(page, "preco");
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-color-tabs-mobile-equipe",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#equipe");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-color-tabs-mobile-pricing",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const h2s = Array.from(document.querySelectorAll("h2"));
        const match = h2s.find((h) =>
          (h.textContent ?? "").toLowerCase().includes("precificacao oficial")
        );
        if (match) match.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-color-tabs-mobile-quiz",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#quiz");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-color-tabs-mobile-faq",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const h2s = Array.from(document.querySelectorAll("h2"));
        const match = h2s.find((h) =>
          (h.textContent ?? "").toLowerCase().includes("perguntam antes")
        );
        if (match) match.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-color-tabs-mobile-final-cta",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#fechar");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
];

async function captureShots(browser, baseContextOpts, shots) {
  for (const shot of shots) {
    const ctxOpts = { ...baseContextOpts };
    if (shot.viewport) ctxOpts.viewport = shot.viewport;
    const context = await browser.newContext(ctxOpts);
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(900);
    try {
      if (shot.afterAction) {
        await shot.afterAction(page);
      }
      const filename = path.join(OUT_DIR, `zl-${shot.name}.png`);
      await page.screenshot({
        path: filename,
        fullPage: !!shot.fullPage,
        type: "png",
      });
      console.log("saved", filename);
    } catch (err) {
      console.warn("skip", shot.name, err?.message ?? err);
    } finally {
      await page.close();
      await context.close();
    }
  }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  await captureShots(
    browser,
    {
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1.5,
      reducedMotion: "reduce",
    },
    desktopShots
  );

  await captureShots(
    browser,
    {
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    },
    mobileShots
  );

  await browser.close();
  console.log("saved to", OUT_DIR);
}

await main().catch((err) => {
  console.error(err);
  process.exit(1);
});
