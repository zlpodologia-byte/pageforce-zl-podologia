import { copyFileSync, existsSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { loadZlSeoIntents, loadZlSeoStaticData } from "../lib/zl-seo/load-data";
import { renderLlmsText } from "../lib/zl-seo/llms-renderer";
import { CATEGORY_COUNTS, EXPECTED_INTENT_TOTAL } from "../lib/zl-seo/schema";
import { validateIntentCollection } from "../lib/zl-seo/validation";
import { PUBLIC_STATIC_ROUTES, absoluteSiteUrl } from "../lib/site";

const intents = loadZlSeoIntents();
const staticData = loadZlSeoStaticData();
const issues = validateIntentCollection({
  intents,
  internalSources: staticData.internalSources,
  officialSources: staticData.officialSources,
  canonicalRoutes: PUBLIC_STATIC_ROUTES.map(absoluteSiteUrl),
  expectedCounts: CATEGORY_COUNTS,
  expectedTotal: EXPECTED_INTENT_TOTAL,
});

if (issues.length > 0) {
  for (const issue of issues) {
    console.error(`${issue.code} | ${issue.intentId} | ${issue.message}`);
  }
  process.exit(1);
}

const outputPath = path.join(process.cwd(), "public", "llms.txt");
const temporaryPath = path.join(
  process.cwd(),
  "public",
  `.llms.txt.${process.pid}.tmp`,
);

try {
  const rendered = renderLlmsText({ ...staticData, intents });
  writeFileSync(temporaryPath, rendered, "utf8");
  copyFileSync(temporaryPath, outputPath);
  console.log(`Generated ${outputPath} with ${intents.length} questions.`);
} finally {
  if (existsSync(temporaryPath)) unlinkSync(temporaryPath);
}
