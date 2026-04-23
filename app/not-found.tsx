import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80dvh] flex-col items-start justify-center pt-40">
      <p
        className="font-[var(--font-sans)] text-xs uppercase tracking-[0.24em]"
        style={{ color: "var(--color-muted)" }}
      >
        404
      </p>
      <h1
        className="mt-6 font-light leading-[0.95] tracking-[-0.01em]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.75rem,8vw,7rem)",
          color: "var(--color-ink)",
        }}
      >
        Nothing here.
      </h1>
      <div className="mt-10 flex gap-6 text-sm uppercase tracking-[0.16em]">
        <Link href="/" className="link-underline">Home</Link>
        <Link href="/work" className="link-underline">Work</Link>
        <Link href="/contact" className="link-underline">Contact</Link>
      </div>
    </section>
  );
}
