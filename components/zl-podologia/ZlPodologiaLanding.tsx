"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Reveal } from "@/components/reveal/Reveal";
import { ZlAnalytics, trackZlEvent } from "@/components/zl-podologia/ZlAnalytics";
import { ZlCookieBanner } from "@/components/zl-podologia/ZlCookieBanner";
import {
  ZlInstagramIcon,
  ZlPinIcon,
  ZlStarIcon,
  ZlWhatsappIcon,
} from "@/components/zl-podologia/ZlCtaLink";
import { ZlIngrownStoryteller } from "@/components/zl-podologia/ZlIngrownStoryteller";
import {
  ZlFaqSection,
  ZlFinalCtaSection,
  ZlMobileStickyCta,
} from "@/components/zl-podologia/ZlLandingSections";
import { ZlCasesSection } from "@/components/zl-podologia/ZlCasesSection";
import {
  ZlAmbienteSection,
  ZlBiosafetySection,
  ZlDiagnosticQuiz,
  ZlHeroJourneySection,
} from "@/components/zl-podologia/ZlNewSections";
import { ZlTeamSection } from "@/components/zl-podologia/ZlTeamSection";
import {
  ZlDecisionGuideSection,
  ZlLegitimacySection,
} from "@/components/zl-podologia/ZlTopFlowSections";
import { ZlValueSection } from "@/components/zl-podologia/ZlValueSection";
import { ZlHeroSquiggle } from "@/components/zl-podologia/ZlV8Primitives";
import { ZlServiceExplorer } from "@/components/zl-podologia/ZlServiceExplorer";
import { ZlSmoothScroll } from "@/components/zl-podologia/ZlSmoothScroll";
import { BodyText } from "@/components/zl-podologia/system";
import {
  ZL_MAIN_SERVICE_IDS,
  zlContact,
  zlHeroMicroReview,
  zlHeroProof,
  zlLinks,
  zlLocation,
  type ZlServiceId,
} from "@/components/zl-podologia/zlPodologiaContent";
import { ZlFooterSection } from "@/components/zl-podologia/ZlFooterSection";
import { ZlOpenStatus } from "@/components/zl-podologia/ZlOpenStatus";

const DEFAULT_SERVICE_ID: ZlServiceId = ZL_MAIN_SERVICE_IDS[0];

export function ZlPodologiaLanding() {
  // Lifted state: Symptom grid picks a service, ServiceExplorer reads it.
  const [activeServiceId, setActiveServiceId] = useState<ZlServiceId>(
    DEFAULT_SERVICE_ID
  );

  const handlePickSymptom = useCallback((serviceId: ZlServiceId) => {
    setActiveServiceId(serviceId);
    if (typeof window !== "undefined") {
      const el = document.getElementById("servicos");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <div id="top" className="relative bg-[#F8F7F4] pb-16 text-[#26302B] md:pb-0">
      {/* Scoped Lenis smooth scroll - respects reduced-motion and skips
          touch devices to keep battery cost nil on mobile. */}
      <ZlSmoothScroll />

      {/* Fixed, pointer-events-none grain overlay to break digital flatness
          without forcing repaints in scroll containers. */}
      <div className="zl-grain" aria-hidden="true" />

      {/* Analytics (GA4 + IO-based scroll events) - safe no-op when
          NEXT_PUBLIC_GA_ID is not configured. */}
      <ZlAnalytics />

      {/* [1] v8-hero-swap: Hero editorial do /lab/zl-podologia-exact,
          trazido integralmente pra principal. Envelope exato (rounded-[34px]
          + border rose-pale + shadow terroso + gradient creme/rose imersivo)
          com topbar expandida + H1 massivo + foto `profissional-close-
          autoridade-pro` na coluna direita + badge Fortaleza + squiggle.
          Copy e dados (nav anchors, Ivia review, chips, proof) vem do
          zlPodologiaContent. */}
      <ZlHeroExactSwap onPick={handlePickSymptom} />

      {/* [1.5] v8-merge: Proof strip 4-col rose-wash entre hero e
          fiduciary bar. Mid-prova com substancia - complementa a
          fiduciary (micro-prova rapida) sem competir. */}
      <ZlLegitimacySection />

      <ZlDecisionGuideSection
        activeId={activeServiceId}
        onPick={handlePickSymptom}
      />

      {/* [2] Faixa Fiduciaria consolidada (v7a - 5 celulas) */}

      {/* [3] Promessa institucional */}

      {/* [4] Symptom-to-Solution grid */}

      {/* [4.5] v8-merge: Beneficios da podologia clinica -
          secao educativa que contextualiza o cuidado antes
          do Service Explorer. */}

      {/* [5] Service Explorer (6 cards principais) */}
      <ZlServiceExplorer
        activeId={activeServiceId}
        onChange={setActiveServiceId}
      />

      {/* [6] Storyteller Encravada - secao autonoma */}
      <ZlIngrownStoryteller />

      {/* [7] Biosseguranca */}
      <ZlBiosafetySection />

      {/* [8] Ambiente - trio editorial com fotos reais HD */}
      <ZlAmbienteSection />

      {/* [9] Equipe */}
      <ZlTeamSection />

      {/* [10] Jornada do Heroi - 3 reviews publicos */}
      <ZlHeroJourneySection />

      {/* [11] Cases ilustrados */}
      <ZlCasesSection />

      {/* [12] Pricing + Education */}
      <ZlValueSection />

      {/* [12.5] Experiências e presentes (v9 - Pre-Wedding + Vale Presente) */}

      {/* [13] Quiz diagnóstico (antes do FAQ - decisão v7a) */}
      <ZlDiagnosticQuiz />

      {/* [14] FAQ */}
      <ZlFaqSection />

      {/* [15] CTA Final */}
      <ZlFinalCtaSection />

      {/* [16] Footer with logo + politica de imagens link */}
      <ZlFooterSection />

      {/* [17] Sticky mobile CTA */}
      <ZlMobileStickyCta />

      {/* Banner minimo LGPD cookies */}
      <ZlCookieBanner />
    </div>
  );
}

/**
 * v8-hero-swap: Hero editorial trazido do /lab/zl-podologia-exact.
 *
 * Layout fiel ao -exact:
 * - Envelope branco rounded-[34px] + border rose-pale + shadow terroso.
 * - Background radial gradient creme + rose-wash imersivo.
 * - Topbar integrada (logo ZL esquerda, nav expandida ao centro,
 *   "Agendar horario" CTA direita).
 * - H1 editorial massivo em display serif clamp(3.2rem,7vw,6rem) com "pes" e
 *   "alivio" em italico rose `#0F6B46`.
 * - Coluna direita: foto `profissional-close-autoridade-pro.jpg` em
 *   cartao rounded-[34px] aspect[0.98] com badge "Fortaleza" overlay
 *   bottom-left e squiggle SVG signature bottom-right.
 * - Nav anchors apontam pras secoes reais da principal (#equipe,
 *   #servicos, #storyteller-encravada, #quiz, #fechar, WhatsApp).
 * - CTAs: primario rose (Agendar pelo WhatsApp) + secundario "Como chegar".
 * - Chips de tratamento + micro-review Ivia D. + proof trio preservados
 *   logo abaixo do hero no mesmo envelope, mantendo a prova do v8-merge.
 */
function ZlHeroExactSwap({ onPick }: { onPick: (serviceId: ZlServiceId) => void }) {
  return (
    <section className="relative isolate overflow-visible bg-[linear-gradient(180deg,#FFFFFF_0%,#F8F7F4_54%,#EFEAE4_100%)] px-0 py-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_4%_0%,rgba(142,160,142,0.24),transparent_28%),radial-gradient(circle_at_88%_8%,rgba(15,107,70,0.14),transparent_25%),linear-gradient(90deg,rgba(255,255,255,0.64)_0%,transparent_36%,rgba(255,255,255,0.42)_100%)]" />
      <div className="pointer-events-none absolute right-[4vw] top-[7rem] hidden h-72 w-72 opacity-[0.035] lg:block">
        <Image
          src="/zl-podologia/brand/zl-logo-green-seal-2026-04-26.png"
          alt=""
          fill
          sizes="288px"
          className="object-contain"
        />
      </div>
      <div className="mx-auto max-w-[1680px] overflow-visible">
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,#D9DAD7,transparent)]" />

          <div className="relative px-5 pb-10 pt-5 sm:px-8 md:px-10 md:pb-12 md:pt-7 lg:px-14 lg:pb-12 lg:pt-6 xl:px-[4.5rem] 2xl:px-20">
            <ZlExactStyleTopbar />

            <div className="mt-6 grid gap-8 lg:mt-7 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-stretch xl:gap-12">
              <Reveal as="div">
                <p className="max-w-[28ch] text-[0.64rem] uppercase leading-[1.6] tracking-[0.28em] text-[#0F6B46] sm:max-w-none sm:text-[0.68rem] sm:tracking-[0.32em]">
                  Podologia clínica em Fortaleza
                </p>

                <ZlHeroHeadline />

                <ZlHeroDecisionBand
                  onPick={onPick}
                  variant="inline"
                  className="hidden lg:block"
                />

                <div className="mt-6">
                  <p className="text-[0.62rem] uppercase tracking-[0.26em] text-[#0F6B46]">
                    Atendimento imediato
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span
                      onClick={() =>
                        trackZlEvent("wa_click", { source: "hero_primary" })
                      }
                    >
                      <a
                        href={zlLinks.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full max-w-[22rem] items-center justify-center gap-2 rounded-full border border-[#0F6B46] bg-[#0F6B46] px-4 py-3 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white shadow-[0_14px_32px_rgba(15,107,70,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#174F3F] sm:w-auto sm:px-5 sm:text-[0.78rem] sm:tracking-[0.16em]"
                      >
                        <ZlWhatsappIcon />
                        <span>Agendar pelo WhatsApp</span>
                      </a>
                    </span>
                    <a
                      href={zlLinks.maps}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        trackZlEvent("maps_click", { source: "hero" })
                      }
                      className="inline-flex w-full max-w-[22rem] items-center justify-center gap-2 rounded-full border border-[#D9DAD7] bg-white px-4 py-3 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[#26302B] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0F6B46] hover:text-[#0F6B46] sm:w-auto sm:px-5 sm:text-[0.78rem] sm:tracking-[0.16em]"
                    >
                      <span className="inline-flex h-4 w-4 items-center justify-center">
                        <ZlPinIcon />
                      </span>
                      <span>Como chegar</span>
                    </a>
                  </div>

                  <ZlHeroDecisionBand
                    onPick={onPick}
                    variant="inline"
                    className="lg:hidden"
                  />

                  <div className="mt-3">
                    <ZlOpenStatus
                      variant="inline"
                      className="text-[0.86rem] text-[#6F746F]"
                    />
                  </div>
                </div>

                <BodyText
                  as="p"
                  size="md"
                  className="mt-6 max-w-[38ch] text-[0.96rem] leading-[1.62] text-[#6F746F] sm:text-[1rem]"
                >
                  Podologia clínica especializada em onicocriptose,
                  onicomicose, podoprofilaxia, órtese ungueal, laserterapia,
                  verruga plantar, tungíase e reflexologia podal. Avaliação
                  clínica no atendimento, procedimentos seguros e
                  acompanhamento orientado, com foco na saúde dos pés.
                </BodyText>

                <Reveal
                  as="figure"
                  delay={180}
                  className="mt-7 max-w-[48ch] border-l border-[#0F6B46]/70 pl-5"
                >
                  <blockquote
                    className="text-[0.92rem] italic leading-[1.55] text-[#6F746F]"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                  >
                    &ldquo;{zlHeroMicroReview.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-[0.74rem] uppercase tracking-[0.18em] text-[#6F746F]">
                    - {zlHeroMicroReview.author}, {zlHeroMicroReview.source}
                  </figcaption>
                </Reveal>

                <div className="mt-7 grid gap-5 border-t border-[#D9DAD7] pt-5 sm:grid-cols-3">
                  {zlHeroProof.map((item, idx) => (
                    <Reveal key={item.label} as="div" delay={220 + idx * 40}>
                      <p className="text-[0.62rem] uppercase tracking-[0.26em] text-[#6F746F]">
                        {item.label}
                      </p>
                      <p
                        className="mt-2 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-none tracking-[-0.02em] text-[#26302B]"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 400,
                        }}
                      >
                        {item.value}
                      </p>
                      <p className="mt-2 text-[0.84rem] leading-[1.55] text-[#6F746F]">
                        {item.caption}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </Reveal>

              <Reveal as="div" delay={100} className="relative flex h-full overflow-visible">
                <div className="relative ml-auto flex h-full w-full max-w-[760px] flex-col overflow-visible">
                  <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle_at_50%_48%,rgba(15,107,70,0.14),transparent_64%)] blur-2xl" />
                  <div className="zl-hero-photo-field aspect-[1.02] flex-1 lg:aspect-auto lg:min-h-[620px]">
                    <Image
                      src="/zl-podologia/social/edited-pro/equipe/profissional-close-autoridade-pro.jpg"
                      alt="Zucarina, podóloga da ZL Podologia Fortaleza, em atendimento clínico com jaleco branco, touca, máscara, óculos e luvas, segurando o pé da paciente com precisão"
                      fill
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-[52%_34%]"
                    />
                  </div>

                  <div className="pointer-events-none absolute bottom-6 left-10 z-10 rounded-[0.45rem] border-l border-white/45 bg-white/76 p-4 shadow-[0_14px_32px_rgba(23,79,63,0.08)] backdrop-blur-sm">
                    <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#0F6B46]">
                      Fortaleza
                    </p>
                    <p
                      className="mt-1 text-[1.05rem] leading-[1.2] text-[#26302B]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        fontStyle: "italic",
                      }}
                    >
                      Atendimento
                      <br />
                      delicado e real.
                    </p>
                  </div>

                  <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden rounded-[0.35rem] border border-white/55 bg-white/68 px-3 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-[#6F746F] backdrop-blur sm:flex">
                    Atendimento clínico
                  </div>

                  <ZlHeroSquiggle className="pointer-events-none absolute -bottom-3 -right-3 h-40 w-40 text-white/82 md:h-48 md:w-48" />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

const heroDecisionItems: readonly {
  label: string;
  body: string;
  serviceId?: ZlServiceId;
  href: string;
  icon: "pain" | "fungus" | "care" | "whatsapp";
}[] = [
  {
    label: "Estou com dor",
    body: "Unha encravada, inflamação ou dor ao calçar.",
    serviceId: "ingrown",
    href: "#servicos",
    icon: "pain",
  },
  {
    label: "Quero tratar fungos",
    body: "Unha amarelada, grossa, frágil ou com odor.",
    serviceId: "fungus",
    href: "#servicos",
    icon: "fungus",
  },
  {
    label: "Quero manutenção",
    body: "Limpeza e prevenção para manter os pés saudáveis.",
    serviceId: "podoprofilaxia",
    href: "#servicos",
    icon: "care",
  },
  {
    label: "Falar no WhatsApp",
    body: "Explique a queixa e receba direcionamento.",
    href: zlLinks.whatsapp,
    icon: "whatsapp",
  },
];

function ZlHeroDecisionBand({
  onPick,
  variant = "wide",
  className = "",
}: {
  onPick: (serviceId: ZlServiceId) => void;
  variant?: "inline" | "wide";
  className?: string;
}) {
  const isInline = variant === "inline";
  const wrapperClassName = isInline
    ? "mt-5 overflow-hidden rounded-[0.75rem] border border-[#D9DAD7] bg-[#D9DAD7] shadow-[0_16px_38px_rgba(23,79,63,0.045)]"
    : "mt-9 overflow-hidden border-y border-[#D9DAD7] bg-white/72 shadow-[0_18px_50px_rgba(23,79,63,0.05)] backdrop-blur-sm";
  const gridClassName = isInline
    ? "grid grid-cols-2 gap-px"
    : "grid divide-y divide-[#D9DAD7] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4";
  const serviceLinkClassName = isInline
    ? "group flex min-h-[4.85rem] items-center gap-3 bg-white/84 px-3 py-3 text-left transition-colors duration-300 hover:bg-[#F8F7F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0F6B46]"
    : "group flex min-h-[6.25rem] items-center gap-3 px-4 py-4 text-left transition-colors duration-300 hover:bg-[#F8F7F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0F6B46] sm:px-5";
  const whatsappLinkClassName = isInline
    ? "group flex min-h-[4.85rem] items-center gap-3 bg-[#174F3F] px-3 py-3 text-left text-white transition-colors duration-300 hover:bg-[#0F6B46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
    : "group flex min-h-[6.25rem] items-center gap-3 bg-[#174F3F] px-4 py-4 text-left text-white transition-colors duration-300 hover:bg-[#0F6B46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white sm:px-5";
  const serviceBodyClassName = isInline
    ? "mt-1 hidden text-[0.72rem] leading-[1.38] text-[#6F746F] min-[520px]:block"
    : "mt-1 block text-[0.72rem] leading-[1.38] text-[#6F746F]";
  const whatsappBodyClassName = isInline
    ? "mt-1 hidden text-[0.72rem] leading-[1.38] text-white/72 min-[520px]:block"
    : "mt-1 block text-[0.72rem] leading-[1.38] text-white/72";

  return (
    <Reveal
      as="nav"
      delay={220}
      aria-label="Atalhos para direcionar o atendimento"
      className={`${wrapperClassName} ${className}`}
    >
      <div className={gridClassName}>
        {heroDecisionItems.map((item) => {
          const serviceId = item.serviceId;
          const content = (
            <>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.45rem] border border-[#D9DAD7] bg-[#F8F7F4] text-[#0F6B46]">
                <ZlHeroDecisionIcon kind={item.icon} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.78rem] font-medium leading-[1.18] text-[#26302B]">
                  {item.label}
                </span>
                <span className={serviceBodyClassName}>
                  {item.body}
                </span>
              </span>
            </>
          );

          if (serviceId) {
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  onPick(serviceId);
                  trackZlEvent("service_select", {
                    source: "hero_decision_band",
                    service: serviceId,
                  });
                }}
                className={serviceLinkClassName}
              >
                {content}
              </a>
            );
          }

          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackZlEvent("wa_click", { source: "hero_decision_band" })
              }
              className={whatsappLinkClassName}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.45rem] border border-white/20 bg-white/10 text-white">
                <ZlHeroDecisionIcon kind={item.icon} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.78rem] font-medium leading-[1.18]">
                  {item.label}
                </span>
                <span className={whatsappBodyClassName}>
                  {item.body}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </Reveal>
  );
}

function ZlHeroDecisionIcon({
  kind,
}: {
  kind: "pain" | "fungus" | "care" | "whatsapp";
}) {
  if (kind === "whatsapp") return <ZlWhatsappIcon />;

  if (kind === "fungus") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path d="M12 4.2c3.4 1.7 5.1 4.2 5.1 7.2 0 3.4-2.2 6.1-5.1 8.4-2.9-2.3-5.1-5-5.1-8.4 0-3 1.7-5.5 5.1-7.2Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9.3 12.2h5.4M10.3 15h3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "care") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path d="M12 5.2v13.6M5.2 12h13.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7.4 7.4c2.6-2.6 6.8-2.6 9.2 0 2.6 2.6 2.6 6.8 0 9.2-2.4 2.6-6.6 2.6-9.2 0-2.6-2.4-2.6-6.6 0-9.2Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M8.5 4.4c2.6 1.2 4.2 3.3 4.2 6.1v2.1c0 2.4 1.3 3.5 3.3 3.5h.5c1.4 0 2.3.9 2.3 2.1 0 1.1-.8 1.9-2.1 1.9h-2.3c-3.9 0-7.1-3-7.1-7V7.3c0-1.5.4-2.4 1.2-2.9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10.3 8.4h.1M10.4 11.2h.1M11 14h.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ZlExactStyleTopbar() {
  const navItems = [
    { label: "A clínica", href: "#equipe" },
    { label: "Serviços", href: "#servicos" },
    { label: "Tratamentos", href: "#storyteller-encravada" },
    { label: "Para você", href: "#quiz" },
    { label: "Contato", href: "#fechar" },
  ];

  return (
    <header className="flex items-center justify-between gap-4 overflow-visible xl:gap-8">
      {/* Brand mark: selo da marca + assinatura horizontal legível. */}
      <a
        href="#top"
        aria-label="ZL Podologia"
        className="group relative flex shrink-0 items-center gap-3 pr-2"
      >
        <span className="pointer-events-none absolute left-0 top-1/2 h-24 w-28 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(15,107,70,0.12)_0%,rgba(142,160,142,0.08)_48%,transparent_78%)] blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:h-28 sm:w-32 lg:h-32 lg:w-36" />
        <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#D9DAD7] bg-white shadow-[0_10px_28px_rgba(23,79,63,0.08)] sm:h-20 sm:w-20">
          <Image
            src="/zl-podologia/brand/zl-logo-green-seal-2026-04-26.png"
            alt="Logo da ZL Podologia"
            fill
            sizes="80px"
            className="object-contain scale-[1.55]"
            priority
          />
        </span>
        <span className="relative hidden leading-none sm:block">
          <span
            className="block text-[1.45rem] leading-[0.9] tracking-[0.08em] text-[#0F6B46] lg:text-[1.65rem]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            ZL
          </span>
          <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#26302B]">
            Podologia
          </span>
        </span>
      </a>

      {/* Nav expandida apenas em desktop largo para não comprimir logo e CTA. */}
      <nav className="hidden flex-1 items-center justify-center gap-5 min-[1760px]:flex min-[1760px]:gap-7">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="whitespace-nowrap text-[0.72rem] uppercase tracking-[0.16em] text-[#6F746F] transition-colors hover:text-[#0F6B46] 2xl:tracking-[0.18em]"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* CTA primário - Agendar atendimento. */}
      <a
        href={zlLinks.whatsappTopbar}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackZlEvent("wa_click", { source: "topbar_cta" })}
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#D9DAD7] bg-white/88 px-4 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[#26302B] shadow-[0_12px_32px_rgba(23,79,63,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0F6B46] hover:text-[#0F6B46] sm:px-5 sm:py-3 sm:text-[0.78rem]"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <rect x="4" y="5.5" width="16" height="14" rx="2" />
          <path d="M8 3.8v3.4M16 3.8v3.4M4 9.2h16" strokeLinecap="round" />
        </svg>
        <span className="hidden xs:inline">Agendar horário</span>
        <span className="inline xs:hidden">Agendar</span>
      </a>
    </header>
  );
}

/**
 * Editorial H1 com display serif e interação de ênfase
 * em 1.1s ao entrar no viewport. Versao v8-hero-swap: escala massiva
 * `clamp(3.2rem,7vw,6rem)` + "pes" e "alivio" em italico rose `#0F6B46`.
 * Sem grifo taupe abaixo - no -exact nao tem barra.
 */
function ZlHeroHeadline() {
  return (
    <Reveal
      as="h1"
      delay={80}
      className="mt-4 max-w-[12.8ch] text-[clamp(2.55rem,9.2vw,4.9rem)] leading-[1] tracking-[-0.025em] text-[#26302B] sm:leading-[0.96] sm:tracking-[-0.035em] lg:text-[clamp(4.2rem,5.2vw,4.9rem)]"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 500,
      }}
    >
      <span className="block">
        <span>Podologia{" "}</span>
        <br />
        <span>clínica </span>
        <br />
        <span className="whitespace-nowrap">
          <span>em{" "}</span>
          <span
            className="italic text-[#0F6B46]"
            style={{ fontStyle: "italic" }}
          >
            Fortaleza
          </span>
        </span>
        <span className="mt-4 block max-w-[17ch] text-[clamp(1.15rem,3vw,1.62rem)] leading-[1.12] tracking-[-0.01em] text-[#0F6B46] sm:mt-5">
          Tratamento especializado para a saúde dos seus pés.
        </span>
      </span>
    </Reveal>
  );
}

/**
 * Footer with the official logo as the closing gesture. Inclui link
 * "Política de uso de imagens" (LGPD) e NAP consistente.
 */
function ZlFooter() {
  return (
    <footer className="relative border-t border-[#174F3F] bg-[#26302B] text-white/85">
      {/* v7-refine: max-w cap evita colunas do footer esticar e deixar
          espaco gigante entre logo/NAP e os 3 links de canal. */}
      <div className="container-x mx-auto max-w-[1440px] py-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="flex flex-wrap items-center gap-5">
            <span className="relative flex h-[3.75rem] w-[14rem] shrink-0 overflow-hidden">
              <Image
                src="/zl-podologia/brand/logo-premium-dark-2026-04-22.png"
                alt="Marca reformulada da ZL Podologia"
                fill
                sizes="224px"
                className="object-contain object-left"
              />
            </span>
            <div itemScope itemType="https://schema.org/LocalBusiness">
              <meta itemProp="name" content="ZL Podologia" />
              <p
                className="text-[clamp(1.25rem,1.8vw,1.55rem)] leading-[1.15] tracking-[-0.01em] text-white"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                ZL Podologia
              </p>
              <p
                className="mt-1 max-w-[38ch] text-[0.86rem] leading-[1.55] text-white/70"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <span itemProp="streetAddress">{zlLocation.address}</span>
                {" - "}
                <span itemProp="addressLocality">{zlLocation.district}</span>
                {" - "}
                <span itemProp="addressRegion">{zlLocation.city}</span>
              </p>
              <p className="mt-0.5 text-[0.8rem] leading-[1.55] text-white/50">
                {zlLocation.landmark}
              </p>
              <p className="mt-1 text-[0.8rem] leading-[1.55] text-white/50">
                Ter-Sex 09:00-16:00 | Sab 09:00-12:00
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={zlLinks.whatsappFooter}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackZlEvent("wa_click", { source: "footer_wa" })}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.84rem] text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/15"
            >
              <ZlWhatsappIcon />
              <span>{zlContact.whatsappDisplay}</span>
            </a>
            <a
              href={zlLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.84rem] text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/15"
            >
              <ZlInstagramIcon />
              <span>{zlContact.handle}</span>
            </a>
            <a
              href={zlLinks.maps}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackZlEvent("maps_click", { source: "footer" })}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.84rem] text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/15"
            >
              <ZlPinIcon />
              <span>Google Maps</span>
            </a>
            <a
              href={`mailto:${zlContact.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.84rem] text-white ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/15"
            >
              <span aria-hidden="true">✉</span>
              <span>{zlContact.email}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-[0.78rem] text-white/55">
          <p className="inline-flex items-center gap-2">
            <ZlStarIcon />
            <span>5,0 com 11 avaliações no Google</span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={zlLinks.imagePolicy}
              className="text-white/70 underline-offset-4 hover:underline"
            >
              Política de uso de imagens
            </Link>
            <p
              className="italic text-white/70"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Pés bem cuidados fazem toda a diferença.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
