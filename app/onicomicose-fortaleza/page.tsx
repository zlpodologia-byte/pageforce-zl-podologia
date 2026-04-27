import type { Metadata } from "next";
import { ZlFungusServicePage } from "@/components/zl-podologia/ZlFungusServicePage";
import {
  ZL_FUNGUS_DESCRIPTION,
  ZL_FUNGUS_HERO_IMAGE,
  ZL_FUNGUS_PAGE_PATH,
  ZL_FUNGUS_PAGE_URL,
  zlFungusFaqs,
} from "@/components/zl-podologia/zlFungusServiceContent";
import {
  ZL_CANONICAL_URL,
  zlLocation,
} from "@/components/zl-podologia/zlPodologiaContent";

export const metadata: Metadata = {
  title: "Fungo na unha em Fortaleza | ZL Podologia",
  description: ZL_FUNGUS_DESCRIPTION,
  alternates: { canonical: ZL_FUNGUS_PAGE_PATH },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    siteName: "ZL Podologia Fortaleza",
    title: "Fungo na unha em Fortaleza | ZL Podologia",
    description: ZL_FUNGUS_DESCRIPTION,
    url: ZL_FUNGUS_PAGE_URL,
    images: [
      {
        url: ZL_FUNGUS_HERO_IMAGE,
        width: 1200,
        height: 900,
        alt: "Atendimento para fungo na unha na ZL Podologia Fortaleza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fungo na unha em Fortaleza | ZL Podologia",
    description: ZL_FUNGUS_DESCRIPTION,
    images: [ZL_FUNGUS_HERO_IMAGE],
  },
  other: {
    "geo.region": "BR-CE",
    "geo.placename": "Fortaleza",
    "geo.position": `${zlLocation.latitude};${zlLocation.longitude}`,
    ICBM: `${zlLocation.latitude}, ${zlLocation.longitude}`,
  },
};

type JsonLdObject = Record<string, unknown>;

function buildJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${ZL_FUNGUS_PAGE_URL}#webpage`,
        url: ZL_FUNGUS_PAGE_URL,
        name: "Fungo na unha em Fortaleza",
        description: ZL_FUNGUS_DESCRIPTION,
        inLanguage: "pt-BR",
        isPartOf: {
          "@type": "WebSite",
          name: "ZL Podologia Fortaleza",
          url: `${ZL_CANONICAL_URL}/`,
        },
        about: { "@id": `${ZL_FUNGUS_PAGE_URL}#service` },
        publisher: { "@id": `${ZL_CANONICAL_URL}#business` },
      },
      {
        "@type": "Service",
        "@id": `${ZL_FUNGUS_PAGE_URL}#service`,
        name: "Atendimento para fungo na unha em Fortaleza",
        alternateName: "Onicomicose",
        serviceType: "Podologia clínica",
        provider: { "@id": `${ZL_CANONICAL_URL}#business` },
        areaServed: {
          "@type": "City",
          name: "Fortaleza",
          addressRegion: "CE",
          addressCountry: "BR",
        },
        offers: [
          {
            "@type": "Offer",
            name: "Tratamento de fungos por unha",
            price: 100,
            priceCurrency: "BRL",
            url: ZL_FUNGUS_PAGE_URL,
          },
          {
            "@type": "Offer",
            name: "Protocolo avançado de fungos",
            price: 100,
            priceCurrency: "BRL",
            url: ZL_FUNGUS_PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${ZL_FUNGUS_PAGE_URL}#faq`,
        mainEntity: zlFungusFaqs.map((item) => ({
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
        "@id": `${ZL_FUNGUS_PAGE_URL}#breadcrumb`,
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
            name: "Fungo na unha em Fortaleza",
            item: ZL_FUNGUS_PAGE_URL,
          },
        ],
      },
    ],
  };
}

const SCHEMA_JSON_LD = buildJsonLd();

export default function Page() {
  return (
    <>
      <script
        id="onicomicose-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
      />
      <ZlFungusServicePage />
    </>
  );
}
