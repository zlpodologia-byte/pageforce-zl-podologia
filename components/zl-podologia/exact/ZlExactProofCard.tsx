import Image from "next/image";
import { ZlStarIcon } from "@/components/zl-podologia/ZlCtaLink";
import { Glyph } from "@/components/zl-podologia/exact/ZlExactAtoms";

export function ProofCard({
  eyebrow,
  title,
  body,
  glyph,
}: {
  eyebrow: string;
  title: string;
  body: string;
  glyph: string;
}) {
  const isLocation = glyph === "pin";

  return (
    <div className="min-h-full border-b border-[#EADDD6] p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#0F6B46]">
        {eyebrow}
      </p>
      <p
        className="mt-4 text-[1rem] leading-[1.25] text-[#3C2F2B]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {title}
      </p>

      {glyph === "stars" ? (
        <div className="mt-4 flex items-center gap-1 text-[#E3A42E]">
          <ZlStarIcon />
          <ZlStarIcon />
          <ZlStarIcon />
          <ZlStarIcon />
          <ZlStarIcon />
        </div>
      ) : null}

      <p
        className={`mt-4 whitespace-pre-line text-[0.9rem] leading-[1.65] text-[#6E5D57] ${
          isLocation ? "max-w-[18ch]" : "max-w-[24ch]"
        }`}
      >
        {body}
      </p>

      {glyph === "foot" ? (
        <svg
          className="mt-6 h-16 w-16 text-[#E5C7BE]"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 86c12-7 18-16 20-27 2-9 1-23 8-31 5-5 13-6 19-2 5 4 7 11 7 18 0 15 4 24 15 30"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M62 73c-8 2-15 8-18 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="38" cy="94" r="4" fill="currentColor" />
          <circle cx="50" cy="98" r="4" fill="currentColor" />
          <circle cx="63" cy="100" r="4" fill="currentColor" />
        </svg>
      ) : null}

      {glyph === "clock" ? (
        <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#E8D7CE] text-[#D48678]">
          <Glyph kind="clock" className="h-5 w-5" />
        </div>
      ) : null}

      {glyph === "pin" ? (
        <div className="mt-5 overflow-hidden rounded-[18px] border border-[#E8D7CE] bg-white">
          <div className="relative aspect-[4/2.6]">
            <Image
              src="/zl-podologia/social/edited-pro/ambiente/sala-wide-institucional-pro.jpg"
              alt="Vista interna da ZL Podologia em Fortaleza"
              fill
              sizes="(min-width: 768px) 18vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,246,240,0.62)_100%)]"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
