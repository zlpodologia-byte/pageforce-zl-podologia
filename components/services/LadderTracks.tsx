"use client";

import { JellyBorder } from "@/components/jelly-border/JellyBorder";
import { Reveal } from "@/components/reveal/Reveal";
import type { LadderStep } from "./servicesContent";

interface LadderTracksProps {
  entry: LadderStep[];
  consultive: LadderStep[];
}

interface LadderColumnProps {
  title: string;
  description: string;
  steps: LadderStep[];
}

function LadderColumn({ title, description, steps }: LadderColumnProps) {
  return (
    <div>
      <h3
        className="text-[clamp(1.4rem,2vw,1.85rem)] text-[var(--color-ink)]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>
      <p className="mt-3 max-w-[40ch] text-[0.95rem] leading-[1.55] text-[var(--color-muted)]">
        {description}
      </p>
      <ol className="mt-7 flex flex-col items-start gap-3">
        {steps.map((step, index) => (
          <Reveal key={step.label} delay={index * 50}>
            <JellyBorder
              width={320}
              height={50}
              radius={999}
              shape="rect"
              strokeColor="var(--color-ink)"
              strokeWidth={1}
              maxBulge={8}
              influence={120}
              driftAmp={0.8}
            >
              <div className="flex h-full w-full items-center justify-center px-5 text-[0.74rem] uppercase tracking-[0.22em] text-[var(--color-ink)]">
                {step.label}
              </div>
            </JellyBorder>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function LadderTracks({ entry, consultive }: LadderTracksProps) {
  return (
    <div>
      <header className="max-w-[58rem]">
        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Escada de valor
        </p>
        <h2
          className="mt-3 max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
          }}
        >
          Duas leituras complementares.
        </h2>
        <p className="mt-5 max-w-[42ch] text-[1rem] leading-[1.55] text-[var(--color-ink)]">
          A escada de entrada destrava conversão. A escada consultiva amplia ticket e retenção. Os dois caminhos sustentam a mesma engrenagem.
        </p>
      </header>
      <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-1 gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-2">
        <LadderColumn
          title="Escada de entrada"
          description="Para mercados sensíveis a ticket e prova rápida. Atrito baixo, fechamento ágil, crédito para upgrade."
          steps={entry}
        />
        <LadderColumn
          title="Escada consultiva"
          description="Para operações maiores e verticais valiosas. Ticket maior, escopo consultivo, retenção pesada."
          steps={consultive}
        />
      </div>
    </div>
  );
}
