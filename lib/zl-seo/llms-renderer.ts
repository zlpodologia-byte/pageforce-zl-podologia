import {
  CATEGORY_COUNTS,
  type CategoryId,
  type InternalSource,
  type OfficialSource,
  type ZlSeoEntity,
  type ZlSeoIntent,
} from "./schema";

const CATEGORY_LABELS: Record<CategoryId, string> = {
  "conceitos-gerais": "Conceitos gerais de podologia",
  "unha-encravada": "Unha encravada e desconfortos ungueais",
  "calos-e-pressao": "Calos, calosidades e alterações de pressão",
  "rachaduras-e-ressecamento": "Rachaduras e ressecamento dos pés",
  "micose-e-unhas": "Micose e alterações visíveis nas unhas",
  "pes-e-diabetes": "Cuidados com pés de pessoas com diabetes",
  "cuidados-para-idosos": "Cuidados para idosos",
  "criancas-e-adolescentes": "Podologia para crianças e adolescentes",
  "atletas-e-atividade-fisica": "Pés de atletas e pessoas fisicamente ativas",
  "higiene-e-prevencao": "Higiene, prevenção e cuidados cotidianos",
  "atendimento-e-cuidados": "Atendimento, preparação e cuidados posteriores",
  "intencoes-locais": "Intenções locais e comerciais confirmadas",
};

export interface RenderLlmsInput {
  entity: ZlSeoEntity;
  intents: readonly ZlSeoIntent[];
  internalSources: readonly InternalSource[];
  officialSources: readonly OfficialSource[];
}

export interface GeneratedLlmsCheck {
  ok: boolean;
  code?: "llms_out_of_date";
  message?: string;
}

function escapeInline(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/([`*_\[\]])/g, "\\$1")
    .replace(/\r?\n/g, " ")
    .trim();
}

function renderIntent(
  intent: ZlSeoIntent,
  index: number,
  officialSourceById: ReadonlyMap<string, OfficialSource>,
): string[] {
  const lines = [
    `### Pergunta ${index}: ${escapeInline(intent.question)}`,
    "",
    `Resposta: ${escapeInline(intent.shortAnswer)}`,
    `Intenção de busca: ${escapeInline(intent.searchIntent)}`,
    `URL canônica: ${intent.canonicalUrl}`,
    `Termos naturais: ${intent.naturalTerms.map(escapeInline).join(", ")}`,
  ];

  if (intent.professionalAlert) {
    lines.push(`Alerta profissional: ${escapeInline(intent.professionalAlert)}`);
  }
  if (intent.officialSourceIds.length > 0) {
    const references = intent.officialSourceIds.map((sourceId) => {
      const source = officialSourceById.get(sourceId);
      return source
        ? `${source.organization} — ${source.title} [${source.id}]`
        : sourceId;
    });
    lines.push(`Referências oficiais: ${references.map(escapeInline).join("; ")}`);
  }

  lines.push("");
  return lines;
}

export function renderLlmsText({
  entity,
  intents,
  internalSources,
  officialSources,
}: RenderLlmsInput): string {
  const categoryOrder = Object.keys(CATEGORY_COUNTS) as CategoryId[];
  const officialSourceById = new Map(
    officialSources.map((source) => [source.id, source] as const),
  );
  const lines: string[] = [
    `# ${escapeInline(entity.name)}`,
    "",
    "> Este arquivo organiza informações públicas e perguntas úteis. Sua existência não garante posicionamento ou citação por mecanismos de busca ou assistentes de IA.",
    "> As informações clínicas são educativas, não confirmam diagnóstico e não substituem avaliação profissional ou acompanhamento médico quando indicado.",
    "",
    "## Entidade confirmada",
    "",
    `- Categoria: ${escapeInline(entity.category)}`,
    `- Domínio canônico: ${entity.canonicalUrl}`,
    `- Unidade física: ${escapeInline(entity.address.streetAddress)}, ${escapeInline(entity.address.district)}, ${escapeInline(entity.address.city)}/${escapeInline(entity.address.state)}, CEP ${escapeInline(entity.address.postalCode)}`,
    `- WhatsApp: ${escapeInline(entity.phoneDisplay)}`,
    `- E-mail: ${escapeInline(entity.email)}`,
    `- Instagram: ${entity.instagram}`,
    `- Facebook: ${entity.facebook}`,
    `- Horários publicados: ${entity.openingHours.map((item) => `${item.day}: ${item.hours}`).join("; ")}`,
    "",
    "## Serviços publicados",
    "",
    ...entity.services.map((service) => `- ${escapeInline(service)}`),
    "",
    "## Páginas canônicas",
    "",
    ...internalSources.map(
      (source) => `- ${escapeInline(source.label)}: ${source.canonicalUrl}`,
    ),
    "",
  ];

  let questionNumber = 0;
  for (const category of categoryOrder) {
    const categoryIntents = intents.filter((intent) => intent.category === category);
    lines.push(
      `## Categoria: ${CATEGORY_LABELS[category]} (${categoryIntents.length})`,
      "",
    );
    for (const intent of categoryIntents) {
      questionNumber += 1;
      lines.push(...renderIntent(intent, questionNumber, officialSourceById));
    }
  }

  lines.push("## Referências oficiais", "");
  for (const source of officialSources) {
    lines.push(
      `- [${source.id}] ${escapeInline(source.organization)} — ${escapeInline(source.title)}: ${source.url}`,
    );
  }
  lines.push("");

  return lines.join("\n");
}

export function checkGeneratedLlms(
  expected: string,
  actual: string | undefined,
): GeneratedLlmsCheck {
  if (actual === expected) return { ok: true };
  return {
    ok: false,
    code: "llms_out_of_date",
    message:
      actual === undefined
        ? "public/llms.txt não existe."
        : "public/llms.txt diverge da fonte estruturada.",
  };
}
