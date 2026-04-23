import type { Objection } from "./servicesContent";

interface ObjectionsFAQProps {
  items: Objection[];
}

export function ObjectionsFAQ({ items }: ObjectionsFAQProps) {
  return (
    <div>
      <header className="max-w-[58rem]">
        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Objeções centrais
        </p>
        <h2
          className="mt-3 max-w-[20ch] text-[clamp(2rem,4vw,3.2rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
          }}
        >
          O que costumamos ouvir antes de fechar.
        </h2>
      </header>
      <ul className="mt-[clamp(2.5rem,5vw,4rem)] divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
        {items.map((item) => (
          <li key={item.question}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[clamp(1.05rem,1.6vw,1.3rem)] text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="text-[1.5rem] leading-none text-[var(--color-muted)] transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="pb-6">
                <p className="max-w-[58ch] text-[1rem] leading-[1.6] text-[var(--color-muted)]">
                  {item.answer}
                </p>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
