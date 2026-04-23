"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal/Reveal";
import {
  ZlInstagramIcon,
  ZlPinIcon,
  ZlPrimaryLink,
  ZlSecondaryLink,
  ZlStarIcon,
  ZlWhatsappIcon,
} from "@/components/zl-podologia/ZlCtaLink";
import { ZlCaseArtwork } from "@/components/zl-podologia/ZlClinicIllustrations";
import { trackZlEvent } from "@/components/zl-podologia/ZlAnalytics";
import {
  zlBrandSignature,
  zlConsultFlow,
  zlContact,
  zlFaq,
  zlHoursRows,
  zlIllustratedCases,
  zlLinks,
  zlLocation,
  zlPodologyFacts,
  zlPricingFooterNotes,
  zlPricingGroups,
  zlProfessionals,
  zlPromessaPivot,
  zlTeamHeadline,
  zlTeamValues,
  zlTrustPoints,
  zlUrgencyCopy,
  type ZlProfessional,
} from "@/components/zl-podologia/zlPodologiaContent";
import { ZlOpenStatus } from "@/components/zl-podologia/ZlOpenStatus";
import { ZlSceneEnvelope } from "@/components/zl-podologia/ZlV8Primitives";

/* ------------------------------------------------------------------ */
/* Quick trust strip - DEPRECADO v7a                                   */
/* Mantido como no-op pra cobertura de imports legacy (o uso foi       */
/* removido da landing).                                               */
/* ------------------------------------------------------------------ */

export function ZlQuickStrip() {
  // Deprecado em v7a ? a faixa fiduciaria consolidou TrustBar + QuickStrip
  // em um unico componente (`ZlFiduciaryBar`).
  return null;
}

/* ------------------------------------------------------------------ */
/* Trust section                                                       */
/* ------------------------------------------------------------------ */

export function ZlTrustSection() {
  return (
    <section className="container-x py-10 lg:py-14">
      {/* v7-refine: max-w cap em telas wide. v7-vfix: headline + pivot no
          topo, full-width. Trust points viram grid de 3 colunas no
          desktop. */}
      <div className="mx-auto max-w-[1440px] grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
        <SectionIntro
          eyebrow="Informações essenciais"
          title="Endereço, horário e forma de atendimento."
          body="Endereço, horário, forma de atendimento e sinais de cuidado da clínica."
        />

        {/* Pivot v7-earthy ? ancora explicita nos 4 prioritarios.
            Paleta terrosa elegante. */}
        <Reveal
          as="div"
          delay={180}
          className="rounded-[1.2rem] border border-[#D2C3A6] bg-[#E6DBC6] px-5 py-4 text-[0.96rem] leading-[1.55] text-[#5C4A38] lg:justify-self-end lg:max-w-[44ch]"
        >
          <p
            className="text-[0.98rem] italic leading-[1.55] text-[#3A2E23]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {zlPromessaPivot}
          </p>
        </Reveal>
      </div>

      {/* Trust points em grid de 2 colunas (desktop) + 3 colunas (xl) ?
          aproveita toda a largura da secao e elimina whitespace lateral. */}
      <div className="mx-auto mt-8 grid max-w-[1440px] gap-4 md:grid-cols-2 xl:grid-cols-3">
        {zlTrustPoints.map((point, index) => (
          <Reveal
            key={point}
            as="div"
            delay={index * 70}
            className="flex items-start gap-4 rounded-[1.35rem] border border-[#D2C3A6] bg-white px-5 py-5 text-[0.96rem] leading-[1.65] text-[#5C4A38] shadow-[0_12px_32px_rgba(138,108,72,0.08)]"
          >
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6DBC6] text-[0.72rem] font-medium text-[#7A6244]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{point}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cases section - antes/depois ilustrado                              */
/* ------------------------------------------------------------------ */

/**
 * Card de caso com fotos reais ? v7-refine.
 *
 * Quando a case entry traz beforePhoto/afterPhoto, renderizamos as fotos
 * reais dentro do mesmo container bezel (taupe/areia) preservando
 * o mood visual do ZlCaseArtwork. Fallback para o SVG 2D quando nao ha
 * foto disponivel (cobertura defensiva, nao esperado na v7-refine).
 */
function ZlCasePhotoPair({
  beforePhoto,
  afterPhoto,
  beforeLabel,
  afterLabel,
  tag,
}: {
  beforePhoto: { src: string; alt: string };
  afterPhoto: { src: string; alt: string };
  beforeLabel: string;
  afterLabel: string;
  tag: string;
}) {
  // Podoprofilaxia não tem antes/depois dramático - trocamos rótulos para
  // Procedimento / Resultado quando a tag é "Experiência".
  const isExperience = tag === "Experiência";
  const firstTitle = isExperience ?"Procedimento" : "Antes";
  const secondTitle = isExperience ?"Resultado" : "Depois";

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[#D2C3A6] bg-white">
      <div className="grid md:grid-cols-2">
        <CasePhotoHalf
          tone="before"
          title={firstTitle}
          body={beforeLabel}
          photo={beforePhoto}
        />
        <CasePhotoHalf
          tone="after"
          title={secondTitle}
          body={afterLabel}
          photo={afterPhoto}
        />
      </div>
    </div>
  );
}

function CasePhotoHalf({
  tone,
  title,
  body,
  photo,
}: {
  tone: "before" | "after";
  title: string;
  body: string;
  photo: { src: string; alt: string };
}) {
  // v7-earthy: ANTES em taupe (#D2C3A6) com label marrom escuro, DEPOIS em
  // areia claro (#F2EBDE) com label verde-oliva. Contraste visual claro
  // para leitura antes/depois. Verde-oliva complementa o terroso sem
  // virar rose/azul.
  const background = tone === "before" ?"#D2C3A6" : "#F2EBDE";
  const accent = tone === "before" ?"#574433" : "#7A8459";
  const textTone = tone === "before" ?"#3A2E23" : "#574433";

  return (
    <div className="p-4" style={{ background }}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.66rem] uppercase tracking-[0.24em]" style={{ color: textTone }}>
          {title}
        </p>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
      </div>
      <div className="mt-3 overflow-hidden rounded-[1.1rem] border border-white/70 bg-white/70">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            loading="lazy"
            className="object-cover"
          />
        </div>
      </div>
      <p className="mt-3 text-[0.84rem] leading-[1.5]" style={{ color: textTone }}>
        {body}
      </p>
    </div>
  );
}

export function ZlCasesSection() {
  return (
    <section className="relative border-t border-[#D2C3A6] bg-[#F2EBDE] py-8 lg:py-10">
      {/* v8-merge B.1: envelope ExactScene wrap na secao de Cases.
          Cartao branco 34px com shadow warm envolve os 3 cases
          antes/depois. Eyebrow rose `#B8837A` nas tag labels (era
          `#7A6244`). Fundo externo mantem `#F2EBDE` v7-earthy. */}
      <div className="container-x relative mx-auto max-w-[1400px] px-3 sm:px-4 md:px-6">
        <ZlSceneEnvelope>
          <div className="relative">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#E6DBC6_0%,#FAF7F2_100%)]" />
            <div className="relative px-5 py-8 sm:px-8 md:px-10 md:py-10 lg:px-14 lg:py-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <SectionIntro
            eyebrow="Prova visual honesta"
            title="Aqui o antes e depois entra como explicacao, nao como promessa."
            body="Fotos reais publicadas pela ZL com autorizacao, do mesmo protocolo aplicado em cada atendimento. O texto dourado nas imagens e parte da arte original da marca."
          />
          <Reveal
            as="p"
            delay={120}
            className="max-w-[54ch] text-[0.92rem] leading-[1.65] text-[#5C4A38] lg:justify-self-end"
          >
            Cada caso carrega uma nota clara sobre o que esperar. Resultado de cada pe depende do historico, do tempo e da continuidade do cuidado.
          </Reveal>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {zlIllustratedCases.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              delay={index * 80}
              className="rounded-[1.7rem] border border-[rgba(198,145,132,0.24)] bg-white p-5 shadow-[0_20px_50px_rgba(138,108,72,0.1)]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#B8837A]">
                  {item.title}
                </p>
                <span className="rounded-full border border-[#D2C3A6] bg-[#E6DBC6] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-[#574433]">
                  {item.tag}
                </span>
              </div>
              <div className="mt-4">
                {item.beforePhoto && item.afterPhoto ?(
                  <ZlCasePhotoPair
                    beforePhoto={item.beforePhoto}
                    afterPhoto={item.afterPhoto}
                    beforeLabel={item.before}
                    afterLabel={item.after}
                    tag={item.tag}
                  />
                ) : (
                  <ZlCaseArtwork before={item.before} after={item.after} />
                )}
              </div>
              <p className="mt-5 text-[0.9rem] leading-[1.6] text-[#5C4A38]">
                {item.note}
              </p>
            </Reveal>
          ))}
        </div>
            </div>
          </div>
        </ZlSceneEnvelope>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Team section ? v7a: retrato editorial + bio 1a pessoa              */
/* ------------------------------------------------------------------ */

/**
 * Avatar ilustrado circular generico ? usado como fallback pra Jannie
 * enquanto retrato profissional nao chega (v7b).
 */
function ZlProfessionalAvatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <svg
      viewBox="0 0 96 96"
      className="h-full w-full"
      role="img"
      aria-label={`Avatar ilustrado de ${name}`}
    >
      <defs>
        <linearGradient id={`zl-avatar-bg-${initial}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6DBC6" />
          <stop offset="100%" stopColor="#D2C3A6" />
        </linearGradient>
      </defs>
      <circle cx="48" cy="48" r="46" fill={`url(#zl-avatar-bg-${initial})`} stroke="#D2C3A6" strokeWidth="1.5" />
      <circle cx="48" cy="38" r="13" fill="#fff" stroke="#B89B77" strokeWidth="1.6" />
      <path
        d="M22 80c3-12 14-19 26-19s23 7 26 19"
        fill="#fff"
        stroke="#B89B77"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <text
        x="50%"
        y="44"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="var(--font-display), serif"
        fontSize="14"
        fill="#7A6244"
      >
        {initial}
      </text>
    </svg>
  );
}

/**
 * Card grande da profissional com retrato 3:4 quando ha foto disponivel,
 * avatar SVG caso contrario. Bio em primeira pessoa em serif.
 *
 * LGPD: quando `cropProtected` e true, a foto usa object-position que
 * enfatiza maos/jaleco/placa e reduz exposicao de rosto ? v7a fallback
 * enquanto autorizacao escrita formal nao chega (comentario do Codex
 * edit-manifest). Na v7-earthy, Jannie tem foto wide-shot e usamos
 * customObjectPosition via dedicated prop pra centralizar nela.
 */
function ZlProfessionalHero({ professional, index }: { professional: ZlProfessional; index: number }) {
  const hasPhoto = Boolean(professional.photo?.src);
  // v7-earthy BLOCO B: Jannie usa foto wide com paciente ? agressivo
  // object-position pra centralizar nela (ela fica na esquerda-centro
  // do frame). Zucarina e close autoridade, crop default.
  const objectPosition = professional.photo?.cropProtected
    ?"50% 75%"
    : professional.name === "Jannie"
    ?"35% 60%"
    : "center";
  return (
    <Reveal
      as="article"
      delay={index * 120}
      className="group relative overflow-hidden rounded-[1.8rem] border border-[#D2C3A6] bg-white p-1.5 shadow-[0_28px_72px_-30px_rgba(138,108,72,0.3)]"
    >
      <div className="relative overflow-hidden rounded-[calc(1.8rem-0.375rem)] bg-[linear-gradient(180deg,#FAF7F2_0%,#D2C3A6_100%)]">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          {hasPhoto && professional.photo ?(
            <>
              <Image
                src={professional.photo.src}
                alt={professional.photo.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
                style={{
                  objectPosition,
                }}
                className="object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-haptic)] group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(58,46,35,0.7)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[0.66rem] uppercase tracking-[0.26em] text-white/80">
                  {professional.role}
                </p>
                <h3
                  className="mt-2 text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[0.98] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  {professional.name}
                </h3>
              </div>
            </>
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 bg-[linear-gradient(135deg,#E6DBC6_0%,#D2C3A6_100%)] p-8 text-center">
              <div className="h-36 w-36">
                <ZlProfessionalAvatar name={professional.name} />
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.26em] text-[#7A6244]">
                  {professional.role}
                </p>
                <h3
                  className="mt-2 text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[0.98] tracking-[-0.02em] text-[#3A2E23]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  {professional.name}
                </h3>
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#B89B77] bg-white/80 px-3 py-1 text-[0.64rem] uppercase tracking-[0.22em] text-[#7A6244] backdrop-blur-sm">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#7A6244]" />
                  Retrato profissional em breve
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <p
            className="text-[0.95rem] italic leading-[1.72] text-[#5C4A38]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            &ldquo;{professional.bio}&rdquo;
          </p>
          <p className="mt-4 text-[0.82rem] leading-[1.6] text-[#8B7862]">
            {professional.description}
          </p>
          {professional.handle ?(
            <p className="mt-3 text-[0.72rem] uppercase tracking-[0.2em] text-[#8B7862]">
              {professional.handle}
            </p>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}

export function ZlTeamSection() {
  // v7-earthy BLOCO B: as duas profissionais tem foto real agora ? volta
  // pra grid simetrico 1fr/1fr. Abaixo, bloco de valores + flow full-width.
  // v8-merge B.1: envelope ExactScene + eyebrow rose-mid `#C69184` (secao
  // corporal - equipe/pele).
  return (
    <section id="equipe" className="relative border-t border-[#D2C3A6] bg-[#F2EBDE] py-8 lg:py-10">
      <div className="container-x relative mx-auto max-w-[1400px] px-3 sm:px-4 md:px-6">
        <ZlSceneEnvelope>
          <div className="relative px-5 py-8 sm:px-8 md:px-10 md:py-10 lg:px-14 lg:py-12 bg-white">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <TeamSectionIntro
            eyebrow={zlTeamHeadline.eyebrow}
            title={zlTeamHeadline.title}
            body={zlTeamHeadline.body}
          />
          <Reveal
            as="p"
            delay={130}
            className="max-w-[54ch] text-[0.92rem] leading-[1.7] text-[#5C4A38] lg:justify-self-end"
          >
            Duas profissionais. Mesmo ritual: leitura cuidadosa do caso, execução
            técnica com delicadeza e orientação clara. Os nomes - Zucarina e
            Jannie - são citados publicamente pelas pacientes nos reviews do
            Google 5,0. Aqui você sabe com quem está falando.
          </Reveal>
        </div>

        {/* v7-earthy: simetria 1fr/1fr agora que as duas tem foto real. */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {zlProfessionals.map((professional, index) => (
            <ZlProfessionalHero
              key={professional.name}
              professional={professional}
              index={index}
            />
          ))}
        </div>

        <Reveal
          as="div"
          delay={240}
          className="mt-6 grid gap-6 rounded-[1.6rem] border border-[#D2C3A6] bg-[#FAF7F2] p-5 shadow-[0_16px_40px_rgba(138,108,72,0.08)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 lg:p-6"
        >
          <div>
            <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#7A6244]">
              Como a equipe aparece hoje
            </p>
            <div className="mt-4 grid gap-3">
              {zlTeamValues.map((item) => (
                <div key={item} className="flex items-start gap-3 text-[0.92rem] leading-[1.58] text-[#5C4A38]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B77]" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:border-l lg:border-[#D2C3A6] lg:pl-10">
            <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#574433]">
              Como funciona o atendimento
            </p>
            <ol className="mt-3 grid gap-3">
              {zlConsultFlow.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6DBC6] text-[0.72rem] font-medium text-[#574433]">
                    {index + 1}
                  </span>
                  <p className="text-[0.9rem] leading-[1.55] text-[#5C4A38]">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
          </div>
        </ZlSceneEnvelope>
      </div>
    </section>
  );
}

/**
 * v8-merge: variante do SectionIntro com eyebrow em rose-mid
 * `#C69184` para a secao de Equipe (secao corporal).
 */
function TeamSectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <Reveal
        as="p"
        className="text-[0.66rem] uppercase tracking-[0.26em] text-[#C69184]"
      >
        {eyebrow}
      </Reveal>
      <Reveal
        as="h2"
        delay={70}
        className="mt-4 max-w-[18ch] text-[clamp(2rem,3.6vw,3.3rem)] leading-[0.98] tracking-[-0.04em] text-[#3A2E23]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {title}
      </Reveal>
      <Reveal
        as="p"
        delay={130}
        className="mt-5 max-w-[36ch] text-[0.98rem] leading-[1.72] text-[#5C4A38]"
      >
        {body}
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing + education                                                 */
/* ------------------------------------------------------------------ */

export function ZlPricingEducationSection() {
  const handlePackagesClick = () => {
    trackZlEvent("wa_click", { source: "packages" });
  };
  return (
    <section className="container-x border-t border-[#D2C3A6] py-12 lg:py-14">
      {/* v7-refine: max-w-[1440px] mantem 3 buckets legiveis em wide (sem
          esticar os cards de preco). v7-vfix: intro full-width com body ao
          lado pra zerar whitespace. */}
      <div className="mx-auto max-w-[1440px] grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <SectionIntro
          eyebrow="Valores e clareza"
          title="Valores organizados por nível de cuidado."
          body="Valores organizados por tipo de atendimento. A confirmação final depende da avaliação clínica, sem surpresa no fim."
        />
        <Reveal
          as="p"
          delay={130}
          className="max-w-[52ch] text-[0.95rem] leading-[1.7] text-[#5C4A38] lg:justify-self-end"
        >
          Tres buckets: basicos (manutencao regular), intermediarios (dor e recorrencia) e avancados (diferencial clinico + bem-estar). Escolha o ponto mais perto do seu momento.
        </Reveal>
      </div>

      {/* Pricing em 3 colunas. v7-earthy: bege suave em todos
          os cards, acento caramelo/marrom para o "mais vendido/principal". */}
      <div className="mx-auto mt-8 max-w-[1440px]">
        <div className="grid gap-5 lg:grid-cols-3 lg:items-start">
          {zlPricingGroups.map((group, groupIdx) => (
            <Reveal
              key={group.bucket}
              as="article"
              delay={groupIdx * 90}
              className="rounded-[1.6rem] border border-[#D2C3A6] bg-white p-5 shadow-[0_18px_48px_-20px_rgba(138,108,72,0.3)] md:p-6"
            >
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#E6DBC6] pb-3">
                <div>
                  <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#7A6244]">
                    Bucket
                  </p>
                  <h3
                    className="mt-1 text-[1.4rem] leading-[1.1] tracking-[-0.02em] text-[#3A2E23]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                    }}
                  >
                    {group.title}
                  </h3>
                </div>
                <p className="max-w-[34ch] text-[0.82rem] italic leading-[1.5] text-[#7A6244] md:text-right">
                  {group.subtitle}
                </p>
              </div>

              <ul className="mt-3 grid gap-2">
                {group.rows.map((row) => {
                  const accent = row.tone === "accent";
                  return (
                    <li
                      key={row.label}
                      className={`grid gap-1 rounded-[1rem] px-4 py-2.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4 ${
                        accent
                          ?"bg-[linear-gradient(180deg,#E6DBC6_0%,#D2C3A6_100%)] ring-1 ring-[#B89B77]/60"
                          : "bg-[#FAF7F2] ring-1 ring-[#E6DBC6]"
                      }`}
                    >
                      <div>
                        <p className="flex flex-wrap items-center gap-2 text-[0.96rem] font-medium text-[#3A2E23]">
                          {row.label}
                          {accent ?(
                            <span className="rounded-full bg-[#574433] px-2 py-0.5 text-[0.54rem] uppercase tracking-[0.18em] text-white shadow-[0_6px_18px_rgba(87,68,51,0.35)]">
                              {group.bucket === "basicos"
                                ?"Mais vendido"
                                : "Principal"}
                            </span>
                          ) : null}
                        </p>
                        <p className="mt-0.5 text-[0.82rem] leading-[1.55] text-[#5C4A38]">
                          {row.note}
                        </p>
                      </div>
                      <p
                        className="tabular-nums text-[1.05rem] leading-none tracking-[-0.01em] text-[#3A2E23] sm:text-right"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 500,
                        }}
                      >
                        {row.price}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Rodape com notas oficiais + Urgencia honesta em 2 colunas
            horizontais (desktop) ? evita dead space abaixo do pricing. */}
        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
          <Reveal
            as="div"
            delay={320}
            className="rounded-[1.2rem] border border-[#D2C3A6] bg-[#E6DBC6] p-5 text-[0.88rem] leading-[1.7] text-[#5C4A38]"
          >
            <p className="text-[0.66rem] uppercase tracking-[0.22em] text-[#7A6244]">
              Observacoes gerais
            </p>
            <ul className="mt-3 grid gap-2">
              {zlPricingFooterNotes.map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B77]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-3" onClick={handlePackagesClick}>
              <ZlPrimaryLink
                href={zlLinks.whatsappPackages}
                label="Perguntar sobre pacotes"
                icon={<ZlWhatsappIcon />}
              />
              <p className="text-[0.82rem] leading-[1.55] text-[#8B7862]">
                Plano mensal e pacotes viram orcamento em 1 minuto pelo WhatsApp.
              </p>
            </div>
          </Reveal>

          {/* Urgencia honesta ? v7-earthy: marrom mais denso. */}
          <Reveal
            as="div"
            delay={240}
            className="rounded-[1.2rem] border border-[#B89B77] bg-[#D2C3A6] px-5 py-4 text-[0.88rem] leading-[1.6] text-[#3A2E23]"
          >
            <p className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#574433]"
              />
              <span>
                <strong className="font-medium text-[#3A2E23]">
                  {zlUrgencyCopy.title}
                </strong>{" "}
                {zlUrgencyCopy.body}
              </span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* Podologia explicada ? faixa horizontal abaixo do pricing. */}
      <div className="mx-auto mt-10 max-w-[1440px] border-t border-[#D2C3A6] pt-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:items-end">
          <div>
            <Reveal as="p" className="text-[0.66rem] uppercase tracking-[0.26em] text-[#7A6244]">
              Podologia clínica
            </Reveal>
            <Reveal
              as="h3"
              delay={70}
              className="mt-4 max-w-[22ch] text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.05] tracking-[-0.02em] text-[#3A2E23]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              O que muda no cuidado podológico.
            </Reveal>
          </div>
          <Reveal
            as="p"
            delay={130}
            className="max-w-[54ch] text-[0.94rem] leading-[1.7] text-[#5C4A38] lg:justify-self-end"
          >
            Diferenças práticas entre podologia clínica, manutenção e o momento de procurar avaliação.
          </Reveal>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {zlPodologyFacts.map((item, index) => (
            <Reveal
              key={item.title}
              as="div"
              delay={index * 60}
              className="h-full rounded-[1.4rem] border border-[#D2C3A6] bg-white p-5 shadow-[0_16px_40px_rgba(138,108,72,0.06)]"
            >
              <p className="text-[0.66rem] uppercase tracking-[0.22em] text-[#574433]">
                {item.title}
              </p>
              <p className="mt-3 text-[0.94rem] leading-[1.7] text-[#5C4A38]">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export function ZlFaqSection() {
  const handleFaqWaClick = () => {
    trackZlEvent("wa_click", { source: "faq_wa" });
  };
  return (
    <section className="relative border-t border-[#D2C3A6]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FAF7F2_0%,#E6DBC6_100%)]" />
      <div className="container-x relative mx-auto max-w-[1440px] py-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <SectionIntro
            eyebrow="Perguntas frequentes"
            title="Dúvidas frequentes antes do agendamento."
            body="Respostas diretas sobre atendimento, valores e agendamento. Se precisar, fale com a clínica pelo WhatsApp."
          />
          <div className="flex flex-wrap items-center gap-3 lg:justify-self-end" onClick={handleFaqWaClick}>
            <ZlPrimaryLink href={zlLinks.whatsapp} label="Falar no WhatsApp" icon={<ZlWhatsappIcon />} />
            <p className="max-w-[24ch] text-[0.84rem] leading-[1.5] text-[#8B7862]">
              Respondemos pessoalmente, sem bot, no horário de atendimento.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2 md:gap-4">
          {zlFaq.map((item, index) => (
            <FaqItem key={item.q} q={item.q} a={item.a} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  return (
    <Reveal
      as="div"
      delay={index * 45}
      className={`overflow-hidden rounded-[1.2rem] border bg-white transition-all ${
        open ?"border-[#B89B77] shadow-[0_18px_44px_rgba(138,108,72,0.18)]" : "border-[#D2C3A6]"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[0.96rem] font-medium text-[#3A2E23]">{q}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
            open ?"border-[#B89B77] bg-[#E6DBC6] text-[#574433]" : "border-[#D2C3A6] bg-white text-[#8B7862]"
          }`}
          aria-hidden="true"
        >
          <span className={`block h-[1.5px] w-3 bg-current transition-all ${open ?"rotate-0" : "rotate-90"}`} />
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
          open ?"grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden px-5 pb-5 text-[0.92rem] leading-[1.68] text-[#5C4A38]">
          {a}
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA + location                                                */
/* ------------------------------------------------------------------ */

export function ZlFinalCtaSection() {
  const handleWaClick = () => {
    trackZlEvent("wa_click", { source: "cta_final" });
  };
  const handleMapsClick = () => {
    trackZlEvent("maps_click", { source: "cta_final" });
  };
  return (
    <section id="fechar" className="container-x mx-auto max-w-[1440px] pb-12 pt-2 lg:pb-14">
      {/* v7-refine: max-w cap evita fachada + card CTA esticarem em wide.
          Prova fisica v7-final: fachada-clinica-pro (Codex pro). Reforca
          GEO SEO + "e real, fica aqui" antes do fechamento. */}
          <Reveal
            as="figure"
            delay={60}
        className="mb-3 overflow-hidden rounded-[1.65rem] border border-[#D2C3A6] bg-white p-1 shadow-[0_18px_44px_-20px_rgba(138,108,72,0.26)]"
          >
        <div className="relative aspect-[21/10] w-full overflow-hidden rounded-[calc(1.65rem-0.3rem)] md:aspect-[24/10]">
          <Image
            src="/zl-podologia/social/edited-pro/marca/fachada-clinica-pro.jpg"
            alt="Fachada externa da ZL Podologia em Fortaleza - Galeria José Bernardo, Av. Bezerra de Menezes, Parquelândia"
            fill
            sizes="(min-width: 1024px) 90vw, 100vw"
            loading="lazy"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(58,46,35,0.55)_100%)]" />
          <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 px-5 pb-4 text-white">
            <p className="text-[0.7rem] uppercase tracking-[0.22em]">
              Fachada na Av. Bezerra de Menezes
            </p>
            <p className="text-[0.74rem] opacity-80">
              Galeria José Bernardo - Parquelândia
            </p>
          </figcaption>
        </div>
      </Reveal>

      <div className="relative overflow-hidden rounded-[2.4rem] bg-[linear-gradient(135deg,#E6DBC6_0%,#D2C3A6_100%)] p-1.5 ring-1 ring-[#D2C3A6] shadow-[0_34px_88px_-34px_rgba(138,108,72,0.3)]">
        <div className="relative overflow-hidden rounded-[calc(2.4rem-0.375rem)] bg-[linear-gradient(135deg,#FAF7F2_0%,#EFE6D3_50%,#E6DBC6_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_-10%,rgba(184,155,119,0.35),transparent_36%),radial-gradient(circle_at_90%_0%,rgba(154,127,92,0.3),transparent_34%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div>
            <p className="text-[0.66rem] uppercase tracking-[0.28em] text-[#7A6244]">
              Agendamento
            </p>
            <h2
              className="mt-4 max-w-[14ch] text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.96] tracking-[-0.04em] text-[#3A2E23]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Agende seu horário pelo WhatsApp.
            </h2>
            <p
              className="mt-4 max-w-[30ch] text-[0.98rem] italic leading-[1.55] text-[#7A6244]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              {zlBrandSignature}
            </p>
            <p className="mt-4 max-w-[42ch] text-[0.98rem] leading-[1.7] text-[#5C4A38]">
              Você envia uma mensagem no WhatsApp, a clínica entende seu caso,
              informa os horários disponíveis e confirma tudo antes da sua ida.
            </p>
              <div className="mt-6 flex flex-wrap gap-3">
              <ZlPrimaryLink
                href={zlLinks.whatsappFinalCta}
                label="Falar com a ZL pelo WhatsApp"
                icon={<ZlWhatsappIcon />}
              />
              <span onClick={handleMapsClick}>
                <ZlSecondaryLink href={zlLinks.maps} label="Abrir rota no Maps" icon={<ZlPinIcon />} />
              </span>
              <ZlSecondaryLink href={zlLinks.instagram} label="Seguir no Instagram" icon={<ZlInstagramIcon />} />
            </div>
            <div className="mt-5">
              <ZlOpenStatus variant="block" className="text-[#3A2E23]" />
            </div>
          </div>

          {/* Bloco de endereco + horario com microdata schema.org: reforca
              JSON-LD pra mecanismos de busca que preferem microdata visivel. */}
          <div
            className="grid gap-4 rounded-[1.6rem] border border-[#D2C3A6] bg-white/[0.72] p-5 shadow-[0_16px_40px_rgba(138,108,72,0.08)] backdrop-blur-sm"
            itemScope
            itemType="https://schema.org/LocalBusiness"
          >
            <meta itemProp="name" content="ZL Podologia" />
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#7A6244]">
                Endereço
              </p>
              <p className="mt-2 text-[1rem] leading-[1.55] text-[#3A2E23]" itemProp="streetAddress">
                {zlLocation.address}
              </p>
              <p className="text-[0.92rem] leading-[1.55] text-[#5C4A38]">
                <span itemProp="addressLocality">{zlLocation.district}</span>
                {" - "}
                <span itemProp="addressRegion">{zlLocation.city}</span>
                {" - "}
                <span itemProp="postalCode">{zlLocation.zipcode}</span>
              </p>
              <p className="mt-1 text-[0.84rem] leading-[1.55] text-[#7A6244]">
                {zlLocation.landmark}
              </p>
            </div>
            <div className="border-t border-[#D2C3A6] pt-4">
              <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#574433]">
                Horário de atendimento
              </p>
              <ul className="mt-3 grid gap-1.5">
                {zlHoursRows.map((row) => {
                  const closed = row.tone === "muted";
                  return (
                    <li key={row.day} className="flex items-center justify-between gap-4 text-[0.88rem]">
                      <span className={closed ?"text-[#8B7862]" : "text-[#3A2E23]"}>{row.day}</span>
                      <span
                        className={
                          closed
                            ?"text-[#8B7862]"
                            : "font-medium text-[#3a8c70]"
                        }
                      >
                        {row.hours}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="border-t border-[#D2C3A6] pt-4 text-[0.86rem] leading-[1.55] text-[#5C4A38]">
              <p className="flex items-center gap-2">
                <ZlStarIcon />
                <span>5,0 com 11 avaliações: cuidado artesanal, uma paciente por vez.</span>
              </p>
              <p className="mt-2">{zlLocation.note}</p>
              <p className="mt-2">
                <a
                  href={zlLinks.phoneTel}
                  onClick={() => trackZlEvent("phone_click", { source: "cta_final" })}
                  className="text-[#3A2E23] underline-offset-4 hover:underline"
                  itemProp="telephone"
                >
                  {zlContact.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky mobile CTA                                                   */
/* ------------------------------------------------------------------ */

export function ZlMobileStickyCta() {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver instead of a `scroll` listener: we place a
  // single-pixel sentinel roughly one viewport below the top of the
  // page, and the CTA appears when that sentinel leaves the viewport.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 h-px w-full"
        style={{ top: "85dvh" }}
      />

    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-3 transition-all duration-500 [transition-timing-function:var(--ease-haptic)] md:hidden ${
        visible ?"translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto mx-3 flex w-full max-w-md items-center gap-2 rounded-full border border-[#D2C3A6] bg-white/95 p-1.5 shadow-[0_18px_46px_rgba(87,68,51,0.22)] backdrop-blur-sm">
        <a
          href={zlLinks.phoneTel}
          onClick={() => trackZlEvent("phone_click", { source: "sticky_mobile" })}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D2C3A6] bg-white text-[#3A2E23]"
          aria-label="Ligar para a ZL Podologia"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M19 17.5c0 .8-.2 1.6-.5 2.3-.2.3-.6.5-1 .5-6.3 0-11.3-5-11.3-11.3 0-.4.2-.8.5-1 .7-.3 1.5-.5 2.3-.5.3 0 .5.2.6.4l1.2 2.8c.1.3 0 .6-.2.8L9.6 12c1 1.8 2.4 3.2 4.2 4.2l1.6-1c.2-.2.5-.3.8-.2l2.8 1.2c.2.1.4.3.4.6v.7Z" />
          </svg>
        </a>
        <a
          href={zlLinks.whatsappSticky}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackZlEvent("wa_click", { source: "sticky_mobile" })}
          className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#25d366_0%,#128c7e_100%)] px-3 py-2.5 text-[0.78rem] font-medium text-white shadow-[0_12px_32px_rgba(18,140,126,0.32)]"
        >
          <ZlWhatsappIcon />
          <span className="truncate">Agendar WhatsApp</span>
        </a>
        <a
          href={zlLinks.maps}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackZlEvent("maps_click", { source: "sticky_mobile" })}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D2C3A6] bg-white text-[#574433]"
          aria-label="Abrir no Google Maps"
        >
          <ZlPinIcon />
        </a>
      </div>
    </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Shared section intro                                                */
/* ------------------------------------------------------------------ */

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <Reveal
        as="p"
        className="text-[0.66rem] uppercase tracking-[0.26em] text-[#7A6244]"
      >
        {eyebrow}
      </Reveal>
      <Reveal
        as="h2"
        delay={70}
        className="mt-4 max-w-[18ch] text-[clamp(2rem,3.6vw,3.3rem)] leading-[0.98] tracking-[-0.04em] text-[#3A2E23]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {title}
      </Reveal>
      <Reveal
        as="p"
        delay={130}
        className="mt-5 max-w-[36ch] text-[0.98rem] leading-[1.72] text-[#5C4A38]"
      >
        {body}
      </Reveal>
    </div>
  );
}

// Keep unused imports tree-shaken but explicit
export const _zlLandingLinks = { zlLinks, Link };
