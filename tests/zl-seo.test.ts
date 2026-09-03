import assert from "node:assert/strict";
import test from "node:test";
import nextConfig from "../next.config";
import {
  CATEGORY_COUNTS,
  EXPECTED_INTENT_TOTAL,
  ZL_SEO_INTENT_SCHEMA,
} from "../lib/zl-seo/schema";
import {
  loadZlSeoIntents,
  loadZlSeoStaticData,
} from "../lib/zl-seo/load-data";
import { SITE_URL } from "../lib/site";
import {
  ZL_WHATSAPP_NUMBER,
  zlContact,
  zlHoursRows,
  zlLocation,
} from "../components/zl-podologia/zlPodologiaContent";
import {
  diceTokenBigramSimilarity,
  normalizeQuestion,
  validateIntentCollection,
} from "../lib/zl-seo/validation";
import {
  checkGeneratedLlms,
  renderLlmsText,
} from "../lib/zl-seo/llms-renderer";

const validIntent = {
  id: "geral-quando-procurar-podologo",
  question: "Quando vale a pena procurar atendimento podológico?",
  searchIntent: "Entender quando o cuidado profissional pode ser útil.",
  shortAnswer:
    "Dor, alterações persistentes nas unhas ou na pele e dificuldade para cuidar dos pés com segurança justificam avaliação profissional.",
  category: "conceitos-gerais",
  relatedService: null,
  relatedLocation: null,
  canonicalUrl: "https://www.zlpodologia.com.br/",
  naturalTerms: ["podologia", "cuidado dos pés", "avaliação profissional"],
  professionalAlert: null,
  internalSourceId: "home-podologia-clinica",
  officialSourceIds: [],
  healthRisk: "routine",
  funnelStage: "discovery",
  trafficPriority: "high",
};

test("accepts a complete SEO intent", () => {
  assert.equal(ZL_SEO_INTENT_SCHEMA.safeParse(validIntent).success, true);
});

test("rejects an intent without a question", () => {
  const invalid = { ...validIntent, question: undefined };
  assert.equal(ZL_SEO_INTENT_SCHEMA.safeParse(invalid).success, false);
});

test("normalizes accents, punctuation, case and whitespace", () => {
  assert.equal(
    normalizeQuestion("  PÉ diabético: cuidados? "),
    "pe diabetico cuidados",
  );
});

test("calculates token-bigram similarity deterministically", () => {
  assert.equal(
    diceTokenBigramSimilarity(
      "cuidar da unha encravada",
      "cuidar da unha encravada",
    ),
    1,
  );
  assert.equal(
    diceTokenBigramSimilarity("unha encravada", "calos no pé"),
    0,
  );
});

const internalSources = [
  {
    id: "home-podologia-clinica",
    canonicalUrl: "https://www.zlpodologia.com.br/",
    label: "Home da ZL Podologia",
    evidencePath: "app/lab/zl-podologia/page.tsx",
  },
];

const officialSources = [
  {
    id: "ms-pe-diabetico-manual",
    organization: "Ministério da Saúde",
    title: "Manual do pé diabético",
    url: "https://bvsms.saude.gov.br/bvs/publicacoes/manual_pe_diabetico_estrategias_pessoa_doenca_cronica.pdf",
    language: "pt-BR" as const,
    topics: ["diabetes"],
  },
];

function validationCodes(
  intents: unknown[],
  expectedTotal = intents.length,
  expectedCount = intents.length,
) {
  return validateIntentCollection({
    intents,
    internalSources,
    officialSources,
    canonicalRoutes: ["https://www.zlpodologia.com.br/"],
    expectedCounts: { "conceitos-gerais": expectedCount },
    expectedTotal,
  }).map((issue) => issue.code);
}

test("rejects empty answers and placeholders", () => {
  assert.ok(
    validationCodes([{ ...validIntent, shortAnswer: "" }]).includes(
      "empty_answer",
    ),
  );
  assert.ok(
    validationCodes([{ ...validIntent, shortAnswer: "TBD" }]).includes(
      "placeholder",
    ),
  );
  assert.ok(
    validationCodes([
      {
        ...validIntent,
        shortAnswer:
          "Esse tema pode envolver fatores diferentes. Considere duração, desconforto e mudanças visíveis.",
      },
    ]).includes("generic_answer"),
  );
});

test("rejects duplicate IDs and normalized questions", () => {
  const duplicate = { ...validIntent };
  const codes = validationCodes([validIntent, duplicate], 2, 2);
  assert.ok(codes.includes("duplicate_id"));
  assert.ok(codes.includes("duplicate_question"));
});

test("rejects near-duplicate questions", () => {
  const nearDuplicate = {
    ...validIntent,
    id: "geral-quando-procurar-podologo-hoje",
    question: `${validIntent.question} hoje`,
  };
  assert.ok(
    validationCodes([validIntent, nearDuplicate], 2, 2).includes(
      "near_duplicate_question",
    ),
  );
});

test("rejects canonical URLs with query strings or a foreign host", () => {
  assert.ok(
    validationCodes([
      { ...validIntent, canonicalUrl: "https://www.zlpodologia.com.br/?x=1" },
    ]).includes("invalid_canonical_url"),
  );
  assert.ok(
    validationCodes([
      { ...validIntent, canonicalUrl: "https://example.com/" },
    ]).includes("invalid_canonical_url"),
  );
});

test("rejects missing internal and official sources", () => {
  assert.ok(
    validationCodes([
      { ...validIntent, internalSourceId: "missing-source" },
    ]).includes("missing_internal_source"),
  );
  assert.ok(
    validationCodes([
      { ...validIntent, officialSourceIds: ["missing-source"] },
    ]).includes("missing_official_source"),
  );
});

test("requires professional alerts for attention and urgent risks", () => {
  assert.ok(
    validationCodes([
      { ...validIntent, healthRisk: "attention", professionalAlert: null },
    ]).includes("missing_professional_alert"),
  );
});

test("rejects unequivocal clinical guarantees", () => {
  assert.ok(
    validationCodes([
      { ...validIntent, shortAnswer: "Este procedimento oferece cura garantida." },
    ]).includes("prohibited_clinical_claim"),
  );
  assert.equal(
    validationCodes([
      {
        ...validIntent,
        shortAnswer:
          "A informação é educativa e não substitui avaliação profissional.",
      },
    ]).includes("prohibited_clinical_claim"),
    false,
  );
});

test("enforces category counts and the final total", () => {
  const codes = validationCodes([validIntent], 2, 2);
  assert.ok(codes.includes("category_count_mismatch"));
  assert.ok(codes.includes("total_count_mismatch"));
});

test("loads audited sources and keeps entity facts aligned with the site", () => {
  const { entity, internalSources: sources, officialSources: officials } =
    loadZlSeoStaticData();

  assert.equal(entity.canonicalUrl, SITE_URL);
  assert.equal(entity.whatsappNumber, ZL_WHATSAPP_NUMBER);
  assert.equal(entity.email, zlContact.email);
  assert.equal(entity.address.streetAddress, zlLocation.streetAddress);
  assert.equal(entity.address.district, zlLocation.district);
  assert.deepEqual(entity.openingHours, zlHoursRows);
  assert.equal(sources.length, 14);
  assert.equal(officials.length, 13);
});

test("publishes exactly 500 valid intents with the approved distribution", () => {
  const intents = loadZlSeoIntents();
  const { entity, internalSources: sources, officialSources: officials } =
    loadZlSeoStaticData();
  const canonicalRoutes = sources.map((source) => source.canonicalUrl);
  const errors = validateIntentCollection({
    intents,
    internalSources: sources,
    officialSources: officials,
    canonicalRoutes,
    expectedCounts: CATEGORY_COUNTS,
    expectedTotal: EXPECTED_INTENT_TOTAL,
  });
  const counts = Object.fromEntries(
    Object.keys(CATEGORY_COUNTS).map((category) => [
      category,
      intents.filter((intent) => intent.category === category).length,
    ]),
  );

  assert.equal(entity.name, "ZL Podologia");
  assert.equal(intents.length, EXPECTED_INTENT_TOTAL);
  assert.deepEqual(counts, CATEGORY_COUNTS);
  assert.deepEqual(errors, []);
  assert.ok(intents.some((intent) => intent.funnelStage === "local"));
  assert.ok(intents.some((intent) => intent.funnelStage === "booking"));
  assert.ok(
    intents.filter((intent) => intent.trafficPriority === "high").length >=
      100,
  );
});

test("renders deterministic llms.txt Markdown with all validated intents", () => {
  const intents = loadZlSeoIntents();
  const staticData = loadZlSeoStaticData();
  const first = renderLlmsText({ ...staticData, intents });
  const second = renderLlmsText({ ...staticData, intents });

  assert.equal(first, second);
  assert.match(first, /^# ZL Podologia$/m);
  assert.match(first, /não garante posicionamento ou citação/i);
  assert.match(first, /não substitui avaliação profissional/i);
  assert.match(first, /https:\/\/www\.zlpodologia\.com\.br/);
  assert.equal((first.match(/^## Categoria:/gm) ?? []).length, 12);
  assert.equal((first.match(/^### Pergunta/gm) ?? []).length, 500);
  assert.equal((first.match(/^Resposta:/gm) ?? []).length, 500);
  assert.equal((first.match(/^URL canônica:/gm) ?? []).length, 500);
  assert.match(first, /^## Referências oficiais$/m);
  assert.match(first, /https:\/\/www\.niddk\.nih\.gov\//);
});

test("detects an absent or stale generated llms.txt without writing", () => {
  assert.deepEqual(checkGeneratedLlms("expected\n", "expected\n"), {
    ok: true,
  });
  assert.equal(
    checkGeneratedLlms("expected\n", "expecteD\n").code,
    "llms_out_of_date",
  );
  assert.equal(
    checkGeneratedLlms("expected\n", undefined).code,
    "llms_out_of_date",
  );
});

test("enables the optimized AVIF and WebP image pipeline", () => {
  assert.notEqual(nextConfig.images?.unoptimized, true);
  assert.deepEqual(nextConfig.images?.formats, ["image/avif", "image/webp"]);
  assert.ok(nextConfig.images?.qualities?.includes(78));
  assert.ok((nextConfig.images?.minimumCacheTTL ?? 0) >= 60 * 60 * 24 * 365);
});
