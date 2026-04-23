import Link from "next/link";
import { Reveal } from "@/components/reveal/Reveal";
import { JellyBorder } from "@/components/jelly-border/JellyBorder";
import {
  getStandardLanding,
  type StandardLandingSlug,
} from "@/lib/landing-pages";

const STANDARD_SLUGS: readonly StandardLandingSlug[] = [
  "clinica",
  "odontologia",
  "estetica",
];

const STANDARD_LANDINGS = STANDARD_SLUGS.map((slug) => getStandardLanding(slug));

function getLabHref(slug: StandardLandingSlug) {
  return `/lab/${slug}-landing`;
}

export function StandardLandingWindows() {
  return (
    <section data-section="standard-landings" data-palette="operational">
      <div className="container-x py-[clamp(4rem,8vw,6rem)]">
        <div className="max-w-[48rem]">
          <Reveal
            as="p"
            className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-muted)]"
          >
            Modelos prontos para vertical
          </Reveal>
          <Reveal
            as="h2"
            delay={90}
            className="mt-4 max-w-[11ch] text-[clamp(2.4rem,5vw,4.6rem)] text-[var(--color-ink)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
            }}
          >
            Tres janelas prontas para virar vitrine, thumb e rota da sua
            vertical.
          </Reveal>
          <Reveal
            as="p"
            delay={170}
            className="mt-6 max-w-[42ch] text-[1rem] leading-[1.62] text-[var(--color-muted)]"
          >
            Clinica, odontologia e estetica ja estao desenhadas como paginas
            padrao. Aqui entram como thumbs com jelly, prontas para encaixe no
            ecossistema do Pageforce 2.0.
          </Reveal>
        </div>

        <div className="mt-[clamp(2.5rem,6vw,4rem)] grid gap-6 xl:grid-cols-3">
          {STANDARD_LANDINGS.map((landing) => (
            <StandardLandingThumb key={landing.slug} slug={landing.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StandardLandingThumb({ slug }: { slug: StandardLandingSlug }) {
  const landing = getStandardLanding(slug);
  const { showcase } = landing;
  const href = getLabHref(slug);

  return (
    <JellyBorder
      width={320}
      height={364}
      shape="rect"
      radius={26}
      maxBulge={14}
      influence={120}
      driftAmp={1.6}
      strokeColor="var(--color-accent-midnight)"
      strokeWidth={1}
      fillColor="transparent"
      style={{ width: "100%", maxWidth: 320 }}
    >
      <Link
        href={href}
        data-standard-thumb={slug}
        data-cursor-target
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={showcase.coverAsset}
          alt=""
          width={320}
          height={188}
          style={{
            display: "block",
            width: "100%",
            height: 188,
            objectFit: "cover",
            borderRadius: 22,
          }}
        />

        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-accent-teal)]">
            {landing.eyebrow}
          </p>
          <h3
            className="mt-3 text-[1.8rem] leading-[0.98] text-[var(--color-ink)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
            }}
          >
            {showcase.label}
          </h3>
          <p className="mt-4 text-[0.95rem] leading-[1.55] text-[var(--color-muted)]">
            {showcase.hookLine}
          </p>
          <div className="mt-auto border-t border-[var(--color-line)] pt-4">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
              KPI ancora
            </p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <p
                className="text-[2rem] leading-none text-[var(--color-accent-midnight)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {showcase.kpis[0].value}
              </p>
              <span className="link-underline text-[0.82rem] uppercase tracking-[0.18em] text-[var(--color-accent-burnt)]">
                Abrir modelo
              </span>
            </div>
          </div>
        </div>
      </Link>
    </JellyBorder>
  );
}
