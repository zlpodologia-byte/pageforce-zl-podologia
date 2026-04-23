import type { Metadata } from "next";
import { Reveal } from "@/components/reveal/Reveal";
import { AgentEsteira } from "@/components/about/AgentEsteira";
import {
  ABOUT_KICKER,
  ABOUT_HEADLINE,
  ABOUT_LEAD,
  CLIENT_PROFILES,
  DIFFERENTIALS,
  AGENT_ESTEIRA,
} from "@/components/about/aboutContent";

export const metadata: Metadata = {
  title: "Quem somos — Pageforce",
  description:
    "Operação enxuta com esteira por agentes para construir e operar a engrenagem comercial digital de negócios locais e regionais.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Quem somos — Pageforce",
    description:
      "Como funciona a esteira de agentes que monta e opera a engrenagem comercial.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <section className="container-x pb-[clamp(5rem,8vw,8rem)] pt-[clamp(6.5rem,12vw,9.5rem)]">
      <header className="max-w-[66rem]">
        <Reveal
          as="p"
          className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]"
        >
          {ABOUT_KICKER}
        </Reveal>
        <Reveal
          as="h1"
          delay={90}
          className="mt-4 max-w-[22ch] text-[clamp(2.6rem,7vw,5.4rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          {ABOUT_HEADLINE}
        </Reveal>
        <Reveal
          as="p"
          delay={180}
          className="mt-8 max-w-[42ch] text-[clamp(1.05rem,1.5vw,1.32rem)] leading-[1.52] text-[var(--color-ink)]"
        >
          {ABOUT_LEAD}
        </Reveal>
      </header>

      <div className="mt-[clamp(4rem,9vw,7rem)] grid grid-cols-1 gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-[0.4fr_0.6fr]">
        <header>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Para quem é
          </p>
          <h2
            className="mt-3 max-w-[16ch] text-[clamp(1.85rem,3vw,2.6rem)] text-[var(--color-ink)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Operações que dependem de demanda recorrente.
          </h2>
        </header>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {CLIENT_PROFILES.map((profile) => (
            <li
              key={profile.label}
              className="border-t border-[var(--color-line)] pt-3 text-[0.95rem] text-[var(--color-ink)]"
            >
              {profile.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[clamp(5rem,10vw,8rem)]">
        <header className="max-w-[58rem]">
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Diferenciais
          </p>
          <h2
            className="mt-3 max-w-[20ch] text-[clamp(2rem,4vw,3.2rem)] text-[var(--color-ink)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            Cinco vetores que sustentam a oferta.
          </h2>
        </header>
        <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 gap-[clamp(1.5rem,3vw,2.5rem)] md:grid-cols-2 xl:grid-cols-5">
          {DIFFERENTIALS.map((diff, index) => (
            <li key={diff.title}>
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3
                className="mt-3 text-[clamp(1.2rem,1.6vw,1.45rem)] text-[var(--color-ink)]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                }}
              >
                {diff.title}
              </h3>
              <p className="mt-3 text-[0.92rem] leading-[1.55] text-[var(--color-muted)]">
                {diff.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[clamp(5rem,10vw,8rem)]">
        <header className="max-w-[58rem]">
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Esteira
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
            Seis funções, uma operação.
          </h2>
          <p className="mt-5 max-w-[42ch] text-[1rem] leading-[1.55] text-[var(--color-ink)]">
            Cada agente cobre um trecho do fluxo comercial. O checkpoint humano mantém qualidade, reputação e controle estratégico em cima da automação.
          </p>
        </header>
        <div className="mt-[clamp(2.5rem,5vw,4.5rem)]">
          <AgentEsteira agents={AGENT_ESTEIRA} />
        </div>
      </div>
    </section>
  );
}
