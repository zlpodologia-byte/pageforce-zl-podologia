import Link from "next/link";
import { Suspense } from "react";
import { HeroModule } from "@/components/hero/HeroModule";
import { Reveal } from "@/components/reveal/Reveal";
import { CaseGrid } from "@/components/case-grid/CaseGrid";
import { ContactGrid } from "@/components/contact-grid/ContactGrid";
import { DeepDiveSplash } from "@/components/deep-dive-splash/DeepDiveSplash";
import { JellyBorder } from "@/components/jelly-border/JellyBorder";
import { StandardLandingWindows } from "@/components/showcases/StandardLandingWindows";
import { CASES } from "@/lib/cases";

export default function Home() {
  return (
    <>
      <HeroModule />

      <section className="container-x pb-[clamp(5rem,8vw,8rem)] pt-[clamp(3rem,7vw,5.5rem)]">
        <Reveal
          as="p"
          className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]"
        >
          A engrenagem em operação
        </Reveal>
        <Reveal
          as="h2"
          delay={90}
          className="mt-4 max-w-[11ch] text-[clamp(2.6rem,6vw,5rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
          }}
        >
          Casos reais de captação e conversão em operação.
        </Reveal>

        <div className="mt-[clamp(2.5rem,6vw,4rem)]">
          <Suspense fallback={<div className="h-[50vh]" />}>
            <CaseGrid items={CASES.slice(0, 6)} />
          </Suspense>
        </div>

        <div className="mt-[clamp(2.5rem,6vw,4rem)] flex justify-center">
          <JellyBorder
            width={232}
            height={54}
            radius={999}
            strokeColor="var(--color-ink)"
            strokeWidth={1.25}
            maxBulge={10}
            influence={140}
            driftAmp={1.2}
          >
            <Link
              href="/diagnostic"
              className="flex h-full w-full items-center justify-center text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-ink)]"
              data-cursor-target
            >
              Diagnosticar a operação
            </Link>
          </JellyBorder>
        </div>
      </section>

      <DeepDiveSplash />
      <StandardLandingWindows />
      <ContactGrid />
    </>
  );
}
