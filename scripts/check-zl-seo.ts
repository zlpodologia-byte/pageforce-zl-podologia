import { readFileSync } from "node:fs";
import path from "node:path";
import { loadZlSeoIntents, loadZlSeoStaticData } from "../lib/zl-seo/load-data";
import { checkGeneratedLlms, renderLlmsText } from "../lib/zl-seo/llms-renderer";
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
  process.exitCode = 1;
} else {
  const expected = renderLlmsText({ ...staticData, intents });
  const outputPath = path.join(process.cwd(), "public", "llms.txt");
  let actual: string | undefined;
  try {
    actual = readFileSync(outputPath, "utf8");
  } catch (error) {
    if (!(error instanceof Error) || !("code" in error) || error.code !== "ENOENT") {
      throw error;
    }
  }

  const generatedCheck = checkGeneratedLlms(expected, actual);
  if (!generatedCheck.ok) {
    console.error(`${generatedCheck.code} | ${generatedCheck.message}`);
    process.exitCode = 1;
  } else {
    const counts = Object.fromEntries(
      Object.keys(CATEGORY_COUNTS).map((category) => [
        category,
        intents.filter((intent) => intent.category === category).length,
      ]),
    );
    console.log(
      JSON.stringify(
        {
          status: "ok",
          total: intents.length,
          categories: counts,
          generatedFile: "public/llms.txt",
        },
        null,
        2,
      ),
    );
  }
}
