"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal/Reveal";
import {
  ZlPrimaryLink,
  ZlSecondaryLink,
  ZlStarIcon,
  ZlWhatsappIcon,
} from "@/components/zl-podologia/ZlCtaLink";
import { trackZlEvent } from "@/components/zl-podologia/ZlAnalytics";
import {
  buildQuizWhatsappLink,
  recommendServiceFromQuiz,
  zlBiosafetyItems,
  zlBiosafetyNote,
  zlComparePodology,
  zlInteractiveServices,
  zlLinks,
  zlProofStripItems,
  zlQuizCopy,
  zlQuizQuestions,
  zlSymptoms,
  zlTestimonials,
  zlTestimonialsCopy,
  type ZlBiosafetyItemKind,
  type ZlProofStripKind,
  type ZlServiceId,
  type ZlSymptomKind,
} from "@/components/zl-podologia/zlPodologiaContent";
import {
  ZlCompareColumn,
  ZlProofStripCard,
  ZlSceneEnvelope,
} from "@/components/zl-podologia/ZlV8Primitives";

/* ------------------------------------------------------------------ */
/* Deprecado: ZlTrustBar ? mantido como re-export pra cobertura de    */
/* imports legacy. Faixa fiduciaria v7a vive em ZlFiduciaryBar.tsx.    */
/* ------------------------------------------------------------------ */

export { ZlFiduciaryBar as ZlTrustBar } from "@/components/zl-podologia/ZlFiduciaryBar";

/* ------------------------------------------------------------------ */
/* 2. Biosseguranca section                                            */
/* ------------------------------------------------------------------ */

export function ZlBiosafetySection() {
  return (
    <section
      id="biosseguranca"
      className="relative border-t border-[#D9DAD7] bg-[#FFFFFF]"
    >
      <div className="container-x mx-auto max-w-[1440px] py-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <Reveal
              as="p"
              className="text-[0.66rem] uppercase tracking-[0.26em] text-[#0F6B46]"
            >
              Biossegurança
            </Reveal>
            <Reveal
              as="h2"
              delay={70}
              className="mt-4 max-w-[22ch] text-[clamp(2rem,3.6vw,3.3rem)] leading-[0.98] tracking-[-0.04em] text-[#26302B]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Protocolo de biossegurança hospitalar em Fortaleza.
            </Reveal>
            <Reveal
              as="p"
              delay={130}
              className="mt-4 max-w-[42ch] text-[0.98rem] leading-[1.65] text-[#6F746F]"
            >
              Sua segurança na ZL Podologia, em Parquelândia, não é opcional. O
              processo é visível, documentado e explicado durante o
              atendimento.
            </Reveal>

            <Reveal
              as="p"
              delay={200}
              className="mt-4 inline-flex items-start gap-2 rounded-[1rem] border border-[#D9DAD7] bg-white/80 px-4 py-3 text-[0.8rem] leading-[1.55] text-[#6F746F]"
            >
              <span className="mt-0.5 text-[#174F3F]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v4" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="0.8" fill="currentColor" />
                </svg>
              </span>
              <span>{zlBiosafetyNote}</span>
            </Reveal>

            {/* Photo card ? rotativo-procedimento-pro. */}
            <Reveal as="div" delay={260} className="mt-6">
              <div className="zl-integrated-photo zl-photo-feather aspect-[5/4] w-full">
                <Image
                  src="/zl-podologia/social/edited-pro/procedimentos/rotativo-procedimento-pro.jpg"
                  alt="Atendimento clínico na ZL Podologia em Fortaleza: motor rotativo profissional em uso e mão enluvada com EPI completo"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  loading="lazy"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(23,79,63,0.55)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 pb-3 text-white">
                  <p className="text-[0.66rem] uppercase tracking-[0.24em]">
                    Atendimento real ZL
                  </p>
                  <p className="text-[0.7rem] opacity-80">Instrumental rastreado</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {zlBiosafetyItems.map((item, idx) => {
              // v8-merge: metade dos icons (autoclave + kit) em rose mid
              // `#0F6B46` com bg rose tint; outra metade (ultrasound +
              // disposable) segue terroso. Fusao 50/50 de accent rose em
              // icons da secao.
              const useRose = item.kind === "autoclave" || item.kind === "kit";
              return (
              <Reveal
                key={item.kind}
                as="article"
                delay={idx * 70}
                className="group relative flex gap-4 rounded-[1.4rem] border border-[#D9DAD7] bg-white p-5 shadow-[0_14px_36px_rgba(23,79,63,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#0F6B46]"
              >
                <span
                  className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    useRose
                      ?"bg-[#FFF4EF] text-[#0F6B46]"
                      : "bg-[linear-gradient(135deg,#EFEAE4_0%,#D9DAD7_100%)] text-[#174F3F]"
                  }`}
                >
                  <BiosafetyIcon kind={item.kind} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.66rem] uppercase tracking-[0.22em] text-[#0F6B46]">
                    Etapa
                  </p>
                  <h3 className="mt-1 text-[1rem] font-medium leading-[1.3] text-[#26302B]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-[1.6] text-[#6F746F]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
              );
            })}

            {/* Apoio visual extra ? bandagem-instrumental-pro. */}
            <Reveal
              as="figure"
              delay={280}
              className="sm:col-span-2"
            >
              <div className="zl-integrated-photo zl-photo-feather aspect-[16/10] w-full">
                <Image
                  src="/zl-podologia/social/edited-pro/procedimentos/bandagem-instrumental-pro.jpg"
                  alt="Bandagem e instrumental em uso durante atendimento na ZL Podologia Fortaleza - kit individualizado por paciente"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  loading="lazy"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(23,79,63,0.5)_100%)]" />
              </div>
              <figcaption className="px-3 py-3 text-[0.78rem] leading-[1.55] text-[#6F746F]">
                Kit único por atendimento. Você vê o instrumental abrir diante
                de você.
              </figcaption>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function BiosafetyIcon({ kind }: { kind: ZlBiosafetyItemKind }) {
  switch (kind) {
    case "autoclave":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M8 10h1" strokeLinecap="round" />
        </svg>
      );
    case "ultrasound":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M4 13c2-2 4 2 6 0s4 2 6 0 4 2 4 2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 9c2-2 4 2 6 0s4 2 6 0 4 2 4 2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 17c2-2 4 2 6 0s4 2 6 0 4 2 4 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "kit":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <rect x="4" y="7" width="16" height="12" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeLinecap="round" />
          <path d="M12 11v6m-3-3h6" strokeLinecap="round" />
        </svg>
      );
    case "disposable":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M5 8h14l-1.5 11a2 2 0 0 1-2 1.8h-7a2 2 0 0 1-2-1.8L5 8Z" strokeLinejoin="round" />
          <path d="M3 8h18M9 5h6" strokeLinecap="round" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/* 2b. Ambiente ? trio editorial de fotos (v7a: reais HD do Codex)     */
/* ------------------------------------------------------------------ */

export function ZlAmbienteSection() {
  // Trio editorial v7-final ? fotos pro do Codex + original mantido:
  // - sala-wide-institucional-pro: wide da sala em operacao (Codex pro)
  // - escalda-pes-02 (original): ritual ? Codex nao editou essa
  // - profissional-contexto-humano-pro: Zucarina em contexto humano (Codex pro)
  const photos = [
    {
      src: "/zl-podologia/social/edited-pro/ambiente/sala-wide-institucional-pro.jpg",
      alt: "Sala de atendimento da ZL Podologia em Fortaleza com podóloga, paciente, ambiente institucional amplo e luz natural",
      caption: "Sala em operação",
      rotate: "md:-rotate-2",
      objectPosition: "center",
    },
    {
      src: "/zl-podologia/social/ambiente/escalda-pes-02.jpg",
      alt: "Ritual de escalda-pés com bacia branca, flor girassol e pétalas, na ZL Podologia Fortaleza",
      caption: "Escalda-pés morno",
      rotate: "md:rotate-1",
      objectPosition: "center",
    },
    {
      src: "/zl-podologia/social/edited-pro/equipe/profissional-contexto-humano-pro.jpg",
      alt: "Profissional da ZL Podologia em contexto humano de atendimento clínico em Fortaleza - presença e acolhimento",
      caption: "Uma paciente por vez",
      rotate: "md:rotate-[-1deg]",
      objectPosition: "center",
    },
  ] as const;

  return (
    <section
      id="ambiente"
      aria-label="Ambiente da clínica ZL Podologia em Fortaleza"
      className="relative border-t border-[#D9DAD7] bg-[#F8F7F4] py-8 lg:py-10"
    >
      <div className="container-x mx-auto max-w-[1600px]">
        <div className="relative py-8 md:py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <Reveal as="p" className="text-[0.66rem] uppercase tracking-[0.26em] text-[#0F6B46]">
              Ambiente
            </Reveal>
            <Reveal
              as="h2"
              delay={70}
              className="mt-4 max-w-[22ch] text-[clamp(2rem,3.6vw,3.3rem)] leading-[0.98] tracking-[-0.04em] text-[#26302B]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Um espaço pensado para o pé descansar antes de ser cuidado.
            </Reveal>
          </div>
          <Reveal
            as="p"
            delay={130}
            className="max-w-[54ch] text-[0.95rem] leading-[1.7] text-[#6F746F] lg:justify-self-end"
          >
            Sala silenciosa na Galeria José Bernardo (Parquelândia), poltrona
            reclinável, escalda-pés morno e bancada organizada. Você sabe onde
            está do início ao fim do atendimento.
          </Reveal>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, idx) => (
            <Reveal
              key={photo.src}
              as="figure"
              delay={idx * 80}
              className={`group relative transition-transform duration-500 [transition-timing-function:var(--ease-haptic)] hover:-translate-y-1 ${photo.rotate}`}
            >
              <div className="zl-integrated-photo zl-photo-feather aspect-[4/5] w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  loading="lazy"
                  style={{ objectPosition: photo.objectPosition }}
                  className="object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-haptic)] group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(23,79,63,0.55)_100%)]" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 pb-3 text-white">
                  <span className="text-[0.64rem] uppercase tracking-[0.22em]">
                    {photo.caption}
                  </span>
                  <span className="text-[0.64rem] uppercase tracking-[0.22em] opacity-70">
                    ZL Fortaleza
                  </span>
                </figcaption>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="figure"
          delay={240}
          className="mt-8 grid gap-8 border-t border-[#D9DAD7] pt-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] md:items-center"
        >
          <div className="zl-signature-photo aspect-[1.5] w-full">
            <Image
              src="/zl-podologia/social/antes-depois/feet-clean-02.jpg"
              alt="Pés bem cuidados em composição clara, com leitura editorial suave para a assinatura da ZL Podologia"
              fill
              sizes="(min-width: 1024px) 48vw, 90vw"
              loading="lazy"
              className="object-cover object-[50%_54%]"
            />
          </div>
          <figcaption className="flex flex-col gap-3 md:pr-4">
            <span className="text-[0.64rem] uppercase tracking-[0.26em] text-[#0F6B46]">
              Assinatura da clínica
            </span>
            <p
              className="text-[clamp(1.3rem,2.2vw,1.9rem)] leading-[1.15] tracking-[-0.03em] text-[#26302B]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              <span className="italic">&ldquo;Pés bem cuidados fazem toda a diferença.&rdquo;</span>
            </p>
            <p className="text-[0.9rem] leading-[1.65] text-[#6F746F]">
              Atendimento calmo, individual e atento aos detalhes do início ao
              fim.
            </p>
          </figcaption>
        </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Symptom-to-Solution grid                                         */
/* ------------------------------------------------------------------ */

export interface ZlSymptomGridProps {
  /**
   * Called when the user picks a symptom. Parent scrolls to the
   * ZlServiceExplorer and selects the primary service.
   */
  onPick: (serviceId: ZlServiceId) => void;
}

export function ZlSymptomGrid({ onPick }: ZlSymptomGridProps) {
  return (
    <section
      id="sintomas"
      className="relative border-t border-[#D9DAD7]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#EFEAE4_100%)]" />
      <div className="container-x relative mx-auto max-w-[1440px] py-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <Reveal
              as="p"
              className="text-[0.66rem] uppercase tracking-[0.26em] text-[#0F6B46]"
            >
              Comece por aqui
            </Reveal>
            <Reveal
              as="h2"
              delay={70}
              className="mt-4 max-w-[22ch] text-[clamp(2rem,3.6vw,3.3rem)] leading-[0.98] tracking-[-0.04em] text-[#26302B]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              O que está te incomodando agora?
            </Reveal>
          </div>
          <Reveal
            as="p"
            delay={130}
            className="max-w-[54ch] text-[0.95rem] leading-[1.7] text-[#6F746F] lg:justify-self-end"
          >
            Escolha o incômodo mais próximo para ver o cuidado mais indicado para o seu caso.
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {zlSymptoms.map((symptom, idx) => (
            <Reveal
              key={symptom.kind}
              as="div"
              delay={idx * 70}
              className="h-full"
            >
              <button
                type="button"
                onClick={() => onPick(symptom.primaryService)}
                className="group flex h-full w-full flex-col items-start gap-4 rounded-[1.4rem] border border-[#D9DAD7] bg-white p-5 text-left shadow-[0_14px_36px_rgba(23,79,63,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0F6B46] hover:shadow-[0_22px_54px_rgba(23,79,63,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6B46]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#174F3F_0%,#174F3F_100%)] text-white shadow-[0_8px_18px_rgba(23,79,63,0.28)]">
                  <SymptomIcon kind={symptom.kind} />
                </span>
                <div className="flex-1">
                  <h3 className="text-[1.05rem] font-medium leading-[1.3] text-[#26302B]">
                    {symptom.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-[1.6] text-[#6F746F]">
                    {symptom.body}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {symptom.related.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#D9DAD7] bg-[#EFEAE4] px-2.5 py-0.5 text-[0.68rem] tracking-[0.02em] text-[#0F6B46]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[0.78rem] font-medium text-[#174F3F] transition-transform duration-300 group-hover:translate-x-1">
                  Ver cuidado indicado -&gt;
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SymptomIcon({ kind }: { kind: ZlSymptomKind }) {
  switch (kind) {
    case "pain":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M13 3 5 13h6l-2 8 8-10h-6l2-8Z" strokeLinejoin="round" />
        </svg>
      );
    case "odor":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M6 14c0-4 3-7 6-7s6 3 6 7" strokeLinecap="round" />
          <path d="M4 18c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5" strokeLinecap="round" />
        </svg>
      );
    case "heel":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M6 5c5 0 9 4 9 9 0 3-2 6-5 6-4 0-4-3-4-5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 11c1 0 1.5 1 2.5 1" strokeLinecap="round" />
        </svg>
      );
    case "prevention":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 3 4 6v5c0 5 3 9 8 10 5-1 8-5 8-10V6l-8-3Z" strokeLinejoin="round" />
        </svg>
      );
    case "eventos":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/* 4. Jornada do Heroi - depoimentos longos                            */
/* ------------------------------------------------------------------ */

export function ZlHeroJourneySection() {
  return (
    <section className="relative border-t border-[#D9DAD7] bg-[#FFFFFF]">
      <div className="container-x mx-auto max-w-[1440px] py-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <Reveal
              as="p"
              className="text-[0.66rem] uppercase tracking-[0.26em] text-[#0F6B46]"
            >
              {zlTestimonialsCopy.eyebrow}
            </Reveal>
            <Reveal
              as="h2"
              delay={70}
              className="mt-4 max-w-[22ch] text-[clamp(2rem,3.6vw,3.3rem)] leading-[0.98] tracking-[-0.04em] text-[#26302B]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              {zlTestimonialsCopy.title}
            </Reveal>
          </div>
          <Reveal
            as="p"
            delay={130}
            className="max-w-[52ch] text-[0.95rem] leading-[1.7] text-[#6F746F] lg:justify-self-end"
          >
            {zlTestimonialsCopy.body}
          </Reveal>
        </div>

        {/* Reviews publicos reais do Google (ZL Podologia - 5,0 / 34 avaliacoes). */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {zlTestimonials.map((t, idx) => (
            <Reveal
              key={t.firstName}
              as="article"
              delay={idx * 80}
              className="group relative rounded-[1.8rem] bg-[#EFEAE4] p-1.5 ring-1 ring-[#D9DAD7] shadow-[0_26px_64px_-28px_rgba(23,79,63,0.35)] transition-transform duration-500 [transition-timing-function:var(--ease-haptic)] hover:-translate-y-0.5"
            >
              <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-[calc(1.8rem-0.375rem)] bg-white p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                {/* Decorative open-quote serif glyph ? v7-earthy: taupe delicado. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-2 text-[6rem] leading-none text-[#D9DAD7]/80 select-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;
                </span>

                <div className="relative flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#EFEAE4_0%,#D9DAD7_100%)] text-[#174F3F] ring-1 ring-[#0F6B46]/40"
                  >
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="9" r="3.2" />
                      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[0.94rem] font-medium text-[#26302B]">{t.firstName}</p>
                    <p className="text-[0.76rem] uppercase tracking-[0.18em] text-[#6F746F]">
                      {t.caption}
                    </p>
                  </div>
                  <div
                    className="ml-auto inline-flex items-center gap-0.5 text-[#8EA08E]"
                    aria-label={`${t.rating} de 5 estrelas`}
                  >
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <ZlStarIcon key={i} />
                    ))}
                  </div>
                </div>

                <p className="relative text-[0.95rem] leading-[1.72] text-[#6F746F]" style={{ textWrap: "pretty" }}>
                  &ldquo;{t.body}&rdquo;
                </p>

                <p className="relative mt-auto flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-[#6F746F]">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-3 w-3 items-center justify-center text-[#8EA08E]"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                      <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3Z" />
                    </svg>
                  </span>
                  <span>{t.source}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Botao "Ver todos os 11 no Google" */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ZlSecondaryLink
            href={zlLinks.googleBusinessProfile}
            label={zlTestimonialsCopy.allReviewsCta}
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3Z" />
              </svg>
            }
          />
          <p className="text-[0.8rem] leading-[1.55] text-[#6F746F]">
            Atendimento individual, com cuidado consistente em cada consulta.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Quiz diagnostico 3 min ? v7a: pergunta 2 localizacao + roteamento*/
/* ------------------------------------------------------------------ */

type QuizAnswers = {
  concern: string;
  location: string;
  history: string;
};

const emptyAnswers: QuizAnswers = {
  concern: "",
  location: "",
  history: "",
};

export function ZlDiagnosticQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(emptyAnswers);
  const startedRef = useRef(false);

  const total = zlQuizQuestions.length;
  const isResult = step >= total;

  const handlePick = (id: keyof QuizAnswers, value: string) => {
    // Fire quiz_start the first time someone answers anything.
    if (!startedRef.current) {
      startedRef.current = true;
      trackZlEvent("quiz_start");
    }
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      trackZlEvent("quiz_progress", { step: step + 1 });
      return next;
    });
    setStep((prev) => {
      const next = prev + 1;
      if (next >= total) {
        trackZlEvent("quiz_complete");
      }
      return next;
    });
  };

  const handleRestart = () => {
    setAnswers(emptyAnswers);
    setStep(0);
    startedRef.current = false;
  };

  return (
    <section id="quiz" className="relative border-t border-[#D9DAD7]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#EFEAE4_0%,#FFFFFF_100%)]" />
      <div className="container-x relative mx-auto max-w-[1400px] py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(18rem,0.58fr)_minmax(0,1.42fr)] lg:items-start">
          <div>
            <Reveal
              as="p"
              className="text-[0.66rem] uppercase tracking-[0.26em] text-[#0F6B46]"
            >
              {zlQuizCopy.eyebrow}
            </Reveal>
            <Reveal
              as="h2"
              delay={70}
              className="mt-4 max-w-[18ch] text-[clamp(2rem,3.6vw,3.3rem)] leading-[0.98] tracking-[-0.04em] text-[#26302B]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              {zlQuizCopy.title}
            </Reveal>
            <Reveal
              as="p"
              delay={130}
              className="mt-5 max-w-[36ch] text-[0.96rem] leading-[1.72] text-[#6F746F]"
            >
              {zlQuizCopy.body}
            </Reveal>
            <Reveal
              as="ol"
              delay={180}
              className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
            >
              {[
                {
                  title: "Relato",
                  body: "Você resume o que incomoda agora.",
                },
                {
                  title: "Foto quando ajuda",
                  body: "A clínica pode pedir uma imagem pelo WhatsApp.",
                },
                {
                  title: "Direcionamento",
                  body: "A equipe orienta o procedimento adequado.",
                },
              ].map((item, index) => (
                <li
                  key={item.title}
                  className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 border-t border-[#D9DAD7] pt-3"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9DAD7] bg-white text-[0.72rem] font-medium text-[#0F6B46]">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-[0.82rem] font-medium text-[#26302B]">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[0.74rem] leading-[1.45] text-[#6F746F]">
                      {item.body}
                    </span>
                  </span>
                </li>
              ))}
            </Reveal>
          </div>

          <Reveal
            as="div"
            delay={120}
            className="relative rounded-[2rem] bg-[linear-gradient(180deg,#EFEAE4_0%,#D9DAD7_100%)] p-1.5 ring-1 ring-[#0F6B46]/50 shadow-[0_30px_72px_-30px_rgba(23,79,63,0.45)]"
          >
            <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-white/95 p-5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] md:p-7">
            {/* Progress */}
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-[#EFEAE4]">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#174F3F_0%,#174F3F_100%)] transition-all duration-300"
                  style={{
                    width: `${Math.min(100, ((isResult ?total : step) / total) * 100)}%`,
                  }}
                />
              </div>
              <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[#0F6B46]">
                {isResult
                  ?"Concluído"
                  : zlQuizCopy.progress(Math.min(step + 1, total), total)}
              </span>
            </div>

            {isResult ?(
              <QuizResult answers={answers} onRestart={handleRestart} />
            ) : (
              <QuizStep
                question={zlQuizQuestions[step]}
                selectedValue={answers[zlQuizQuestions[step].id]}
                onPick={(value) => handlePick(zlQuizQuestions[step].id, value)}
              />
            )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function QuizStep({
  question,
  selectedValue,
  onPick,
}: {
  question: (typeof zlQuizQuestions)[number];
  selectedValue: string;
  onPick: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#174F3F]">
        Pergunta
      </p>
      <h3
        className="mt-2 text-[clamp(1.4rem,2.3vw,2rem)] leading-[1.15] tracking-[-0.02em] text-[#26302B]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {question.title}
      </h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {question.options.map((option) => {
          const active = option.value === selectedValue;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onPick(option.value)}
              className={`group relative rounded-[1.1rem] border px-4 py-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                active
                  ?"border-[#0F6B46] bg-[#EFEAE4] shadow-[0_12px_32px_rgba(23,79,63,0.22)]"
                  : "border-[#D9DAD7] bg-white hover:border-[#0F6B46]"
              }`}
              aria-pressed={active}
            >
              <span className="block text-[0.94rem] font-medium text-[#26302B]">
                {option.label}
              </span>
              <span className="mt-2 block text-[0.62rem] uppercase tracking-[0.16em] text-[#6F746F]">
                Selecionar -&gt;
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuizResult({
  answers,
  onRestart,
}: {
  answers: QuizAnswers;
  onRestart: () => void;
}) {
  const recommendedId = recommendServiceFromQuiz(answers);
  const recommended = zlInteractiveServices.find((s) => s.id === recommendedId);
  const href = buildQuizWhatsappLink(answers);
  const summaryItems = [
    { label: "Queixa", value: answers.concern },
    { label: "Onde", value: answers.location },
    { label: "Histórico", value: answers.history },
  ] as const;

  useEffect(() => {
    // Fire when the result is rendered ? useful for funnel drop-off.
    trackZlEvent("quiz_cta_click", { recommended_service: recommendedId });
    // We only want to fire on mount of the result.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#0F6B46]">
        {zlQuizCopy.resultEyebrow}
      </p>
      <h3
        className="mt-2 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-[#26302B]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {zlQuizCopy.resultTitle}
      </h3>

      {/* Servico recomendado com base nas 3 respostas. */}
      {recommended ?(
        <div className="mt-5 rounded-[1.2rem] border border-[#0F6B46] bg-[#EFEAE4] p-4">
          <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#174F3F]">
            Cuidado que mais combina com seu caso
          </p>
          <p className="mt-2 text-[1.05rem] font-medium text-[#26302B]">
            {recommended.menuLabel}
            <span className="ml-2 text-[0.84rem] font-normal text-[#6F746F]">
              {recommended.price}
            </span>
          </p>
          <p className="mt-2 text-[0.88rem] leading-[1.58] text-[#6F746F]">
            {recommended.pain}
          </p>
        </div>
      ) : null}

      <p className="mt-4 max-w-[42ch] text-[0.95rem] leading-[1.7] text-[#6F746F]">
        {zlQuizCopy.resultBody}
      </p>

      <div className="mt-6 rounded-[1rem] border border-[#D9DAD7] bg-[#FFFFFF] px-4 py-3">
        <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#6F746F]">
          Resumo rápido
        </p>
        <dl className="mt-3 grid gap-3 sm:grid-cols-3">
          {summaryItems.map((item, index) => (
            <div
              key={item.label}
              className={`min-w-0 ${index > 0 ?"sm:border-l sm:border-[#D9DAD7] sm:pl-4" : "sm:pr-4"}`}
            >
              <dt className="text-[0.64rem] uppercase tracking-[0.2em] text-[#6F746F]">
                {item.label}
              </dt>
              <dd className="mt-1 text-[0.9rem] font-medium text-[#26302B]">
                {item.value || "-"}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <ZlPrimaryLink
          href={href}
          label={zlQuizCopy.resultCta}
          icon={<ZlWhatsappIcon />}
        />
        <button
          type="button"
          onClick={onRestart}
          className="text-[0.82rem] font-medium text-[#0F6B46] underline-offset-4 hover:underline"
        >
          Refazer quiz
        </button>
      </div>
      <p className="mt-4 text-[0.78rem] leading-[1.55] text-[#6F746F]">
        O link abre o WhatsApp com suas respostas preenchidas para agilizar o
        atendimento.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* v8-merge: Proof strip 4-col                                         */
/* ------------------------------------------------------------------ */

/**
 * Faixa de prova editorial abaixo do hero. Paleta rose-wash como accent
 * terroso que reconhece pele/pe como materia-prima - nao dominante.
 * Fica ancorada entre o Hero (posicao 1) e a Faixa Fiduciaria (posicao
 * 2). Complementa a fiduciary bar: proof strip traz densidade mid-prova
 * com substancia editorial; fiduciary segue como micro-prova rapida.
 */
export function ZlProofStripSection() {
  return (
    <section
      aria-label="Quatro pontos de prova editorial sobre a ZL Podologia"
      className="relative bg-[#F8F7F4] px-3 pt-2 sm:px-4 md:px-6 md:pt-3"
    >
      <div className="mx-auto max-w-[1400px]">
        <ZlSceneEnvelope tone="rose-wash">
          <div className="grid md:grid-cols-4">
            {zlProofStripItems.map((item, idx) => (
              <Reveal
                key={item.kind}
                as="div"
                delay={idx * 80}
                className="contents"
              >
                <ZlProofStripCard
                  eyebrow={item.eyebrow}
                  title={item.title}
                  body={item.body}
                  icon={<ProofStripIcon kind={item.kind} />}
                />
              </Reveal>
            ))}
          </div>
        </ZlSceneEnvelope>
      </div>
    </section>
  );
}

function ProofStripIcon({ kind }: { kind: ZlProofStripKind }) {
  switch (kind) {
    case "google_stars":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="m12 3 2.2 4.4L19 8l-3.5 3.4.8 4.8L12 14l-4.3 2.3.8-4.8L5 8l4.8-.6L12 3Z" />
        </svg>
      );
    case "protocol":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8.4" />
          <path
            d="m8.5 12.3 2.2 2.2 4.8-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "individual":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M12 20s-7-4.3-7-9.7A4.3 4.3 0 0 1 12 6a4.3 4.3 0 0 1 7 4.3C19 15.7 12 20 12 20Z" />
        </svg>
      );
    case "location":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M12 21s6.8-6.2 6.8-11A6.8 6.8 0 1 0 5.2 10C5.2 14.8 12 21 12 21Z" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/* v8-merge: Benefícios da podologia clínica                           */
/* ------------------------------------------------------------------ */

/**
 * Secao educativa que contextualiza a podologia clinica sem comparar
 * com outras profissoes. Entra entre o Symptom Grid (posicao 4) e o
 * Service Explorer (posicao 5).
 */
export function ZlCompareSection() {
  return (
    <section
      id="comparativa"
      aria-label="Benefícios da podologia clínica na ZL"
      className="relative border-t border-[#D9DAD7] bg-[#FFFFFF]"
    >
      <div className="container-x mx-auto max-w-[1440px] py-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <Reveal
              as="p"
              className="text-[0.66rem] uppercase tracking-[0.26em] text-[#0F6B46]"
            >
              {zlComparePodology.eyebrow}
            </Reveal>
            <Reveal
              as="h2"
              delay={70}
              className="mt-4 max-w-[22ch] text-[clamp(2rem,3.6vw,3.2rem)] leading-[0.98] tracking-[-0.04em] text-[#26302B]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              {zlComparePodology.title}
            </Reveal>
          </div>
          <Reveal
            as="p"
            delay={130}
            className="max-w-[54ch] text-[0.95rem] leading-[1.7] text-[#6F746F] lg:justify-self-end"
          >
            {zlComparePodology.body}
          </Reveal>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <Reveal as="div" delay={80}>
            <ZlCompareColumn
              title={zlComparePodology.podology.title}
              subtitle={zlComparePodology.podology.subtitle}
              items={zlComparePodology.podology.items}
              good
            />
          </Reveal>
          <Reveal as="div" delay={160}>
            <ZlCompareColumn
              title={zlComparePodology.triage.title}
              subtitle={zlComparePodology.triage.subtitle}
              items={zlComparePodology.triage.items}
              good={false}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* unused imports guard (keep linter happy if zlLinks imported but not
   used in some build variants)                                         */
/* ------------------------------------------------------------------ */
export const _zlNewSectionsLinks = zlLinks;
