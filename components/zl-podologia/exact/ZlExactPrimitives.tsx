"use client";

import Image from "next/image";
import {
  type ExactCaseCard,
  type ExactServiceCard,
  type ExactStepCard,
  exactHeaderLinks,
} from "@/components/zl-podologia/exact/ZlExactData";

export function ExactSectionLabel({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#B67F66]">
        {eyebrow}
      </p>
      <h2
        className="mt-4 max-w-[13ch] text-[clamp(2.1rem,4.2vw,3.8rem)] leading-[0.96] tracking-[-0.05em] text-[#2E2732]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-[42ch] text-[0.98rem] leading-[1.72] text-[#6E6570]">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function ExactTopHeader() {
  return (
    <header className="relative z-20 border-b border-[#E6D9CF] bg-white/90 backdrop-blur">
      <div className="container-x mx-auto flex max-w-[1440px] items-center justify-between gap-4 py-4">
        <a href="#topo" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E9DED6] bg-[#FAF7F4] text-[#B67F66]">
            <ExactLogoMark />
          </span>
          <span className="hidden sm:block">
            <span className="block text-[0.78rem] uppercase tracking-[0.28em] text-[#B67F66]">
              ZL Podologia
            </span>
            <span className="block text-[0.9rem] text-[#6E6570]">Fortaleza</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {exactHeaderLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[0.72rem] uppercase tracking-[0.26em] text-[#8F7F77] transition-colors hover:text-[#2E2732]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="inline-flex items-center rounded-full bg-[#EF9F27] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_16px_32px_-20px_rgba(239,159,39,0.8)] transition-transform hover:-translate-y-0.5"
        >
          Agendar horario
        </a>
      </div>
    </header>
  );
}

export function ExactLogoMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden="true">
      <path
        d="M11 32.5c4.8-10.5 10.5-17 17-22.5M18 31.5c1.8-8.2 5.6-14.1 11.8-18.2M31 35.5c2.6-7.9 5.8-13.8 9.5-18.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M8 38h32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CasePairFrame({ card }: { card: ExactCaseCard }) {
  const isExperience = card.tag === "Experiencia";
  const leftLabel = isExperience ? "PROCEDIMENTO" : "ANTES";
  const rightLabel = isExperience ? "RESULTADO" : "DEPOIS";

  return (
    <div className="relative overflow-hidden rounded-[1.55rem] border border-[#E8DDD4] bg-white p-1.5 shadow-[0_18px_48px_-30px_rgba(71,53,44,0.22)]">
      <div className="relative grid overflow-hidden rounded-[calc(1.55rem-0.375rem)] md:grid-cols-2">
        <ImageHalf photo={card.beforePhoto} label={leftLabel} tone="before" />
        <ImageHalf photo={card.afterPhoto} label={rightLabel} tone="after" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/65 md:block" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F1E5DB] bg-white text-[#8E7B74] shadow-[0_10px_30px_-20px_rgba(71,53,44,0.3)]">
            →
          </span>
        </div>
      </div>
    </div>
  );
}

function ImageHalf({
  photo,
  label,
  tone,
}: {
  photo: { src: string; alt: string };
  label: string;
  tone: "before" | "after";
}) {
  const overlay =
    tone === "before"
      ? "bg-[linear-gradient(180deg,transparent_52%,rgba(24,21,27,0.28)_100%)]"
      : "bg-[linear-gradient(180deg,transparent_52%,rgba(24,21,27,0.18)_100%)]";

  return (
    <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1280px) 24vw, (min-width: 768px) 38vw, 92vw"
        className="object-cover"
      />
      <div className={`pointer-events-none absolute inset-0 ${overlay}`} />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-4">
        <span className="text-[0.62rem] uppercase tracking-[0.3em] text-white">
          {label}
        </span>
      </div>
    </div>
  );
}

export function ServiceIcon({ kind }: { kind: ExactServiceCard["icon"] }) {
  switch (kind) {
    case "ingrown":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M7 5c3.3 0 4.5 2.2 4.5 4.5v8" strokeLinecap="round" />
          <path d="M17 5c-3.3 0-4.5 2.2-4.5 4.5v8" strokeLinecap="round" />
          <path d="M7 18.5c1.8 1 3.3 1.5 5 1.5s3.2-.5 5-1.5" strokeLinecap="round" />
        </svg>
      );
    case "fungus":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <circle cx="6.5" cy="8.5" r="1.7" />
          <circle cx="12" cy="6" r="1.7" />
          <circle cx="17.5" cy="8.5" r="1.7" />
          <circle cx="8" cy="15.5" r="1.7" />
          <circle cx="16" cy="15.5" r="1.7" />
        </svg>
      );
    case "podoprofilaxia":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M4 15c2-3 5-4.5 8-4.5S18 12 20 15" strokeLinecap="round" />
          <path d="M6 14h12" strokeLinecap="round" />
          <path d="M8 10c1.2-1.8 3-3 4-3s2.8 1.2 4 3" strokeLinecap="round" />
        </svg>
      );
    case "orthosis":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M6 15c1.8-5 6-8 10-8" strokeLinecap="round" />
          <path d="M7 17c3.2 1.4 6 1.4 10 0" strokeLinecap="round" />
          <path d="M8.5 8.5h7" strokeLinecap="round" />
        </svg>
      );
    case "laser":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M12 3v6" strokeLinecap="round" />
          <path d="M12 15v6" strokeLinecap="round" />
          <path d="M5 12h6" strokeLinecap="round" />
          <path d="M13 12h6" strokeLinecap="round" />
          <path d="M8 8l2.5 2.5" strokeLinecap="round" />
          <path d="M14.5 13.5L17 16" strokeLinecap="round" />
        </svg>
      );
    case "diabetic":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M8 4c2 0 3.5 1.2 4 3.5.6 2.8-.6 5.4-1.8 7.5-.8 1.4-1.2 2.7-1.2 4" strokeLinecap="round" />
          <path d="M14 5.5c2 1.2 3.5 3.2 3.5 5.8 0 2.8-1.7 5-4 6.2" strokeLinecap="round" />
        </svg>
      );
  }
}

export function StepIcon({ kind }: { kind: ExactStepCard["icon"] }) {
  switch (kind) {
    case "clipboard":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <rect x="5" y="5" width="14" height="15" rx="2" />
          <path d="M9 4h6v3H9z" />
          <path d="M8 10h8M8 13h8M8 16h5" strokeLinecap="round" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <circle cx="11" cy="11" r="5.5" />
          <path d="M16 16l4 4" strokeLinecap="round" />
        </svg>
      );
    case "foot":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M12 3c2.5 0 4.5 1.8 4.5 4.3 0 1.8-.4 3.6-1.2 5.2-.8 1.6-1.3 3.6-1.3 5.9 0 1.8-1.2 2.6-3 2.6-2.8 0-5.8-2.4-5.8-6.5 0-4.8 3.1-11.5 6.8-11.5Z" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M12 3 20 6v5c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6l8-3Z" />
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export function FootLineArt() {
  return (
    <svg viewBox="0 0 220 220" className="h-48 w-48" fill="none" aria-hidden="true">
      <circle cx="110" cy="110" r="106" stroke="#F0E2D8" strokeWidth="2" />
      <path
        d="M88 56c8 16 8 34 8 53 0 28-6 55-14 78"
        stroke="#C6A18D"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M124 52c-2 18 1 34 4 52 4 25 3 45-1 74"
        stroke="#C6A18D"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M82 141c18 1 38 1 58-1"
        stroke="#C6A18D"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M125 136c10 8 18 17 24 27"
        stroke="#EBC2B5"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}
