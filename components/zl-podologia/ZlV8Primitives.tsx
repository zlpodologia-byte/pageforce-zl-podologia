import type { ReactNode } from "react";

/**
 * v8-merge primitives
 *
 * Shared, stable primitives extracted from the `/lab/zl-podologia-exact`
 * variant and fused into the v7-earthy main landing. Three small pieces:
 *
 *  - `ZlSceneEnvelope` - white rounded card (34px radius) with terroso
 *    ring + warm shadow. Wraps editorial sections so the landing feels
 *    like a catalogo impresso without replacing the v7 bege outer wash.
 *
 *  - `ZlHeroOverlayCard` - editorial caption card placed over the hero
 *    photo. Uses rose `#B8837A` eyebrow + Fraunces italic body.
 *
 *  - `ZlHeroSquiggle` - 4 dots + 2 SVG curves, white/86 tint, placed on
 *    bottom-right of the hero photo to sign authorship.
 *
 * Palette discipline: these primitives only use the v8 fusion rose tokens
 * (`#B8837A`, `#C69184`, `#E6D2C7`, `#FFF4EF`, `#FBF7F4`). They never
 * reach the legacy ambar `#EF9F27` from the `-exact` variant.
 */

/* ------------------------------------------------------------------ */
/* Scene envelope                                                      */
/* ------------------------------------------------------------------ */

export function ZlSceneEnvelope({
  children,
  className = "",
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  /**
   * Bg + border tone. `white` is the default (catalogo). `rose-wash`
   * switches to the pale rose tint `#FBF7F4` for the proof strip.
   */
  tone?: "white" | "rose-wash";
}) {
  const palette =
    tone === "rose-wash"
      ? "bg-[#FBF7F4] border-[#E6D2C7]"
      : "bg-white border-[#E6DBC6]";
  return (
    <div
      className={`overflow-hidden rounded-[34px] border ${palette} shadow-[0_30px_90px_rgba(109,73,58,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero overlay card                                                   */
/* ------------------------------------------------------------------ */

/**
 * Renders the editorial caption card pinned to the bottom-left of the
 * hero photo. Preserves the v7 positioning ("Fortaleza / Atendimento
 * delicado e real.") with Fraunces italic on the second line.
 */
export function ZlHeroOverlayCard() {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 hidden rounded-[22px] border border-white/70 bg-white/82 p-3.5 shadow-[0_14px_32px_rgba(124,78,63,0.12)] backdrop-blur-sm sm:block md:bottom-5 md:left-5 md:p-4">
      <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#B8837A] md:text-[0.66rem]">
        Fortaleza
      </p>
      <p
        className="mt-1 text-[0.96rem] leading-[1.18] text-[#3A2E23] md:text-[1.05rem] md:leading-[1.2]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontStyle: "italic",
        }}
      >
        Atendimento
        <br />
        delicado e real.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero squiggle                                                       */
/* ------------------------------------------------------------------ */

/**
 * Decorative dots + curves signature on the bottom-right of the hero
 * photo. Uses `text-white/86` so it sits on top of any backdrop.
 */
export function ZlHeroSquiggle({
  className = "pointer-events-none absolute bottom-0 right-0 hidden h-36 w-36 text-white/86 md:block md:h-44 md:w-44",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M55 165c12-34 25-56 38-76 14-21 28-36 46-46 15-8 34-11 53-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M95 194c-2-15 2-31 9-47 7-17 17-31 30-44 11-11 24-20 40-25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="59" cy="162" r="5" fill="currentColor" />
      <circle cx="97" cy="130" r="5" fill="currentColor" />
      <circle cx="135" cy="96" r="5" fill="currentColor" />
      <circle cx="176" cy="68" r="5" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Proof strip card                                                    */
/* ------------------------------------------------------------------ */

/**
 * Minimal "proof card" used inside the 4-col proof strip between hero
 * and fiduciary bar. Follows the exact editorial rhythm: eyebrow rose
 * uppercase + Fraunces serif title + body + circular icon chip.
 *
 * `divide` variant removes the border so the parent grid handles it.
 */
export function ZlProofStripCard({
  eyebrow,
  title,
  body,
  icon,
}: {
  eyebrow: string;
  title: string;
  body: string;
  icon: ReactNode;
}) {
  return (
    <div className="relative flex flex-col gap-3 border-t border-[#E6D2C7] px-5 py-5 first:border-t-0 md:border-t-0 md:border-r md:last:border-r-0">
      <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#B8837A]">
        {eyebrow}
      </p>
      <h3
        className="text-[1.05rem] leading-[1.18] tracking-[-0.02em] text-[#3A2E23]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {title}
      </h3>
      <p className="text-[0.86rem] leading-[1.6] text-[#5C4A38]">{body}</p>
      <span className="mt-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#E6D2C7] bg-white text-[#C69184]">
        {icon}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Podology comparative row                                            */
/* ------------------------------------------------------------------ */

/**
 * Two-column list used in the "Podologia x Pedicure" compare section.
 * Uses exact tokens (#1d9e75 check, #e24b4a cross) but sits on v7 cards.
 */
export function ZlCompareColumn({
  title,
  subtitle,
  items,
  good,
}: {
  title: string;
  subtitle: string;
  items: readonly string[];
  good: boolean;
}) {
  const iconColor = good ? "#1d9e75" : "#e24b4a";
  const borderColor = good ? "#cbe6d9" : "#f2cecb";
  const bg = good ? "#f4fbf7" : "#fdf4f3";
  return (
    <div
      className="rounded-[1.4rem] border p-5 md:p-6"
      style={{ background: bg, borderColor }}
    >
      <p className="text-[0.66rem] uppercase tracking-[0.22em] text-[#7A6244]">
        {good ? "ZL Podologia" : "Pedicure comum"}
      </p>
      <h3
        className="mt-2 text-[clamp(1.3rem,1.9vw,1.7rem)] leading-[1.15] tracking-[-0.02em] text-[#3A2E23]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {title}
      </h3>
      <p className="mt-2 text-[0.88rem] leading-[1.6] text-[#5C4A38]">
        {subtitle}
      </p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[0.92rem] leading-[1.55] text-[#3A2E23]"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
              style={{ color: iconColor }}
            >
              {good ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    d="m8.5 12.3 2.2 2.2 4.8-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    d="m9 9 6 6m0-6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
