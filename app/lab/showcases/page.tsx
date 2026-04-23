"use client";

/* ==========================================================================
   /lab/showcases — Showcase Hub sandbox (single-file iteration surface)
   --------------------------------------------------------------------------
   All visual knobs for the hub live at the top of this file. Edit here,
   reload /lab/showcases, observe. When a change feels right, port the delta
   back to components/showcases/* (production route at /showcases).

   Dependencies (read-only — do NOT edit from here):
     - SHOWCASES  → lib/showcases.ts
     - JellyBorder → components/jelly-border/JellyBorder.tsx

   Production: /showcases (app/showcases/page.tsx + components/showcases/*)
   ========================================================================== */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { JellyBorder } from "@/components/jelly-border/JellyBorder";
import { SHOWCASES, type Showcase } from "@/lib/showcases";

/* --------------------------------------------------------------------------
   Tunables — edit these first
   -------------------------------------------------------------------------- */

const THUMB = {
  width: 480,
  height: 270,
  radius: 24,
  gap: 40, // px between thumbs in rail
  strokeWidth: 1,
  jelly: { maxBulge: 16, influence: 140, driftAmp: 2.0 },
};

const ORBIT = {
  amplitude: 6,              // px (±) vertical sine
  periodBaseMs: 7000,        // minimum cycle duration
  periodSpreadMs: 4000,      // extra length mod by index
  indexPhaseStep: 0.73,      // radians added per index
  glowRgba: "rgba(45, 157, 138, 0.3)",
  glowBlurPx: 8,
};

const CROSSFADE_MS = 220;

const PREVIEW_CTA = {
  width: 280,
  height: 58,
  jelly: { maxBulge: 10, influence: 100, driftAmp: 1.4 },
  strokeWidth: 1.25,
};

const COLORS = {
  strokeIdle: "var(--color-accent-midnight)",
  strokeActive: "var(--color-accent-teal)",
  ctaBurnt: "var(--color-accent-burnt)",
  ink: "var(--color-ink)",
  muted: "var(--color-muted)",
  line: "var(--color-line)",
  canvas: "var(--color-canvas)",
};

/* --------------------------------------------------------------------------
   Preview stage
   -------------------------------------------------------------------------- */

function PreviewStage({ showcase }: { showcase: Showcase }) {
  const [visible, setVisible] = useState(showcase);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (showcase.slug === visible.slug) return;
    setFadeIn(false);
    const t = setTimeout(() => {
      setVisible(showcase);
      setFadeIn(true);
    }, CROSSFADE_MS);
    return () => clearTimeout(t);
  }, [showcase, visible.slug]);

  return (
    <div
      aria-live="polite"
      style={{
        opacity: fadeIn ? 1 : 0,
        transition: `opacity ${CROSSFADE_MS}ms var(--ease-out-expo)`,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: COLORS.muted,
          marginBottom: 12,
        }}
      >
        {visible.label}
      </p>

      <h2
        data-testid="sandbox-preview-hook"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(32px, 3.4vw, 52px)",
          lineHeight: 1.05,
          color: COLORS.ink,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        {visible.hookLine}
      </h2>

      <ul style={{ listStyle: "none", padding: 0, margin: "32px 0 0", display: "grid", gap: 14 }}>
        {visible.bullets.map((b) => (
          <li
            key={b}
            style={{
              display: "grid",
              gridTemplateColumns: "20px 1fr",
              alignItems: "start",
              gap: 12,
              color: COLORS.ink,
              fontSize: 17,
              lineHeight: 1.55,
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 16,
                height: 2,
                marginTop: "0.75em",
                background: "var(--color-accent-teal)",
              }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
        <JellyBorder
          width={PREVIEW_CTA.width}
          height={PREVIEW_CTA.height}
          shape="rect"
          radius={999}
          maxBulge={PREVIEW_CTA.jelly.maxBulge}
          influence={PREVIEW_CTA.jelly.influence}
          driftAmp={PREVIEW_CTA.jelly.driftAmp}
          strokeColor={COLORS.ctaBurnt}
          strokeWidth={PREVIEW_CTA.strokeWidth}
        >
          <Link
            href={`/showcases/${visible.slug}`}
            data-testid="sandbox-cta-primary"
            style={{
              width: "100%",
              height: "100%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.ctaBurnt,
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              letterSpacing: "-0.01em",
              textDecoration: "none",
            }}
          >
            Ver modelo desta vertical
          </Link>
        </JellyBorder>

        <Link
          href={`/diagnostic?from=showcases/${visible.slug}`}
          className="link-underline"
          style={{
            color: COLORS.strokeActive,
            fontFamily: "var(--font-sans)",
            fontSize: 16,
          }}
        >
          Começar pelo diagnóstico
        </Link>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Thumb
   -------------------------------------------------------------------------- */

interface ThumbProps {
  showcase: Showcase;
  index: number;
  active: boolean;
  onActivate(i: number): void;
  onHoverStart(i: number): void;
  onHoverEnd(i: number): void;
  onNavigate(slug: string): void;
  innerRef(el: HTMLDivElement | null): void;
}

function Thumb({
  showcase,
  index,
  active,
  onActivate,
  onHoverStart,
  onHoverEnd,
  onNavigate,
  innerRef,
}: ThumbProps) {
  const stroke = active ? COLORS.strokeActive : COLORS.strokeIdle;

  return (
    <div
      ref={innerRef}
      role="button"
      tabIndex={0}
      aria-label={`Modelo para ${showcase.label}`}
      data-sandbox-thumb={showcase.slug}
      onMouseEnter={() => {
        onHoverStart(index);
        onActivate(index);
      }}
      onMouseLeave={() => onHoverEnd(index)}
      onFocus={() => {
        onHoverStart(index);
        onActivate(index);
      }}
      onBlur={() => onHoverEnd(index)}
      onClick={() => onNavigate(showcase.slug)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onNavigate(showcase.slug);
        }
      }}
      style={{
        width: THUMB.width,
        display: "inline-block",
        willChange: "transform",
        filter: active ? `drop-shadow(0 0 ${ORBIT.glowBlurPx}px ${ORBIT.glowRgba})` : "none",
        transition: "filter 200ms var(--ease-out-expo)",
        outline: "none",
        cursor: "pointer",
      }}
    >
      <JellyBorder
        width={THUMB.width}
        height={THUMB.height}
        shape="rect"
        radius={THUMB.radius}
        maxBulge={THUMB.jelly.maxBulge}
        influence={THUMB.jelly.influence}
        driftAmp={THUMB.jelly.driftAmp}
        strokeColor={stroke}
        strokeWidth={THUMB.strokeWidth}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: THUMB.radius,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={showcase.coverAsset}
            alt=""
            width={THUMB.width}
            height={THUMB.height}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: THUMB.radius,
              display: "block",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 10,
              bottom: 10,
              fontFamily: "var(--font-display)",
              fontSize: 15,
              lineHeight: 1.2,
              color: COLORS.ink,
              background: "rgba(244, 246, 245, 0.9)",
              padding: "6px 10px",
              borderRadius: 6,
              letterSpacing: "-0.01em",
            }}
          >
            {showcase.label}
          </span>
        </div>
      </JellyBorder>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function ShowcasesSandboxPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pausedRef = useRef<boolean[]>(SHOWCASES.map(() => false));

  const setThumbRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      thumbRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      for (let i = 0; i < thumbRefs.current.length; i++) {
        if (pausedRef.current[i]) continue;
        const el = thumbRefs.current[i];
        if (!el) continue;
        const period = ORBIT.periodBaseMs + ((i * 431) % ORBIT.periodSpreadMs);
        const phase = i * ORBIT.indexPhaseStep;
        const y = Math.sin((elapsed / period) * Math.PI * 2 + phase) * ORBIT.amplitude;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const active = SHOWCASES[activeIndex] ?? SHOWCASES[0];

  return (
    <div data-palette="operational">
      <section
        className="container-x"
        style={{
          paddingTop: "clamp(4rem, 8vw, 7rem)",
          paddingBottom: "clamp(4rem, 8vw, 7rem)",
        }}
      >
        <nav
          aria-label="Breadcrumb"
          style={{
            marginBottom: 40,
            fontSize: 13,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: COLORS.muted,
            fontFamily: "var(--font-sans)",
          }}
        >
          PageForce / Lab / Showcases sandbox
        </nav>

        <h1 className="sr-only">Showcase Hub — sandbox de iteração</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
          className="sandbox-layout"
        >
          {/* rail */}
          <div
            role="list"
            aria-label="Verticais disponíveis"
            className="sandbox-rail"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: THUMB.gap,
              overflowX: "auto",
              paddingBottom: 12,
            }}
          >
            {SHOWCASES.map((s, i) => (
              <div
                key={s.slug}
                role="listitem"
                style={{ flex: "none", padding: "8px 4px" }}
              >
                <Thumb
                  innerRef={setThumbRef(i)}
                  showcase={s}
                  index={i}
                  active={i === activeIndex}
                  onActivate={setActiveIndex}
                  onHoverStart={(idx) => (pausedRef.current[idx] = true)}
                  onHoverEnd={(idx) => (pausedRef.current[idx] = false)}
                  onNavigate={(slug) => router.push(`/showcases/${slug}`)}
                />
              </div>
            ))}
          </div>

          {/* preview */}
          <div className="sandbox-preview" style={{ flex: 1 }}>
            <PreviewStage showcase={active} />
          </div>
        </div>

        <footer
          style={{
            marginTop: "clamp(3rem, 6vw, 5rem)",
            paddingTop: 24,
            borderTop: `1px solid ${COLORS.line}`,
            color: COLORS.muted,
            fontSize: 14,
          }}
        >
          Sandbox — edite <code>app/lab/showcases/page.tsx</code> e recarregue.
          Produção em <Link href="/showcases" className="link-underline">/showcases</Link>.
        </footer>
      </section>

      <style>{`
        .sandbox-layout {
          flex-direction: column !important;
          gap: clamp(2rem, 4vw, 4rem) !important;
        }
        .sandbox-rail {
          flex-direction: row !important;
          overflow-x: auto !important;
          width: 100%;
          padding-bottom: 24px !important;
          scroll-snap-type: x mandatory;
        }
        .sandbox-rail > div {
          scroll-snap-align: start;
        }
        
        @media (min-width: 1024px) {
          .sandbox-preview {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
