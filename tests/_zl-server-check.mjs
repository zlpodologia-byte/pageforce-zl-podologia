// Checks if the ZL landing server is responding on 3000, 3001, 3002, 3003.
const PORTS = [3000, 3001, 3002, 3003];
const PATH = "/lab/zl-podologia";

for (const port of PORTS) {
  try {
    const res = await fetch(`http://localhost:${port}${PATH}`, {
      signal: AbortSignal.timeout(3000),
    });
    const body = await res.text();
    const len = body.length;
    const hasHero = body.toLowerCase().includes("zl podologia");
    console.log(`port ${port}: status=${res.status}, size=${len}, has_marker=${hasHero}`);
  } catch (err) {
    console.log(`port ${port}: error=${err?.message ?? err}`);
  }
}
