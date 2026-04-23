/**
 * Case data model.
 * Seeded with a small set of fictional placeholder cases. M4/M6 expand this
 * and may swap the source for a CMS adapter.
 * See docs/component-inventory.md "Content model".
 */

export type Category =
  | "Products"
  | "Experiences"
  | "Branding"
  | "Platform"
  | "E-commerce";

export type CaseAspect = "portrait" | "landscape" | "square";

export type CaseBlock =
  | { kind: "image"; src: string; alt: string; full?: boolean }
  | { kind: "video"; src: string; poster?: string; full?: boolean }
  | { kind: "two-col"; left: CaseBlock; right: CaseBlock }
  | {
      kind: "copy";
      heading?: string;
      body: string;
      align?: "left" | "center";
      tone?: "cream" | "dark" | "plain";
    }
  | { kind: "two-col"; left: CaseBlock; right: CaseBlock }
  | {
      kind: "headline";
      text: string;
      accent?: "strike" | "underline" | "none";
      tone?: "dark" | "light";
    }
  | { kind: "grid"; images: { src: string; alt: string }[]; cols?: 2 | 3 | 4 };

export interface CaseItem {
  slug: string;
  title: string;
  client: string;
  year: number;
  categories: Category[];
  summary: string;
  cover: string;
  video?: string;
  accent: string;
  aspect: CaseAspect;
  column?: 0 | 1 | 2;
  roles: string[];
  bgMode?: "dark" | "light" | "accent";
  content: CaseBlock[];
}

export const CATEGORIES: Category[] = [
  "Products",
  "Experiences",
  "Branding",
  "Platform",
  "E-commerce",
];

export const CATEGORY_SLUGS: Record<Category, string> = {
  Products: "products",
  Experiences: "experiences",
  Branding: "branding",
  Platform: "platform",
  "E-commerce": "e-commerce",
};

export function getCategorySlug(category: Category) {
  return CATEGORY_SLUGS[category];
}

export function getCategoryFromSlug(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  return (
    CATEGORIES.find(
      (category) =>
        CATEGORY_SLUGS[category] === normalized ||
        category.toLowerCase() === normalized,
    ) ?? null
  );
}

function caseCover(slug: string) {
  return `/cases/${slug}.jpg`;
}

export const CASES: CaseItem[] = [
  {
    slug: "north-star-observatory",
    title: "A living atlas of the night sky",
    client: "North Star Observatory",
    year: 2025,
    categories: ["Experiences", "Platform"],
    summary:
      "A real-time celestial map that invites visitors to navigate constellations, stellar events and archival imagery.",
    cover: caseCover("north-star-observatory"),
    accent: "#1F4FD6",
    aspect: "portrait",
    column: 0,
    roles: ["Design", "Engineering", "WebGL"],
    bgMode: "dark",
    content: [
      {
        kind: "image",
        src: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1800&q=80",
        alt: "Visitors looking across a blue-lit observatory installation.",
        full: true,
      },
      {
        kind: "copy",
        heading: "Brief",
        body: "North Star Observatory wanted a digital layer that felt closer to a planetarium than a brochure. We designed a guided atlas that turns upcoming celestial events, archived telescope captures and program schedules into one continuous nightly journey.",
        tone: "plain",
      },
      {
        kind: "two-col",
        left: {
          kind: "copy",
          heading: "Navigation",
          body: "The interface gives first-time visitors a calm route in while leaving room for experts to roam. Constellations, moments and stories all share the same structural language, so the experience can scale without becoming technical theater.",
          align: "left",
          tone: "cream",
        },
        right: {
          kind: "image",
          src: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1400&q=80",
          alt: "Deep blue sky with dense stars scattered across it.",
        },
      },
      {
        kind: "headline",
        text: "Let curiosity outrun the interface.",
        accent: "strike",
        tone: "dark",
      },
      {
        kind: "grid",
        cols: 3,
        images: [
          {
            src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
            alt: "Pink and blue nebula details.",
          },
          {
            src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=80",
            alt: "Mountain silhouette beneath a starlit sky.",
          },
          {
            src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
            alt: "Night sky reflected in a calm alpine lake.",
          },
        ],
      },
      {
        kind: "copy",
        heading: "Outcome",
        body: "The case page became a proof of atmosphere as much as clarity: a system that can hold a season of launches, school-night events and research notes while still feeling generous to the curious public.",
        tone: "dark",
      },
    ],
  },
  {
    slug: "meridian-coffee",
    title: "Brewed rituals, rendered daily",
    client: "Meridian Coffee",
    year: 2025,
    categories: ["Branding", "E-commerce"],
    summary:
      "A small-batch roaster's direct-to-consumer storefront built around origin storytelling and tactile typography.",
    cover: caseCover("meridian-coffee"),
    accent: "#C86B3A",
    aspect: "landscape",
    column: 1,
    roles: ["Identity", "E-commerce", "Content"],
    bgMode: "accent",
    content: [
      {
        kind: "copy",
        heading: "Setting the tone",
        body: "Meridian Coffee needed a storefront that felt as considered as its roasting notes. We leaned into pace, warmth and plainspoken product storytelling so every bag, subscription and journal entry could feel part of the same daily ritual.",
        tone: "cream",
      },
      {
        kind: "image",
        src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1800&q=80",
        alt: "Barista pouring a coffee in warm morning light.",
        full: true,
      },
      {
        kind: "two-col",
        left: {
          kind: "image",
          src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
          alt: "Pour-over setup on a wooden counter.",
        },
        right: {
          kind: "copy",
          heading: "Commerce",
          body: "The product flow lets tasting notes, origin details and recurring orders live together without friction. Subscription moments feel editorial rather than transactional, which helps the catalog stay generous even when the inventory rotates every week.",
          align: "left",
          tone: "plain",
        },
      },
      {
        kind: "headline",
        text: "Every roast got a quieter, richer stage.",
        tone: "light",
      },
      {
        kind: "grid",
        cols: 2,
        images: [
          {
            src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
            alt: "Espresso and pastry on a small cafe table.",
          },
          {
            src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80",
            alt: "Coffee beans spilling from a burlap sack.",
          },
          {
            src: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1200&q=80",
            alt: "Stacked coffee bags arranged on shelving.",
          },
          {
            src: "https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&w=1200&q=80",
            alt: "Hands holding a ceramic mug over a countertop.",
          },
        ],
      },
      {
        kind: "copy",
        heading: "Result",
        body: "The refreshed experience gave Meridian a dependable publishing rhythm: launch the roast, tell the story, and let the shop feel like the natural next step instead of a hard turn into checkout.",
        tone: "plain",
      },
    ],
  },
  {
    slug: "atlas-mobility",
    title: "A charging network people actually enjoy",
    client: "Atlas Mobility",
    year: 2024,
    categories: ["Products", "Platform"],
    summary:
      "Consumer app and operator dashboard for a pan-European fast-charging network.",
    cover: caseCover("atlas-mobility"),
    accent: "#24C58E",
    aspect: "portrait",
    column: 2,
    roles: ["Product", "Design System", "Native iOS/Android"],
    bgMode: "light",
    content: [
      {
        kind: "headline",
        text: "Charging stops became places to reset, not wait.",
        tone: "light",
      },
      {
        kind: "image",
        src: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=80",
        alt: "Electric vehicle charging beside a modern station.",
        full: true,
      },
      {
        kind: "copy",
        heading: "Challenge",
        body: "Atlas Mobility serves drivers, fleet teams and station operators with different levels of urgency. The redesign focused on reducing decision load in motion: clearer wayfinding before arrival, calmer station details on site and a more legible operational layer behind the scenes.",
        tone: "plain",
      },
      {
        kind: "two-col",
        left: {
          kind: "copy",
          heading: "Service layer",
          body: "We introduced a modular interface system that could flex across trip planning, live charger status and operator diagnostics. Each view keeps the same language of urgency, confidence and fallback so the product feels stable even when infrastructure is not.",
          align: "left",
          tone: "dark",
        },
        right: {
          kind: "image",
          src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80",
          alt: "Driver using a phone near an electric car.",
        },
      },
      {
        kind: "grid",
        cols: 3,
        images: [
          {
            src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
            alt: "Electric vehicle front profile parked on a clean street.",
          },
          {
            src: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
            alt: "Charging cable connected to a car close-up.",
          },
          {
            src: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?auto=format&fit=crop&w=1200&q=80",
            alt: "Dashboard-style lighting inside an electric vehicle cockpit.",
          },
        ],
      },
      {
        kind: "copy",
        heading: "Rollout",
        body: "The resulting platform gave Atlas one system for public touchpoints and operational control, with enough personality to feel optimistic without ever hiding the practical realities of charging on the move.",
        tone: "cream",
      },
    ],
  },
  {
    slug: "studio-halo",
    title: "A portfolio that behaves like a studio",
    client: "Studio Halo",
    year: 2024,
    categories: ["Branding", "Experiences"],
    summary:
      "Editorial portfolio for an interdisciplinary art direction studio.",
    cover: caseCover("studio-halo"),
    accent: "#E6DCC3",
    aspect: "square",
    column: 0,
    roles: ["Identity", "Website", "Editorial"],
    bgMode: "light",
    content: [],
  },
  {
    slug: "verdant-grocers",
    title: "Local produce, routed weekly",
    client: "Verdant Grocers",
    year: 2024,
    categories: ["E-commerce", "Platform"],
    summary: "Subscription commerce for seasonal boxes.",
    cover: caseCover("verdant-grocers"),
    accent: "#7AA24A",
    aspect: "landscape",
    column: 1,
    roles: ["Strategy", "E-commerce", "Logistics"],
    bgMode: "accent",
    content: [],
  },
  {
    slug: "harbor-financial",
    title: "Banking that reads like prose",
    client: "Harbor Financial",
    year: 2023,
    categories: ["Products", "Branding"],
    summary: "A private banking app rebuilt around quiet typography.",
    cover: caseCover("harbor-financial"),
    accent: "#3C4B5A",
    aspect: "portrait",
    column: 2,
    roles: ["Product", "Motion", "Brand"],
    bgMode: "dark",
    content: [],
  },
  {
    slug: "kinetic-museum",
    title: "An archive that breathes",
    client: "Kinetic Museum",
    year: 2023,
    categories: ["Experiences", "Platform"],
    summary: "Digital home for a kinetic-art archive.",
    cover: caseCover("kinetic-museum"),
    accent: "#3B0F2E",
    aspect: "landscape",
    column: 0,
    roles: ["Curation", "WebGL", "Engineering"],
    bgMode: "dark",
    content: [],
  },
  {
    slug: "field-notes-journal",
    title: "A weekly ritual, now interactive",
    client: "Field Notes Journal",
    year: 2023,
    categories: ["Experiences", "Branding"],
    summary: "Companion platform for a long-running print journal.",
    cover: caseCover("field-notes-journal"),
    accent: "#D4A76A",
    aspect: "portrait",
    column: 1,
    roles: ["Editorial", "Audio", "Subscription"],
    bgMode: "accent",
    content: [],
  },
  {
    slug: "relay-health",
    title: "A care journey, end to end",
    client: "Relay Health",
    year: 2022,
    categories: ["Products", "Platform"],
    summary: "Patient-clinician platform for triage, scheduling and after-care.",
    cover: caseCover("relay-health"),
    accent: "#4AA9B8",
    aspect: "square",
    column: 2,
    roles: ["Research", "Service Design", "Product"],
    bgMode: "light",
    content: [],
  },
  {
    slug: "orbital-toys",
    title: "Screen-free play, shipped in a box",
    client: "Orbital Toys",
    year: 2022,
    categories: ["Products", "E-commerce", "Branding"],
    summary: "D2C subscription of analog toys for busy families.",
    cover: caseCover("orbital-toys"),
    accent: "#F4D36A",
    aspect: "portrait",
    column: 0,
    roles: ["Brand", "E-commerce", "Packaging"],
    bgMode: "accent",
    content: [],
  },
  {
    slug: "linea-editorial",
    title: "An editorial system for a long life",
    client: "Linea",
    year: 2022,
    categories: ["Branding", "Platform"],
    summary:
      "Design system and CMS for a publication that wanted to still look sharp in a decade.",
    cover: caseCover("linea-editorial"),
    accent: "#0F0F10",
    aspect: "landscape",
    column: 1,
    roles: ["Design System", "CMS", "Editorial"],
    bgMode: "dark",
    content: [],
  },
  {
    slug: "tide-audio",
    title: "A listening app that respects the ear",
    client: "Tide Audio",
    year: 2021,
    categories: ["Products", "Experiences"],
    summary: "Curated ambient listening on mobile, with an honest subscription.",
    cover: caseCover("tide-audio"),
    accent: "#5E93B0",
    aspect: "portrait",
    column: 2,
    roles: ["Product", "Motion", "Sound"],
    bgMode: "dark",
    content: [],
  },
];

export function getCase(slug: string) {
  return CASES.find((c) => c.slug === slug);
}
