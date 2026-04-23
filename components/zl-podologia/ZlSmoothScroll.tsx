"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotionPreference } from "@/components/shell/motion";

/**
 * Lightweight Lenis wrapper scoped to the ZL Podologia landing.
 *
 * Shell-level AppChrome explicitly excludes `/lab/zl-podologia` from the
 * global chrome (cursor, jelly provider, menu overlay), so the route has
 * no smooth-scroll integration by default. This component mounts a Lenis
 * instance for this single page, with haptic-easing defaults that match
 * the landing's taste layer. Respects prefers-reduced-motion.
 *
 * Memory: single RAF loop, torn down on unmount. No global scroll
 * listeners are attached beyond what Lenis itself needs.
 */
export function ZlSmoothScroll() {
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined") return;

    // Skip on touch devices where native scroll is smoother + battery-friendly.
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!isFinePointer) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Haptic-ish ease-out curve; matches --ease-haptic in globals.css.
      easing: (t: number) => 1 - Math.pow(1 - t, 3.2),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}
