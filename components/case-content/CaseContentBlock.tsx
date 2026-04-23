"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/reveal/Reveal";
import { useReducedMotionPreference } from "@/components/shell/motion";
import type { CaseBlock } from "@/lib/cases";

interface CaseContentBlockProps {
  block: CaseBlock;
  nested?: boolean;
}

function CaseVideo({
  src,
  poster,
  full,
  nested = false,
}: {
  src: string;
  poster?: string;
  full?: boolean;
  nested?: boolean;
}) {
  const reducedMotion = useReducedMotionPreference();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (reducedMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          void video.play().catch(() => {});
          return;
        }

        video.pause();
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reducedMotion]);

  return (
    <div
      className={
        full && !nested
          ? "relative left-1/2 w-screen -translate-x-1/2"
          : "mx-auto w-full max-w-[min(72rem,66vw)]"
      }
    >
      <div className="overflow-hidden rounded-[1.75rem]">
        <video
          ref={videoRef}
          className="aspect-[16/10] h-auto w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          src={src}
        />
      </div>
    </div>
  );
}

function CaseGridImage({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export function CaseContentBlock({
  block,
  nested = false,
}: CaseContentBlockProps) {
  switch (block.kind) {
    case "image":
      return (
        <Reveal className={nested ? "" : "py-[clamp(1.25rem,2vw,2rem)]"}>
          <div
            className={
              block.full && !nested
                ? "relative left-1/2 w-screen -translate-x-1/2"
                : "mx-auto w-full max-w-[min(72rem,66vw)]"
            }
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem]">
              <Image
                src={block.src}
                alt={block.alt}
                fill
                loading="lazy"
                sizes={
                  block.full && !nested
                    ? "100vw"
                    : "(min-width: 1280px) 66vw, (min-width: 768px) 78vw, 92vw"
                }
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      );

    case "video":
      return (
        <Reveal className={nested ? "" : "py-[clamp(1.25rem,2vw,2rem)]"}>
          <CaseVideo
            src={block.src}
            poster={block.poster}
            full={block.full}
            nested={nested}
          />
        </Reveal>
      );

    case "copy": {
      const toneStyles =
        block.tone === "dark"
          ? {
              backgroundColor: "#0c0c0c",
              color: "var(--color-ink-invert)",
            }
          : block.tone === "cream"
            ? {
                backgroundColor: "var(--color-ink-invert)",
                color: "var(--color-ink)",
              }
            : {
                backgroundColor: "transparent",
                color: "var(--color-ink)",
              };

      return (
        <Reveal
          className={nested ? "" : "py-[clamp(1.5rem,3vw,2.75rem)]"}
          style={toneStyles}
        >
          <div
            className={
              nested
                ? "px-5 py-8 sm:px-7 sm:py-10"
                : "container-x py-[clamp(2rem,5vw,4.75rem)]"
            }
          >
            <div
              className={`mx-auto max-w-[62ch] ${block.align === "left" ? "text-left" : "text-center"}`}
            >
              {block.heading ? (
                <p
                  className="mb-4 text-[0.72rem] uppercase tracking-[0.22em]"
                  style={{
                    color:
                      block.tone === "dark"
                        ? "rgba(245, 239, 227, 0.68)"
                        : "var(--color-muted)",
                  }}
                >
                  {block.heading}
                </p>
              ) : null}
              <p className="text-[clamp(1.2rem,2vw,1.7rem)] leading-[1.5]">
                {block.body}
              </p>
            </div>
          </div>
        </Reveal>
      );
    }

    case "headline": {
      const isDark = block.tone === "dark";

      return (
        <Reveal
          className={nested ? "" : "py-[clamp(1.5rem,3vw,2.75rem)]"}
          style={{
            backgroundColor: isDark ? "#080808" : "var(--color-canvas)",
            color: isDark ? "var(--color-ink-invert)" : "var(--color-ink)",
          }}
        >
          <div
            className={
              nested
                ? "px-5 py-8 sm:px-7 sm:py-10"
                : "container-x py-[clamp(2rem,6vw,5.5rem)]"
            }
          >
            <div className="mx-auto max-w-[72rem]">
              <div className="relative inline-block">
                <h2
                  className="text-balance font-bold"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(2.75rem, 6.2vw, 6.5rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.065em",
                  }}
                >
                  {block.text}
                </h2>
                {block.accent === "strike" ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-1/2 h-[0.3rem] w-full -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: "#d63a3a" }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      );
    }

    case "two-col":
      return (
        <Reveal className={nested ? "" : "py-[clamp(1.5rem,3vw,2.75rem)]"}>
          <div className={nested ? "" : "container-x"}>
            <div className="mx-auto grid max-w-[84rem] gap-6 md:grid-cols-2 md:gap-8">
              <CaseContentBlock block={block.left} nested />
              <CaseContentBlock block={block.right} nested />
            </div>
          </div>
        </Reveal>
      );

    case "grid":
      return (
        <Reveal className={nested ? "" : "py-[clamp(1.5rem,3vw,2.75rem)]"}>
          <div className={nested ? "" : "container-x"}>
            <div
              className="mx-auto grid max-w-[84rem] gap-4 md:gap-6"
              style={{
                gridTemplateColumns: `repeat(${block.cols ?? 3}, minmax(0, 1fr))`,
              }}
            >
              {block.images.map((image, index) => (
                <CaseGridImage
                  key={`${image.src}-${index}`}
                  src={image.src}
                  alt={image.alt}
                  sizes={`(min-width: 1024px) ${(100 / (block.cols ?? 3)).toFixed(0)}vw, 50vw`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      );
  }
}
