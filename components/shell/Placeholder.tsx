/**
 * Placeholder — simple M0 page shell used by routes awaiting their milestone implementation.
 * Replaced per-route by M3-M9.
 */
export function Placeholder({
  kicker,
  title,
  milestone,
}: {
  kicker: string;
  title: string;
  milestone?: string;
}) {
  return (
    <section className="container-x flex min-h-[80dvh] flex-col justify-center pt-40 md:pt-56">
      <p
        className="text-xs uppercase tracking-[0.24em]"
        style={{ color: "var(--color-muted)" }}
      >
        {kicker}
        {milestone ? ` · ${milestone}` : ""}
      </p>
      <h1
        className="mt-6 max-w-[20ch] font-light leading-[0.98] tracking-[-0.01em]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.25rem,7vw,6rem)",
          color: "var(--color-ink)",
        }}
      >
        {title}
      </h1>
    </section>
  );
}
