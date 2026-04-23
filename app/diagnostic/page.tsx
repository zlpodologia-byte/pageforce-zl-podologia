import type { Metadata } from "next";
import { Reveal } from "@/components/reveal/Reveal";
import { DiagnosticForm } from "@/components/diagnostic/DiagnosticForm";
import {
  DIAGNOSTIC_KICKER,
  DIAGNOSTIC_HEADLINE,
  DIAGNOSTIC_LEAD,
  DIAGNOSTIC_OUTPUT_BLURB,
  DIAGNOSTIC_OUTPUT_ITEMS,
} from "@/components/diagnostic/diagnosticContent";

export const metadata: Metadata = {
  title: "Diagnóstico — Pageforce",
  description:
    "Diagnóstico comercial digital: score, dossiê e prova visual do problema antes de qualquer proposta.",
  alternates: { canonical: "/diagnostic" },
  openGraph: {
    title: "Diagnóstico — Pageforce",
    description:
      "O preço nasce do dado, não da tabela vazia. Diagnóstico antes de proposta.",
    url: "/diagnostic",
  },
};

export default function DiagnosticPage() {
  return (
    <section className="container-x pb-[clamp(5rem,8vw,8rem)] pt-[clamp(6.5rem,12vw,9.5rem)]">
      <header className="max-w-[60rem]">
        <Reveal
          as="p"
          className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]"
        >
          {DIAGNOSTIC_KICKER}
        </Reveal>
        <Reveal
          as="h1"
          delay={90}
          className="mt-4 max-w-[18ch] text-[clamp(2.6rem,7vw,5.4rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          {DIAGNOSTIC_HEADLINE}
        </Reveal>
        <Reveal
          as="p"
          delay={180}
          className="mt-8 max-w-[44ch] text-[clamp(1.05rem,1.5vw,1.32rem)] leading-[1.52] text-[var(--color-ink)]"
        >
          {DIAGNOSTIC_LEAD}
        </Reveal>
      </header>

      <div className="mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-1 items-start gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <DiagnosticForm />

        <aside>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            O que sai
          </p>
          <h2
            className="mt-3 max-w-[20ch] text-[clamp(1.6rem,2.4vw,2.2rem)] text-[var(--color-ink)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Cinco entregas curtas, comparáveis e práticas.
          </h2>
          <p className="mt-4 max-w-[44ch] text-[0.98rem] leading-[1.55] text-[var(--color-muted)]">
            {DIAGNOSTIC_OUTPUT_BLURB}
          </p>
          <ul className="mt-7 space-y-5">
            {DIAGNOSTIC_OUTPUT_ITEMS.map((item) => (
              <li key={item.label} className="border-t border-[var(--color-line)] pt-4">
                <p className="text-[0.78rem] uppercase tracking-[0.22em] text-[var(--color-ink)]">
                  {item.label}
                </p>
                <p className="mt-2 max-w-[44ch] text-[0.95rem] leading-[1.55] text-[var(--color-muted)]">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
