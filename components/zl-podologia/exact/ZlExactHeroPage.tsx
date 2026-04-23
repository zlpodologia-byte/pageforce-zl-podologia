"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal/Reveal";
import {
  ExactActionButton,
  ExactBrandMark,
  ExactGlyph,
  ExactProofCard,
  ExactScene,
} from "@/components/zl-podologia/exact/ZlExactAtoms";
import { zlLinks, zlLocation } from "@/components/zl-podologia/zlPodologiaContent";

const navItems = [
  { label: "A clinica", href: "#clinica" },
  { label: "Servicos", href: "#servicos" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Para voce", href: "#para-voce" },
  { label: "Contato", href: "#contato" },
] as const;

const trustItems = [
  { label: "Atendimento humanizado", icon: "heart" },
  { label: "Protocolos seguros", icon: "shield" },
  { label: "Tecnologia avancada", icon: "spark" },
  { label: "Ambiente acolhedor", icon: "home" },
] as const;

const treatmentChips = [
  { label: "Unha encravada", icon: "foot" },
  { label: "Podoprofilaxia", icon: "drop" },
  { label: "Fungos e micose", icon: "leaf" },
  { label: "Reflexologia podal", icon: "hands" },
  { label: "Laserterapia", icon: "spark" },
] as const;

export function ZlExactHeroPage() {
  return (
    <ExactScene className="bg-[linear-gradient(180deg,#fffdfc_0%,#fbf6f2_100%)]">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(240,215,207,0.75),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(228,201,190,0.5),transparent_24%),radial-gradient(circle_at_54%_100%,rgba(245,229,220,0.95),transparent_40%)]" />

        <div className="relative px-5 pb-8 pt-5 sm:px-8 md:px-10 md:pb-10 md:pt-6 lg:px-14 lg:pb-12 lg:pt-8 xl:px-16">
          <header className="flex items-center justify-between gap-5">
            <ExactBrandMark />

            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[0.74rem] uppercase tracking-[0.24em] text-[#78645e] transition-colors hover:text-[#d48678]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <ExactActionButton
              href={zlLinks.whatsappTopbar}
              label="Agendar avaliacao"
              kind="secondary"
              icon="calendar"
            />
          </header>

          <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-14">
            <Reveal as="div">
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#c69184]">
                Podologia clinica em Fortaleza
              </p>

              <h1
                className="mt-4 max-w-[12ch] text-[clamp(3.2rem,7vw,6rem)] leading-[0.91] tracking-[-0.055em] text-[#2f2623]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                Cuidado delicado
                <br />
                para os <span className="italic text-[#d48678]">pes</span> que
                <br />
                pedem alivio e
                <br />
                <span className="italic text-[#d48678]">atencao real.</span>
              </h1>

              <p className="mt-5 max-w-[34ch] text-[1rem] leading-[1.75] text-[#6e5d57] sm:text-[1.02rem]">
                Tratamentos especializados para unhas, pele e saude dos pes, com
                tecnologia, acolhimento e resultados que transformam sua rotina.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ExactActionButton
                  href={zlLinks.whatsapp}
                  label="Agendar avaliacao"
                  icon="calendar"
                />
                <ExactActionButton
                  href="#clinica"
                  label="Conhecer a clinica"
                  kind="secondary"
                  icon="arrow"
                />
              </div>

              <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {trustItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e8d7ce] bg-white text-[#d48678]">
                      <ExactGlyph kind={item.icon} className="h-4 w-4" />
                    </span>
                    <p className="pt-1 text-[0.82rem] leading-[1.45] text-[#6e5d57]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9">
                <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#c69184]">
                  Tratamos com excelencia
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {treatmentChips.map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e9ddd6] bg-white px-4 py-3 text-[0.8rem] text-[#6e5d57]"
                    >
                      <ExactGlyph kind={item.icon} className="h-3.5 w-3.5 text-[#d48678]" />
                      <span>{item.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal as="div" delay={100} className="relative">
              <div className="relative ml-auto w-full max-w-[660px] overflow-hidden rounded-[34px] border border-[#f0ddd4] bg-[#faf5f0] shadow-[0_30px_90px_rgba(121,79,65,0.18)]">
                <div className="relative aspect-[0.98]">
                  <Image
                    src="/zl-podologia/social/edited-pro/equipe/profissional-exame-frontal-pro.jpg"
                    alt="Profissional da ZL Podologia atendendo uma paciente com precisao e cuidado clinico"
                    fill
                    priority
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="object-cover object-[55%_32%]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(102deg,rgba(255,251,248,0.98)_0%,rgba(255,251,248,0.75)_28%,rgba(255,251,248,0.08)_56%,rgba(255,251,248,0.1)_100%)]" />
                <div className="pointer-events-none absolute bottom-5 left-5 rounded-[26px] border border-white/70 bg-white/82 p-4 shadow-[0_14px_32px_rgba(124,78,63,0.12)] backdrop-blur-sm">
                  <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#c69184]">
                    Fortaleza
                  </p>
                  <p
                    className="mt-1 text-[1.05rem] leading-[1.2] text-[#3b2e29]"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                  >
                    Atendimento
                    <br />
                    delicado e real.
                  </p>
                </div>
                <div className="pointer-events-none absolute bottom-5 right-5 hidden rounded-full border border-white/70 bg-white/70 px-3 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-[#8b726b] backdrop-blur sm:flex">
                  Atendimento clinico
                </div>
                <svg
                  className="pointer-events-none absolute bottom-0 right-0 h-44 w-44 text-white/86"
                  viewBox="0 0 220 220"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M55 165c12-34 25-56 38-76 14-21 28-36 46-46 15-8 34-11 53-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M95 194c-2-15 2-31 9-47 7-17 17-31 30-44 11-11 24-20 40-25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="59" cy="162" r="5" fill="currentColor" />
                  <circle cx="97" cy="130" r="5" fill="currentColor" />
                  <circle cx="135" cy="96" r="5" fill="currentColor" />
                  <circle cx="176" cy="68" r="5" fill="currentColor" />
                </svg>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid overflow-hidden rounded-[28px] border border-[#eadfd8] bg-[#fbf7f4] md:grid-cols-4">
            <ExactProofCard
              eyebrow="Avaliacao personalizada"
              title="Entendemos a causa do seu incomodo para tratar com precisao."
              body="Leitura clinica do caso antes de qualquer procedimento, com orientacao clara e sem pressa."
              icon="foot"
            />
            <ExactProofCard
              eyebrow="Google • 5,0"
              title="11 avaliacoes publicas"
              body="Atendimento delicado, explicacao simples e rotina de cuidado bem avaliada."
              icon="stars"
            />
            <ExactProofCard
              eyebrow="Horarios"
              title="Terca a sexta"
              body="09h as 16h\nSabado 09h as 12h"
              icon="clock"
            />
            <ExactProofCard
              eyebrow="Localizacao"
              title={`${zlLocation.district}, Fortaleza - CE`}
              body={`${zlLocation.address}\n${zlLocation.landmark}`}
              icon="pin"
            />
          </div>
        </div>
      </div>
    </ExactScene>
  );
}
