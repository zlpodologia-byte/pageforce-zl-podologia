"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal/Reveal";
import { trackZlEvent } from "@/components/zl-podologia/ZlAnalytics";
import {
  ZlPrimaryLink,
  ZlWhatsappIcon,
} from "@/components/zl-podologia/ZlCtaLink";
import {
  zlExperienciasPresentes,
  zlLinks,
  zlPricingFooterNotes,
  zlPricingGroups,
  zlUrgencyCopy,
  zlValueSectionCopy,
  type ZlPricingBucket,
  type ZlPricingBucketGroup,
} from "@/components/zl-podologia/zlPodologiaContent";

const bucketOrder: readonly ZlPricingBucket[] = [
  "intermediarios",
  "avancados",
  "basicos",
];

const bucketAliases: Record<
  ZlPricingBucket,
  { title: string; subtitle: string; badge: string }
> = {
  intermediarios: {
    title: "Dor e inflamação",
    subtitle: "Casos em que a ZL atende incômodo, inflamação ou recorrência.",
    badge: "Casos imediatos",
  },
  avancados: {
    title: "Continuidade do tratamento",
    subtitle: "Órtese, laser e protocolos que pedem continuidade e controle.",
    badge: "Continuidade",
  },
  basicos: {
    title: "Avaliação e manutenção",
    subtitle: "Avaliação, manutenção e conforto para manter o pé em ordem.",
    badge: "Recorrência saudável",
  },
};

type ExperienceCardData =
  (typeof zlExperienciasPresentes.groups)[number]["cards"][number];

const featuredExperienceCards: readonly ExperienceCardData[] = [
  zlExperienciasPresentes.groups[0].cards[1],
  zlExperienciasPresentes.groups[1].cards[1],
];

const valueOfferCovers = [
  {
    title: "Noiva Sublime",
    subtitle: "Um cuidado especial antes de um dia importante.",
    kicker: "Experiência",
    src: "/zl-podologia/generated/v10/value-offer/experience-noiva-sublime.jpg",
    alt: "Capa da experiência Noiva Sublime da ZL Podologia",
    objectPosition: "52% 58%",
  },
  {
    title: "Noiva Majestosa",
    subtitle: "Para quem quer um ritual mais completo e demorado.",
    kicker: "Experiência",
    src: "/zl-podologia/generated/v10/value-offer/experience-noiva-majestosa.jpg",
    alt: "Capa da experiência Noiva Majestosa da ZL Podologia",
    objectPosition: "50% 48%",
  },
  {
    title: "Vale Essencial",
    subtitle: "Um presente delicado para um momento de pausa.",
    kicker: "Presente",
    src: "/zl-podologia/generated/v10/value-offer/value-gift-card-essencial.jpg",
    alt: "Vale presente Momento Essencial da ZL Podologia",
    objectPosition: "50% 52%",
  },
  {
    title: "Vale Encanto",
    subtitle: "Um presente bonito para surpreender com cuidado.",
    kicker: "Presente",
    src: "/zl-podologia/generated/v10/value-offer/value-gift-card-encanto.jpg",
    alt: "Vale presente Experiência Encanto da ZL Podologia",
    objectPosition: "50% 50%",
  },
] as const;

export function ZlValueSection() {
  const pricingMoments = bucketOrder
    .map((bucket) => zlPricingGroups.find((group) => group.bucket === bucket))
    .filter((group): group is ZlPricingBucketGroup => Boolean(group));

  const handlePackagesClick = () => {
    trackZlEvent("wa_click", { source: "value_packages" });
  };

  return (
    <section className="relative border-t border-[#D2C3A6] bg-[#F4EDE3] py-10 lg:py-12">
      <div className="container-x mx-auto max-w-[1400px]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <Reveal
              as="p"
              className="text-[0.66rem] uppercase tracking-[0.28em] text-[#7A6244]"
            >
              {zlValueSectionCopy.eyebrow}
            </Reveal>
            <Reveal
              as="h2"
              delay={70}
              className="mt-4 max-w-[14ch] text-[clamp(1.95rem,3.6vw,3.35rem)] leading-[0.96] tracking-[-0.045em] text-[#3A2E23]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              {zlValueSectionCopy.title}
            </Reveal>
          </div>

          <Reveal
            as="p"
            delay={140}
            className="max-w-[52ch] text-[0.9rem] leading-[1.68] text-[#5C4A38] lg:justify-self-end lg:pt-2"
          >
            {zlValueSectionCopy.body}
          </Reveal>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-3 lg:items-start">
          {pricingMoments.map((group, index) => (
            <Reveal
              key={group.bucket}
              as="article"
              delay={index * 80}
              className="self-start rounded-[1.55rem] border border-[#DCCFC2] bg-[rgba(255,255,255,0.82)] p-3 shadow-[0_14px_38px_rgba(109,73,58,0.06)] backdrop-blur-sm md:p-4"
            >
              <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8F6E63]">
                {bucketAliases[group.bucket].badge}
              </p>
              <h3
                className="mt-2 text-[1.36rem] leading-[1.04] tracking-[-0.025em] text-[#3A2E23]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                {bucketAliases[group.bucket].title}
              </h3>
              <p className="mt-2 text-[0.78rem] leading-[1.46] text-[#5C4A38]">
                {bucketAliases[group.bucket].subtitle}
              </p>

              <ul className="mt-3 divide-y divide-[#E8DDD0]">
                {group.rows.map((row) => (
                  <li key={row.label} className="py-2.5 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[0.82rem] font-medium text-[#3A2E23]">
                            {row.label}
                          </p>
                          {row.tone === "accent" ?(
                            <span className="rounded-full bg-[#FBF1EA] px-2 py-0.5 text-[0.52rem] uppercase tracking-[0.16em] text-[#B8837A]">
                              principal
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-[0.72rem] leading-[1.38] text-[#6E5B4B]">
                          {row.note}
                        </p>
                      </div>
                      <p
                        className="shrink-0 rounded-full border border-[#E3D6C8] bg-white/90 px-2 py-1 text-[0.72rem] leading-none tracking-[-0.01em] text-[#3A2E23]"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 500,
                        }}
                      >
                        {row.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <Reveal
            as="div"
            delay={220}
            className="border-y border-[#DCCFC2] py-6"
          >
            <p className="text-[0.66rem] uppercase tracking-[0.28em] text-[#B8837A]">
              Continuidade e presentes
            </p>
            <h3
              className="mt-4 max-w-[15ch] text-[clamp(1.65rem,2.7vw,2.45rem)] leading-[0.98] tracking-[-0.035em] text-[#3A2E23]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Retornos, combinações de cuidado e presentes.
            </h3>
            <p className="mt-4 text-[0.84rem] leading-[1.56] text-[#5C4A38]">
              Retornos, combinações de cuidado e presentes ficam organizados
              conforme o tipo de atendimento.
            </p>

            <PackageOrbitPreview />

            <ul className="mt-5 grid gap-3">
              {zlPricingFooterNotes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-3 text-[0.84rem] leading-[1.52] text-[#5C4A38]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B8837A]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6" onClick={handlePackagesClick}>
              <ZlPrimaryLink
                href={zlLinks.whatsappPackages}
                label="Falar sobre pacotes e retornos"
                icon={<ZlWhatsappIcon />}
              />
            </div>

            <div className="mt-5 rounded-[1.2rem] border border-[#E6D7CB] bg-[#FAF2EC] px-4 py-4 text-[0.82rem] leading-[1.56] text-[#5C4A38]">
              <strong className="font-medium text-[#3A2E23]">
                {zlUrgencyCopy.title}
              </strong>{" "}
              {zlUrgencyCopy.body}
            </div>
          </Reveal>

          <div className="lg:pt-2">
            <div className="grid gap-5 md:grid-cols-2 md:items-start">
              {featuredExperienceCards.map((card, index) => (
                <Reveal
                  key={card.id}
                  as="div"
                  delay={280 + index * 70}
                  className="self-start"
                >
                  <ExperienceCard card={card} />
                </Reveal>
              ))}
            </div>
            <p className="mt-4 max-w-[58ch] text-[0.82rem] leading-[1.55] text-[#5C4A38]">
              {zlExperienciasPresentes.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ card }: { card: ExperienceCardData }) {
  const handleClick = () => {
    trackZlEvent("wa_click", { source: `value_${card.id}` });
  };

  const featuredLabel =
    "featuredLabel" in card ?card.featuredLabel : undefined;
  const imagePosition =
    card.id === "noiva_majestosa"
      ?"50% 58%"
      : card.id === "experiencia_encanto"
        ?"50% 32%"
        : "50% 44%";
  const contextLabel =
    card.group === "pre_wedding"
      ?"Pré-wedding"
      : "Vale-presente";

  return (
    <article className="zl-integrated-photo group flex h-full min-h-[26rem] flex-col">
      {card.image ?(
        <div className="absolute inset-0 overflow-hidden bg-[#F2EBDE]">
          <Image
            src={card.image.src}
            alt={card.image.alt}
            fill
            sizes="(min-width: 1024px) 24vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
            style={{ objectPosition: imagePosition }}
          />
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(31,23,18,0.04)_0%,rgba(31,23,18,0.18)_22%,rgba(31,23,18,0.68)_62%,rgba(24,18,14,0.94)_100%)]" />

      <div className="relative flex h-full flex-1 flex-col justify-between p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/88 px-2.5 py-1 text-[0.56rem] uppercase tracking-[0.16em] text-[#6E5B4B]">
            {contextLabel}
          </span>
          {featuredLabel ?(
            <span className="rounded-full bg-[#B8837A] px-2.5 py-1 text-[0.56rem] uppercase tracking-[0.16em] text-white">
              {featuredLabel}
            </span>
          ) : null}
        </div>

        <div className="p-1 md:p-2">
          <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#F0C3BA]">
            {card.eyebrow}
          </p>
          <h3
            className="mt-2 text-[1.38rem] leading-[1.04] tracking-[-0.03em] text-white"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            {card.title}
          </h3>
          <p className="mt-2 text-[0.74rem] uppercase tracking-[0.16em] text-white/68">
            {card.duration}
          </p>

          <ul className="mt-4 grid gap-2">
            {card.includes.slice(0, 2).map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[0.82rem] leading-[1.45] text-white/84"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D8DDBB]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/12 pt-4">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-white/58">
                Investimento
              </p>
              <p
                className="mt-2 text-[1.26rem] leading-none tracking-[-0.02em] text-white"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                {card.price}
              </p>
            </div>
          </div>

          <a
            href={card.whatsappLink}
            target="_blank"
            rel="noreferrer"
            onClick={handleClick}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/18 bg-white px-4 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[#3A2E23] transition-all duration-300 hover:-translate-y-0.5"
          >
            <ZlWhatsappIcon />
            <span>
              {card.group === "pre_wedding"
                ?"Reservar experiência"
                : "Reservar presente"}
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

function PackageOrbitPreview() {
  return (
    <div className="mt-6 border-t border-[#DCCFC2] pt-6">
      <figure className="zl-integrated-photo zl-photo-feather min-h-[18rem]">
        <Image
          src="/zl-podologia/generated/v10/value-offer/value-package-orbit-premium.jpg"
          alt="Imagem de apoio para retorno, pacote e presente da ZL Podologia"
          fill
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(21,16,12,0.06)_0%,rgba(21,16,12,0.22)_44%,rgba(10,8,6,0.74)_100%)]" />
        <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
          <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#F0C3BA]">
            Pacotes, vales e retornos
          </p>
          <p className="mt-2 max-w-[22rem] text-[1.05rem] leading-[1.18] tracking-[-0.03em]">
            Continuidade e presente sem misturar com procedimento clínico.
          </p>
        </figcaption>
      </figure>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {valueOfferCovers.map((cover) => (
          <figure key={cover.title} className="group min-w-0">
            <div className="zl-editorial-thumb zl-photo-feather aspect-[5/4]">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(min-width: 1024px) 12vw, 45vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                style={{ objectPosition: cover.objectPosition }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(58,46,35,0.55)_100%)]" />
              <span className="absolute left-3 top-3 rounded-full bg-white/88 px-2.5 py-1 text-[0.52rem] uppercase tracking-[0.16em] text-[#6E5B4B]">
                {cover.kicker}
              </span>
            </div>
            <figcaption className="mt-2">
              <p className="text-[0.78rem] font-medium leading-[1.18] text-[#3A2E23]">
                {cover.title}
              </p>
              <p className="mt-1 text-[0.68rem] leading-[1.38] text-[#6E5B4B]">
                {cover.subtitle}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-4 border-l border-[#DCCFC2] pl-4">
        <p className="text-[0.78rem] leading-[1.55] text-[#5C4A38]">
          Presentes e experiências especiais ficam ao lado dos retornos e das
          combinações de cuidado, sem ocupar espaço dos procedimentos clínicos.
        </p>
      </div>
    </div>
  );
}
