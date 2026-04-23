"use client";

import Image from "next/image";
import { zlExperienciasPresentes, type ZlExperienceCard } from "./zlPodologiaContent";
import { ZlSceneEnvelope } from "./ZlV8Primitives";

/**
 * v9 — Experiencias e Presentes
 *
 * Secao dedicada que consolida Pre-Wedding Terapeutica + Vale Presente
 * de Aniversario em UMA peca editorial. Substitui a mencao dispersa
 * anterior de Pre-Wedding no Pricing footer.
 *
 * Paleta: rose-wash (#FBF7F4 bg) + terroso accents (catalogo F).
 * Layout: 2 grupos (Pre-Wedding e Vale Presente), cada um com intro +
 * 2 cards side-by-side (desktop) ou empilhados (mobile).
 */
export function ZlExperiencesSection() {
  const { eyebrow, title, subtitle, groups, closing } = zlExperienciasPresentes;

  return (
    <section
      id="experiencias-presentes"
      aria-labelledby="experiencias-presentes-title"
      className="relative bg-[#FBF7F4] py-12 lg:py-14"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header da secao */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#B8837A]">
            {eyebrow}
          </p>
          <h2
            id="experiencias-presentes-title"
            className="mt-3 font-display text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.05] tracking-[-0.02em] text-[#3A2E23]"
          >
            {title}
          </h2>
          <p className="mt-4 text-[1rem] leading-[1.55] text-[#5C4A38]">
            {subtitle}
          </p>
        </div>

        {/* Grupos */}
        <div className="mt-10 space-y-10">
          {groups.map((group) => (
            <ZlSceneEnvelope key={group.id} tone="white">
              <div className="p-6 lg:p-8">
                {/* Header do grupo */}
                <div className="mb-6 max-w-3xl">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#C69184]">
                    {group.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(1.4rem,2.2vw,1.85rem)] leading-[1.15] text-[#3A2E23]">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.5] text-[#5C4A38]">
                    {group.intro}
                  </p>
                </div>

                {/* Cards do grupo (2 side-by-side em desktop) */}
                <div className="grid gap-5 md:grid-cols-2">
                  {group.cards.map((card) => (
                    <ExperienceCard key={card.id} card={card as ZlExperienceCard} />
                  ))}
                </div>
              </div>
            </ZlSceneEnvelope>
          ))}
        </div>

        {/* Closing */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-[0.9rem] leading-[1.6] text-[#5C4A38]">
          {closing}
        </p>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  card: ZlExperienceCard;
}

function ExperienceCard({ card }: ExperienceCardProps) {
  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-[24px] border bg-white transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[2px] ${
        card.featured
          ?"border-[#B8837A]/40 shadow-[0_18px_50px_rgba(184,131,122,0.18)]"
          : "border-[#E6D2C7] shadow-[0_12px_35px_rgba(154,127,92,0.08)]"
      }`}
    >
      {/* Featured badge */}
      {card.featured && card.featuredLabel ?(
        <div className="absolute right-3 top-3 z-10 rounded-full bg-[#B8837A] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white">
          {card.featuredLabel}
        </div>
      ) : null}

      {/* Imagem do card */}
      {card.image ?(
        <div className="relative h-48 w-full overflow-hidden bg-[#F2EBDE] md:h-52">
          <Image
            src={card.image.src}
            alt={card.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      ) : null}

      {/* Conteudo do card */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#C69184]">
          {card.eyebrow}
        </p>
        <h4 className="mt-2 font-display text-[1.3rem] leading-[1.15] text-[#3A2E23]">
          {card.title}
        </h4>
        <p className="mt-1 text-[0.82rem] font-medium uppercase tracking-[0.12em] text-[#8B7862]">
          {card.duration}
        </p>

        {/* Includes checklist */}
        <ul className="mt-4 space-y-2 text-[0.88rem] leading-[1.45] text-[#5C4A38]">
          {card.includes.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                aria-hidden="true"
                className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-[#7A8459]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Preco + CTA */}
        <div className="mt-5 flex flex-col gap-3 border-t border-[#E6D2C7] pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#8B7862]">
              Investimento
            </span>
            <span className="font-display text-[1.4rem] leading-none text-[#3A2E23]">
              {card.price}
            </span>
          </div>
          <a
            href={card.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.85rem] font-semibold transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
              card.featured
                ?"bg-[#3a8c70] text-white hover:bg-[#2f7a60]"
                : "border border-[#3A2E23] bg-white text-[#3A2E23] hover:bg-[#3A2E23] hover:text-white"
            }`}
            data-analytics="wa_click"
            data-analytics-source={`experience_${card.id}`}
          >
            {card.ctaLabel}
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 5H9M9 5L5 1M9 5L5 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
