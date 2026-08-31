import { z } from "zod";

export const CATEGORY_COUNTS = {
  "conceitos-gerais": 40,
  "unha-encravada": 50,
  "calos-e-pressao": 45,
  "rachaduras-e-ressecamento": 40,
  "micose-e-unhas": 50,
  "pes-e-diabetes": 50,
  "cuidados-para-idosos": 35,
  "criancas-e-adolescentes": 30,
  "atletas-e-atividade-fisica": 35,
  "higiene-e-prevencao": 40,
  "atendimento-e-cuidados": 45,
  "intencoes-locais": 40,
} as const;

export const EXPECTED_INTENT_TOTAL = 500;

export const CATEGORY_ID_SCHEMA = z.enum(
  Object.keys(CATEGORY_COUNTS) as [
    keyof typeof CATEGORY_COUNTS,
    ...(keyof typeof CATEGORY_COUNTS)[],
  ],
);

export const SERVICE_ID_SCHEMA = z.enum([
  "ingrown",
  "fungus",
  "orthosis",
  "laser",
  "podoprofilaxia",
  "plantar_wart",
  "tungiasis",
  "reflexology",
  "diabetic",
]);

export const CONFIRMED_LOCATION_ID_SCHEMA = z.enum([
  "fortaleza",
  "parquelandia",
  "aldeota",
  "centro-fortaleza",
  "cidade-dos-funcionarios",
  "maraponga",
  "messejana",
]);

export const HEALTH_RISK_SCHEMA = z.enum(["routine", "attention", "urgent"]);
export const FUNNEL_STAGE_SCHEMA = z.enum([
  "discovery",
  "consideration",
  "local",
  "booking",
]);
export const TRAFFIC_PRIORITY_SCHEMA = z.enum([
  "high",
  "medium",
  "supporting",
]);

export const ZL_SEO_INTENT_SCHEMA = z.object({
  id: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  question: z.string().trim().min(1),
  searchIntent: z.string().trim().min(1),
  shortAnswer: z.string().trim().min(1),
  category: CATEGORY_ID_SCHEMA,
  relatedService: SERVICE_ID_SCHEMA.nullable(),
  relatedLocation: CONFIRMED_LOCATION_ID_SCHEMA.nullable(),
  canonicalUrl: z.string().url(),
  naturalTerms: z.array(z.string().trim().min(1)).min(2).max(8),
  professionalAlert: z.string().trim().min(1).nullable(),
  internalSourceId: z.string().trim().min(1),
  officialSourceIds: z.array(z.string().trim().min(1)),
  healthRisk: HEALTH_RISK_SCHEMA,
  funnelStage: FUNNEL_STAGE_SCHEMA,
  trafficPriority: TRAFFIC_PRIORITY_SCHEMA,
});

export const INTERNAL_SOURCE_SCHEMA = z.object({
  id: z.string().trim().min(1),
  canonicalUrl: z.string().url(),
  label: z.string().trim().min(1),
  evidencePath: z.string().trim().min(1),
});

export const OFFICIAL_SOURCE_SCHEMA = z.object({
  id: z.string().trim().min(1),
  organization: z.string().trim().min(1),
  title: z.string().trim().min(1),
  url: z.string().url(),
  language: z.enum(["pt-BR", "en"]),
  topics: z.array(z.string().trim().min(1)).min(1),
});

export const ENTITY_SCHEMA = z.object({
  name: z.string().trim().min(1),
  category: z.string().trim().min(1),
  canonicalUrl: z.string().url(),
  whatsappNumber: z.string().trim().min(1),
  phoneDisplay: z.string().trim().min(1),
  email: z.string().email(),
  instagram: z.string().url(),
  facebook: z.string().url(),
  address: z.object({
    streetAddress: z.string().trim().min(1),
    district: z.string().trim().min(1),
    city: z.string().trim().min(1),
    state: z.string().trim().min(1),
    country: z.string().trim().min(1),
    postalCode: z.string().trim().min(1),
    landmark: z.string().trim().min(1),
  }),
  openingHours: z.array(
    z.object({
      day: z.string().trim().min(1),
      hours: z.string().trim().min(1),
      tone: z.string().trim().min(1),
    }),
  ),
  services: z.array(z.string().trim().min(1)).min(1),
});

export type CategoryId = z.infer<typeof CATEGORY_ID_SCHEMA>;
export type ZlSeoIntent = z.infer<typeof ZL_SEO_INTENT_SCHEMA>;
export type InternalSource = z.infer<typeof INTERNAL_SOURCE_SCHEMA>;
export type OfficialSource = z.infer<typeof OFFICIAL_SOURCE_SCHEMA>;
export type ZlSeoEntity = z.infer<typeof ENTITY_SCHEMA>;
