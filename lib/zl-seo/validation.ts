export function normalizeQuestion(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function tokenBigrams(value: string): Set<string> {
  const tokens = normalizeQuestion(value).split(" ").filter(Boolean);
  if (tokens.length === 0) return new Set();
  if (tokens.length === 1) return new Set(tokens);

  const bigrams = new Set<string>();
  for (let index = 0; index < tokens.length - 1; index += 1) {
    bigrams.add(`${tokens[index]} ${tokens[index + 1]}`);
  }
  return bigrams;
}

export function diceTokenBigramSimilarity(left: string, right: string): number {
  const leftBigrams = tokenBigrams(left);
  const rightBigrams = tokenBigrams(right);
  if (leftBigrams.size === 0 || rightBigrams.size === 0) return 0;

  let intersection = 0;
  for (const bigram of leftBigrams) {
    if (rightBigrams.has(bigram)) intersection += 1;
  }

  return (2 * intersection) / (leftBigrams.size + rightBigrams.size);
}

export interface ValidationIssue {
  code:
    | "invalid_schema"
    | "empty_answer"
    | "placeholder"
    | "generic_answer"
    | "duplicate_id"
    | "duplicate_question"
    | "near_duplicate_question"
    | "invalid_canonical_url"
    | "missing_internal_source"
    | "missing_official_source"
    | "missing_professional_alert"
    | "prohibited_clinical_claim"
    | "category_count_mismatch"
    | "total_count_mismatch";
  intentId: string;
  message: string;
}

interface ValidateIntentCollectionInput {
  intents: unknown[];
  internalSources: readonly InternalSource[];
  officialSources: readonly OfficialSource[];
  canonicalRoutes: readonly string[];
  expectedCounts: Partial<Record<CategoryId, number>>;
  expectedTotal: number;
}

const PLACEHOLDER_PATTERN = /\b(?:TODO|TBD|FIXME)\b|lorem ipsum|placeholder/;
const GENERIC_ANSWER_PATTERN =
  /pode envolver fatores diferentes|considere dura[cç][aã]o, desconforto e mudan[cç]as vis[ií]veis/i;
const PROHIBITED_CLAIM_PATTERNS = [
  /cura garantida/i,
  /resultado garantido/i,
  /diagnostico online confirmado/i,
  /diagnóstico online confirmado/i,
  /substitui consulta medica/i,
  /substitui consulta médica/i,
];

function issue(
  code: ValidationIssue["code"],
  intentId: string,
  message: string,
): ValidationIssue {
  return { code, intentId, message };
}

export function validateIntentCollection({
  intents,
  internalSources,
  officialSources,
  canonicalRoutes,
  expectedCounts,
  expectedTotal,
}: ValidateIntentCollectionInput): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const parsedIntents: ZlSeoIntent[] = [];
  const internalSourceIds = new Set(internalSources.map((source) => source.id));
  const officialSourceIds = new Set(officialSources.map((source) => source.id));
  const routeSet = new Set(canonicalRoutes);

  for (const rawIntent of intents) {
    const raw =
      rawIntent && typeof rawIntent === "object"
        ? (rawIntent as Record<string, unknown>)
        : {};
    const intentId = typeof raw.id === "string" ? raw.id : "(unknown)";

    if (typeof raw.shortAnswer !== "string" || raw.shortAnswer.trim() === "") {
      issues.push(issue("empty_answer", intentId, "Resposta curta vazia."));
    }

    const textFields = [raw.question, raw.searchIntent, raw.shortAnswer].filter(
      (value): value is string => typeof value === "string",
    );
    if (textFields.some((value) => PLACEHOLDER_PATTERN.test(value))) {
      issues.push(issue("placeholder", intentId, "Placeholder editorial encontrado."));
    }
    if (
      typeof raw.shortAnswer === "string" &&
      GENERIC_ANSWER_PATTERN.test(raw.shortAnswer)
    ) {
      issues.push(
        issue("generic_answer", intentId, "Resposta editorial genérica encontrada."),
      );
    }

    const parsed = ZL_SEO_INTENT_SCHEMA.safeParse(rawIntent);
    if (!parsed.success) {
      issues.push(
        issue(
          "invalid_schema",
          intentId,
          parsed.error.issues.map((item) => item.message).join("; "),
        ),
      );
      continue;
    }

    const intent = parsed.data;
    parsedIntents.push(intent);

    let canonicalIsValid = false;
    try {
      const canonical = new URL(intent.canonicalUrl);
      canonicalIsValid =
        canonical.protocol === "https:" &&
        canonical.hostname === "www.zlpodologia.com.br" &&
        canonical.search === "" &&
        canonical.hash === "" &&
        routeSet.has(canonical.toString());
    } catch {
      canonicalIsValid = false;
    }
    if (!canonicalIsValid) {
      issues.push(
        issue(
          "invalid_canonical_url",
          intent.id,
          `Canonical inválida: ${intent.canonicalUrl}`,
        ),
      );
    }

    if (!internalSourceIds.has(intent.internalSourceId)) {
      issues.push(
        issue(
          "missing_internal_source",
          intent.id,
          `Fonte interna inexistente: ${intent.internalSourceId}`,
        ),
      );
    }

    for (const sourceId of intent.officialSourceIds) {
      if (!officialSourceIds.has(sourceId)) {
        issues.push(
          issue(
            "missing_official_source",
            intent.id,
            `Fonte oficial inexistente: ${sourceId}`,
          ),
        );
      }
    }

    if (
      intent.healthRisk !== "routine" &&
      !intent.professionalAlert?.trim()
    ) {
      issues.push(
        issue(
          "missing_professional_alert",
          intent.id,
          `Risco ${intent.healthRisk} exige alerta profissional.`,
        ),
      );
    }

    if (
      PROHIBITED_CLAIM_PATTERNS.some((pattern) =>
        pattern.test(intent.shortAnswer),
      )
    ) {
      issues.push(
        issue(
          "prohibited_clinical_claim",
          intent.id,
          "A resposta contém promessa ou diagnóstico proibido.",
        ),
      );
    }
  }

  const seenIds = new Set<string>();
  const seenQuestions = new Map<string, string>();
  for (const intent of parsedIntents) {
    if (seenIds.has(intent.id)) {
      issues.push(issue("duplicate_id", intent.id, `ID duplicado: ${intent.id}`));
    } else {
      seenIds.add(intent.id);
    }

    const normalized = normalizeQuestion(intent.question);
    const existingId = seenQuestions.get(normalized);
    if (existingId) {
      issues.push(
        issue(
          "duplicate_question",
          intent.id,
          `Pergunta duplicada de ${existingId}.`,
        ),
      );
    } else {
      seenQuestions.set(normalized, intent.id);
    }
  }

  for (let leftIndex = 0; leftIndex < parsedIntents.length; leftIndex += 1) {
    for (
      let rightIndex = leftIndex + 1;
      rightIndex < parsedIntents.length;
      rightIndex += 1
    ) {
      const left = parsedIntents[leftIndex];
      const right = parsedIntents[rightIndex];
      if (normalizeQuestion(left.question) === normalizeQuestion(right.question)) {
        continue;
      }
      const similarity = diceTokenBigramSimilarity(
        left.question,
        right.question,
      );
      if (similarity >= 0.82) {
        issues.push(
          issue(
            "near_duplicate_question",
            right.id,
            `Pergunta semelhante a ${left.id} (${similarity.toFixed(3)}).`,
          ),
        );
      }
    }
  }

  const categoryCounts = new Map<CategoryId, number>();
  for (const intent of parsedIntents) {
    categoryCounts.set(
      intent.category,
      (categoryCounts.get(intent.category) ?? 0) + 1,
    );
  }
  for (const [category, expected] of Object.entries(expectedCounts) as [
    CategoryId,
    number,
  ][]) {
    const actual = categoryCounts.get(category) ?? 0;
    if (actual !== expected) {
      issues.push(
        issue(
          "category_count_mismatch",
          category,
          `Categoria ${category}: esperado ${expected}, recebido ${actual}.`,
        ),
      );
    }
  }

  if (parsedIntents.length !== expectedTotal) {
    issues.push(
      issue(
        "total_count_mismatch",
        "collection",
        `Total esperado ${expectedTotal}, recebido ${parsedIntents.length}.`,
      ),
    );
  }

  return issues;
}
import {
  ZL_SEO_INTENT_SCHEMA,
  type CategoryId,
  type InternalSource,
  type OfficialSource,
  type ZlSeoIntent,
} from "./schema";
