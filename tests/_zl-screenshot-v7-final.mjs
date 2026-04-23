import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const URL = process.env.ZL_URL ?? "http://localhost:3002/lab/zl-podologia";
const OUT_DIR = path.resolve(process.cwd(), "test-results/zl-evidencias");

/*
 * V7-FINAL — Catalogo F oficial + 14 imagens pro + 5 fixes de conversao.
 *
 * Highlights:
 * - Hero com micro-review (Ivia D.) + CTA limpo (Como chegar como link)
 * - Faixa fiduciaria com "Aberto agora" dinamico + urgencia honesta
 * - Explorer com 6 cards na nova ordem (encravada, fungos, ortese, laser,
 *   podoprofilaxia, reflexologia)
 * - Storyteller encravada preservado
 * - Biosseguranca com rotativo-procedimento-pro
 * - Ambiente trio com sala-wide-institucional-pro + escalda-pes-02 (original)
 *   + profissional-contexto-humano-pro
 * - Equipe com profissional-close-autoridade-pro
 * - Pricing com tabela agrupada em 3 buckets + rodape de pacotes
 * - Final CTA com fachada-clinica-pro no topo + "aberto agora" abaixo do CTA
 */

const desktopShots = [
  { name: "v7-final-desktop-full", fullPage: true },
  {
    name: "v7-final-desktop-hero",
    afterAction: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
    },
  },
  {
    name: "v7-final-desktop-fiduciary-bar",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("[aria-label*='Faixa fiduciaria']");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-final-desktop-explorer",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-final-desktop-storyteller",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#storyteller-encravada");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-final-desktop-biosseguranca",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#biosseguranca");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-final-desktop-ambiente",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#ambiente");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-final-desktop-equipe",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#equipe");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-final-desktop-jornada",
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
    name: "v7-final-desktop-quiz",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#quiz");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-final-desktop-faq",
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
    name: "v7-final-desktop-pricing",
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
    name: "v7-final-desktop-final-cta",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#fechar");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
];

const mobileShots = [
  { name: "v7-final-mobile-full", fullPage: true },
  {
    name: "v7-final-mobile-hero",
    afterAction: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
    },
  },
  {
    name: "v7-final-mobile-explorer",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-final-mobile-storyteller",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#storyteller-encravada");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-final-mobile-pricing",
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
    name: "v7-final-mobile-final-cta",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#fechar");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-final-mobile-sticky",
    afterAction: async (page) => {
      await page.evaluate(() => {
        window.scrollTo(0, Math.floor(window.innerHeight * 1.4));
      });
      await page.waitForTimeout(700);
    },
  },
];

async function captureShots(context, shots) {
  for (const shot of shots) {
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(900);
    try {
      if (shot.afterAction) {
        await shot.afterAction(page);
      } else if (shot.selector) {
        await page.$eval(shot.selector, (el) =>
          el.scrollIntoView({ behavior: "instant", block: "start" })
        );
        await page.waitForTimeout(350);
      } else if (shot.scrollY !== undefined) {
        await page.evaluate((y) => window.scrollTo(0, y), shot.scrollY);
        await page.waitForTimeout(300);
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
    }
  }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
    reducedMotion: "reduce",
  });
  await captureShots(desktopContext, desktopShots);
  await desktopContext.close();

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  await captureShots(mobileContext, mobileShots);
  await mobileContext.close();

  await browser.close();
  console.log("saved to", OUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
