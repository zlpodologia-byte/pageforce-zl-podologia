import { test, expect } from "@playwright/test";

/**
 * Smoke test: does the WebGL context stay alive for 2 s without any screenshots
 * or evaluate() calls? Pure observation via console logs, no page interaction.
 */
test("jelly-gl smoketest — context survives without screenshot/evaluate", async ({
  page,
}) => {
  const browserLogs: string[] = [];
  page.on("console", (msg) => {
    browserLogs.push(`[${msg.type()}] ${msg.text()}`);
  });
  page.on("pageerror", (err) =>
    browserLogs.push(`[PAGEERROR] ${err.message}`),
  );

  await page.goto("http://127.0.0.1:3001/lab/jelly-gl");
  await page.waitForLoadState("networkidle");

  // Just wait. No screenshot, no evaluate, no mouse move. See if context lives.
  await page.waitForTimeout(2000);

  console.log("logs:");
  for (const l of browserLogs) console.log(" ", l);

  const lost = browserLogs.some((l) =>
    l.includes("CONTEXT_LOST") || l.includes("context LOST"),
  );
  expect(lost, "WebGL context was lost without any test interaction").toBe(
    false,
  );
});
