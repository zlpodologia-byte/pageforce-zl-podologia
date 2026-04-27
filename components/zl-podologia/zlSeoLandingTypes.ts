import type { ZlWhatsappSource } from "@/components/zl-podologia/zlPodologiaContent";

export interface ZlSeoPriceCard {
  label: string;
  value: string;
}

export interface ZlSeoChecklist {
  title: string;
  items: readonly string[];
  note?: string;
  tone?: "default" | "clinical" | "alert";
}

export interface ZlSeoStep {
  title: string;
  body: string;
}

export interface ZlSeoFaq {
  question: string;
  answer: string;
}

export interface ZlSeoOffer {
  name: string;
  price?: number;
  description?: string;
}

export interface ZlSeoLandingPageDefinition {
  path: `/${string}`;
  h1: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  locationNote: string;
  ctaLabel: string;
  ctaMessage: string;
  ctaSource: ZlWhatsappSource;
  heroImage: string;
  heroAlt: string;
  prices: readonly ZlSeoPriceCard[];
  primaryChecklist: ZlSeoChecklist;
  secondaryChecklist: ZlSeoChecklist;
  steps: readonly ZlSeoStep[];
  proof: {
    eyebrow: string;
    title: string;
    body: string;
    image: string;
    imageAlt: string;
  };
  faqs: readonly ZlSeoFaq[];
  schema: {
    serviceName: string;
    alternateName?: string;
    serviceType: string;
    offers: readonly ZlSeoOffer[];
  };
}
