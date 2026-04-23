export const SITE_NAME = "ZL Podologia";
export const SITE_URL = "https://zlpodologia.com.br";
export const SITE_DESCRIPTION =
  "Podologia clínica em Fortaleza, com atendimento individual, cuidado humanizado e foco em unha encravada, fungos, podoprofilaxia e reflexologia.";
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

interface OrganizationJsonLd {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  description: string;
  founder: string;
  foundingDate: string;
}

export const PUBLIC_STATIC_ROUTES = ["/", "/politica-de-imagens"] as const;

export const ORGANIZATION_JSON_LD: OrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  founder: "ZL Podologia",
  foundingDate: "2026",
};

export function absoluteSiteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}
