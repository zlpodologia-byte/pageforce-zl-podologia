import { chromium } from "playwright";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.ZL_BASE_URL ?? "http://localhost:3043";

function pngDims(path) {
  if (!existsSync(path)) return null;
  const buf = readFileSync(path);
  if (buf.length < 24) return null;
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height, bytes: buf.length };
}

async function measure(width, label) {
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE_URL}/lab/zl-podologia`, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });
    await page.waitForTimeout(1500);
    const metrics = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const h1Computed = h1 ? getComputedStyle(h1) : null;
      const sections = Array.from(document.querySelectorAll("section"));
      const sectionsInfo = sections.map((s) => {
        const rect = s.getBoundingClientRect();
        let name = s.id || s.getAttribute("aria-label") || s.getAttribute("aria-labelledby") || "";
        if (!name) {
          // Find first heading
          const h = s.querySelector("h1, h2, h3, p");
          name = h?.textContent?.trim().slice(0, 40) ?? "(unnamed)";
        }
        return { name, height: Math.round(rect.height) };
      });
      return {
        bodyScrollHeight: document.body.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
        h1FontSize: h1Computed ? h1Computed.fontSize : null,
        h1LineHeight: h1Computed ? h1Computed.lineHeight : null,
        h1FontWeight: h1Computed ? h1Computed.fontWeight : null,
        h1Height: h1 ? h1.getBoundingClientRect().height : null,
        sections: sectionsInfo,
      };
    });
    console.log(`\n[${label ?? width}] Full page height:`, metrics.bodyScrollHeight, "px");
    console.log(`  H1: fs=${metrics.h1FontSize} weight=${metrics.h1FontWeight} h=${Math.round(metrics.h1Height)}px`);
    console.log(`  Sections:`);
    metrics.sections.forEach((s, i) => {
      console.log(`    ${i + 1}. ${s.height}px — ${s.name}`);
    });
    await ctx.close();
  } finally {
    await browser.close();
  }
}

// Print existing screenshot dimensions
const oldFull = join(__dirname, "..", "test-results", "zl-evidencias", "zl-v8-hero-swap-desktop-1440-full.png");
const dims = pngDims(oldFull);
if (dims) console.log("Current zl-v8-hero-swap full.png:", dims);
const oldMerge = join(__dirname, "..", "test-results", "zl-evidencias", "zl-v8-merge-desktop-1440-full.png");
const mergeDims = pngDims(oldMerge);
if (mergeDims) console.log("Baseline zl-v8-merge full.png:", mergeDims);

await measure(1440, "desktop-1440");
