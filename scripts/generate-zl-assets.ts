import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  type AssetFileVariants,
  type AssetManifest,
  type AssetManifestEntry,
  type AssetSpec,
  ASSET_OUTPUT_FORMATS,
  OUTPUT_FORMAT_EXTENSION_MAP,
  ZL_ASSET_MANIFEST_RELATIVE_PATH,
  assetManifestSchema,
  buildVariantPublicPath,
  buildVariantRelativePath,
  assertGeneratedSlotAllowed,
  getSlotPolicy,
  zlAssetCatalogV10,
} from "./zl-asset-pipeline";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const manifestPath = resolve(projectRoot, ZL_ASSET_MANIFEST_RELATIVE_PATH);

type PreviousEntryMap = Map<string, AssetManifestEntry>;

function readExistingManifest(): AssetManifest | null {
  if (!existsSync(manifestPath)) {
    return null;
  }

  const raw = readFileSync(manifestPath, "utf8");

  try {
    return assetManifestSchema.parse(JSON.parse(raw));
  } catch {
    console.warn(
      "[zl-v10] Manifest legado detectado. O arquivo sera recriado no schema novo sem reaproveitar metadados antigos."
    );
    return null;
  }
}

function toPreviousEntryMap(manifest: AssetManifest | null): PreviousEntryMap {
  return new Map((manifest?.assets ?? []).map((entry) => [entry.id, entry]));
}

function buildAssetFiles(spec: AssetSpec): AssetFileVariants {
  const variants = Object.fromEntries(
    ASSET_OUTPUT_FORMATS.map((format) => {
      const relativePath = buildVariantRelativePath(spec.category, spec.outputBaseName, format);
      const absolutePath = resolve(projectRoot, relativePath);

      return [
        format,
        {
          format,
          extension: OUTPUT_FORMAT_EXTENSION_MAP[format],
          relativePath,
          publicPath: buildVariantPublicPath(spec.category, spec.outputBaseName, format),
          absolutePath,
          exists: existsSync(absolutePath),
        },
      ];
    })
  );

  return variants as AssetFileVariants;
}

function buildManifestEntry(spec: AssetSpec, previousEntry?: AssetManifestEntry): AssetManifestEntry {
  assertGeneratedSlotAllowed(spec.slot);

  const files = buildAssetFiles(spec);
  const generatedAt = previousEntry?.generation.generatedAt ?? null;
  const generated = files.jpg.exists || files.webp.exists || files.avif.exists;

  return {
    id: spec.id,
    title: spec.title,
    category: spec.category,
    slot: spec.slot,
    slotPolicy: getSlotPolicy(spec.slot),
    ratio: spec.ratio,
    outputBaseName: spec.outputBaseName,
    prompt: spec.prompt,
    notes: previousEntry?.notes ?? spec.notes,
    usage: spec.usage,
    reviewStatus: generated ? "generated" : "ready-for-generation",
    approval: previousEntry?.approval ?? {
      status: "pending",
      approvedBy: null,
      approvedAt: null,
    },
    generation: generated
      ? {
          requested: true,
          status: "generated",
          model: previousEntry?.generation.model ?? null,
          generatedAt,
          blockedReason: null,
        }
      : {
          requested: false,
          status: "awaiting-orchestrator",
          model: null,
          generatedAt,
          blockedReason: null,
        },
    files,
  };
}

function buildManifest(catalog: readonly AssetSpec[], previous: AssetManifest | null): AssetManifest {
  const previousEntries = toPreviousEntryMap(previous);
  const assets = catalog.map((spec) => buildManifestEntry(spec, previousEntries.get(spec.id)));
  const generatedAssets = assets.filter((asset) => asset.reviewStatus === "generated").length;
  const readyForGeneration = assets.filter(
    (asset) => asset.reviewStatus === "ready-for-generation"
  ).length;
  const blockedByPolicy = assets.filter(
    (asset) => asset.reviewStatus === "blocked-by-policy"
  ).length;

  return {
    version: "v10",
    generatedAt: new Date().toISOString(),
    manifestStatus:
      generatedAssets === 0
        ? "planned"
        : generatedAssets === assets.length
          ? "generated"
          : "partially-generated",
    summary: {
      totalAssets: assets.length,
      readyForGeneration,
      blockedByPolicy,
      generatedAssets,
    },
    assets,
  };
}

function ensureManifestDir() {
  mkdirSync(dirname(manifestPath), { recursive: true });
}

async function runOrchestratorAssetGeneration(_manifest: AssetManifest) {
  throw new Error(
    [
      "[zl-v10] O orquestrador ainda nao injetou a chamada real de geracao.",
      "Ponto de injecao: runOrchestratorAssetGeneration() em scripts/generate-zl-assets.ts.",
      "A expectativa aqui e conectar o image tool/modelo mais recente e depois atualizar os arquivos previstos no manifest.",
    ].join(" ")
  );
}

async function main() {
  const previousManifest = readExistingManifest();
  const manifest = buildManifest(zlAssetCatalogV10, previousManifest);

  ensureManifestDir();
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`[zl-v10] Manifest atualizado em ${manifestPath}`);
  console.log(
    `[zl-v10] Catalogo inicial: ${manifest.summary.totalAssets} assets planejados, ${manifest.summary.readyForGeneration} prontos para geracao e ${manifest.summary.generatedAssets} ja materializados.`
  );
  console.log(
    "[zl-v10] Pipeline atual: valida slots, projeta arquivos jpg/webp/avif/lqip e preserva estado de aprovacao/revisao no manifest."
  );
  console.log(
    "[zl-v10] Geracao real continua desligada. O orquestrador deve injetar a chamada do modelo em runOrchestratorAssetGeneration()."
  );

  if (process.env.ZL_ENABLE_GENERATION === "true") {
    await runOrchestratorAssetGeneration(manifest);
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
