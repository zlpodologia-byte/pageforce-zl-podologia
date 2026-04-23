import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const URL = process.env.ZL_URL ?? "http://localhost:3001/lab/zl-podologia";
const OUT_DIR = path.resolve(process.cwd(), "test-results/zl-evidencias");

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  // Desktop topbar
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 120 },
    deviceScaleFactor: 1.5,
    reducedMotion: "reduce",
  });
  const dp = await desktop.newPage();
  await dp.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await dp.waitForTimeout(700);
  await dp.screenshot({
    path: path.join(OUT_DIR, "zl-v6-desktop-topbar-only.jpg"),
    fullPage: false,
    type: "jpeg",
    quality: 82,
  });
  console.log("saved desktop topbar");
  await desktop.close();

  // Mobile topbar
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 120 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  const mp = await mobile.newPage();
  await mp.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await mp.waitForTimeout(700);
  await mp.screenshot({
    path: path.join(OUT_DIR, "zl-v6-mobile-topbar-only.jpg"),
    fullPage: false,
    type: "jpeg",
    quality: 82,
  });
  console.log("saved mobile topbar");
  await mobile.close();

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
