import Link from "next/link";
import { Reveal } from "@/components/reveal/Reveal";
import { CASES } from "@/lib/cases";

interface NextCaseProps {
  current: string;
}

export function NextCase({ current }: NextCaseProps) {
  const currentIndex = CASES.findIndex((item) => item.slug === current);
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % CASES.length;
  const item = CASES[nextIndex];

  if (!item) {
    return null;
  }

  return (
    <section className="container-x pb-[clamp(4rem,8vw,6rem)] pt-[clamp(3rem,7vw,5.5rem)]">
      <Reveal className="border-t border-[var(--color-line)] pt-6">
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Next case
        </p>
        <Link
          href={`/work/${item.slug}`}
          data-cursor-target
          data-cursor-label="Next"
          className="group mt-4 block"
        >
          <span
            className="block text-[clamp(2.75rem,6vw,5.75rem)] text-[var(--color-ink)] transition-transform duration-300 motion-reduce:transform-none motion-safe:group-hover:translate-x-2"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.05em",
            }}
          >
            {item.title}
          </span>
          <span className="mt-3 block text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            {item.client} {"\u2022"} {item.year}
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
