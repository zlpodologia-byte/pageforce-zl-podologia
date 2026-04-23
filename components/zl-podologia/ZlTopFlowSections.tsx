"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal/Reveal";
import { trackZlEvent } from "@/components/zl-podologia/ZlAnalytics";
import {
  ZlPinIcon,
  ZlWhatsappIcon,
} from "@/components/zl-podologia/ZlCtaLink";
import { ZlOpenStatus } from "@/components/zl-podologia/ZlOpenStatus";
import {
  BodyText,
  DisplayHeading,
  EyebrowLabel,
  SectionEnvelope,
} from "@/components/zl-podologia/system";
import {
  zlComparePodology,
  zlHeroMicroReview,
  zlHeroProof,
  zlLinks,
  zlLocation,
  zlProofStripItems,
  zlSymptoms,
  type ZlServiceId,
} from "@/components/zl-podologia/zlPodologiaContent";

const legitimacySignals = [
  {
    eyebrow: zlHeroProof[0].label,
    value: zlHeroProof[0].value,
    body: zlProofStripItems[0].title,
  },
  {
    eyebrow: "Avaliação inicial",
    value: zlHeroProof[2].value,
    body: "Antes do procedimento, com calma e explicação do caso.",
  },
  {
    eyebrow: "Localização",
    value: zlLocation.district,
    body: `${zlLocation.landmark} - ${zlLocation.city}`,
  },
  {
    eyebrow: "Hora marcada",
    value: "Uma paciente por vez",
    body: "Atendimento sem correria, com sala reservada e atenção individual.",
  },
] as const;

const decisionSymptoms = zlSymptoms.slice(0, 4);

export interface ZlDecisionGuideSectionProps {
  activeId: ZlServiceId;
  onPick: (serviceId: ZlServiceId) => void;
}

export function ZlLegitimacySection() {
  const handleWaClick = () => {
    trackZlEvent("wa_click", { source: "legitimacy_section" });
  };

  const handleMapsClick = () => {
    trackZlEvent("maps_click", { source: "legitimacy_section" });
  };

  return (
    <section className="relative border-t border-[#DCCFC2] bg-[#F4EDE3] py-8 lg:py-10">
      <div className="container-x mx-auto max-w-[1400px]">
        <div className="overflow-hidden rounded-[2.4rem] border border-[#E6D7CB] bg-white shadow-[0_34px_90px_rgba(109,73,58,0.12)]">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(240,215,207,0.58),transparent_28%),radial-gradient(circle_at_86%_6%,rgba(230,219,198,0.62),transparent_30%),linear-gradient(180deg,#fffdfb_0%,#fbf6f1_100%)]" />
            <div className="relative grid gap-8 px-5 py-8 sm:px-8 md:px-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-10 lg:px-14 lg:py-12">
              <div>
                <Reveal as="div" delay={0}>
                  <EyebrowLabel tone="accent">Clínica, endereço e horário</EyebrowLabel>
                </Reveal>
                <Reveal as="div" delay={70} className="mt-4 max-w-[16ch]">
                  <DisplayHeading as="h2" size="md">
                    Atendimento com hora marcada e endereço fácil de encontrar.
                  </DisplayHeading>
                </Reveal>
                <Reveal as="div" delay={140} className="mt-5 max-w-[38ch]">
                  <BodyText as="p" size="md">
                    A ZL atende com avaliação antes do procedimento, horário
                    marcado e cuidado individual em Fortaleza.
                  </BodyText>
                </Reveal>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={zlLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleWaClick}
                    className="inline-flex items-center gap-2 rounded-full border border-[#D97E73] bg-[#D97E73] px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-white shadow-[0_16px_36px_rgba(217,126,115,0.22)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <ZlWhatsappIcon />
                    <span>Agendar avaliação</span>
                  </a>
                  <a
                    href={zlLinks.maps}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleMapsClick}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E6D7CB] bg-white px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-[#5C4A38] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA999]"
                  >
                    <ZlPinIcon />
                    <span>Ver endereço</span>
                  </a>
                </div>

                <div className="mt-6 border-t border-[#E6D7CB] pt-5">
                  <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8F6E63]">
                    Avaliação pública
                  </p>
                  <blockquote
                    className="mt-3 max-w-[36ch] text-[1rem] italic leading-[1.65] text-[#5C4A38]"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                  >
                    "{zlHeroMicroReview.quote}"
                  </blockquote>
                  <p className="mt-3 text-[0.78rem] uppercase tracking-[0.18em] text-[#7A6244]">
                    {zlHeroMicroReview.author} - {zlHeroMicroReview.source}
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {legitimacySignals.map((signal, index) => (
                    <Reveal
                      key={signal.eyebrow}
                      as="div"
                      delay={index * 70}
                      className="border-t border-[#E6D7CB] pt-4"
                    >
                      <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8F6E63]">
                        {signal.eyebrow}
                      </p>
                      <DisplayHeading as="h3" size="sm" className="mt-2">
                        {signal.value}
                      </DisplayHeading>
                      <BodyText as="p" size="sm" className="mt-2 max-w-[24ch]">
                        {signal.body}
                      </BodyText>
                    </Reveal>
                  ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch">
                  <Reveal
                    as="figure"
                    delay={260}
                    className="self-start overflow-hidden rounded-[1.7rem] border border-[#E6D7CB] bg-[#F2EBDE]"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/zl-podologia/social/edited-pro/marca/fachada-clinica-pro.jpg"
                        alt="Fachada da ZL Podologia na Av. Bezerra de Menezes, em Fortaleza"
                        fill
                        sizes="(min-width: 1024px) 34vw, 100vw"
                        className="object-cover object-[50%_38%]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(58,46,35,0.58)_100%)]" />
                      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 pb-4 text-white">
                        <p className="text-[0.68rem] uppercase tracking-[0.22em]">
                          Fachada da clínica
                        </p>
                        <p className="text-[0.76rem] opacity-85">
                          {zlLocation.landmark}
                        </p>
                      </figcaption>
                    </div>
                  </Reveal>

                  <div className="grid gap-4">
                    <Reveal
                      as="div"
                      delay={320}
                      className="rounded-[1.45rem] border border-[#E6D7CB] bg-[#FBF7F4] p-5"
                    >
                      <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8F6E63]">
                        Endereço
                      </p>
                      <p className="mt-3 text-[0.9rem] leading-[1.62] text-[#5C4A38]">
                        {zlLocation.streetAddress} - {zlLocation.district}. Fácil
                        de achar, com horário visível e chegada simples.
                      </p>
                    </Reveal>

                    <Reveal
                      as="div"
                      delay={380}
                      className="rounded-[1.45rem] border border-[#E6D7CB] bg-[#FAF7F2] p-5"
                    >
                      <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8F6E63]">
                        Status agora
                      </p>
                      <div className="mt-3">
                        <ZlOpenStatus variant="block" />
                      </div>
                      <p className="mt-4 text-[0.88rem] leading-[1.58] text-[#5C4A38]">
                        {zlLocation.streetAddress} - {zlLocation.district}
                      </p>
                    </Reveal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ZlDecisionGuideSection({
  activeId,
  onPick,
}: ZlDecisionGuideSectionProps) {
  return (
    <section className="relative border-t border-[#DCCFC2] bg-[#FAF7F2] py-10 lg:py-12">
      <div className="container-x mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-start lg:gap-10">
          <div>
            <Reveal as="div">
              <EyebrowLabel tone="muted">
                Queixas frequentes
              </EyebrowLabel>
              <DisplayHeading as="h2" size="md" className="mt-4 max-w-[14ch]">
                Qual destas situações se parece com o seu caso?
              </DisplayHeading>
              <BodyText as="p" size="md" className="mt-5 max-w-[42ch]">
                Selecione a situação mais parecida com o que você está sentindo
                para abrir o cuidado indicado para esse momento.
              </BodyText>
            </Reveal>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {decisionSymptoms.map((symptom, index) => {
                const active = symptom.primaryService === activeId;

                return (
                  <Reveal key={symptom.title} as="div" delay={180 + index * 70}>
                    <button
                      type="button"
                      onClick={() => onPick(symptom.primaryService)}
                      aria-pressed={active}
                      className={`h-full w-full rounded-[1.35rem] border p-5 text-left transition-all duration-300 ${
                        active
                          ? "border-[#B8837A] bg-white shadow-[0_18px_42px_rgba(109,73,58,0.12)]"
                          : "border-[#E6D7CB] bg-white/70 hover:border-[#CDA999] hover:bg-white"
                      }`}
                    >
                      <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8F6E63]">
                        {symptom.related.join(" / ")}
                      </p>
                      <h3 className="mt-3 text-[1.3rem] leading-[1.12] text-[#3A2E23]">
                        {symptom.title}
                      </h3>
                      <p className="mt-3 text-[0.9rem] leading-[1.58] text-[#5C4A38]">
                        {symptom.body}
                      </p>
                      <span className="mt-5 flex items-center justify-between gap-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[#7A6244]">
                        <span>{active ? "Cuidado indicado" : "Ver indicação"}</span>
                        <span aria-hidden="true">{"->"}</span>
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <SectionEnvelope
            as="aside"
            tone="paper"
            padding="md"
            elevated={false}
            className="self-start"
          >
            <div className="grid gap-5">
              <Reveal as="div" delay={0}>
                <p className="text-[0.66rem] uppercase tracking-[0.28em] text-[#B8837A]">
                  {zlComparePodology.eyebrow}
                </p>
                <DisplayHeading as="h3" size="sm" className="mt-4 max-w-[14ch]">
                  {zlComparePodology.title}
                </DisplayHeading>
                <BodyText as="p" size="sm" className="mt-4 text-[0.94rem] leading-[1.68]">
                  {zlComparePodology.body}
                </BodyText>
              </Reveal>

              <div className="grid gap-5 lg:grid-cols-2">
                <div className="border-t border-[#DCCFC2] pt-4">
                  <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#3A8C70]">
                    {zlComparePodology.podology.title}
                  </p>
                  <p className="mt-1 text-[0.76rem] uppercase tracking-[0.18em] text-[#7A6244]">
                    {zlComparePodology.podology.subtitle}
                  </p>
                  <ul className="mt-3 grid gap-2.5">
                    {zlComparePodology.podology.items.slice(0, 4).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[0.9rem] leading-[1.55] text-[#5C4A38]"
                      >
                        <span className="mt-1 h-4 w-4 shrink-0 rounded-full bg-[#E8F4EC] text-center text-[0.66rem] font-medium leading-4 text-[#3A8C70]">
                          +
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#E6D7CB] pt-4">
                  <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#B8837A]">
                    {zlComparePodology.pedicure.title}
                  </p>
                  <p className="mt-1 text-[0.76rem] uppercase tracking-[0.18em] text-[#7A6244]">
                    {zlComparePodology.pedicure.subtitle}
                  </p>
                  <ul className="mt-3 grid gap-2.5">
                    {zlComparePodology.pedicure.items.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[0.9rem] leading-[1.55] text-[#5C4A38]"
                      >
                        <span className="mt-1 h-4 w-4 shrink-0 rounded-full bg-[#F6E4E0] text-center text-[0.66rem] font-medium leading-4 text-[#B45E57]">
                          -
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </SectionEnvelope>
        </div>
      </div>
    </section>
  );
}
