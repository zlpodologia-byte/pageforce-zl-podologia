export const SITE_NAME = "Pageforce";
export const SITE_URL = "https://pageforce.studio";
export const SITE_DESCRIPTION =
  "Engrenagem comercial digital para negócios locais e regionais — site, SEO, WhatsApp, CRM, BI e automação operados como sistema.";
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

export const PUBLIC_STATIC_ROUTES = [
  "/",
  "/work",
  "/services",
  "/diagnostic",
  "/about",
  "/stories",
  "/product",
  "/contact",
] as const;

export const ORGANIZATION_JSON_LD: OrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  founder: "Pageforce team",
  foundingDate: "2018",
};

export function absoluteSiteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}
