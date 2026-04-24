"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/reveal/Reveal";
import { ZlPrimaryLink, ZlWhatsappIcon } from "@/components/zl-podologia/ZlCtaLink";
import { trackZlEvent } from "@/components/zl-podologia/ZlAnalytics";
import { buildWhatsappLink } from "@/components/zl-podologia/zlPodologiaContent";

/**
 * Storyteller autônomo da unha encravada - v7a.
 *
 * Promovido de card dentro do Service Explorer para seção autônoma na
 * posição 6 (após Explorer, antes de Biossegurança). Âncora visual do
 * protocolo da ZL. 5 slides, cada um com número romano I-V em Fraunces
 * serif itálico + legenda e badge de etapa.
 *
 * Motion:
 *  - Desktop (hover + fine pointer): horizontal scroll-snap com
 *    auto-highlight do slide central (IntersectionObserver atrela visual +
 *    dispara evento `storyteller_card_view` por card).
 *  - Mobile: snap-scroll de 1 slide por viewport (touch + swipe).
 *  - prefers-reduced-motion: empilhamento simples sem auto-avanço.
 *
 * Texto dourado das imagens originais preservado (parte da arte).
 */

interface StorytellerSlide {
  src: string;
  alt: string;
  romanNumeral: "I" | "II" | "III" | "IV" | "V";
  step: string;
  caption: string;
}

const SLIDES: readonly StorytellerSlide[] = [
  {
    src: "/zl-podologia/social/antes-depois/encravada-01-chegada.jpg",
    alt: "Chegada do caso de unha encravada na ZL Podologia Fortaleza - dois pés, duas unhas dos hálux com inflamação",
    romanNumeral: "I",
    step: "Chegada",
    caption:
      "I. Chegada. Duas unhas dos hálux, muita dor ao calçar, inflamação visível na borda.",
  },
  {
    src: "/zl-podologia/social/antes-depois/encravada-02-diagnostico.jpg",
    alt: "Leitura clínica das unhas encravadas - diagnóstico visual antes do procedimento",
    romanNumeral: "II",
    step: "Diagnóstico",
    caption:
      "II. Leitura do caso. Unhas profundamente encravadas, limpeza cuidadosa da área antes de seguir.",
  },
  {
    src: "/zl-podologia/social/antes-depois/encravada-03-remocao-espicula.jpg",
    alt: "Retirada técnica da espícula da unha encravada com instrumental profissional na ZL Podologia",
    romanNumeral: "III",
    step: "Remoção",
    caption:
      "III. Retirada da espícula com técnica adequada, para aliviar a dor sem gerar novo trauma.",
  },
  {
    src: "/zl-podologia/social/antes-depois/encravada-04-azul-metileno.jpg",
    alt: "Aplicação de azul de metileno com fotossensibilizador após remoção da espícula",
    romanNumeral: "IV",
    step: "Protocolo",
    caption:
      "IV. Aplicação de azul de metileno com fotossensibilizador - ação antimicrobiana e apoio à recuperação.",
  },
  {
    src: "/zl-podologia/social/antes-depois/encravada-05-alivio-bandagem.jpg",
    alt: "Alívio da dor e bandagem protetiva após o atendimento de unha encravada na ZL Podologia Fortaleza",
    romanNumeral: "V",
    step: "Alívio",
    caption:
      "V. Área protegida, bandagem técnica e orientação de retorno - alívio real, não pontual.",
  },
];

export function ZlIngrownStoryteller() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver on each slide - emits `storyteller_card_view`.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll<HTMLElement>("[data-storyteller-card]");
    if (cards.length === 0) return;

    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const idx = entry.target.getAttribute("data-index") ?? "";
            if (!seen.has(idx)) {
              seen.add(idx);
              trackZlEvent("storyteller_card_view", {
                card_index: Number(idx),
              });
            }
          }
        }
      },
      { threshold: [0.55] }
    );
    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const whatsappHref = buildWhatsappLink(
    "Oi, vi o caso de unha encravada na página da ZL. Quero aliviar essa dor.",
    "storyteller_ingrown"
  );

  return (
    <section
      id="storyteller-encravada"
      aria-labelledby="zl-storyteller-title"
      className="relative border-t border-[#D2C3A6] bg-[#F2EBDE] py-8 lg:py-10"
    >
      <div className="container-x relative mx-auto max-w-[1600px]">
        <div className="relative py-8 md:py-10 lg:py-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <Reveal
              as="p"
              className="text-[0.66rem] uppercase tracking-[0.26em] text-[#B8837A]"
            >
              Um caso, cinco momentos
            </Reveal>
            <Reveal
              as="h2"
              delay={70}
              className="mt-4 max-w-[24ch] text-[clamp(2rem,3.6vw,3.3rem)] leading-[0.98] tracking-[-0.04em] text-[#3A2E23]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              <span id="zl-storyteller-title">
                O protocolo da <em className="italic">unha encravada</em>, por dentro.
              </span>
            </Reveal>
          </div>
          <Reveal
            as="p"
            delay={130}
            className="max-w-[54ch] text-[0.95rem] leading-[1.7] text-[#5C4A38] lg:justify-self-end"
          >
            Caso real publicado pela ZL no Instagram. Da chegada em dor a bandagem
            final: os cinco momentos que resumem o cuidado - e por que a dor
            alivia logo, mas a manutenção é que impede de voltar.
          </Reveal>
        </div>

        {/* Horizontal scroll carousel. */}
        <div
          ref={trackRef}
          className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 scroll-smooth [scrollbar-width:thin] md:gap-5 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0"
        >
          {SLIDES.map((slide, idx) => (
            <Reveal
              key={slide.src}
              as="figure"
              delay={idx * 70}
              data-storyteller-card=""
              data-index={idx}
              className="group relative w-[82%] shrink-0 snap-center transition-transform duration-500 [transition-timing-function:var(--ease-haptic)] hover:-translate-y-1 sm:w-[55%] lg:w-auto"
            >
              <div className="zl-integrated-photo aspect-[4/5] w-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 50vw, 80vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-haptic)] group-hover:scale-[1.03]"
                />
                {/* Roman numeral in the corner - Fraunces serif, large,
                    italic. It is the signature of the section. */}
                <span
                  className="pointer-events-none absolute right-3 top-3 select-none text-[2.4rem] leading-none text-white/90 drop-shadow-[0_6px_18px_rgba(87,68,51,0.5)]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  {slide.romanNumeral}
                </span>
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-[#574433] shadow-[0_6px_18px_rgba(87,68,51,0.18)]">
                  {slide.step}
                </span>
              </div>
              <figcaption
                className="px-3 py-3 text-[0.82rem] italic leading-[1.55] text-[#5C4A38]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                {slide.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>

          {/* Âncora explicativa + CTA. */}
        <Reveal
          as="div"
          delay={120}
          className="mt-8 grid gap-6 border-t border-[#D2C3A6] pt-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-center"
        >
          <p className="text-[0.95rem] leading-[1.7] text-[#5C4A38]">
            Esse caso foi fotografado <strong className="font-medium text-[#3A2E23]">com autorização da paciente</strong>. O
            protocolo - retirada da espícula + azul de metileno com
            fotossensibilizador - é o mesmo aplicado em 100% dos atendimentos
            de unha encravada na ZL Podologia, em Fortaleza.
          </p>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <ZlPrimaryLink
              href={whatsappHref}
              label="Quero aliviar essa dor"
              icon={<ZlWhatsappIcon />}
            />
          </div>
        </Reveal>

        <p className="mt-5 text-[0.74rem] italic leading-[1.55] text-[#7A6244]">
          Fotos publicadas pela própria ZL Podologia no Instagram oficial. Texto
          dourado faz parte da arte original.
        </p>
        </div>
      </div>
    </section>
  );
}
