import Image from "next/image";
import type { ReactNode } from "react";

export type ExactGlyphKind =
  | "heart"
  | "shield"
  | "spark"
  | "home"
  | "foot"
  | "drop"
  | "leaf"
  | "hands"
  | "calendar"
  | "arrow"
  | "stars"
  | "clock"
  | "pin"
  | "check"
  | "users";

export function ExactBrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#ead8d0] bg-white">
        <Image
          src="/zl-podologia/social/marca/logo-oficial.jpg"
          alt="Logo da ZL Podologia"
          fill
          sizes="44px"
          className="object-contain p-1.5"
        />
      </div>
      <div className="leading-none">
        <p
          className="text-[1.35rem] tracking-[0.08em] text-[#b8837a]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          ZL
        </p>
        <p className="mt-1 text-[0.62rem] uppercase tracking-[0.32em] text-[#7c6862]">
          Podologia
        </p>
      </div>
    </div>
  );
}

export function ExactActionButton({
  href,
  label,
  kind = "primary",
  icon,
}: {
  href: string;
  label: string;
  kind?: "primary" | "secondary";
  icon?: ExactGlyphKind;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5";
  const tone =
    kind === "primary"
      ? "border-[#d97e73] bg-[#d97e73] text-white shadow-[0_14px_32px_rgba(217,126,115,0.26)]"
      : "border-[#e5cec5] bg-white text-[#6e5d57] hover:border-[#d6a69a] hover:text-[#41322d]";

  return (
    <a href={href} className={`${base} ${tone}`}>
      {icon ? <ExactGlyph kind={icon} className="h-4 w-4" /> : null}
      <span>{label}</span>
    </a>
  );
}

export function ExactGlyph({
  kind,
  className = "h-4 w-4",
}: {
  kind: ExactGlyphKind;
  className?: string;
}) {
  switch (kind) {
    case "heart":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 20s-7-4.3-7-9.7A4.3 4.3 0 0 1 12 6a4.3 4.3 0 0 1 7 4.3C19 15.7 12 20 12 20Z" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 3 19 6v5c0 5-3.1 8.9-7 10-3.9-1.1-7-5-7-10V6l7-3Z" />
          <path d="m9.3 12.1 1.8 1.8 3.8-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Z" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M4.5 10.2 12 4l7.5 6.2" strokeLinecap="round" />
          <path d="M6.5 9.6V20h11V9.6" />
        </svg>
      );
    case "foot":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M10.8 20c-2.4 0-4.7-1.2-5.8-3.2-.9-1.7-.9-3.6-.2-5.5l2.1-5.2c.4-1 1.4-1.7 2.5-1.7 1.4 0 2.6 1.2 2.6 2.6v4.2c0 1 .7 1.8 1.7 2l1.6.3c2 .4 3.3 2 3.3 4 0 1.1-.5 2.2-1.4 3-.9.8-2.1 1.2-3.3 1.1L10.8 20Z" />
          <circle cx="16.9" cy="6.4" r="1.2" />
          <circle cx="14.5" cy="4.8" r="1.1" />
          <circle cx="11.8" cy="4.1" r="1" />
          <circle cx="9.1" cy="4.2" r="1" />
        </svg>
      );
    case "drop":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 3c3 4 5.5 6.8 5.5 10A5.5 5.5 0 0 1 12 18.5 5.5 5.5 0 0 1 6.5 13C6.5 9.8 9 7 12 3Z" />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M19 4c-7 .2-11.8 3.8-13.5 10.2-.7 2.8.7 5.8 3.5 6.8 1.9.7 4.1.4 5.8-.8 4-2.8 5.4-7.7 4.2-16.2Z" />
          <path d="M8.2 16.4c2.4-2.6 5.5-4.8 9.2-6.7" strokeLinecap="round" />
        </svg>
      );
    case "hands":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M8 11.5V6.8a1.3 1.3 0 1 1 2.6 0v4.7M10.6 10.8V5.7a1.3 1.3 0 1 1 2.6 0v5.1M13.2 11.2V6.5a1.3 1.3 0 1 1 2.6 0v6.2c0 2.7-1.9 4.9-4.6 5.4l-1.8.3c-2.7.4-5.1-1.7-5.1-4.4V10a1.3 1.3 0 1 1 2.6 0v3.3" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="4" y="5.5" width="16" height="14" rx="2" />
          <path d="M8 3.8v3.4M16 3.8v3.4M4 9.2h16" strokeLinecap="round" />
        </svg>
      );
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "stars":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="m12 3 2.2 4.4L19 8l-3.5 3.4.8 4.8L12 14l-4.3 2.3.8-4.8L5 8l4.8-.6L12 3Z" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="8.4" />
          <path d="M12 7.4V12l3.2 1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pin":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 21s6.8-6.2 6.8-11A6.8 6.8 0 1 0 5.2 10C5.2 14.8 12 21 12 21Z" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" />
          <path d="m8.5 12.3 2.2 2.2 4.8-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="8.5" cy="8.4" r="2.8" />
          <circle cx="15.7" cy="9.7" r="2.2" />
          <path d="M3.8 18.8c.8-2.8 2.8-4.4 4.7-4.4 1.8 0 3.7 1.4 4.5 4.2" strokeLinecap="round" />
          <path d="M13.4 18.4c.5-1.8 1.8-3 3.5-3 1 0 2.1.5 2.8 1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

// Backward-compat alias for parallel worker artifacts that were created
// against an earlier exact API contract.
export const Glyph = ExactGlyph;

export function ExactProofCard({
  eyebrow,
  title,
  body,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  icon: ExactGlyphKind;
  children?: ReactNode;
}) {
  return (
    <div className="relative border-r border-[#eadfd8] px-5 py-5 last:border-r-0">
      <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#9b7e77]">
        {eyebrow}
      </p>
      <h3
        className="mt-3 text-[1.05rem] leading-[1.15] tracking-[-0.03em] text-[#352822]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {title}
      </h3>
      <p className="mt-3 whitespace-pre-line text-[0.88rem] leading-[1.65] text-[#6d5b54]">
        {body}
      </p>
      {children ? <div className="mt-5">{children}</div> : null}
      <span className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfd8] bg-white text-[#d48678]">
        <ExactGlyph kind={icon} />
      </span>
    </div>
  );
}

export function ExactScene({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className="px-3 py-3 sm:px-4 md:px-6 md:py-6">
      <div
        className={`mx-auto max-w-[1400px] overflow-hidden rounded-[34px] border border-[#eee0d7] bg-white shadow-[0_30px_90px_rgba(109,73,58,0.12)] ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
