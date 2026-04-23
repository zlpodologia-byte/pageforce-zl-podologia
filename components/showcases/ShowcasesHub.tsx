"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Showcase } from "@/lib/showcases";
import { ShowcaseThumb } from "@/components/showcases/ShowcaseThumb";
import { ShowcasePreviewStage } from "@/components/showcases/ShowcasePreviewStage";

interface ShowcasesHubProps {
  showcases: Showcase[];
}

const DRIFT_AMPLITUDE = 6;

export function ShowcasesHub({ showcases }: ShowcasesHubProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pausedRef = useRef<boolean[]>(showcases.map(() => false));

  const setThumbRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      thumbRefs.current[index] = el;
    },
    [],
  );

  // Orbit drift — single rAF loop, updates transform on each thumb wrapper.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      for (let i = 0; i < thumbRefs.current.length; i++) {
        if (pausedRef.current[i]) continue;
        const el = thumbRefs.current[i];
        if (!el) continue;
        const period = 7000 + ((i * 431) % 4000);
        const phase = i * 0.73;
        const y =
          Math.sin((elapsed / period) * Math.PI * 2 + phase) * DRIFT_AMPLITUDE;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const handleActivate = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleHoverStart = useCallback((index: number) => {
    pausedRef.current[index] = true;
  }, []);

  const handleHoverEnd = useCallback((index: number) => {
    pausedRef.current[index] = false;
  }, []);

  const handleNavigate = useCallback(
    (slug: string) => {
      router.push(`/showcases/${slug}`);
    },
    [router],
  );

  const activeShowcase = showcases[activeIndex] ?? showcases[0];

  return (
    <div className="flex flex-col gap-8 lg:gap-[clamp(2rem,4vw,4rem)]">
      {/* Thumb rail */}
      <div
        className="order-1 w-full flex-none"
        aria-label="Verticais disponíveis"
        role="list"
      >
        <div
          className="flex gap-10 overflow-x-auto pb-6 w-full snap-x snap-mandatory"
          style={{ scrollbarWidth: "thin" }}
        >
          {showcases.map((showcase, index) => (
            <div
              key={showcase.slug}
              role="listitem"
              className="flex-none snap-start"
              style={{ padding: "8px 4px" }}
            >
              <ShowcaseThumb
                ref={setThumbRef(index)}
                showcase={showcase}
                index={index}
                active={index === activeIndex}
                onActivate={handleActivate}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                onNavigate={handleNavigate}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Preview stage */}
      <div className="order-2 w-full lg:mb-8">
        <ShowcasePreviewStage showcase={activeShowcase} />
      </div>
    </div>
  );
}
