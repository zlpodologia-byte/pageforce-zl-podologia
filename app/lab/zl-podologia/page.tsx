import type { Metadata } from "next";
import { ZlPodologiaLanding } from "@/components/zl-podologia/ZlPodologiaLanding";
import {
  ZL_CANONICAL_URL,
  zlContact,
  zlFaq,
  zlLocation,
  zlScheduleSchema,
  zlTestimonials,
  zlInteractiveServices,
  zlLocalKeywords,
  zlPricingGroups,
} from "@/components/zl-podologia/zlPodologiaContent";

/* ------------------------------------------------------------------ */
/* SEO metadata v7a                                                    */
/* ------------------------------------------------------------------ */

const description =
  "Podologia clinica em Fortaleza (Parquelandia) para unha encravada, fungos, podoprofilaxia e reflexologia. 5,0 no Google, cuidado humanizado com Zucarina e Jannie. Agende pelo WhatsApp.";

export const metadata: Metadata = {
  title:
    "ZL Podologia - Podologia clinica em Fortaleza | Av. Bezerra de Menezes, Parquelandia",
  description,
  keywords: zlLocalKeywords as unknown as string[],
  authors: [{ name: "ZL Podologia" }],
  alternates: { canonical: "/lab/zl-podologia" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "ZL Podologia Fortaleza",
    title:
      "ZL Podologia - Podologia clinica humanizada em Fortaleza / Parquelandia",
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
        alt: "Zucarina, podologa da ZL Podologia Fortaleza, em atendimento clinico com jaleco, touca, mascara e luvas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZL Podologia - Fortaleza (Parquelandia) | 5,0 no Google",
    description,
    images: [
      "/zl-podologia/social/edited-pro/equipe/profissional-close-autoridade-pro.jpg",
    ],
  },
  other: {
    "theme-color": "#F2EBDE",
    "geo.region": "BR-CE",
    "geo.placename": "Fortaleza",
    "geo.position": `${zlLocation.latitude};${zlLocation.longitude}`,
    ICBM: `${zlLocation.latitude}, ${zlLocation.longitude}`,
  },
};

export const viewport = {
  themeColor: "#F2EBDE",
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
  // LocalBusiness + MedicalBusiness multi-type com AggregateRating e
  // reviews reais embutidos (os 3 do Google). Hookado na ficha oficial
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
      "https://pageforce.paperclip.app/zl-podologia/social/edited-pro/equipe/profissional-close-autoridade-pro.jpg",
      "https://pageforce.paperclip.app/zl-podologia/social/marca/hero-editorial-tagline.jpg",
      "https://pageforce.paperclip.app/zl-podologia/social/edited-pro/procedimentos/rotativo-procedimento-pro.jpg",
      "https://pageforce.paperclip.app/zl-podologia/social/edited-pro/ambiente/sala-wide-institucional-pro.jpg",
      "https://pageforce.paperclip.app/zl-podologia/social/edited-pro/marca/fachada-clinica-pro.jpg",
    ],
    logo: "https://pageforce.paperclip.app/zl-podologia/social/marca/logo-oficial.jpg",
    url: ZL_CANONICAL_URL,
    telephone: "+5585994358505",
    email: zlContact.email,
    // v7-final: priceRange cobre o intervalo real (R$ 60 ortese simples
    // ate R$ 200 encravada com inflamacao).
    priceRange: "R$ 60-200",
    description,
    address: {
      "@type": "PostalAddress",
      streetAddress: zlLocation.streetAddress,
      addressLocality: zlLocation.district,
      addressRegion: zlLocation.state,
      postalCode: zlLocation.zipcode,
      addressCountry: "BR",
    },
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5,
      bestRating: 5,
      worstRating: 1,
      reviewCount: 11,
    },
    review: zlTestimonials.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.fullAuthor,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
      reviewBody: t.body,
      datePublished: t.datePublished,
      publisher: {
        "@type": "Organization",
        name: "Google",
      },
    })),
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
    name: "ZL Podologia - Podologia clinica em Fortaleza",
    description,
    url: ZL_CANONICAL_URL,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: "ZL Podologia Fortaleza",
      url: "https://pageforce.paperclip.app/",
    },
    about: { "@id": `${ZL_CANONICAL_URL}#business` },
    publisher: { "@id": `${ZL_CANONICAL_URL}#business` },
  };

  const zucarinaPerson: JsonLdObject = {
    "@type": "Person",
    "@id": `${ZL_CANONICAL_URL}#zucarina`,
    name: "Zucarina",
    jobTitle: "Podologa",
    worksFor: { "@id": `${ZL_CANONICAL_URL}#business` },
    description:
      "Profissional competente que trata o cliente com atencao e delicadeza, nas palavras das pacientes.",
    // v7-final: foto pro autorizada (Codex manifest).
    image:
      "https://pageforce.paperclip.app/zl-podologia/social/edited-pro/equipe/profissional-close-autoridade-pro.jpg",
  };

  const janniePerson: JsonLdObject = {
    "@type": "Person",
    "@id": `${ZL_CANONICAL_URL}#jannie`,
    name: "Jannie",
    jobTitle: "Podologa",
    worksFor: { "@id": `${ZL_CANONICAL_URL}#business` },
    description:
      "Atenciosa e cuidadosa no atendimento - citada nominalmente nas avaliacoes publicas da clinica.",
    // v7-earthy: Jannie agora tem retrato autorizado.
    image:
      "https://pageforce.paperclip.app/zl-podologia/social/equipe/jannie-retrato.jpg",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [localBusiness, webPage, faqPage, zucarinaPerson, janniePerson],
  };
}

const SCHEMA_JSON_LD = buildSchemaGraph();

export default function ZlPodologiaPage() {
  return (
    <>
      {/* Schema.org JSON-LD — LocalBusiness + MedicalBusiness +
          AggregateRating + Review + FAQPage + Person. Colocado inline
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
