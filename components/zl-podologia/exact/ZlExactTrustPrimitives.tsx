import type { ReactNode } from "react";
import { ExactGlyph, type ExactGlyphKind } from "@/components/zl-podologia/exact/ZlExactAtoms";

export function ExactSectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={alignment}>
      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#9a7f5c]">
        {eyebrow}
      </p>
      <h2
        className="mt-4 text-[clamp(2rem,3.7vw,3.5rem)] leading-[0.96] tracking-[-0.04em] text-[#32261f]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-[46ch] text-[0.98rem] leading-[1.75] text-[#6d5a4c]">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function ExactInfoPill({
  icon,
  children,
}: {
  icon: ExactGlyphKind;
  children: ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#e4d4c7] bg-white px-4 py-2 text-[0.8rem] text-[#6d5a4c] shadow-[0_8px_24px_rgba(123,98,78,0.05)]">
      <span className="text-[#a67c68]">
        <ExactGlyph kind={icon} />
      </span>
      <span>{children}</span>
    </div>
  );
}

export function ExactBulletCard({
  icon,
  title,
  body,
}: {
  icon: ExactGlyphKind;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-[#e7d7cc] bg-white p-5 shadow-[0_14px_34px_rgba(123,98,78,0.08)]">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e7d7cc] bg-[#fcf8f4] text-[#a67c68]">
        <ExactGlyph kind={icon} />
      </span>
      <h3
        className="mt-4 text-[1.2rem] leading-[1.05] tracking-[-0.03em] text-[#32261f]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {title}
      </h3>
      <p className="mt-3 text-[0.92rem] leading-[1.65] text-[#6d5a4c]">{body}</p>
    </div>
  );
}
