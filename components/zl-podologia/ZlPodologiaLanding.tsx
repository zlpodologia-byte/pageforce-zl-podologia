"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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
    <div id="top" className="relative bg-[#F2EBDE] pb-16 text-[#3A2E23] md:pb-0">
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
      <ZlHeroExactSwap />

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

      {/* [4.5] v8-merge: Comparativa Podologia x Pedicure -
          secao educativa que filtra curioso e justifica o preco antes
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
 *   "Agendar avaliacao" CTA direita).
 * - H1 editorial massivo Fraunces clamp(3.2rem,7vw,6rem) com "pes" e
 *   "alivio" em italico rose `#B8837A`. Mantem animacao variable-font
 *   opsz 14->144 + SOFT 0->100 em 1.1s.
 * - Coluna direita: foto `profissional-close-autoridade-pro.jpg` em
 *   cartao rounded-[34px] aspect[0.98] com badge "Fortaleza" overlay
 *   bottom-left e squiggle SVG signature bottom-right.
 * - Nav anchors apontam pras secoes reais da principal (#equipe,
 *   #servicos, #storyteller-encravada, #quiz, #fechar, WhatsApp).
 * - CTAs: primario rose (Agendar pelo WhatsApp) + secundario "Como chegar".
 * - Chips de tratamento + micro-review Ivia D. + proof trio preservados
 *   logo abaixo do hero no mesmo envelope, mantendo a prova do v8-merge.
 */
function ZlHeroExactSwap() {
  return (
    <section className="relative px-3 py-3 sm:px-4 md:px-6 md:py-4">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[34px] border border-[#eee0d7] bg-white shadow-[0_30px_90px_rgba(109,73,58,0.12)] bg-[linear-gradient(180deg,#fffdfc_0%,#fbf6f2_100%)]">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(240,215,207,0.75),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(228,201,190,0.5),transparent_24%),radial-gradient(circle_at_54%_100%,rgba(245,229,220,0.95),transparent_40%)]" />

          <div className="relative px-5 pb-6 pt-4 sm:px-8 md:px-10 md:pb-8 md:pt-5 lg:px-14 lg:pb-10 lg:pt-6 xl:px-16">
            <ZlExactStyleTopbar />

            <div className="mt-5 grid gap-8 lg:mt-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch xl:gap-12">
              <Reveal as="div">
                <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#B8837A]">
                  Podologia clínica em Fortaleza
                </p>

                <ZlHeroHeadline />

                <BodyText
                  as="p"
                  size="md"
                  className="mt-4 max-w-[34ch] text-[1rem] leading-[1.65] text-[#5C4A38] sm:text-[1.02rem]"
                >
                  Podologia clínica para unha encravada, fungos, podoprofilaxia,
                  órtese, laserterapia e reflexologia. Avaliação, procedimento e
                  orientação de retorno em um atendimento calmo e humano, na
                  Av. Bezerra de Menezes - Parquelândia.
                </BodyText>

                <div className="mt-5">
                  <p className="text-[0.62rem] uppercase tracking-[0.26em] text-[#3a8c70]">
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
                        className="inline-flex items-center gap-2 rounded-full border border-[#d97e73] bg-[#d97e73] px-5 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white shadow-[0_14px_32px_rgba(217,126,115,0.26)] transition-all duration-300 hover:-translate-y-0.5"
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
                      className="inline-flex items-center gap-2 rounded-full border border-[#e5cec5] bg-white px-5 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-[#6e5d57] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d6a69a] hover:text-[#41322d]"
                    >
                      <span className="inline-flex h-4 w-4 items-center justify-center">
                        <ZlPinIcon />
                      </span>
                      <span>Como chegar</span>
                    </a>
                  </div>
                  <BodyText
                    as="p"
                    size="sm"
                    className="mt-3 max-w-[38ch] text-[0.86rem] leading-[1.55] text-[#6e5d57]"
                  >
                    {zlHeroProof[2].caption}
                  </BodyText>
                  <div className="mt-3">
                    <ZlOpenStatus
                      variant="inline"
                      className="text-[0.86rem] text-[#5C4A38]"
                    />
                  </div>
                </div>

                <Reveal
                  as="figure"
                  delay={180}
                  className="mt-5 max-w-[46ch] border-l-2 border-[#B8837A] pl-4"
                >
                  <blockquote
                    className="text-[0.92rem] italic leading-[1.55] text-[#5C4A38]"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                  >
                    &ldquo;{zlHeroMicroReview.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-[0.74rem] uppercase tracking-[0.18em] text-[#8B7862]">
                    - {zlHeroMicroReview.author}, {zlHeroMicroReview.source}
                  </figcaption>
                </Reveal>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {zlHeroProof.map((item, idx) => (
                    <Reveal key={item.label} as="div" delay={220 + idx * 40}>
                      <p className="text-[0.62rem] uppercase tracking-[0.26em] text-[#8B7862]">
                        {item.label}
                      </p>
                      <p
                        className="mt-2 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-none tracking-[-0.02em] text-[#3A2E23]"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 400,
                        }}
                      >
                        {item.value}
                      </p>
                      <p className="mt-2 text-[0.84rem] leading-[1.55] text-[#5C4A38]">
                        {item.caption}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </Reveal>

              <Reveal as="div" delay={100} className="relative flex h-full">
                <div className="relative ml-auto flex h-full w-full max-w-[660px] flex-col overflow-hidden rounded-[34px] border border-[#f0ddd4] bg-[#faf5f0] shadow-[0_30px_90px_rgba(121,79,65,0.18)]">
                  <div className="relative aspect-[0.98] flex-1 lg:aspect-auto lg:min-h-[620px]">
                    <Image
                      src="/zl-podologia/social/edited-pro/equipe/profissional-close-autoridade-pro.jpg"
                      alt="Zucarina, podóloga da ZL Podologia Fortaleza, em atendimento clínico com jaleco branco, touca, máscara, óculos e luvas, segurando o pé da paciente com precisão"
                      fill
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-[55%_35%]"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(102deg,rgba(255,251,248,0.6)_0%,rgba(255,251,248,0.25)_28%,rgba(255,251,248,0.04)_56%,rgba(255,251,248,0.08)_100%)]" />

                  <div className="pointer-events-none absolute bottom-5 left-5 rounded-[22px] border border-white/70 bg-white/85 p-4 shadow-[0_14px_32px_rgba(124,78,63,0.12)] backdrop-blur-sm">
                    <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#B8837A]">
                      Fortaleza
                    </p>
                    <p
                      className="mt-1 text-[1.05rem] leading-[1.2] text-[#3A2E23]"
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

                  <div className="pointer-events-none absolute bottom-5 right-5 hidden rounded-full border border-white/70 bg-white/70 px-3 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-[#8b726b] backdrop-blur sm:flex">
                    Atendimento clinico
                  </div>

                  <ZlHeroSquiggle className="pointer-events-none absolute -bottom-2 -right-2 h-40 w-40 text-white/86 md:h-48 md:w-48" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
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
    <header className="flex items-center justify-between gap-5">
      {/* Brand mark - logo + "ZL / Podologia". */}
      <a
        href="#top"
        aria-label="ZL Podologia"
        className="group relative flex shrink-0 items-center pr-2"
      >
        <span className="pointer-events-none absolute left-0 top-1/2 h-24 w-28 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,167,156,0.16)_0%,rgba(214,167,156,0.05)_48%,transparent_78%)] blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:h-28 sm:w-32 lg:h-32 lg:w-36" />
        <span className="relative block h-[4.5rem] w-[16.8rem] sm:h-[5.1rem] sm:w-[19.2rem] lg:h-[5.6rem] lg:w-[21rem]">
          <Image
            src="/zl-podologia/brand/logo-premium-light-horizontal-transparent-2026-04-23.png"
            alt="Logo da ZL Podologia"
            fill
            sizes="(min-width: 1024px) 336px, (min-width: 640px) 307px, 269px"
            className="object-contain drop-shadow-[0_10px_26px_rgba(109,73,58,0.08)]"
            priority
          />
        </span>
      </a>

      {/* Nav expandida - lg+. */}
      <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-7">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="whitespace-nowrap text-[0.72rem] uppercase tracking-[0.18em] text-[#78645e] transition-colors hover:text-[#d48678]"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* CTA primário - Agendar avaliação. */}
      <a
        href={zlLinks.whatsappTopbar}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackZlEvent("wa_click", { source: "topbar_cta" })}
        className="inline-flex items-center gap-2 rounded-full border border-[#e5cec5] bg-white px-4 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[#41322d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d6a69a] sm:px-5 sm:py-3 sm:text-[0.78rem]"
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
        <span className="hidden xs:inline">Agendar avaliação</span>
        <span className="inline xs:hidden">Agendar</span>
      </a>
    </header>
  );
}

/**
 * Editorial H1 com Fraunces variable-font (opsz 14->144, SOFT 0->100)
 * em 1.1s ao entrar no viewport. Versao v8-hero-swap: escala massiva
 * `clamp(3.2rem,7vw,6rem)` + "pes" e "alivio" em italico rose `#B8837A`.
 * Sem grifo taupe abaixo - no -exact nao tem barra.
 */
function ZlHeroHeadline() {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setSettled(true);
      return;
    }
    const id = window.setTimeout(() => setSettled(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <Reveal
      as="h1"
      delay={80}
      className="mt-4 max-w-[13ch] text-[clamp(3.4rem,8.4vw,7.25rem)] leading-[0.9] tracking-[-0.035em] text-[#3A2E23]"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 500,
      }}
    >
      <span
        className="block"
        style={{
          fontVariationSettings: settled
            ?"'opsz' 144, 'SOFT' 100"
            : "'opsz' 14, 'SOFT' 0",
          transition: "font-variation-settings 1100ms var(--ease-haptic)",
          willChange: "font-variation-settings",
        }}
      >
        Cuidado delicado
        <br />
        para os{" "}
        <span
          className="italic text-[#B8837A]"
          style={{ fontStyle: "italic" }}
        >
          pés
        </span>{" "}
        que
        <br />
        pedem{" "}
        <span
          className="italic text-[#B8837A]"
          style={{ fontStyle: "italic" }}
        >
          alívio
        </span>
        .
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
    <footer className="relative border-t border-[#574433] bg-[#3A2E23] text-white/85">
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
