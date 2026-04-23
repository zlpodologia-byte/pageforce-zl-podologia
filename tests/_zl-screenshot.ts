import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const URL = process.env.ZL_URL ?? "http://localhost:3001/lab/zl-podologia";
const OUT_DIR = path.resolve(process.cwd(), "test-results/zl-evidencias");

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  // Desktop
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
    reducedMotion: "reduce",
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await desktopPage.waitForTimeout(1500);
  await desktopPage.screenshot({
    path: path.join(OUT_DIR, "zl-desktop.jpg"),
    fullPage: true,
    type: "jpeg",
    quality: 80,
  });
  await desktopPage.evaluate(() => window.scrollTo(0, 0));
  await desktopPage.screenshot({
    path: path.join(OUT_DIR, "zl-desktop-hero.jpg"),
    type: "jpeg",
    quality: 85,
  });
  // Service explorer section - desktop mid view
  await desktopPage.evaluate(() => {
    const target = document.querySelectorAll("section")[4];
    target?.scrollIntoView({ behavior: "instant" });
  });
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({
    path: path.join(OUT_DIR, "zl-desktop-services.jpg"),
    type: "jpeg",
    quality: 85,
  });
  console.log("desktop ok");
  await desktopContext.close();

  // Mobile
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({
    path: path.join(OUT_DIR, "zl-mobile.jpg"),
    fullPage: true,
    type: "jpeg",
    quality: 80,
  });
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.screenshot({
    path: path.join(OUT_DIR, "zl-mobile-hero.jpg"),
    type: "jpeg",
    quality: 85,
  });
  // Scrolled mobile view (shows sticky CTA)
  await mobilePage.evaluate(() => window.scrollTo(0, window.innerHeight * 1.2));
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({
    path: path.join(OUT_DIR, "zl-mobile-scrolled.jpg"),
    type: "jpeg",
    quality: 85,
  });
  console.log("mobile ok");
  await mobileContext.close();
  await browser.close();
  console.log("saved to", OUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

