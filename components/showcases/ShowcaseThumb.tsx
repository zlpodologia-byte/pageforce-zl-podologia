"use client";

import { forwardRef } from "react";
import { JellyBorder } from "@/components/jelly-border/JellyBorder";
import type { Showcase } from "@/lib/showcases";

interface ShowcaseThumbProps {
  showcase: Showcase;
  index: number;
  active: boolean;
  onActivate: (index: number) => void;
  onHoverStart: (index: number) => void;
  onHoverEnd: (index: number) => void;
  onNavigate: (slug: string) => void;
}

const THUMB_WIDTH = 480;
const THUMB_HEIGHT = 270;

export const ShowcaseThumb = forwardRef<HTMLDivElement, ShowcaseThumbProps>(
  function ShowcaseThumb(
    {
      showcase,
      index,
      active,
      onActivate,
      onHoverStart,
      onHoverEnd,
      onNavigate,
    },
    ref,
  ) {
    const strokeColor = active
      ? "var(--color-accent-teal)"
      : "var(--color-accent-midnight)";

    const handleActivate = () => {
      onActivate(index);
    };

    const handleClick = () => {
      onNavigate(showcase.slug);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onNavigate(showcase.slug);
      }
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={`Modelo para ${showcase.label}`}
        data-showcase-thumb={showcase.slug}
        onMouseEnter={() => {
          onHoverStart(index);
          handleActivate();
        }}
        onMouseLeave={() => onHoverEnd(index)}
        onFocus={() => {
          onHoverStart(index);
          handleActivate();
        }}
        onBlur={() => onHoverEnd(index)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={{
          width: THUMB_WIDTH,
          display: "inline-block",
          willChange: "transform",
          filter: active
            ? "drop-shadow(0 0 8px rgba(45, 157, 138, 0.3))"
            : "none",
          transition: "filter 200ms var(--ease-out-expo)",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <JellyBorder
          width={THUMB_WIDTH}
          height={THUMB_HEIGHT}
          shape="rect"
          radius={24}
          maxBulge={16}
          influence={140}
          driftAmp={2.0}
          strokeColor={strokeColor}
          strokeWidth={1}
          fillColor="transparent"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: 24,
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={showcase.coverAsset}
              alt=""
              width={THUMB_WIDTH}
              height={THUMB_HEIGHT}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 24,
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
                color: "var(--color-ink)",
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
  },
);
