import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal/Reveal";
import {
  STORIES,
  STORIES_HEADLINE,
  STORIES_KICKER,
  STORIES_LEAD,
} from "@/components/stories/storiesContent";

export const metadata: Metadata = {
  title: "O que medimos — Pageforce",
  description:
    "Editorial curto sobre objetivos comerciais, conversão real e KPIs que importam.",
  alternates: { canonical: "/stories" },
  openGraph: {
    title: "O que medimos — Pageforce",
    description:
      "Notas curtas sobre o que move caixa: horizontes comerciais, conversão e KPIs do cliente.",
    url: "/stories",
  },
};

export default function StoriesPage() {
  return (
    <section className="container-x pb-[clamp(5rem,8vw,8rem)] pt-[clamp(6.5rem,12vw,9.5rem)]">
      <header className="max-w-[60rem]">
        <Reveal
          as="p"
          className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]"
        >
          {STORIES_KICKER}
        </Reveal>
        <Reveal
          as="h1"
          delay={90}
          className="mt-4 max-w-[18ch] text-[clamp(2.6rem,7vw,5.4rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          {STORIES_HEADLINE}
        </Reveal>
        <Reveal
          as="p"
          delay={180}
          className="mt-8 max-w-[44ch] text-[clamp(1.05rem,1.5vw,1.32rem)] leading-[1.52] text-[var(--color-ink)]"
        >
          {STORIES_LEAD}
        </Reveal>
      </header>

      <ol className="mt-[clamp(4rem,9vw,7rem)] divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
        {STORIES.map((story, index) => (
          <li key={story.title}>
            <Reveal delay={index * 80}>
              <Link
                href={story.href}
                data-cursor-target
                className="group/story grid grid-cols-1 items-baseline gap-x-8 gap-y-3 py-7 sm:grid-cols-[10rem_1fr_5rem]"
              >
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    {story.kind}
                  </p>
                  <p className="mt-1 text-[0.78rem] text-[var(--color-muted)]">
                    {story.date}
                  </p>
                </div>

                <div>
                  <h2
                    className="max-w-[36ch] text-[clamp(1.45rem,2.4vw,2.05rem)] text-[var(--color-ink)] transition-opacity duration-200 group-hover/story:opacity-70"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 300,
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {story.title}
                  </h2>
                  <p className="mt-3 max-w-[60ch] text-[0.96rem] leading-[1.55] text-[var(--color-muted)]">
                    {story.summary}
                  </p>
                </div>

                <div className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-muted)] sm:text-right">
                  {story.readTime}
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
