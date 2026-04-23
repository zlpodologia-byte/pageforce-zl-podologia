"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useJellyCard } from "@/components/jelly/JellyProvider";
import { useReducedMotionPreference } from "@/components/shell/motion";
import type { CaseAspect, CaseItem } from "@/lib/cases";
import { CategoryLinks } from "./CategoryLinks";

export interface CaseCardProps {
  item: CaseItem;
  aspect?: CaseAspect;
  index: number;
  onHoverChange?(id: string | null): void;
}

const ASPECT_CLASS_NAME: Record<CaseAspect, string> = {
  portrait: "aspect-[4/6]",
  landscape: "aspect-[4/3]",
  square: "aspect-[4/4.5]",
};

type EntrySide = "left" | "right" | "top" | "bottom";

const ENTRY_ORIGIN: Record<EntrySide, { x: string; y: string }> = {
  left: { x: "0%", y: "50%" },
  right: { x: "100%", y: "50%" },
  top: { x: "50%", y: "0%" },
  bottom: { x: "50%", y: "100%" },
};

const ENTRY_DURATION_MS = 300;

function computeEntrySide(event: PointerEvent<HTMLElement>, rect: DOMRect): EntrySide {
  const dxL = event.clientX - rect.left;
  const dxR = rect.right - event.clientX;
  const dyT = event.clientY - rect.top;
  const dyB = rect.bottom - event.clientY;
  const min = Math.min(dxL, dxR, dyT, dyB);
  if (min === dxL) return "left";
  if (min === dxR) return "right";
  if (min === dyT) return "top";
  return "bottom";
}

export function CaseCard({
  item,
  aspect = item.aspect,
  index,
  onHoverChange,
}: CaseCardProps) {
  const reducedMotion = useReducedMotionPreference();
  const articleRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ref: jellyRef, filterStyle } = useJellyCard(item.slug);
  const [isHovered, setIsHovered] = useState(false);
  const [entrySide, setEntrySide] = useState<EntrySide | null>(null);
  const entryTimerRef = useRef<number | null>(null);

  const beginEntry = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    if (entrySide !== null) return;
    const surface = articleRef.current;
    if (!surface) return;
    const side = computeEntrySide(event, surface.getBoundingClientRect());
    setEntrySide(side);
    if (entryTimerRef.current !== null) {
      window.clearTimeout(entryTimerRef.current);
    }
    entryTimerRef.current = window.setTimeout(() => {
      setEntrySide(null);
      entryTimerRef.current = null;
    }, ENTRY_DURATION_MS);
  };

  const activateHover = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") {
      return;
    }

    setIsHovered(true);
    onHoverChange?.(item.slug);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    beginEntry(event);
    activateHover(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    const relatedTarget = event.relatedTarget;

    if (
      articleRef.current &&
      relatedTarget instanceof Node &&
      articleRef.current.contains(relatedTarget)
    ) {
      return;
    }

    setIsHovered(false);
    setEntrySide(null);
    if (entryTimerRef.current !== null) {
      window.clearTimeout(entryTimerRef.current);
      entryTimerRef.current = null;
    }
    onHoverChange?.(null);
  };

  useEffect(() => {
    return () => {
      if (entryTimerRef.current !== null) {
        window.clearTimeout(entryTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !item.video || reducedMotion) {
      return;
    }

    if (isHovered) {
      video.currentTime = 0;
      void video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isHovered, item.video, reducedMotion]);

  useEffect(() => {
    return () => {
      onHoverChange?.(null);
    };
  }, [onHoverChange]);

  const maskOrigin = entrySide
    ? `${ENTRY_ORIGIN[entrySide].x} ${ENTRY_ORIGIN[entrySide].y}`
    : "var(--jelly-x, 50%) var(--jelly-y, 50%)";
  const maskImage = `radial-gradient(ellipse 190px 170px at ${maskOrigin}, black 0%, rgba(0,0,0,0.96) 38%, rgba(0,0,0,0.62) 66%, transparent 100%)`;

  return (
    <article
      ref={articleRef}
      className="group/case relative transition-opacity duration-[300ms]"
      data-case-card-index={index}
    >
      <div
        className="absolute left-[-16%] top-[-160px] z-[1] h-[calc(100%+320px)] w-[132%] bg-transparent"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={activateHover}
      />

      <Link
        href={`/work/${item.slug}`}
        aria-label={`View ${item.title} for ${item.client}`}
        className="absolute inset-0 z-[2] rounded-[1.75rem]"
        data-cursor-target
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={activateHover}
      />

      <div className="relative">
        <div
          ref={jellyRef}
          data-jelly-surface
          data-cursor-target
          className="relative overflow-hidden rounded-[1.75rem] border transition-[border-color] duration-[300ms] group-hover/case:border-[var(--color-ink)] group-focus-within/case:border-[var(--color-ink)]"
          style={{
            borderColor: "var(--color-line)",
          }}
        >
          <div className={`relative overflow-hidden ${ASPECT_CLASS_NAME[aspect]}`}>
            <Image
              src={item.cover}
              alt={`${item.client} - ${item.title}`}
              fill
              sizes="(min-width: 1280px) 27vw, (min-width: 960px) 43vw, 92vw"
              className="object-cover"
              priority={index < 3}
            />

            {item.video ? (
              <video
                ref={videoRef}
                aria-hidden="true"
                className="absolute left-0 top-1/2 h-full w-full object-cover transition-[opacity,transform] duration-[300ms] ease-[cubic-bezier(.25,.46,.45,.94)] will-change-[opacity,transform]"
                muted
                loop
                playsInline
                preload="metadata"
                poster={item.cover}
                src={item.video}
                style={{
                  opacity: isHovered && !reducedMotion ? 1 : 0,
                  transform: isHovered && !reducedMotion
                    ? "translate3d(0, -50%, 0)"
                    : "translate3d(0, calc(-50% + 18px), 0)",
                }}
              />
            ) : null}

            {!reducedMotion ? (
              <div
                aria-hidden="true"
                data-jelly-overlay
                data-entry-side={entrySide ?? undefined}
                className="pointer-events-none absolute inset-0 will-change-[mask-position,opacity,transform]"
                style={{
                  ...filterStyle,
                  opacity: "var(--jelly-opacity, 0)",
                  WebkitMaskImage: maskImage,
                  maskImage: maskImage,
                }}
              >
                <Image
                  src={item.cover}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 27vw, (min-width: 960px) 43vw, 92vw"
                  className="scale-[1.035] object-cover"
                />
              </div>
            ) : null}

            {!reducedMotion ? (
              <div
                aria-hidden="true"
                data-card-marker
                className="pointer-events-none absolute z-[3] h-2 w-2 rounded-full"
                style={{
                  left: 0,
                  top: 0,
                  transform:
                    "translate3d(calc(var(--jelly-x, 50%) - 4px), calc(var(--jelly-y, 50%) - 4px), 0)",
                  backgroundColor: "var(--color-ink)",
                  opacity: "calc(var(--jelly-opacity, 0) * 0.85)",
                  transition: "opacity 180ms ease-out",
                  willChange: "transform, opacity",
                }}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative mt-5 pr-4">
        <p
          className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-muted)]"
          style={{ lineHeight: 1.45 }}
        >
          {item.client} {"\u00b7"} {item.year}
        </p>
        <h3
          className="mt-2 max-w-[18ch] text-[clamp(1.7rem,2.8vw,2.6rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            lineHeight: 0.96,
            letterSpacing: "-0.04em",
          }}
        >
          {item.title}
        </h3>
      </div>

      <CategoryLinks categories={item.categories} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] border opacity-0 transition-opacity duration-[200ms] group-hover/case:opacity-100 group-focus-within/case:opacity-100"
        style={{
          borderColor: reducedMotion ? "var(--color-ink)" : "transparent",
        }}
      />
    </article>
  );
}
