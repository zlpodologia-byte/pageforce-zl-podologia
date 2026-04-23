import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const URL = process.env.ZL_URL ?? "http://localhost:3002/lab/zl-podologia";
const OUT_DIR = path.resolve(process.cwd(), "test-results/zl-evidencias");

/*
 * V7-VFIX — refino visual sobre v7-final.
 *
 * Cobre:
 * - Bloco A: fotos reais substituem SVGs de Ortese, Laser e Pe diabetico.
 * - Bloco B: whitespace lateral eliminado em 9 secoes.
 *
 * Sufixos: zl-v7-vfix-<secao>-<desktop|mobile>
 */

const desktopShots = [
  { name: "v7-vfix-desktop-full", fullPage: true },
  {
    name: "v7-vfix-desktop-hero",
    afterAction: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
    },
  },
  {
    name: "v7-vfix-desktop-trust",
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
    name: "v7-vfix-desktop-symptoms",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#sintomas");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-vfix-desktop-explorer-orthosis",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
      // Click Ortese tab.
      const buttons = await page.locator("button[aria-pressed]").all();
      for (const b of buttons) {
        const txt = ((await b.textContent()) ?? "").toLowerCase();
        if (txt.includes("ortese")) {
          await b.click({ force: true });
          break;
        }
      }
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-vfix-desktop-explorer-laser",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
      const buttons = await page.locator("button[aria-pressed]").all();
      for (const b of buttons) {
        const txt = ((await b.textContent()) ?? "").toLowerCase();
        if (txt.includes("laserterapia")) {
          await b.click({ force: true });
          break;
        }
      }
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-vfix-desktop-biosseguranca",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#biosseguranca");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-vfix-desktop-ambiente",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#ambiente");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-vfix-desktop-equipe",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#equipe");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-vfix-desktop-jornada",
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
    name: "v7-vfix-desktop-pricing",
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
    name: "v7-vfix-desktop-faq",
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
    name: "v7-vfix-desktop-storyteller",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#storyteller-encravada");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-vfix-desktop-final-cta",
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
  { name: "v7-vfix-mobile-full", fullPage: true },
  {
    name: "v7-vfix-mobile-hero",
    afterAction: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
    },
  },
  {
    name: "v7-vfix-mobile-trust",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const h2s = Array.from(document.querySelectorAll("h2"));
        const match = h2s.find((h) =>
          (h.textContent ?? "").toLowerCase().includes("antes mesmo")
        );
        if (match) match.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
    },
  },
  {
    name: "v7-vfix-mobile-explorer-orthosis",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
      const buttons = await page.locator("button[aria-pressed]").all();
      for (const b of buttons) {
        const txt = ((await b.textContent()) ?? "").toLowerCase();
        if (txt.includes("ortese")) {
          await b.click({ force: true });
          break;
        }
      }
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-vfix-mobile-explorer-laser",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#servicos");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(400);
      const buttons = await page.locator("button[aria-pressed]").all();
      for (const b of buttons) {
        const txt = ((await b.textContent()) ?? "").toLowerCase();
        if (txt.includes("laserterapia")) {
          await b.click({ force: true });
          break;
        }
      }
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v7-vfix-mobile-pricing",
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
    name: "v7-vfix-mobile-faq",
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
    name: "v7-vfix-mobile-final-cta",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const el = document.querySelector("#fechar");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await page.waitForTimeout(600);
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

await main().catch((err) => {
  console.error(err);
});
