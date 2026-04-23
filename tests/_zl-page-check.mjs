// Diagnoses which version of the ZL landing the 3002 server is running.
const PORT = process.argv[2] ?? "3002";
const res = await fetch(`http://localhost:${PORT}/lab/zl-podologia`);
const html = await res.text();
console.log(`status=${res.status}, size=${html.length}`);
// Look for v7-vfix markers we just added.
const markers = [
  { name: "orthosis photo (aplicador-transparente-pro)", match: "aplicador-transparente-pro" },
  { name: "laser photo (profissional-exame-frontal-pro)", match: "profissional-exame-frontal-pro" },
  { name: "diabetic photo (pos-cuidado-curativo-pro)", match: "pos-cuidado-curativo-pro" },
  { name: "trust points grid 3-col marker", match: "zlTrustPoints" },
  { name: "pricing education horizontal marker", match: "Podologia explicada" },
];
for (const m of markers) {
  const has = html.includes(m.match);
  console.log(`${has ? "YES" : "NO "} ${m.name}`);
}
