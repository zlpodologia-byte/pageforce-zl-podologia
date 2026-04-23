import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const prohibitedFiles = [
  {
    label: "ZlPodologiaLanding",
    path: resolve(projectRoot, "components", "zl-podologia", "ZlPodologiaLanding.tsx"),
  },
  {
    label: "ZlTopFlowSections",
    path: resolve(projectRoot, "components", "zl-podologia", "ZlTopFlowSections.tsx"),
  },
  {
    label: "ZlTeamSection",
    path: resolve(projectRoot, "components", "zl-podologia", "ZlTeamSection.tsx"),
  },
  {
    label: "ZlCasesSection",
    path: resolve(projectRoot, "components", "zl-podologia", "ZlCasesSection.tsx"),
  },
  {
    label: "ZlNewSections",
    path: resolve(projectRoot, "components", "zl-podologia", "ZlNewSections.tsx"),
  },
  {
    label: "ZlIngrownStoryteller",
    path: resolve(projectRoot, "components", "zl-podologia", "ZlIngrownStoryteller.tsx"),
  },
  {
    label: "ZlLandingSections",
    path: resolve(projectRoot, "components", "zl-podologia", "ZlLandingSections.tsx"),
  },
] as const;

const generatedAssetPattern =
  /["'`](?:[^"'`]*\/)?zl-podologia\/generated\/[^"'`]+["'`]/;

const violations: string[] = [];

for (const file of prohibitedFiles) {
  if (!existsSync(file.path)) {
    continue;
  }

  const source = readFileSync(file.path, "utf8");
  if (generatedAssetPattern.test(source)) {
    violations.push(`${file.label}: ${file.path}`);
  }
}

if (violations.length > 0) {
  console.error(
    [
      "[zl-v10] Politica de imagem violada: assets gerados apareceram em slots proibidos.",
      ...violations.map((item) => `- ${item}`),
    ].join("\n")
  );
  process.exit(1);
}

console.log("[zl-v10] check:image-policy OK");
