"use client";

import { JellyBorder } from "@/components/jelly-border/JellyBorder";
import { Reveal } from "@/components/reveal/Reveal";
import type { OfferTier } from "./servicesContent";

interface OfferTiersProps {
  tiers: OfferTier[];
}

export function OfferTiers({ tiers }: OfferTiersProps) {
  return (
    <div className="grid grid-cols-1 gap-[clamp(1.5rem,2.4vw,2.4rem)] sm:grid-cols-2 xl:grid-cols-4">
      {tiers.map((tier, index) => (
        <Reveal key={tier.title} delay={index * 90}>
          <JellyBorder
            width={300}
            height={340}
            radius={28}
            shape="rect"
            strokeColor="var(--color-line)"
            strokeWidth={1}
            maxBulge={14}
            influence={140}
            driftAmp={1.4}
          >
            <div className="flex h-full flex-col px-6 py-7">
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                {tier.level}
              </p>
              <h3
                className="mt-3 text-[clamp(1.55rem,2.2vw,1.95rem)] text-[var(--color-ink)]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                }}
              >
                {tier.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.55] text-[var(--color-ink)]">
                {tier.description}
              </p>
            </div>
          </JellyBorder>
        </Reveal>
      ))}
    </div>
  );
}
