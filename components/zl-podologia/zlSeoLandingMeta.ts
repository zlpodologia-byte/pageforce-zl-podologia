import type { Metadata } from "next";
import type { ZlSeoLandingPageDefinition } from "@/components/zl-podologia/zlSeoLandingTypes";
import {
  ZL_CANONICAL_URL,
  zlLocation,
} from "@/components/zl-podologia/zlPodologiaContent";

type JsonLdObject = Record<string, unknown>;

export function createZlSeoLandingMetadata(
  page: ZlSeoLandingPageDefinition,
): Metadata {
  const url = `${ZL_CANONICAL_URL}${page.path}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: "ZL Podologia Fortaleza",
      title: page.title,
      description: page.description,
      url,
      images: [
        {
          url: page.heroImage,
          width: 1200,
          height: 900,
          alt: page.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.heroImage],
    },
    other: {
      "geo.region": "BR-CE",
      "geo.placename": "Fortaleza",
      "geo.position": `${zlLocation.latitude};${zlLocation.longitude}`,
      ICBM: `${zlLocation.latitude}, ${zlLocation.longitude}`,
    },
  };
}

export function buildZlSeoLandingJsonLd(
  page: ZlSeoLandingPageDefinition,
): JsonLdObject {
  const url = `${ZL_CANONICAL_URL}${page.path}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.h1,
        description: page.description,
        inLanguage: "pt-BR",
        isPartOf: {
          "@type": "WebSite",
          name: "ZL Podologia Fortaleza",
          url: `${ZL_CANONICAL_URL}/`,
        },
        about: { "@id": `${url}#service` },
        publisher: { "@id": `${ZL_CANONICAL_URL}#business` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.schema.serviceName,
        alternateName: page.schema.alternateName,
        serviceType: page.schema.serviceType,
        provider: { "@id": `${ZL_CANONICAL_URL}#business` },
        areaServed: {
          "@type": "City",
          name: "Fortaleza",
          addressRegion: "CE",
          addressCountry: "BR",
        },
        offers: page.schema.offers.map((offer) => ({
          "@type": "Offer",
          name: offer.name,
          description: offer.description,
          ...(offer.price === undefined
            ? {}
            : { price: offer.price, priceCurrency: "BRL" }),
          url,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ZL Podologia",
            item: `${ZL_CANONICAL_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.h1,
            item: url,
          },
        ],
      },
    ],
  };
}
