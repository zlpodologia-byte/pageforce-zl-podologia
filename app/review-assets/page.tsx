import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { notFound } from "next/navigation";
import {
  type AssetManifest,
  ZL_ASSET_MANIFEST_RELATIVE_PATH,
  assetManifestSchema,
} from "@/scripts/zl-asset-pipeline";

export const metadata: Metadata = {
  title: "Review de Assets v10 | ZL Podologia",
  description: "Surface interna de revisao do pipeline de assets editoriais da ZL Podologia.",
  robots: {
    index: false,
    follow: false,
  },
};

async function readAssetManifest(): Promise<AssetManifest> {
  const manifestPath = resolve(process.cwd(), ZL_ASSET_MANIFEST_RELATIVE_PATH);
  const raw = await readFile(manifestPath, "utf8");

  return assetManifestSchema.parse(JSON.parse(raw));
}

function formatGenerationStatus(status: AssetManifest["assets"][number]["generation"]["status"]) {
  switch (status) {
    case "awaiting-orchestrator":
      return "Aguardando orquestrador";
    case "generated":
      return "Gerado";
    case "blocked":
      return "Bloqueado";
    default:
      return "Nao solicitado";
  }
}

function toneClassFromStatus(status: AssetManifest["assets"][number]["generation"]["status"]) {
  switch (status) {
    case "generated":
      return "border-emerald-300/50 bg-emerald-100 text-emerald-900";
    case "awaiting-orchestrator":
      return "border-amber-300/60 bg-amber-100 text-amber-950";
    case "blocked":
      return "border-red-300/60 bg-red-100 text-red-900";
    default:
      return "border-stone-300/60 bg-stone-100 text-stone-800";
  }
}

export default async function ReviewAssetsPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_ASSET_REVIEW !== "true") {
    notFound();
  }

  const manifest = await readAssetManifest();

  return (
    <main className="min-h-screen bg-[#f5efe8] px-6 py-10 text-[#2f241d] md:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] border border-[#d8c8bc] bg-white/85 p-6 shadow-[0_24px_80px_rgba(92,62,43,0.08)] backdrop-blur">
          <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#8a6e5c]">
            Review interno
          </p>
          <h1
            className="mt-3 text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.94] text-[#2d2119]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Assets v10 da ZL Podologia
          </h1>
          <p className="mt-4 max-w-[60rem] text-[1rem] leading-[1.65] text-[#5f4c3f]">
            Surface gated para revisar o manifest local do pipeline editorial. Esta pagina nao gera
            imagens: ela so mostra o catalogo, o estado de cada slot permitido e os arquivos
            previstos para o orquestrador materializar.
          </p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.35rem] border border-[#e6d7cb] bg-[#fffaf6] p-4">
              <dt className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8a6e5c]">
                Total
              </dt>
              <dd className="mt-2 text-3xl text-[#2d2119]">{manifest.summary.totalAssets}</dd>
            </div>
            <div className="rounded-[1.35rem] border border-[#e6d7cb] bg-[#fffaf6] p-4">
              <dt className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8a6e5c]">
                Prontos
              </dt>
              <dd className="mt-2 text-3xl text-[#2d2119]">
                {manifest.summary.readyForGeneration}
              </dd>
            </div>
            <div className="rounded-[1.35rem] border border-[#e6d7cb] bg-[#fffaf6] p-4">
              <dt className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8a6e5c]">
                Gerados
              </dt>
              <dd className="mt-2 text-3xl text-[#2d2119]">
                {manifest.summary.generatedAssets}
              </dd>
            </div>
            <div className="rounded-[1.35rem] border border-[#e6d7cb] bg-[#fffaf6] p-4">
              <dt className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8a6e5c]">
                Manifest
              </dt>
              <dd className="mt-2 text-sm leading-6 text-[#5f4c3f]">
                {manifest.manifestStatus} <br />
                {manifest.generatedAt}
              </dd>
            </div>
          </dl>
        </header>

        <section className="mt-8 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {manifest.assets.map((asset) => (
            <article
              key={asset.id}
              className="overflow-hidden rounded-[1.7rem] border border-[#ddcec1] bg-white shadow-[0_20px_70px_rgba(92,62,43,0.08)]"
            >
              <div className="border-b border-[#efe2d8] bg-[linear-gradient(135deg,#f9f2ec_0%,#f4e7dd_100%)] p-5">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] ${toneClassFromStatus(
                      asset.generation.status
                    )}`}
                  >
                    {formatGenerationStatus(asset.generation.status)}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#ddcec1] bg-white px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#6a5446]">
                    {asset.category}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#ddcec1] bg-white px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#6a5446]">
                    {asset.ratio}
                  </span>
                </div>
                <h2
                  className="mt-4 text-[1.7rem] leading-[1.02] text-[#2d2119]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  {asset.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#685445]">
                  <span className="font-medium text-[#3a2d23]">Slot:</span> {asset.slot}
                </p>
                <p className="mt-1 text-sm leading-6 text-[#685445]">
                  <span className="font-medium text-[#3a2d23]">Uso:</span> {asset.usage.section} ·{" "}
                  {asset.usage.purpose}
                </p>
              </div>

              <div className="p-5">
                <div className="rounded-[1.35rem] border border-dashed border-[#d9c8bb] bg-[#faf4ef] p-4">
                  {asset.files.jpg.exists && asset.files.jpg.publicPath ? (
                    <img
                      src={asset.files.jpg.publicPath}
                      alt={asset.title}
                      className="h-52 w-full rounded-[1rem] object-cover"
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,#efe2d8_0%,#e8d5c7_100%)] px-6 text-center text-sm leading-6 text-[#7a6455]">
                      Preview indisponivel. O pipeline so materializa a imagem quando o orquestrador
                      injeta a geracao.
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8a6e5c]">
                    Prompt base
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#5f4c3f]">
                    {asset.prompt ?? "Prompt ainda nao definido."}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8a6e5c]">
                    Outputs previstos
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[#5f4c3f]">
                    {Object.entries(asset.files).map(([format, file]) => (
                      <li key={format} className="rounded-[1rem] border border-[#efe2d8] bg-[#fffaf6] px-3 py-2">
                        <span className="font-medium text-[#3a2d23]">{format.toUpperCase()}</span>{" "}
                        · {file.relativePath.replace("public\\", "").replace("public/", "")}
                        <span className="ml-2 text-[#8a6e5c]">
                          {file.exists ? "existente" : "previsto"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.1rem] border border-[#efe2d8] bg-[#fffaf6] p-3">
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8a6e5c]">
                      Aprovacao
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#5f4c3f]">
                      {asset.approval.status}
                      {asset.approval.approvedBy ? ` · ${asset.approval.approvedBy}` : ""}
                    </p>
                  </div>
                  <div className="rounded-[1.1rem] border border-[#efe2d8] bg-[#fffaf6] p-3">
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8a6e5c]">
                      Notas
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#5f4c3f]">
                      {asset.notes ?? "Sem nota adicional."}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
