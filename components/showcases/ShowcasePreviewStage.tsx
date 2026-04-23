"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { JellyBorder } from "@/components/jelly-border/JellyBorder";
import type { Showcase } from "@/lib/showcases";

interface ShowcasePreviewStageProps {
  showcase: Showcase;
}

export function ShowcasePreviewStage({ showcase }: ShowcasePreviewStageProps) {
  const [visibleShowcase, setVisibleShowcase] = useState<Showcase>(showcase);
  const [fadeOpacity, setFadeOpacity] = useState(1);

  useEffect(() => {
    if (showcase.slug === visibleShowcase.slug) return;
    setFadeOpacity(0);
    const t = window.setTimeout(() => {
      setVisibleShowcase(showcase);
      setFadeOpacity(1);
    }, 220);
    return () => window.clearTimeout(t);
  }, [showcase, visibleShowcase.slug]);

  return (
    <div
      className="relative w-full"
      style={{
        borderRadius: 24,
        background: "var(--color-window)",
        border: "1px solid var(--color-line)",
        padding: "clamp(1.75rem, 3vw, 2.75rem)",
        minHeight: 520,
      }}
    >
      <div
        key={visibleShowcase.slug}
        style={{
          opacity: fadeOpacity,
          transition: "opacity 220ms var(--ease-out-expo)",
        }}
      >
        <div aria-live="polite">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--color-muted)",
              marginBottom: 14,
            }}
          >
            {visibleShowcase.label}
          </p>
          <h2
            data-testid="showcase-preview-label"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(32px, 3vw, 48px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
              margin: 0,
              maxWidth: "22ch",
            }}
          >
            {visibleShowcase.hookLine}
          </h2>
        </div>

        <ul
          style={{
            marginTop: "clamp(1.75rem, 3vw, 2.5rem)",
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            maxWidth: "56ch",
          }}
        >
          {visibleShowcase.bullets.map((bullet, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                fontFamily: "var(--font-sans)",
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--color-ink)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 2,
                  background: "var(--color-accent-teal)",
                  marginTop: 13,
                  flexShrink: 0,
                }}
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div
          style={{
            marginTop: "clamp(2rem, 4vw, 3rem)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(1.25rem, 3vw, 2rem)",
            flexWrap: "wrap",
          }}
        >
          <JellyBorder
            width={260}
            height={56}
            shape="rect"
            radius={999}
            maxBulge={10}
            influence={100}
            driftAmp={1.4}
            strokeColor="var(--color-accent-burnt)"
            strokeWidth={1.25}
            fillColor="transparent"
          >
            <Link
              href={`/showcases/${visibleShowcase.slug}`}
              data-testid="showcase-preview-cta-primary"
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                letterSpacing: "0.02em",
                color: "var(--color-accent-burnt)",
                textDecoration: "none",
              }}
            >
              Ver modelo desta vertical
            </Link>
          </JellyBorder>

          <Link
            href={`/diagnostic?from=showcases/${visibleShowcase.slug}`}
            className="link-underline"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              color: "var(--color-accent-midnight)",
              textDecoration: "none",
            }}
          >
            Começar pelo diagnóstico
          </Link>
        </div>
      </div>
    </div>
  );
}
