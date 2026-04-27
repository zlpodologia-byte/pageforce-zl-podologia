export const SITE_NAME = "ZL Podologia";
export const SITE_URL = "https://www.zlpodologia.com.br";
export const SITE_DESCRIPTION =
  "Podologia clínica em Fortaleza, com atendimento individual, cuidado humanizado e foco em unha encravada, fungos, podoprofilaxia e reflexologia.";
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

interface OrganizationJsonLd {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  description: string;
}

export const PUBLIC_STATIC_ROUTES = [
  "/",
  "/unha-encravada-fortaleza",
  "/onicomicose-fortaleza",
  "/ortonixia-fortaleza",
  "/podoprofilaxia-fortaleza",
  "/pe-diabetico-fortaleza",
  "/podologia-aldeota",
  "/podologia-centro-fortaleza",
  "/podologia-cidade-dos-funcionarios",
  "/podologia-maraponga",
  "/podologia-messejana",
  "/politica-de-imagens",
] as const;

export const ORGANIZATION_JSON_LD: OrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

export function absoluteSiteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}
