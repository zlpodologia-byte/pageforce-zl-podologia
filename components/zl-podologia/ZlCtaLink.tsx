import Link from "next/link";
import type { ReactNode } from "react";

type ZlCtaLinkProps = {
  href: string;
  label: string;
  icon?: ReactNode;
  tone?: "whatsapp" | "blush" | "ghost";
};

export function ZlPrimaryLink({ href, label, icon, tone = "whatsapp" }: ZlCtaLinkProps) {
  // v7-earthy: tone "blush" virou variante terracota/marrom (mantem o nome
  // no enum pra nao quebrar refs; semantica visual e o que muda).
  const toneClasses =
    tone === "blush"
      ? "bg-[linear-gradient(135deg,#9A7F5C_0%,#574433_100%)] text-white shadow-[0_16px_40px_rgba(122,98,68,0.28)] hover:shadow-[0_20px_52px_rgba(122,98,68,0.36)]"
      : tone === "ghost"
      ? "border border-[#D2C3A6] bg-white text-[#3A2E23] hover:border-[#B89B77]"
      : "bg-[linear-gradient(135deg,#25d366_0%,#128c7e_100%)] text-white shadow-[0_16px_40px_rgba(18,140,126,0.28)] hover:shadow-[0_20px_52px_rgba(18,140,126,0.36)]";

  // Trailing icon circle.
  const iconCircleTone =
    tone === "ghost"
      ? "bg-[#3A2E23]/6 text-[#3A2E23]"
      : "bg-white/20 text-white";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-2 text-[0.82rem] font-medium tracking-[0.04em] transition-all duration-500 [transition-timing-function:var(--ease-haptic)] hover:-translate-y-0.5 active:scale-[0.98] ${toneClasses}`}
    >
      {icon ? <span className="flex h-4 w-4 items-center justify-center">{icon}</span> : null}
      <span className="py-1">{label}</span>
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full ${iconCircleTone} transition-transform duration-500 [transition-timing-function:var(--ease-haptic)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </Link>
  );
}

export function ZlSecondaryLink({ href, label, icon }: ZlCtaLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-[#D2C3A6] bg-white/80 px-5 py-3 text-[0.78rem] font-medium tracking-[0.04em] text-[#5C4A38] backdrop-blur-sm transition-all duration-500 [transition-timing-function:var(--ease-haptic)] hover:border-[#B89B77] hover:bg-white hover:text-[#3A2E23] active:scale-[0.98]"
    >
      {icon ? <span className="flex h-4 w-4 items-center justify-center text-[#7A6244]">{icon}</span> : null}
      <span>{label}</span>
    </Link>
  );
}

export function ZlWhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M17.6 6.3A7.85 7.85 0 0 0 12 4a7.9 7.9 0 0 0-6.7 12l-1 3.7 3.8-1a7.9 7.9 0 0 0 3.9 1h.01c4.36 0 7.9-3.53 7.9-7.9 0-2.1-.82-4.1-2.31-5.5Zm-5.6 12.1a6.58 6.58 0 0 1-3.34-.9l-.24-.15-2.26.6.6-2.2-.16-.24a6.58 6.58 0 0 1 5.4-10.27 6.54 6.54 0 0 1 6.56 6.56c0 3.62-2.95 6.6-6.56 6.6Zm3.6-4.94c-.2-.1-1.16-.57-1.34-.63-.18-.07-.31-.1-.44.1-.13.2-.5.63-.62.75-.11.13-.23.15-.43.05-.2-.1-.83-.3-1.58-.97-.58-.52-.98-1.16-1.1-1.36-.11-.2 0-.3.09-.4.09-.1.2-.25.3-.38.1-.13.13-.22.2-.37.06-.15.03-.28-.02-.38-.05-.1-.44-1.07-.61-1.47-.16-.38-.33-.33-.44-.33l-.38-.01c-.13 0-.35.05-.53.25s-.7.68-.7 1.66.72 1.92.82 2.06c.1.13 1.42 2.16 3.44 3.03 2.02.87 2.02.58 2.38.54.36-.03 1.16-.47 1.32-.92.17-.46.17-.85.12-.93-.05-.08-.18-.13-.38-.23Z" />
    </svg>
  );
}

export function ZlPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ZlInstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function ZlStarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3Z" />
    </svg>
  );
}
