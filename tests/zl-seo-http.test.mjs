import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const HOST = "127.0.0.1";
const PORT = 3017;
const ORIGIN = `http://${HOST}:${PORT}`;
const CANONICAL_ORIGIN = "https://www.zlpodologia.com.br";

function extractLocations(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

async function waitUntilReady(child, output) {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`next start encerrou antes de responder.\n${output.join("")}`);
    }
    try {
      const response = await fetch(`${ORIGIN}/`, { redirect: "manual" });
      if (response.status === 200) return;
    } catch {
      // O servidor ainda está iniciando.
    }
    await delay(250);
  }
  throw new Error(`Timeout aguardando ${ORIGIN}.\n${output.join("")}`);
}

async function fetchManual(pathname) {
  return fetch(`${ORIGIN}${pathname}`, { redirect: "manual" });
}

async function stopChild(child) {
  if (child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    delay(5_000).then(() => {
      if (child.exitCode === null) child.kill("SIGKILL");
    }),
  ]);
}

const nextCli = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);
const child = spawn(
  process.execPath,
  [nextCli, "start", "--hostname", HOST, "--port", String(PORT)],
  {
    cwd: process.cwd(),
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  },
);
const output = [];
child.stdout.on("data", (chunk) => output.push(chunk.toString()));
child.stderr.on("data", (chunk) => output.push(chunk.toString()));

try {
  await waitUntilReady(child, output);

  const llmsResponse = await fetchManual("/llms.txt");
  assert.equal(llmsResponse.status, 200);
  assert.match(llmsResponse.headers.get("content-type") ?? "", /text\/plain/i);
  const llms = await llmsResponse.text();
  assert.equal((llms.match(/^### Pergunta/gm) ?? []).length, 500);
  assert.doesNotMatch(llms, /<!doctype html|<html/i);

  const robotsResponse = await fetchManual("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  assert.match(robotsResponse.headers.get("content-type") ?? "", /text\/plain/i);

  const sitemapResponse = await fetchManual("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(
    sitemapResponse.headers.get("content-type") ?? "",
    /application\/xml|text\/xml/i,
  );
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /^<\?xml[^>]*>/);
  assert.match(sitemap, /<urlset[^>]*>[\s\S]*<\/urlset>/);
  const locations = extractLocations(sitemap);
  assert.equal(locations.length, 12);

  for (const location of locations) {
    const canonicalUrl = new URL(location);
    assert.equal(canonicalUrl.origin, CANONICAL_ORIGIN);
    const routeResponse = await fetchManual(canonicalUrl.pathname);
    assert.equal(
      routeResponse.status,
      200,
      `${canonicalUrl.pathname} deveria responder 200 sem redirect`,
    );
    const xRobotsTag = routeResponse.headers.get("x-robots-tag") ?? "";
    assert.doesNotMatch(xRobotsTag, /noindex|nofollow/i);
    const html = await routeResponse.text();
    const canonicalMatch = html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i,
    );
    assert.ok(canonicalMatch, `Canonical ausente em ${canonicalUrl.pathname}`);
    const expectedCanonical =
      canonicalUrl.pathname === "/" ? CANONICAL_ORIGIN : location;
    assert.equal(canonicalMatch[1], expectedCanonical);
  }

  console.log(
    JSON.stringify({
      status: "ok",
      llmsQuestions: 500,
      sitemapUrls: locations.length,
      checkedRoutes: locations.length,
    }),
  );
} finally {
  await stopChild(child);
}
