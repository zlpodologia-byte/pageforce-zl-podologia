"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal/Reveal";
import {
  zlConsultFlow,
  zlProfessionals,
  zlTeamHeadline,
  zlTeamValues,
  zlUrgencyCopy,
  type ZlProfessional,
} from "@/components/zl-podologia/zlPodologiaContent";

export function ZlTeamSection() {
  const leadProfessional = zlProfessionals[0];
  const supportProfessional = zlProfessionals[1];

  return (
    <section
      id="equipe"
      className="relative border-t border-[#D2C3A6] bg-[#F2EBDE] py-8 lg:py-10"
    >
      <div className="container-x relative mx-auto max-w-[1600px]">
        <div className="py-8 md:py-10 lg:py-12">
            <div className="grid gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
              <SectionIntro
                eyebrow={zlTeamHeadline.eyebrow}
                title={zlTeamHeadline.title}
                body={zlTeamHeadline.body}
              />
              <Reveal
                as="p"
                delay={130}
                className="max-w-[50ch] text-[0.88rem] leading-[1.62] text-[#5C4A38] lg:justify-self-end"
              >
                Zucarina conduz a frente clínica. Jannie apoia a continuidade
                do cuidado, mantendo protocolo, EPI e atenção individual no
                mesmo ritmo calmo da clínica.
              </Reveal>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-stretch">
              <TeamProfessionalCard professional={leadProfessional} delay={80} />
              <TeamProfessionalCard professional={supportProfessional} delay={140} />
            </div>

            <Reveal
              as="div"
              delay={220}
              className="mt-8 grid gap-6 border-t border-[#E6D7CB] pt-6 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-8"
            >
              <div>
                <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#7A6244]">
                  O que sustenta esse atendimento
                </p>
                <div className="mt-4">
                  <TeamContextRail items={zlTeamValues} />
                </div>
              </div>

              <div className="md:border-l md:border-[#E6D7CB] md:pl-8">
                <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#574433]">
                  Como o serviço acontece na prática
                </p>
                <ol className="mt-4 grid gap-3">
                  {zlConsultFlow.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6DBC6] text-[0.72rem] font-medium text-[#574433]">
                        {index + 1}
                      </span>
                      <p className="text-[0.82rem] leading-[1.5] text-[#5C4A38]">
                        {item}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
        </div>
      </div>
    </section>
  );
}

function TeamProfessionalCard({
  professional,
  delay,
}: {
  professional: ZlProfessional;
  delay: number;
}) {
  const hasPhoto = Boolean(professional.photo?.src);
  const objectPosition = getProfessionalImagePosition(professional);
  const isLead = professional.name === "Zucarina";
  const careProofPoints = isLead
    ?[
        "Leitura cuidadosa do caso antes do instrumental.",
        "Explicação clara do que será feito e do retorno.",
        "Hora marcada, sala reservada e uma paciente por vez.",
      ]
    : [
        "Apoio ao atendimento com EPI completo.",
        "Continuidade do mesmo protocolo da ZL.",
        "Ritmo calmo e atenção individual no retorno.",
      ];

  return (
    <Reveal
      as="article"
      delay={delay}
      className="grid h-full gap-5 border-t border-[#DCCFC2] pt-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
    >
      <div className="zl-integrated-photo zl-photo-feather min-h-[30rem] md:min-h-[32rem]">
        {hasPhoto && professional.photo ?(
          <>
            <Image
              src={professional.photo.src}
              alt={professional.photo.alt}
              fill
              sizes="(min-width: 1024px) 24vw, 100vw"
              loading="lazy"
              style={{ objectPosition }}
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(32,24,18,0.06)_0%,transparent_32%,rgba(58,46,35,0.78)_100%)]" />
            <div className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1 text-[0.56rem] uppercase tracking-[0.18em] text-[#6B5547]">
              {isLead ?"Podóloga responsável" : "Continuidade clínica"}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-[0.58rem] uppercase tracking-[0.24em] text-white/78">
                {professional.role}
              </p>
              <h3
                className="mt-2 text-[clamp(2rem,3vw,2.85rem)] leading-[0.94] tracking-[-0.035em]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                {professional.name}
              </h3>
              <p className="mt-2 max-w-[24ch] text-[0.78rem] leading-[1.42] text-white/86">
                {isLead
                  ?"Leitura do caso, instrumental e condução clínica do atendimento."
                  : "Apoio ao cuidado, presença real e continuidade do protocolo."}
              </p>
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center p-8">
            <div className="h-32 w-32">
              <ProfessionalAvatar name={professional.name} />
            </div>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-5 py-1 md:py-3">
        <div>
          <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#B8837A]">
            {isLead ?"Liderança clínica" : "Apoio no cuidado contínuo"}
          </p>
          <p className="mt-3 max-w-[30ch] text-[1rem] leading-[1.5] text-[#3A2E23]">
            {getProfessionalExcerpt(professional)}
          </p>
        </div>

        <div className="border-t border-[#E6D8CB] pt-4">
          <p
            className="max-w-[32ch] text-[0.88rem] italic leading-[1.55] text-[#5C4A38]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            &ldquo;{getProfessionalQuote(professional)}&rdquo;
          </p>
          <p className="mt-4 text-[0.78rem] leading-[1.52] text-[#8B7862]">
            {professional.description}
          </p>
          {professional.handle ?(
            <p className="mt-3 text-[0.68rem] uppercase tracking-[0.18em] text-[#8B7862]">
              {professional.handle}
            </p>
          ) : null}
        </div>

        <div className="border-l border-[#DCCFC2] pl-4">
          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#7A6244]">
            O que a paciente encontra
          </p>
          <div className="mt-3 grid gap-2.5">
            {careProofPoints.map((item) => (
              <p
                key={item}
                className="flex gap-2.5 text-[0.78rem] leading-[1.46] text-[#5C4A38]"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B77]" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function LeadProfessionalCard({
  professional,
}: {
  professional: ZlProfessional;
}) {
  const hasPhoto = Boolean(professional.photo?.src);
  const objectPosition = getProfessionalImagePosition(professional);
  const careProofPoints = [
    "Leitura cuidadosa do caso antes do instrumental.",
    "Explicação clara do que será feito e do retorno.",
    "Hora marcada, sala reservada e uma paciente por vez.",
  ];

  return (
    <Reveal
      as="article"
      delay={80}
      className="border-t border-[#DCCFC2] pt-5"
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div className="contents">
          <div className="zl-integrated-photo min-h-[25rem] md:min-h-[31rem] lg:min-h-[34rem]">
            {hasPhoto && professional.photo ?(
              <>
                <Image
                  src={professional.photo.src}
                  alt={professional.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  loading="lazy"
                  style={{ objectPosition }}
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(32,24,18,0.12)_0%,transparent_34%,rgba(58,46,35,0.82)_100%)]" />
                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[0.56rem] uppercase tracking-[0.18em] text-[#6B5547]">
                    {professional.role}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-[0.58rem] uppercase tracking-[0.26em] text-white/80">
                    Fortaleza • atendimento documental
                  </p>
                  <h3
                    className="mt-2 text-[clamp(1.9rem,2.9vw,2.7rem)] leading-[0.96] tracking-[-0.03em]"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                  >
                    {professional.name}
                  </h3>
                  <p className="mt-2 max-w-[24ch] text-[0.76rem] leading-[1.45] text-white/86">
                    Podologia clínica com EPI completo, leitura do caso e
                    cuidado executado pela própria equipe da ZL.
                  </p>
                </div>
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-8 text-center">
                <div className="h-36 w-36">
                  <ProfessionalAvatar name={professional.name} />
                </div>
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.26em] text-[#7A6244]">
                    {professional.role}
                  </p>
                  <h3
                    className="mt-2 text-[clamp(1.8rem,2.6vw,2.5rem)] leading-[0.98] tracking-[-0.03em] text-[#3A2E23]"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                  >
                    {professional.name}
                  </h3>
                </div>
              </div>
            )}
          </div>

          <div className="flex h-full flex-col gap-5 p-5 md:p-6 lg:px-6 lg:py-6">
            <div>
              <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#B8837A]">
                Liderança clínica
              </p>
              <p className="mt-3 max-w-[34ch] text-[0.92rem] leading-[1.6] text-[#5C4A38]">
                {getProfessionalExcerpt(professional)}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-[#E6D8CB] bg-white/82 px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#7A6244]">
                O que a paciente encontra
              </p>
              <div className="mt-3 grid gap-3">
                {careProofPoints.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-[0.8rem] leading-[1.46] text-[#5C4A38]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B77]" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#E6D8CB] pt-4">
              <div>
                <p
                  className="max-w-[34ch] text-[0.8rem] italic leading-[1.5] text-[#5C4A38]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  &ldquo;{getProfessionalQuote(professional)}&rdquo;
                </p>
                <p className="mt-4 text-[0.78rem] leading-[1.5] text-[#8B7862]">
                  {professional.description}
                </p>
              </div>

              <div className="mt-4">
                <div className="rounded-[1.15rem] border border-[#E6D7CB] bg-[#FAF2EC] px-4 py-4 text-[0.8rem] leading-[1.52] text-[#5C4A38]">
                  <strong className="font-medium text-[#3A2E23]">
                    {zlUrgencyCopy.title}
                  </strong>{" "}
                  {zlUrgencyCopy.body}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function SupportProfessionalCard({
  professional,
}: {
  professional: ZlProfessional;
}) {
  const hasPhoto = Boolean(professional.photo?.src);
  const objectPosition = getProfessionalImagePosition(professional);

  return (
    <Reveal
      as="article"
      delay={140}
      className="border-t border-[#DCCFC2] pt-5"
    >
      <div className="grid gap-0 md:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] md:items-stretch">
        <div className="zl-integrated-photo min-h-[20rem] md:min-h-[24rem]">
          <div className="relative h-full overflow-hidden">
            {hasPhoto && professional.photo ?(
              <>
                <Image
                  src={professional.photo.src}
                  alt={professional.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, 100vw"
                  loading="lazy"
                  style={{ objectPosition }}
                  className="object-cover"
                />
                <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/12 px-3 py-1 text-[0.56rem] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  Continuidade clínica
                </div>
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="h-28 w-28">
                  <ProfessionalAvatar name={professional.name} />
                </div>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(58,46,35,0.5)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="text-[0.58rem] uppercase tracking-[0.24em] text-white/80">
                {professional.role}
              </p>
              <p
                className="mt-1 text-[1.55rem] leading-[1] tracking-[-0.03em]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                {professional.name}
              </p>
              <p className="mt-2 max-w-[22ch] text-[0.72rem] leading-[1.4] text-white/82">
                Continuidade com presença documental e o mesmo ritmo calmo da
                ZL.
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col justify-between p-5 md:p-6">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#B8837A]">
            Continuidade de atendimento
          </p>
          <p
            className="mt-3 max-w-[24ch] text-[0.98rem] leading-[1.45] text-[#3A2E23]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            &ldquo;{getProfessionalQuote(professional)}&rdquo;
          </p>
          <p className="mt-4 max-w-[26ch] text-[0.84rem] leading-[1.52] text-[#5C4A38]">
            {getProfessionalExcerpt(professional)}
          </p>
          <p className="mt-3 text-[0.76rem] leading-[1.46] text-[#8B7862]">
            {professional.description}
          </p>
          {professional.handle ?(
            <p className="mt-3 text-[0.68rem] uppercase tracking-[0.18em] text-[#8B7862]">
              {professional.handle}
            </p>
          ) : null}

          <div className="mt-4 border-t border-[#E6D8CB] pt-4">
            <p className="text-[0.76rem] leading-[1.45] text-[#5C4A38]">
              Atendimento com EPI completo, explicação limpa do cuidado e o
              mesmo ritmo calmo que sustenta a ZL no Google 5,0.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function TeamContextRail({ items }: { items: readonly string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-3 text-[0.82rem] leading-[1.48] text-[#5C4A38]"
        >
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B77]" />
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

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
        className="text-[0.66rem] uppercase tracking-[0.26em] text-[#C69184]"
      >
        {eyebrow}
      </Reveal>
      <Reveal
        as="h2"
        delay={70}
        className="mt-4 max-w-[18ch] text-[clamp(1.9rem,3.3vw,3rem)] leading-[0.98] tracking-[-0.04em] text-[#3A2E23]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {title}
      </Reveal>
      <Reveal
        as="p"
        delay={130}
        className="mt-5 max-w-[36ch] text-[0.9rem] leading-[1.64] text-[#5C4A38]"
      >
        {body}
      </Reveal>
    </div>
  );
}

function ProfessionalAvatar({ name }: { name: string }) {
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
      <circle
        cx="48"
        cy="48"
        r="46"
        fill={`url(#zl-avatar-bg-${initial})`}
        stroke="#D2C3A6"
        strokeWidth="1.5"
      />
      <circle
        cx="48"
        cy="38"
        r="13"
        fill="#fff"
        stroke="#B89B77"
        strokeWidth="1.6"
      />
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

function getProfessionalImagePosition(professional: ZlProfessional) {
  if (professional.photo?.cropProtected) {
    return "50% 75%";
  }

  if (professional.name === "Zucarina") {
    return "58% 24%";
  }

  if (professional.name === "Jannie") {
    return "14% 38%";
  }

  return "center";
}

function getProfessionalExcerpt(professional: ZlProfessional) {
  if (professional.name === "Zucarina") {
    return "Uma paciente por vez, com tempo para ouvir o caso antes do instrumental.";
  }

  if (professional.name === "Jannie") {
    return "Protocolo, atenção individual e o mesmo ritmo calmo que a ZL construiu.";
  }

  return professional.description;
}

function getProfessionalQuote(professional: ZlProfessional) {
  if (professional.name === "Zucarina") {
    return "Cuido dos pés de cada paciente como únicos, uma por vez, com tempo para ouvir o caso antes do instrumental.";
  }

  if (professional.name === "Jannie") {
    return "Tempo, explicação e mão firme onde o caso pede.";
  }

  return professional.bio;
}
