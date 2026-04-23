// Starts a standalone Next.js server on the given port using the
// production build, and runs the screenshot capture script against it.
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const PORT = process.env.PORT ?? "3005";
const URL_BASE = `http://127.0.0.1:${PORT}`;
const OUT_DIR = path.resolve(process.cwd(), "test-results/zl-evidencias");

import net from "node:net";
async function waitForPort(port, timeoutMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const ok = await new Promise((resolve) => {
      const socket = net.createConnection({ port, host: "127.0.0.1" });
      socket.once("connect", () => {
        socket.end();
        resolve(true);
      });
      socket.once("error", () => {
        resolve(false);
      });
      setTimeout(() => {
        socket.destroy();
        resolve(false);
      }, 2000);
    });
    if (ok) return true;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

// Use node directly to invoke next.js start to avoid Windows npm.cmd
// spawn issues. Bin resolved via require.resolve for robustness.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const serverProc = spawn(
  process.execPath,
  [nextBin, "start", "-p", PORT, "-H", "127.0.0.1"],
  {
    cwd: process.cwd(),
    env: { ...process.env, PORT, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
  }
);
serverProc.on("exit", (code, signal) => {
  console.log(`[srv] exited code=${code} signal=${signal}`);
});
serverProc.on("error", (err) => {
  console.log(`[srv] error ${err?.message ?? err}`);
});

serverProc.stdout.on("data", (d) => process.stdout.write(`[srv] ${d}`));
serverProc.stderr.on("data", (d) => process.stderr.write(`[srv-err] ${d}`));

const ready = await waitForPort(Number(PORT), 120000);
if (!ready) {
  console.error("server did not become ready in time");
  serverProc.kill();
  process.exit(1);
}
console.log(`server port ready on ${URL_BASE}`);

// Give the server a moment to settle before navigating with Playwright.
await new Promise((r) => setTimeout(r, 3000));

// Test an actual fetch to verify the server is responding.
try {
  const testRes = await fetch(`${URL_BASE}/lab/zl-podologia`);
  console.log(`[precheck] status=${testRes.status}, size=${(await testRes.text()).length}`);
} catch (err) {
  console.error(`[precheck] fetch failed: ${err?.message ?? err}`);
}

// Load and run the screenshot script against this URL.
process.env.ZL_URL = `${URL_BASE}/lab/zl-podologia`;
try {
  await import("./_zl-screenshot-v7-vfix.mjs");
} finally {
  serverProc.kill();
  // Give the server a chance to exit cleanly.
  await new Promise((r) => setTimeout(r, 500));
}
