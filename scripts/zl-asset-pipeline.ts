import { z } from "zod";

export const ZL_ASSET_MANIFEST_VERSION = "v10" as const;
export const ZL_ASSET_PUBLIC_ROOT = "/zl-podologia/generated/v10" as const;
export const ZL_ASSET_MANIFEST_RELATIVE_PATH =
  "public/zl-podologia/generated/v10/manifest.json" as const;

export const ASSET_CATEGORIES = [
  "brand",
  "hero",
  "legitimacy",
  "service-context",
  "value-offer",
  "section-accent",
  "close",
] as const;

export const ASSET_SLOTS = [
  "brand-topbar",
  "brand-footer",
  "brand-seal",
  "hero-editorial-support",
  "hero-ambient-support",
  "legitimacy-editorial-support",
  "service-explorer-editorial",
  "service-transition-editorial",
  "value-offer-editorial",
  "value-package-editorial",
  "quiz-editorial-support",
  "cta-editorial-support",
  "footer-editorial-support",
  "section-texture",
  "clinical-proof",
  "before-after-documental",
  "team-real-portrait",
  "clinic-facade-real",
  "clinic-room-real",
  "review-evidence",
  "procedure-documental",
] as const;

export const ASSET_RATIOS = [
  "1:1",
  "3:2",
  "4:5",
  "5:4",
  "16:9",
  "21:9",
] as const;

export const SLOT_GENERATION_POLICIES = [
  "generated-allowed",
  "generated-prohibited",
] as const;

export const ASSET_OUTPUT_FORMATS = ["jpg", "webp", "avif", "lqip"] as const;

export const REVIEW_STATUSES = [
  "planned",
  "ready-for-generation",
  "generated",
  "blocked-by-policy",
] as const;

export const APPROVAL_STATUSES = ["pending", "approved", "rejected"] as const;

export const GENERATION_STATUSES = [
  "not-requested",
  "awaiting-orchestrator",
  "generated",
  "blocked",
] as const;

export type AssetCategory = (typeof ASSET_CATEGORIES)[number];
export type AssetSlot = (typeof ASSET_SLOTS)[number];
export type AssetRatio = (typeof ASSET_RATIOS)[number];
export type SlotGenerationPolicy = (typeof SLOT_GENERATION_POLICIES)[number];
export type AssetOutputFormat = (typeof ASSET_OUTPUT_FORMATS)[number];
export type AssetReviewStatus = (typeof REVIEW_STATUSES)[number];
export type AssetApprovalStatus = (typeof APPROVAL_STATUSES)[number];
export type AssetGenerationStatus = (typeof GENERATION_STATUSES)[number];

export const SLOT_POLICY_MAP: Record<AssetSlot, SlotGenerationPolicy> = {
  "brand-topbar": "generated-allowed",
  "brand-footer": "generated-allowed",
  "brand-seal": "generated-allowed",
  "hero-editorial-support": "generated-allowed",
  "hero-ambient-support": "generated-allowed",
  "legitimacy-editorial-support": "generated-allowed",
  "service-explorer-editorial": "generated-allowed",
  "service-transition-editorial": "generated-allowed",
  "value-offer-editorial": "generated-allowed",
  "value-package-editorial": "generated-allowed",
  "quiz-editorial-support": "generated-allowed",
  "cta-editorial-support": "generated-allowed",
  "footer-editorial-support": "generated-allowed",
  "section-texture": "generated-allowed",
  "clinical-proof": "generated-prohibited",
  "before-after-documental": "generated-prohibited",
  "team-real-portrait": "generated-prohibited",
  "clinic-facade-real": "generated-prohibited",
  "clinic-room-real": "generated-prohibited",
  "review-evidence": "generated-prohibited",
  "procedure-documental": "generated-prohibited",
};

export const OUTPUT_FORMAT_EXTENSION_MAP: Record<AssetOutputFormat, string> = {
  jpg: ".jpg",
  webp: ".webp",
  avif: ".avif",
  lqip: ".lqip.json",
};

export const assetCategorySchema = z.enum(ASSET_CATEGORIES);
export const assetSlotSchema = z.enum(ASSET_SLOTS);
export const assetRatioSchema = z.enum(ASSET_RATIOS);
export const slotGenerationPolicySchema = z.enum(SLOT_GENERATION_POLICIES);
export const assetOutputFormatSchema = z.enum(ASSET_OUTPUT_FORMATS);
export const assetReviewStatusSchema = z.enum(REVIEW_STATUSES);
export const assetApprovalStatusSchema = z.enum(APPROVAL_STATUSES);
export const assetGenerationStatusSchema = z.enum(GENERATION_STATUSES);

export const assetSpecSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    category: assetCategorySchema,
    slot: assetSlotSchema,
    ratio: assetRatioSchema,
    outputBaseName: z.string().min(1),
    prompt: z.string().min(1).nullable(),
    notes: z.string().nullable(),
    usage: z
      .object({
        section: z.string().min(1),
        purpose: z.string().min(1),
      })
      .strict(),
  })
  .strict();

export const assetFileVariantSchema = z
  .object({
    format: assetOutputFormatSchema,
    extension: z.string().min(1),
    relativePath: z.string().min(1),
    publicPath: z.string().nullable(),
    absolutePath: z.string().min(1),
    exists: z.boolean(),
  })
  .strict();

export const assetFileVariantsSchema = z
  .object({
    jpg: assetFileVariantSchema,
    webp: assetFileVariantSchema,
    avif: assetFileVariantSchema,
    lqip: assetFileVariantSchema,
  })
  .strict();

export const assetManifestEntrySchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    category: assetCategorySchema,
    slot: assetSlotSchema,
    slotPolicy: slotGenerationPolicySchema,
    ratio: assetRatioSchema,
    outputBaseName: z.string().min(1),
    prompt: z.string().min(1).nullable(),
    notes: z.string().nullable(),
    usage: z
      .object({
        section: z.string().min(1),
        purpose: z.string().min(1),
      })
      .strict(),
    reviewStatus: assetReviewStatusSchema,
    approval: z
      .object({
        status: assetApprovalStatusSchema,
        approvedBy: z.string().min(1).nullable(),
        approvedAt: z.string().min(1).nullable(),
      })
      .strict(),
    generation: z
      .object({
        requested: z.boolean(),
        status: assetGenerationStatusSchema,
        model: z.string().min(1).nullable(),
        generatedAt: z.string().min(1).nullable(),
        blockedReason: z.string().min(1).nullable(),
      })
      .strict(),
    files: assetFileVariantsSchema,
  })
  .strict();

export const assetManifestSchema = z
  .object({
    version: z.literal(ZL_ASSET_MANIFEST_VERSION),
    generatedAt: z.string().min(1),
    manifestStatus: z.enum(["planned", "partially-generated", "generated"]),
    summary: z
      .object({
        totalAssets: z.number().int().nonnegative(),
        readyForGeneration: z.number().int().nonnegative(),
        blockedByPolicy: z.number().int().nonnegative(),
        generatedAssets: z.number().int().nonnegative(),
      })
      .strict(),
    assets: z.array(assetManifestEntrySchema),
  })
  .strict();

export type AssetSpec = z.infer<typeof assetSpecSchema>;
export type AssetFileVariant = z.infer<typeof assetFileVariantSchema>;
export type AssetFileVariants = z.infer<typeof assetFileVariantsSchema>;
export type AssetManifestEntry = z.infer<typeof assetManifestEntrySchema>;
export type AssetManifest = z.infer<typeof assetManifestSchema>;

export function getSlotPolicy(slot: AssetSlot): SlotGenerationPolicy {
  return SLOT_POLICY_MAP[slot];
}

export function isGeneratedSlotAllowed(slot: AssetSlot) {
  return getSlotPolicy(slot) === "generated-allowed";
}

export function assertGeneratedSlotAllowed(slot: AssetSlot) {
  if (!isGeneratedSlotAllowed(slot)) {
    throw new Error(
      `[zl-v10] Slot "${slot}" e documental/proibido para imagem gerada. Use asset real aprovado, nao este pipeline.`
    );
  }
}

export function buildVariantRelativePath(category: AssetCategory, outputBaseName: string, format: AssetOutputFormat) {
  return `public/zl-podologia/generated/v10/${category}/${outputBaseName}${OUTPUT_FORMAT_EXTENSION_MAP[format]}`;
}

export function buildVariantPublicPath(category: AssetCategory, outputBaseName: string, format: AssetOutputFormat) {
  if (format === "lqip") {
    return null;
  }

  return `${ZL_ASSET_PUBLIC_ROOT}/${category}/${outputBaseName}${OUTPUT_FORMAT_EXTENSION_MAP[format]}`;
}

export function validateAssetCatalog(catalog: readonly AssetSpec[]) {
  const ids = new Set<string>();
  const outputBaseNames = new Set<string>();

  return catalog.map((candidate) => {
    const spec = assetSpecSchema.parse(candidate);

    if (ids.has(spec.id)) {
      throw new Error(`[zl-v10] Asset id duplicado no catalogo: "${spec.id}"`);
    }

    if (outputBaseNames.has(spec.outputBaseName)) {
      throw new Error(
        `[zl-v10] outputBaseName duplicado no catalogo: "${spec.outputBaseName}"`
      );
    }

    ids.add(spec.id);
    outputBaseNames.add(spec.outputBaseName);

    return spec;
  });
}

export const zlAssetCatalogV10 = validateAssetCatalog([
  {
    id: "brand-wordmark-topbar-light",
    title: "Marca horizontal clara para topbar",
    category: "brand",
    slot: "brand-topbar",
    ratio: "16:9",
    outputBaseName: "brand-wordmark-topbar-light",
    prompt:
      "Premium horizontal wordmark for ZL Podologia, cream background, elegant foot silhouette with subtle botanical cue, terracotta and deep espresso typography, clean clinical-luxury tone, no badge circle, no extra icons, no fake emboss.",
    notes: "Substitui lockup simples do topo quando o orquestrador liberar a geracao.",
    usage: {
      section: "topbar",
      purpose: "Dar mais presenca de marca sem badge circular.",
    },
  },
  {
    id: "brand-wordmark-footer-dark",
    title: "Marca horizontal escura para footer",
    category: "brand",
    slot: "brand-footer",
    ratio: "16:9",
    outputBaseName: "brand-wordmark-footer-dark",
    prompt:
      "Dark footer wordmark for ZL Podologia, premium clinic identity, warm charcoal background, soft ivory typography, restrained botanical foot mark, elegant and legible in low-light UI, no glossy effect, no box shadow gimmicks.",
    notes: "Versao escura pensada para fundo marrom do fechamento.",
    usage: {
      section: "footer",
      purpose: "Reforcar assinatura de marca no fechamento.",
    },
  },
  {
    id: "brand-seal-monogram",
    title: "Selo monograma editorial",
    category: "brand",
    slot: "brand-seal",
    ratio: "1:1",
    outputBaseName: "brand-seal-monogram",
    prompt:
      "Editorial monogram seal for ZL Podologia, minimal ZL initials with refined foot-inspired linework, warm neutral palette, luxury medical editorial tone, flat design, no fake gold foil, no coin effect.",
    notes: "Pode entrar em divisores, detalhes de premium e review surface.",
    usage: {
      section: "cross-section",
      purpose: "Criar um acento de marca sem virar selo falso de prova.",
    },
  },
  {
    id: "hero-editorial-care-moment",
    title: "Hero editorial de cuidado premium",
    category: "hero",
    slot: "hero-editorial-support",
    ratio: "4:5",
    outputBaseName: "hero-editorial-care-moment",
    prompt:
      "Editorial support image for a premium podology landing page, feminine yet clinical foot-care ritual, warm natural light, clean linens, subtle botanical accents, premium Fortaleza clinic mood, realistic photography, no treatment evidence, no fake faces, no salon kitsch.",
    notes: "Asset gerado seguro para apoiar o hero sem fingir atendimento real.",
    usage: {
      section: "hero",
      purpose: "Apoio visual premium quando a secao precisar de reforco editorial.",
    },
  },
  {
    id: "hero-ambient-soft-room",
    title: "Hero ambiente suave",
    category: "hero",
    slot: "hero-ambient-support",
    ratio: "16:9",
    outputBaseName: "hero-ambient-soft-room",
    prompt:
      "Bright premium clinic ambience for podology brand, soft off-white room, warm wood details, clean treatment setting, calm daylight, upscale but believable, no people, no certificates, no fake equipment closeup, no generic spa tropes.",
    notes: "Complementa o topo com atmosfera e profundidade de marca.",
    usage: {
      section: "hero",
      purpose: "Criar pano de fundo editorial seguro e leve.",
    },
  },
  {
    id: "legitimacy-botanical-strip",
    title: "Faixa editorial para legitimidade",
    category: "legitimacy",
    slot: "legitimacy-editorial-support",
    ratio: "21:9",
    outputBaseName: "legitimacy-botanical-strip",
    prompt:
      "Wide editorial strip for a premium clinic legitimacy section, clean warm neutrals, restrained botanical forms, subtle paper texture, premium medical hospitality mood, no people, no fake clinic exterior, no text baked into image.",
    notes: "Serve como ligacao visual entre prova, legitimidade e contexto.",
    usage: {
      section: "legitimidade",
      purpose: "Evitar mini-cards repetidos com um plano mais integrado.",
    },
  },
  {
    id: "legitimacy-paper-texture",
    title: "Textura de papel premium",
    category: "section-accent",
    slot: "section-texture",
    ratio: "5:4",
    outputBaseName: "legitimacy-paper-texture",
    prompt:
      "Premium warm paper texture with soft mineral tonal variation, elegant and subtle, suitable for luxury clinic sections, high resolution, no pattern repetition artifacts, no visible folds, no typography.",
    notes: "Textura base para blocos com cara menos quadrada.",
    usage: {
      section: "legitimidade",
      purpose: "Trazer profundidade sem criar mais caixas pesadas.",
    },
  },
  {
    id: "service-encravada-editorial-context",
    title: "Contexto editorial unha encravada",
    category: "service-context",
    slot: "service-explorer-editorial",
    ratio: "4:5",
    outputBaseName: "service-encravada-editorial-context",
    prompt:
      "Editorial support image for ingrown toenail service context, premium clinical atmosphere, precise care mood, clean neutral palette, no toe closeup procedure, no medical proof, no blood, no fake treatment result, photorealistic support asset only.",
    notes: "Contextualiza o servico sem invadir o territorio da prova clinica.",
    usage: {
      section: "service-explorer",
      purpose: "Apoio editorial do servico prioritario sem usar prova fake.",
    },
  },
  {
    id: "service-reflexologia-editorial-context",
    title: "Contexto editorial reflexologia",
    category: "service-context",
    slot: "service-explorer-editorial",
    ratio: "4:5",
    outputBaseName: "service-reflexologia-editorial-context",
    prompt:
      "Editorial support image for reflexology service on a premium podology landing page, serene foot-care ritual, soft towel textures, warm natural light, elevated clinic atmosphere, realistic and calm, no stock spa cliches, no fake face.",
    notes: "Ajuda a diferenciar o bloco de bem-estar no explorer.",
    usage: {
      section: "service-explorer",
      purpose: "Dar contexto premium aos servicos de relaxamento.",
    },
  },
  {
    id: "service-prewedding-editorial-context",
    title: "Contexto editorial pre-wedding",
    category: "service-context",
    slot: "service-explorer-editorial",
    ratio: "4:5",
    outputBaseName: "service-prewedding-editorial-context",
    prompt:
      "Editorial support image for pre-wedding therapeutic foot care, bright premium feminine styling, warm ivory linens, subtle floral cue, elevated clinic service mood, photorealistic, no bridal person, no fake ring closeup, no staged salon look.",
    notes: "Asset seguro para o servico presenteavel sem virar publicidade genérica.",
    usage: {
      section: "service-explorer",
      purpose: "Contextualizar pre-wedding com mais desejo e menos card genérico.",
    },
  },
  {
    id: "service-premium-divider",
    title: "Divisor editorial premium",
    category: "section-accent",
    slot: "service-transition-editorial",
    ratio: "21:9",
    outputBaseName: "service-premium-divider",
    prompt:
      "Wide premium editorial divider for a podology landing page, warm parchment tones, soft clinical luxury atmosphere, abstract natural composition, no objects requiring proof, no text, no logos.",
    notes: "Pode reduzir a sensacao de empilhamento entre explorer e blocos seguintes.",
    usage: {
      section: "mid-page",
      purpose: "Criar respiracao visual entre secoes densas.",
    },
  },
  {
    id: "value-gift-card-essencial",
    title: "Vale presente Momento Essencial",
    category: "value-offer",
    slot: "value-offer-editorial",
    ratio: "4:5",
    outputBaseName: "value-gift-card-essencial",
    prompt:
      "Premium gift card visual for podology service package named Momento Essencial, elegant card presentation, warm neutral palette, subtle floral and linen context, clinic luxury feel, photorealistic, no licensed characters, no fake pricing text.",
    notes: "Substitui mockup generico e evita referencias de IP terceiras.",
    usage: {
      section: "value",
      purpose: "Apresentar vale-presente com mais desejo visual.",
    },
  },
  {
    id: "value-gift-card-encanto",
    title: "Vale presente Experiencia Encanto",
    category: "value-offer",
    slot: "value-offer-editorial",
    ratio: "4:5",
    outputBaseName: "value-gift-card-encanto",
    prompt:
      "Premium gift card visual for podology service package named Experiencia Encanto, elevated feminine clinical luxury, soft warm rose accent, elegant paper card and ribbon styling, photorealistic, no character branding, no fake promotional stamp.",
    notes: "Versao mais aspiracional para o pacote premium.",
    usage: {
      section: "value",
      purpose: "Aumentar percepcao premium do bloco de experiencias.",
    },
  },
  {
    id: "value-package-orbit-premium",
    title: "Orbit asset pacote e retorno",
    category: "value-offer",
    slot: "value-package-editorial",
    ratio: "5:4",
    outputBaseName: "value-package-orbit-premium",
    prompt:
      "Premium editorial asset for recurring podology care package and return plan, layered paper, treatment diary, refined clinic objects, warm neutrals, believable high-end service atmosphere, photorealistic, no fake app UI, no fake map, no fake medical evidence.",
    notes: "Pensado para o orbit card de pacotes e retorno.",
    usage: {
      section: "value",
      purpose: "Dar contexto visual sem mini-card encaixotado.",
    },
  },
  {
    id: "value-warm-paper-texture",
    title: "Textura quente para value section",
    category: "section-accent",
    slot: "section-texture",
    ratio: "16:9",
    outputBaseName: "value-warm-paper-texture",
    prompt:
      "Warm editorial paper texture for premium clinic pricing section, subtle grain, layered ivory and almond tones, sophisticated and quiet, seamless enough for crop variations, no visible pattern grid, no typography.",
    notes: "Pode ser usada como base de fundo do fechamento.",
    usage: {
      section: "value",
      purpose: "Reduzir a cara de cards brancos repetidos.",
    },
  },
  {
    id: "quiz-inline-editorial",
    title: "Apoio editorial do quiz",
    category: "close",
    slot: "quiz-editorial-support",
    ratio: "3:2",
    outputBaseName: "quiz-inline-editorial",
    prompt:
      "Editorial support image for inline diagnosis quiz on a premium podology landing page, calm clinical stationery and care ritual mood, warm daylight, minimal composition, no laptop screen, no fake form UI, no people required.",
    notes: "Serve para suavizar a entrada do quiz sem inventar evidência.",
    usage: {
      section: "quiz",
      purpose: "Criar pausa visual antes do fechamento.",
    },
  },
  {
    id: "cta-final-editorial-support",
    title: "Apoio editorial do CTA final",
    category: "close",
    slot: "cta-editorial-support",
    ratio: "16:9",
    outputBaseName: "cta-final-editorial-support",
    prompt:
      "Final call-to-action editorial support for a premium podology clinic, warm clinic hospitality mood, refined materials, clean neutral palette, inviting but professional, no fake facade, no fake treatment room, no people required.",
    notes: "Pode complementar o CTA final sem competir com a prova real.",
    usage: {
      section: "cta-final",
      purpose: "Elevar o fechamento mantendo honestidade documental.",
    },
  },
  {
    id: "footer-editorial-premium-seal",
    title: "Selo premium para footer",
    category: "close",
    slot: "footer-editorial-support",
    ratio: "1:1",
    outputBaseName: "footer-editorial-premium-seal",
    prompt:
      "Small premium editorial seal for footer support, restrained clinic luxury, soft ivory on deep espresso, minimal linework, elegant and quiet, no certification appearance, no fake authority symbols.",
    notes: "Detalhe opcional para enriquecer o footer sem virar badge falso.",
    usage: {
      section: "footer",
      purpose: "Acento de marca ou detalhe visual de encerramento.",
    },
  },
  {
    id: "footer-soft-texture-panel",
    title: "Textura suave do footer",
    category: "close",
    slot: "section-texture",
    ratio: "21:9",
    outputBaseName: "footer-soft-texture-panel",
    prompt:
      "Dark warm textured panel for premium clinic footer, deep mocha and brown gradient with subtle material grain, elegant and understated, no vignette gimmick, no visible pattern repetition.",
    notes: "Base visual para o fechamento quando o footer pedir mais corpo.",
    usage: {
      section: "footer",
      purpose: "Integrar melhor marca, mapas e contatos no bloco final.",
    },
  },
]);
