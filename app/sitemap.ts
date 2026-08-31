import type { MetadataRoute } from "next";
import { PUBLIC_STATIC_ROUTES, absoluteSiteUrl } from "@/lib/site";

const MONTHLY = "monthly" as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_STATIC_ROUTES.map((pathname) => ({
    url: absoluteSiteUrl(pathname),
    changeFrequency: MONTHLY,
    priority: pathname === "/" ? 1 : 0.6,
  }));
}
