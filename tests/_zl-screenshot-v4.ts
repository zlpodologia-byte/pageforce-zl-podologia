import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const URL = process.env.ZL_URL ?? "http://localhost:3001/lab/zl-podologia";
const OUT_DIR = path.resolve(process.cwd(), "test-results/zl-evidencias");

type Shot = {
  name: string;
  selector?: string;
  scrollY?: number;
  fullPage?: boolean;
  afterAction?: (page: import("playwright").Page) => Promise<void>;
};

// Focus of the v4 pass: dados reais da operacao
// - Equipe com Zulcarina + Jannie
// - Jornada do Heroi com reviews reais do Google (Ivia / Jarlon)
// - Endereco com landmark "Galeria Jose Bernardo"
const desktopShots: Shot[] = [
  { name: "v4-desktop-full", fullPage: true },
  { name: "v4-desktop-hero", selector: "section" },
  {
    name: "v4-desktop-team",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll("h2"));
        const match = headings.find((h) =>
          (h.textContent ?? "").toLowerCase().includes("zulcarina")
        );
        if (match) {
          match.scrollIntoView({ behavior: "instant", block: "start" });
        }
      });
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v4-desktop-journey",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll("h2"));
        const match = headings.find((h) =>
          (h.textContent ?? "").toLowerCase().includes("historias curtas")
        );
        if (match) {
          match.scrollIntoView({ behavior: "instant", block: "start" });
        }
      });
      await page.waitForTimeout(500);
    },
  },
  { name: "v4-desktop-final-cta", selector: "#fechar" },
];

const mobileShots: Shot[] = [
  { name: "v4-mobile-full", fullPage: true },
  {
    name: "v4-mobile-team",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll("h2"));
        const match = headings.find((h) =>
          (h.textContent ?? "").toLowerCase().includes("zulcarina")
        );
        if (match) {
          match.scrollIntoView({ behavior: "instant", block: "start" });
        }
      });
      await page.waitForTimeout(500);
    },
  },
  {
    name: "v4-mobile-journey",
    afterAction: async (page) => {
      await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll("h2"));
        const match = headings.find((h) =>
          (h.textContent ?? "").toLowerCase().includes("historias curtas")
        );
        if (match) {
          match.scrollIntoView({ behavior: "instant", block: "start" });
        }
      });
      await page.waitForTimeout(500);
    },
  },
  { name: "v4-mobile-final-cta", selector: "#fechar" },
];

async function captureShots(
  context: import("playwright").BrowserContext,
  shots: Shot[]
) {
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

      const filename = path.join(OUT_DIR, `zl-${shot.name}.jpg`);
      await page.screenshot({
        path: filename,
        fullPage: !!shot.fullPage,
        type: "jpeg",
        quality: 80,
      });
      console.log("saved", filename);
    } catch (err) {
      console.warn("skip", shot.name, (err as Error).message);
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
