import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const contentPath = resolve(
  projectRoot,
  "components",
  "zl-podologia",
  "zlPodologiaContent.ts"
);

const content = readFileSync(contentPath, "utf8");

const sacredPairs = [
  ["Podoprofilaxia", "A partir de R$ 100 no Pix ou dinheiro"],
  ["Protocolo Podoprofilaxia + Reflexologia", "R$ 180"],
  ["Desbaste de calos (isolado)", "R$ 100"],
  ["Hidratacao de parafina", "R$ 100"],
  ["Triagem previa no WhatsApp", "Sem cobranca isolada"],
  ["Unha encravada (onicocriptose) - Grau 1", "A partir de R$ 150"],
  ["Unha encravada (onicocriptose) - Graus 2 e 3", "A partir de R$ 200"],
  ["Tratamento de fungos (onicomicose)", "R$ 100 por unha por sessao"],
  ["Verruga plantar", "A partir de R$ 100"],
  ["Tungiase (Bicho de pe)", "R$ 100,00"],
  ["Atendimento para idosos", "R$ 100 a R$ 180"],
  ["Ortese simples", "R$ 60 por unha"],
  ["Ortese metalica", "R$ 100 por unha"],
  ["Laserterapia", "R$ 100"],
  ["Tratamento avancado de fungos", "R$ 100 por sessao"],
  ["Reflexologia podal", "R$ 80 a R$ 150"],
  ["Massagem terapeutica", "R$ 100 a R$ 150"],
  ["Pe diabetico", "R$ 120"],
] as const;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeCatalogText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C");
}

const normalizedContent = normalizeCatalogText(content);

const missingPairs = sacredPairs.filter(([label, price]) => {
  const pattern = new RegExp(
    `label:\\s*"${escapeRegExp(label)}"[\\s\\S]{0,180}?price:\\s*"${escapeRegExp(
      price
    )}"`,
    "m"
  );

  return !pattern.test(normalizedContent);
});

if (missingPairs.length > 0) {
  console.error(
    [
      "[zl-v10] Catalogo sagrado violado: pares label/price nao encontrados em zlPodologiaContent.ts.",
      ...missingPairs.map(([label, price]) => `- ${label} => ${price}`),
    ].join("\n")
  );
  process.exit(1);
}

console.log(`[zl-v10] check:sacred-catalog OK (${sacredPairs.length} pares)`);
