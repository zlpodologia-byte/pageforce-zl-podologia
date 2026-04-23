import Link from "next/link";
import { Reveal } from "@/components/reveal/Reveal";
import { LandingPillCta } from "@/components/landing-pages/LandingPillCta";
import type {
  LandingDifferential,
  LandingFocusArea,
  LandingStep,
  StandardLandingData,
} from "@/lib/landing-pages";

interface StandardLandingPageProps {
  landing: StandardLandingData;
}

export function StandardLandingPage({ landing }: StandardLandingPageProps) {
  const { showcase } = landing;

  return (
    <div data-palette="operational">
      <section
        data-section="hero"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(159,216,206,0.28), transparent 42%), linear-gradient(180deg, var(--color-canvas-invert) 0%, #10192b 100%)",
        }}
      >
        <div className="container-x grid gap-12 pb-[clamp(4rem,8vw,6rem)] pt-[clamp(6.5rem,12vw,9rem)] lg:grid-cols-[minmax(0,1.15fr)_20rem] lg:items-end">
          <div>
            <Reveal as="p" className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent-teal-soft)]">
              {landing.eyebrow}
            </Reveal>
            <Reveal
              as="h1"
              delay={80}
              className="mt-5 max-w-[14ch] text-[clamp(3.1rem,7vw,6.2rem)] text-[var(--color-ink-invert)]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, lineHeight: 0.92, letterSpacing: "-0.05em" }}
            >
              {landing.headline}
            </Reveal>
            <Reveal
              as="p"
              delay={160}
              className="mt-7 max-w-[38ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.6] text-[rgba(242,245,244,0.82)]"
            >
              {landing.lead}
            </Reveal>
            <Reveal as="div" delay={240} className="mt-9 flex flex-wrap items-center gap-5">
              <LandingPillCta
                href={landing.primaryHref}
                label="Falar com a operacao"
                testId="landing-primary-cta"
              />
              <Link
                href={landing.diagnosticHref}
                data-testid="landing-diagnostic-cta"
                className="link-underline text-[0.95rem] text-[var(--color-ink-invert)]"
              >
                Comecar pelo diagnostico
              </Link>
            </Reveal>
            <div className="mt-12 grid gap-6 border-t border-[rgba(242,245,244,0.16)] pt-6 md:grid-cols-3">
              {showcase.kpis.map((kpi) => (
                <div key={kpi.label}>
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(242,245,244,0.52)]">
                    {kpi.label}
                  </p>
                  <p
                    className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] text-[var(--color-accent-teal-soft)]"
                    style={{ fontFamily: "var(--font-display)", lineHeight: 0.95 }}
                  >
                    {kpi.value}
                  </p>
                  <p className="mt-2 text-[0.92rem] leading-[1.5] text-[rgba(242,245,244,0.7)]">
                    {kpi.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.5rem] border border-[rgba(242,245,244,0.12)] bg-[rgba(255,255,255,0.03)] p-6 backdrop-blur-sm">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-accent-teal-soft)]">
              {landing.heroPanelTitle}
            </p>
            <ul className="mt-6 space-y-4">
              {landing.heroPanelItems.map((item) => (
                <li key={item} className="border-t border-[rgba(242,245,244,0.12)] pt-4 text-[0.96rem] leading-[1.55] text-[rgba(242,245,244,0.78)]">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section data-section="proof" className="container-x py-[clamp(4rem,8vw,6rem)]">
        <SectionHeading title="O que faz o visitante confiar rapido" body="A landing precisa provar relevancia antes de pedir contato. Aqui entram as quatro mensagens que devem aparecer cedo no fluxo." />
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,20rem)]">
          <div className="grid gap-4">
            {showcase.bullets.map((bullet) => (
              <div key={bullet} className="border-t border-[var(--color-line)] py-4 text-[1rem] leading-[1.65] text-[var(--color-ink)]">
                {bullet}
              </div>
            ))}
          </div>
          <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-window)] p-6">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Hook principal
            </p>
            <p
              className="mt-4 text-[clamp(1.8rem,3vw,2.6rem)] text-[var(--color-accent-midnight)]"
              style={{ fontFamily: "var(--font-display)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
            >
              {showcase.hookLine}
            </p>
            <p className="mt-5 text-[0.96rem] leading-[1.6] text-[var(--color-muted)]">
              Essa frase precisa aparecer cedo, com visual e prova suficientes para a pessoa entender em segundos se aquilo serve para a sua operacao.
            </p>
          </div>
        </div>
      </section>

      <section data-section="focus-areas" className="container-x py-[clamp(4rem,8vw,6rem)]">
        <SectionHeading title="Frentes que merecem pagina propria" body="A pagina padrao nao serve para despejar tudo. Ela existe para dar recorte ao que a operacao vende melhor." />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {landing.focusAreas.map((area, index) => (
            <FocusAreaCard key={area.title} area={area} index={index} />
          ))}
        </div>
      </section>

      <section data-section="journey" className="container-x py-[clamp(4rem,8vw,6rem)]">
        <SectionHeading title="Fluxo que a landing precisa conduzir" body="Se o clique nao sai com um proximo passo claro, a pagina so virou folder. O desenho padrao precisa levar o visitante ate uma decisao operacional." />
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {landing.processSteps.map((step, index) => (
            <ProcessStepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </section>

      <section
        data-section="differentials"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,18,32,0.98) 0%, rgba(16,25,43,1) 100%)",
        }}
      >
        <div className="container-x grid gap-10 py-[clamp(4rem,8vw,6rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent-teal-soft)]">
              Sistema por tras da pagina
            </p>
            <h2
              className="mt-4 max-w-[14ch] text-[clamp(2.2rem,4vw,3.6rem)] text-[var(--color-ink-invert)]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, lineHeight: 0.96, letterSpacing: "-0.04em" }}
            >
              Nao e visual isolado. E pagina, resposta e medicao andando juntas.
            </h2>
          </div>
          <div className="grid gap-4">
            {landing.differentials.map((item) => (
              <DifferentialRow key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section data-section="conversion" className="container-x py-[clamp(4rem,8vw,6.5rem)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">
              Proximo passo
            </p>
            <h2
              className="mt-4 max-w-[14ch] text-[clamp(2.2rem,4vw,3.6rem)] text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, lineHeight: 0.96, letterSpacing: "-0.04em" }}
            >
              {landing.closingTitle}
            </h2>
            <p className="mt-6 max-w-[38ch] text-[1rem] leading-[1.65] text-[var(--color-muted)]">
              {landing.closingCopy}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-window)] p-[clamp(1.5rem,3vw,2.2rem)]">
            <ul className="space-y-4">
              {landing.closingBullets.map((bullet) => (
                <li key={bullet} className="border-t border-[var(--color-line)] pt-4 text-[0.98rem] leading-[1.6] text-[var(--color-ink)] first:border-t-0 first:pt-0">
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LandingPillCta href={landing.primaryHref} label="Falar com a operacao" />
              <LandingPillCta
                href={landing.diagnosticHref}
                label="Abrir diagnostico"
                accent="teal"
              />
            </div>
            <p className="mt-6 text-[0.82rem] leading-[1.5] text-[var(--color-muted)]">
              Base deste modelo: {showcase.label}. Pronto para virar thumb, janela ou rota publica depois da sua integracao no ecossistema do Pageforce 2.0.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-[46rem]">
      <Reveal as="p" className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">
        Estrutura padrao
      </Reveal>
      <Reveal
        as="h2"
        delay={70}
        className="mt-4 text-[clamp(2.2rem,4vw,3.6rem)] text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400, lineHeight: 0.96, letterSpacing: "-0.04em" }}
      >
        {title}
      </Reveal>
      <Reveal as="p" delay={130} className="mt-5 max-w-[40ch] text-[1rem] leading-[1.65] text-[var(--color-muted)]">
        {body}
      </Reveal>
    </div>
  );
}

function FocusAreaCard({
  area,
  index,
}: {
  area: LandingFocusArea;
  index: number;
}) {
  return (
    <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-window)] p-6">
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-accent-teal)]">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3
        className="mt-4 text-[1.65rem] leading-[1.02] text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.03em" }}
      >
        {area.title}
      </h3>
      <p className="mt-4 text-[0.98rem] leading-[1.65] text-[var(--color-muted)]">
        {area.description}
      </p>
    </div>
  );
}

function ProcessStepCard({
  step,
  index,
}: {
  step: LandingStep;
  index: number;
}) {
  return (
    <div className="border-t border-[var(--color-line)] pt-5">
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-accent-midnight)]">
        Etapa {index + 1}
      </p>
      <h3
        className="mt-3 text-[1.5rem] leading-[1.02] text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.03em" }}
      >
        {step.title}
      </h3>
      <p className="mt-4 text-[0.95rem] leading-[1.6] text-[var(--color-muted)]">
        {step.body}
      </p>
    </div>
  );
}

function DifferentialRow({ item }: { item: LandingDifferential }) {
  return (
    <div className="rounded-[1.25rem] border border-[rgba(242,245,244,0.12)] bg-[rgba(255,255,255,0.03)] p-6">
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-accent-teal-soft)]">
        Diferencial
      </p>
      <h3
        className="mt-3 text-[1.5rem] leading-[1.02] text-[var(--color-ink-invert)]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.03em" }}
      >
        {item.title}
      </h3>
      <p className="mt-4 text-[0.95rem] leading-[1.6] text-[rgba(242,245,244,0.72)]">
        {item.body}
      </p>
    </div>
  );
}
