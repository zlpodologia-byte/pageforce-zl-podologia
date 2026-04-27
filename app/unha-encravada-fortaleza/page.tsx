import type { Metadata } from "next";
import { ZlIngrownServicePage } from "@/components/zl-podologia/ZlIngrownServicePage";
import {
  ZL_INGROWN_DESCRIPTION,
  ZL_INGROWN_HERO_IMAGE,
  ZL_INGROWN_PAGE_PATH,
  ZL_INGROWN_PAGE_URL,
  zlIngrownFaqs,
} from "@/components/zl-podologia/zlIngrownServiceContent";
import {
  ZL_CANONICAL_URL,
  zlLocation,
} from "@/components/zl-podologia/zlPodologiaContent";

export const metadata: Metadata = {
  title: "Unha encravada em Fortaleza | ZL Podologia",
  description: ZL_INGROWN_DESCRIPTION,
  alternates: { canonical: ZL_INGROWN_PAGE_PATH },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    siteName: "ZL Podologia Fortaleza",
    title: "Unha encravada em Fortaleza | ZL Podologia",
    description: ZL_INGROWN_DESCRIPTION,
    url: ZL_INGROWN_PAGE_URL,
    images: [
      {
        url: ZL_INGROWN_HERO_IMAGE,
        width: 1200,
        height: 900,
        alt: "Atendimento podológico para unha encravada na ZL Podologia Fortaleza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unha encravada em Fortaleza | ZL Podologia",
    description: ZL_INGROWN_DESCRIPTION,
    images: [ZL_INGROWN_HERO_IMAGE],
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
        "@id": `${ZL_INGROWN_PAGE_URL}#webpage`,
        url: ZL_INGROWN_PAGE_URL,
        name: "Unha encravada em Fortaleza",
        description: ZL_INGROWN_DESCRIPTION,
        inLanguage: "pt-BR",
        isPartOf: {
          "@type": "WebSite",
          name: "ZL Podologia Fortaleza",
          url: `${ZL_CANONICAL_URL}/`,
        },
        about: { "@id": `${ZL_INGROWN_PAGE_URL}#service` },
        publisher: { "@id": `${ZL_CANONICAL_URL}#business` },
      },
      {
        "@type": "Service",
        "@id": `${ZL_INGROWN_PAGE_URL}#service`,
        name: "Atendimento para unha encravada em Fortaleza",
        alternateName: "Onicocriptose",
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
            name: "Unha encravada grau 1",
            price: 150,
            priceCurrency: "BRL",
            url: ZL_INGROWN_PAGE_URL,
          },
          {
            "@type": "Offer",
            name: "Unha encravada graus 2 e 3",
            price: 200,
            priceCurrency: "BRL",
            url: ZL_INGROWN_PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${ZL_INGROWN_PAGE_URL}#faq`,
        mainEntity: zlIngrownFaqs.map((item) => ({
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
        "@id": `${ZL_INGROWN_PAGE_URL}#breadcrumb`,
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
            name: "Unha encravada em Fortaleza",
            item: ZL_INGROWN_PAGE_URL,
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
        id="unha-encravada-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
      />
      <ZlIngrownServicePage />
    </>
  );
}
