import { chromium } from "playwright";

const URL = "http://localhost:3001/lab/zl-podologia";
const OUT_DIR =
  "C:/Users/Yuri/Desktop/Empresas Paperclip/Pageforce 2.0/test-results/zl-evidencias";

async function main() {
  const browser = await chromium.launch();

  // Desktop
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(800);
  const heading = page.locator('h2:has-text("Historias curtas")').first();
  await heading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${OUT_DIR}/zl-v2-desktop-testimonials.jpg`,
    type: "jpeg",
    quality: 85,
  });
  await ctx.close();

  // Mobile
  const mctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const mpage = await mctx.newPage();
  await mpage.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await mpage.waitForTimeout(800);
  const mheading = mpage.locator('h2:has-text("Historias curtas")').first();
  await mheading.scrollIntoViewIfNeeded();
  await mpage.waitForTimeout(400);
  await mpage.screenshot({
    path: `${OUT_DIR}/zl-v2-mobile-testimonials.jpg`,
    type: "jpeg",
    quality: 85,
  });
  await mctx.close();

  await browser.close();
  console.log("saved testimonials");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
