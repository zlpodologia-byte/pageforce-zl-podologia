"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal/Reveal";
import { ZlCaseArtwork } from "@/components/zl-podologia/ZlClinicIllustrations";
import { ZlSceneEnvelope } from "@/components/zl-podologia/ZlV8Primitives";
import {
  zlIllustratedCases,
  type ZlIllustratedCasePhoto,
} from "@/components/zl-podologia/zlPodologiaContent";

const proofServiceContext: Record<string, string> = {
  "Unha encravada": "Alívio da dor e reorganização da borda após o cuidado.",
  "Fungos nas unhas": "Protocolo clínico com acompanhamento, sem promessa imediata.",
  Podoprofilaxia: "Técnica em execução e acabamento clínico do atendimento.",
};

export function ZlCasesSection() {
  return (
    <section className="relative border-t border-[#D2C3A6] bg-[#F2EBDE] py-8 lg:py-10">
      <div className="container-x relative mx-auto max-w-[1400px] px-3 sm:px-4 md:px-6">
        <ZlSceneEnvelope>
          <div className="relative">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#E6DBC6_0%,#FAF7F2_100%)]" />
            <div className="relative px-5 py-8 sm:px-8 md:px-10 md:py-10 lg:px-14 lg:py-12">
              <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
                <SectionIntro
                  eyebrow="Casos reais"
                  title="Registros clínicos publicados com autorização."
                  body="Casos publicados pela ZL para mostrar alívio, protocolo e acabamento clínico."
                />
                <Reveal
                  as="p"
                  delay={120}
                  className="max-w-[54ch] text-[0.88rem] leading-[1.6] text-[#5C4A38] lg:justify-self-end"
                >
                  Em unha encravada, o foco é aliviar a dor. Em fungos, o foco é
                  mostrar protocolo e continuidade. Em podoprofilaxia, técnica e
                  acabamento clínico.
                </Reveal>
              </div>

              <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.88fr)] lg:items-stretch">
                <figure className="relative overflow-hidden rounded-[1.6rem] border border-[rgba(198,145,132,0.18)] bg-[#2F241D] shadow-[0_18px_44px_rgba(138,108,72,0.12)]">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src="/zl-podologia/social/edited-pro/ambiente/sala-wide-institucional-pro.jpg"
                      alt="Sala de atendimento da ZL Podologia em Fortaleza"
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      loading="lazy"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(28,20,15,0.1)_0%,rgba(28,20,15,0.18)_40%,rgba(22,16,12,0.78)_100%)]" />
                    <div className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-[#5C4A38] shadow-[0_10px_24px_rgba(22,16,12,0.14)]">
                      Sala de atendimento
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="max-w-[26ch] text-[0.88rem] leading-[1.48] text-white/86">
                        Sala de atendimento da clínica.
                      </p>
                    </figcaption>
                  </div>
                </figure>

                <div className="rounded-[1.6rem] border border-[#E8DDD0] bg-white/78 p-5 shadow-[0_16px_42px_rgba(138,108,72,0.08)]">
                  <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#7A6244]">
                    Como observar
                  </p>
                  <p className="mt-4 text-[0.92rem] leading-[1.68] text-[#5C4A38]">
                    Em unha encravada, o foco é aliviar a dor. Em fungos,
                    mostrar continuidade de protocolo. Em podoprofilaxia,
                    mostrar técnica e acabamento clínico.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 lg:grid-cols-3">
                {zlIllustratedCases.map((item, index) => (
                  <Reveal
                    key={item.title}
                    as="article"
                    delay={index * 80}
                    className="rounded-[1.55rem] border border-[rgba(198,145,132,0.2)] bg-white/92 p-4 shadow-[0_16px_42px_rgba(138,108,72,0.08)] md:p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#B8837A]">
                        {item.title}
                      </p>
                      <span className="rounded-full border border-[#DCCFC2] bg-[#F4E8DA] px-2.5 py-1 text-[0.56rem] uppercase tracking-[0.16em] text-[#6B5547]">
                        {item.tag}
                      </span>
                    </div>

                    <p className="mt-3 text-[0.76rem] leading-[1.45] text-[#6E5B4B]">
                      {proofServiceContext[item.title] ?? item.note}
                    </p>

                    <div className="mt-4">
                      {item.beforePhoto && item.afterPhoto ?(
                        <CasePhotoPair
                          caseTitle={item.title}
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

                    <p className="mt-4 text-[0.8rem] leading-[1.5] text-[#5C4A38]">
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

function CasePhotoPair({
  caseTitle,
  beforePhoto,
  afterPhoto,
  beforeLabel,
  afterLabel,
  tag,
}: {
  caseTitle: string;
  beforePhoto: ZlIllustratedCasePhoto;
  afterPhoto: ZlIllustratedCasePhoto;
  beforeLabel: string;
  afterLabel: string;
  tag: string;
}) {
  const isExperience = tag === "Experiência";

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <CasePhotoFigure
        caseTitle={caseTitle}
        tone="before"
        title={isExperience ?"Procedimento" : "Antes"}
        body={beforeLabel}
        photo={beforePhoto}
      />
      <CasePhotoFigure
        caseTitle={caseTitle}
        tone="after"
        title={isExperience ?"Resultado" : "Depois"}
        body={afterLabel}
        photo={afterPhoto}
      />
    </div>
  );
}

function CasePhotoFigure({
  caseTitle,
  tone,
  title,
  body,
  photo,
}: {
  caseTitle: string;
  tone: "before" | "after";
  title: string;
  body: string;
  photo: ZlIllustratedCasePhoto;
}) {
  const palette =
    tone === "before"
      ?{
          chipBg: "bg-[#F3E6D7]",
          chipText: "text-[#6B5547]",
          frameBg: "bg-[#F2E7D9]",
        }
      : {
          chipBg: "bg-[#EEF3E8]",
          chipText: "text-[#62704A]",
          frameBg: "bg-[#F7F3EC]",
        };
  const figureConfig = getCaseFigureConfig(caseTitle, tone);

  return (
    <figure className="rounded-[1.3rem] border border-[#E8DDD0] bg-[#FBF7F2] p-2.5">
      <div
        className={`relative overflow-hidden rounded-[1rem] ${palette.frameBg} ${figureConfig.aspectClass}`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
          loading="lazy"
          className="object-cover"
          style={{
            objectPosition: figureConfig.objectPosition,
            transform: `scale(${figureConfig.scale})`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(58,46,35,0.28)_100%)]" />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.56rem] uppercase tracking-[0.16em] ${palette.chipBg} ${palette.chipText}`}
        >
          {title}
        </span>
      </div>
      <figcaption className="mt-3 text-[0.8rem] leading-[1.48] text-[#5C4A38]">
        {body}
      </figcaption>
    </figure>
  );
}

function getCaseFigureConfig(caseTitle: string, tone: "before" | "after") {
  if (caseTitle === "Unha encravada") {
    return tone === "before"
      ?{
          aspectClass: "aspect-[3/4]",
          objectPosition: "50% 34%",
          scale: 1.3,
        }
      : {
          aspectClass: "aspect-[3/4]",
          objectPosition: "50% 35%",
          scale: 1.24,
        };
  }

  if (caseTitle === "Fungos nas unhas") {
    return tone === "before"
      ?{
          aspectClass: "aspect-[4/5]",
          objectPosition: "50% 38%",
          scale: 1.08,
        }
      : {
          aspectClass: "aspect-[4/5]",
          objectPosition: "50% 42%",
          scale: 1.05,
        };
  }

  if (caseTitle === "Podoprofilaxia") {
    return tone === "before"
      ?{
          aspectClass: "aspect-[4/5]",
          objectPosition: "58% 50%",
          scale: 1.08,
        }
      : {
          aspectClass: "aspect-[4/5]",
          objectPosition: "50% 42%",
          scale: 1.04,
        };
  }

  return {
    aspectClass: "aspect-[4/5]",
    objectPosition: "50% 50%",
    scale: 1,
  };
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
        className="text-[0.66rem] uppercase tracking-[0.26em] text-[#7A6244]"
      >
        {eyebrow}
      </Reveal>
      <Reveal
        as="h2"
        delay={70}
        className="mt-4 max-w-[15ch] text-[clamp(1.95rem,3.4vw,3rem)] leading-[0.98] tracking-[-0.04em] text-[#3A2E23]"
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
