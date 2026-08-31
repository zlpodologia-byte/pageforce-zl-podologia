import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import {
  ENTITY_SCHEMA,
  INTERNAL_SOURCE_SCHEMA,
  OFFICIAL_SOURCE_SCHEMA,
  ZL_SEO_INTENT_SCHEMA,
  type InternalSource,
  type OfficialSource,
  type ZlSeoEntity,
  type ZlSeoIntent,
} from "./schema";

const PROJECT_ROOT = fileURLToPath(new URL("../../", import.meta.url));
const DATA_ROOT = path.join(PROJECT_ROOT, "data", "zl-seo");

function readJson(filePath: string): unknown {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : "erro desconhecido";
    throw new Error(`Falha ao ler JSON em ${filePath}: ${message}`);
  }
}

function parseFile<T>(filePath: string, schema: z.ZodType<T>): T {
  const result = schema.safeParse(readJson(filePath));
  if (!result.success) {
    throw new Error(
      `Dados inválidos em ${filePath}: ${result.error.issues
        .map((item) => `${item.path.join(".")}: ${item.message}`)
        .join("; ")}`,
    );
  }
  return result.data;
}

export function loadZlSeoStaticData(): {
  entity: ZlSeoEntity;
  internalSources: InternalSource[];
  officialSources: OfficialSource[];
} {
  const entity = parseFile(path.join(DATA_ROOT, "entity.json"), ENTITY_SCHEMA);
  const internalSources = parseFile(
    path.join(DATA_ROOT, "internal-sources.json"),
    z.array(INTERNAL_SOURCE_SCHEMA),
  ).sort((left, right) => left.id.localeCompare(right.id));
  const officialSources = parseFile(
    path.join(DATA_ROOT, "official-sources.json"),
    z.array(OFFICIAL_SOURCE_SCHEMA),
  ).sort((left, right) => left.id.localeCompare(right.id));

  return { entity, internalSources, officialSources };
}

export function loadZlSeoIntents(): ZlSeoIntent[] {
  const intentsDirectory = path.join(DATA_ROOT, "intents");
  const fileNames = readdirSync(intentsDirectory)
    .filter((fileName) => fileName.endsWith(".json"))
    .sort((left, right) => left.localeCompare(right));

  return fileNames.flatMap((fileName) =>
    parseFile(
      path.join(intentsDirectory, fileName),
      z.array(ZL_SEO_INTENT_SCHEMA),
    ),
  );
}
