import type { Metadata } from "next";
import { Reveal } from "@/components/reveal/Reveal";
import { OfferTiers } from "@/components/services/OfferTiers";
import { LadderTracks } from "@/components/services/LadderTracks";
import { ObjectionsFAQ } from "@/components/services/ObjectionsFAQ";
import {
  SERVICES_KICKER,
  SERVICES_HEADLINE,
  SERVICES_LEAD,
  OFFER_TIERS,
  ENTRY_LADDER,
  CONSULTIVE_LADDER,
  OBJECTIONS,
} from "@/components/services/servicesContent";

export const metadata: Metadata = {
  title: "Serviços — Pageforce",
  description:
    "Diagnóstico, oferta de entrada, oferta principal e recorrência. A engrenagem comercial digital em quatro níveis.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Serviços — Pageforce",
    description:
      "Como a Pageforce vende: por diagnóstico, em quatro níveis, com escada de valor de entrada e consultiva.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <section className="container-x pb-[clamp(5rem,8vw,8rem)] pt-[clamp(6.5rem,12vw,9.5rem)]">
      <header className="max-w-[66rem]">
        <Reveal
          as="p"
          className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]"
        >
          {SERVICES_KICKER}
        </Reveal>
        <Reveal
          as="h1"
          delay={90}
          className="mt-4 max-w-[14ch] text-[clamp(3rem,8vw,6.2rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          {SERVICES_HEADLINE}
        </Reveal>
        <Reveal
          as="p"
          delay={180}
          className="mt-8 max-w-[42ch] text-[clamp(1.05rem,1.5vw,1.36rem)] leading-[1.52] text-[var(--color-ink)]"
        >
          {SERVICES_LEAD}
        </Reveal>
      </header>

      <div className="mt-[clamp(4rem,9vw,7rem)]">
        <OfferTiers tiers={OFFER_TIERS} />
      </div>

      <div className="mt-[clamp(5rem,10vw,8rem)]">
        <LadderTracks entry={ENTRY_LADDER} consultive={CONSULTIVE_LADDER} />
      </div>

      <div className="mt-[clamp(5rem,10vw,8rem)]">
        <ObjectionsFAQ items={OBJECTIONS} />
      </div>
    </section>
  );
}
