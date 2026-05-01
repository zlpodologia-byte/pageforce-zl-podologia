import type { Metadata } from "next";
import { ZlPodologiaLanding } from "@/components/zl-podologia/ZlPodologiaLanding";
import {
  ZL_CANONICAL_URL,
  ZL_GOOGLE_RATING,
  ZL_GOOGLE_REVIEW_COUNT,
  zlContact,
  zlFaq,
  zlLocation,
  zlScheduleSchema,
  zlInteractiveServices,
  zlLocalKeywords,
  zlPricingGroups,
} from "@/components/zl-podologia/zlPodologiaContent";

/* ------------------------------------------------------------------ */
/* SEO metadata v7a                                                    */
/* ------------------------------------------------------------------ */

const description =
  "Podologia clínica em Fortaleza (Parquelândia) para unha encravada, fungos, podoprofilaxia e reflexologia podal. 5,0 no Google, cuidado humanizado com Zucarina e Jannié. Agende pelo WhatsApp.";

export const metadata: Metadata = {
  title:
    "ZL Podologia - Podologia clínica em Fortaleza | Av. Bezerra de Menezes, Parquelândia",
  description,
  keywords: zlLocalKeywords as unknown as string[],
  authors: [{ name: "ZL Podologia" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "ZL Podologia Fortaleza",
    title:
      "ZL Podologia - Podologia clínica em Fortaleza | Parquelândia",
    description,
    url: ZL_CANONICAL_URL,
    images: [
      {
        // v8-hero-swap: OG primario agora e a Zucarina em acao
        // (profissional-close-autoridade-pro), que virou o hero oficial
        // da landing. A peca hero-editorial-tagline segue como asset
        // oficial de redes, mas o hero visual da landing principal e
        // clinico/humano.
        url: "/zl-podologia/social/edited-pro/equipe/profissional-close-autoridade-pro.jpg",
        width: 1200,
        height: 1256,
        alt: "Zucarina, podóloga da ZL Podologia Fortaleza, em atendimento clínico com jaleco, touca, máscara e luvas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZL Podologia - Fortaleza (Parquelândia) | 5,0 no Google",
    description,
    images: [
      "/zl-podologia/social/edited-pro/equipe/profissional-close-autoridade-pro.jpg",
    ],
  },
  other: {
    "theme-color": "#F8F7F4",
    "geo.region": "BR-CE",
    "geo.placename": "Fortaleza",
    "geo.position": `${zlLocation.latitude};${zlLocation.longitude}`,
    ICBM: `${zlLocation.latitude}, ${zlLocation.longitude}`,
  },
};

export const viewport = {
  themeColor: "#F8F7F4",
};

/* ------------------------------------------------------------------ */
/* Schema.org JSON-LD                                                  */
/* ------------------------------------------------------------------ */

type JsonLdValue = string | number | boolean | JsonLdObject | JsonLdArray;
interface JsonLdObject {
  [key: string]: JsonLdValue;
}
type JsonLdArray = JsonLdValue[];

function buildSchemaGraph(): JsonLdObject {
  // LocalBusiness + MedicalBusiness multi-type hookado na ficha oficial
  // de Fortaleza (Galeria Jose Bernardo, Parquelandia).
  // OfferCatalog v7-final: servicos reais do catalogo F organizados em
  // 3 buckets, cada linha com valor numerico (ou faixa) + descricao.
  const offerCatalog: JsonLdObject = {
    "@type": "OfferCatalog",
    name: "Servicos ZL Podologia",
    itemListElement: zlPricingGroups.flatMap((group) =>
      group.rows.map((row) => ({
        "@type": "Offer",
        name: row.label,
        description: row.note,
        category: group.title,
        priceCurrency: "BRL",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: row.price,
          priceCurrency: "BRL",
        },
      }))
    ),
  };

  const localBusiness: JsonLdObject = {
    "@type": ["LocalBusiness", "MedicalBusiness", "HealthAndBeautyBusiness"],
    "@id": `${ZL_CANONICAL_URL}#business`,
    name: "ZL Podologia",
    alternateName: "ZL Podologia Fortaleza",
    image: [
      // v8-hero-swap: imagem principal schema agora e a Zucarina em
      // atendimento clinico (hero da landing). hero-editorial-tagline
      // segue como 2o na galeria oficial.
      "https://www.zlpodologia.com.br/zl-podologia/social/edited-pro/equipe/profissional-close-autoridade-pro.jpg",
      "https://www.zlpodologia.com.br/zl-podologia/social/marca/hero-editorial-tagline.jpg",
      "https://www.zlpodologia.com.br/zl-podologia/social/edited-pro/procedimentos/rotativo-procedimento-pro.jpg",
      "https://www.zlpodologia.com.br/zl-podologia/social/edited-pro/ambiente/sala-wide-institucional-pro.jpg",
      "https://www.zlpodologia.com.br/zl-podologia/social/edited-pro/marca/fachada-clinica-sem-grade-2026-04-28.jpg",
    ],
    logo: "https://www.zlpodologia.com.br/zl-podologia/brand/zl-logo-green-seal-2026-04-26.png",
    url: ZL_CANONICAL_URL,
    telephone: "+5585994358505",
    email: zlContact.email,
    // v7-final: priceRange cobre o intervalo real (R$ 60 ortese simples
    // ate R$ 200 encravada com inflamacao).
    priceRange: "R$ 60-200",
    description,
    // 2026-04-30: aggregateRating habilitado pra ativar rich snippet de
    // estrelas no Google. Fonte unica em ZL_GOOGLE_RATING/COUNT.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ZL_GOOGLE_RATING.replace(",", "."),
      reviewCount: ZL_GOOGLE_REVIEW_COUNT,
      bestRating: "5",
      worstRating: "1",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: zlLocation.streetAddress,
      addressLocality: "Fortaleza",
      addressRegion: zlLocation.state,
      postalCode: zlLocation.zipcode,
      addressCountry: "BR",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Bairro",
        value: zlLocation.district,
      },
      {
        "@type": "PropertyValue",
        name: "Ponto de referencia",
        value: zlLocation.landmark,
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: zlLocation.latitude,
      longitude: zlLocation.longitude,
    },
    areaServed: {
      "@type": "City",
      name: "Fortaleza",
    },
    openingHoursSpecification: zlScheduleSchema.map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.day,
      opens: row.open,
      closes: row.close,
    })),
    sameAs: [
      "https://www.instagram.com/zlpodologia/",
      "https://www.facebook.com/zl.podologia",
      "https://linktr.ee/zlpodologia",
    ],
    // makesOffer = servicos principais como Offer plano (resumo).
    makesOffer: zlInteractiveServices.slice(0, 6).map((s) => ({
      "@type": "Offer",
      name: s.title,
      description: s.promise,
      price: s.price,
      priceCurrency: "BRL",
      category: "MedicalProcedure",
    })),
    // hasOfferCatalog = catalogo completo e preciso.
    hasOfferCatalog: offerCatalog,
  };

  const faqPage: JsonLdObject = {
    "@type": "FAQPage",
    "@id": `${ZL_CANONICAL_URL}#faq`,
    mainEntity: zlFaq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const webPage: JsonLdObject = {
    "@type": "WebPage",
    "@id": `${ZL_CANONICAL_URL}#webpage`,
    name: "ZL Podologia - Podologia clínica em Fortaleza",
    description,
    url: ZL_CANONICAL_URL,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: "ZL Podologia Fortaleza",
      url: "https://www.zlpodologia.com.br/",
    },
    about: { "@id": `${ZL_CANONICAL_URL}#business` },
    publisher: { "@id": `${ZL_CANONICAL_URL}#business` },
  };

  const zucarinaPerson: JsonLdObject = {
    "@type": "Person",
    "@id": `${ZL_CANONICAL_URL}#zucarina`,
    name: "Zucarina",
    jobTitle: "Podóloga",
    worksFor: { "@id": `${ZL_CANONICAL_URL}#business` },
    description:
      "Profissional competente que trata o cliente com atenção e delicadeza, nas palavras das pacientes.",
    // v7-final: foto pro autorizada (Codex manifest).
    image:
      "https://www.zlpodologia.com.br/zl-podologia/social/edited-pro/equipe/profissional-close-autoridade-pro.jpg",
  };

  const reflexologyPerson: JsonLdObject = {
    "@type": "Person",
    "@id": `${ZL_CANONICAL_URL}#reflexologia-podal`,
    name: "Jannié",
    jobTitle: "Reflexoterapeuta podal",
    worksFor: { "@id": `${ZL_CANONICAL_URL}#business` },
    description:
      "Reflexoterapeuta podal da ZL Podologia, atenciosa no cuidado de bem-estar e continuidade da experiência da clínica.",
    // v7-earthy: retrato autorizado da reflexoterapeuta podal.
    image:
      "https://www.zlpodologia.com.br/zl-podologia/social/equipe/jannie-retrato.jpg",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [localBusiness, webPage, faqPage, zucarinaPerson, reflexologyPerson],
  };
}

const SCHEMA_JSON_LD = buildSchemaGraph();

export default function ZlPodologiaPage() {
  return (
    <>
      {/* Schema.org JSON-LD — LocalBusiness + MedicalBusiness +
          FAQPage + Person. Colocado inline
          (App Router ainda nao expoe API pra <head> scripts em server
          components diretamente). */}
      <script
        type="application/ld+json"
        // Content-controlled, no XSS risk: JSON.stringify escapes </script>.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SCHEMA_JSON_LD).replace(/</g, "\\u003c"),
        }}
      />
      <ZlPodologiaLanding />
    </>
  );
}
