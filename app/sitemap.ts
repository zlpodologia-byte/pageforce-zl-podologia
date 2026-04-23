import type { MetadataRoute } from "next";
import { CASES } from "@/lib/cases";
import { PUBLIC_STATIC_ROUTES, absoluteSiteUrl } from "@/lib/site";

const MONTHLY = "monthly" as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_STATIC_ROUTES.map((pathname) => ({
    url: absoluteSiteUrl(pathname),
    lastModified,
    changeFrequency: MONTHLY,
    priority: pathname === "/" ? 1 : pathname === "/work" ? 0.9 : 0.7,
  }));

  const caseEntries: MetadataRoute.Sitemap = CASES.map((item) => ({
    url: absoluteSiteUrl(`/work/${item.slug}`),
    lastModified,
    changeFrequency: MONTHLY,
    priority: 0.7,
  }));

  return [...staticEntries, ...caseEntries];
}
