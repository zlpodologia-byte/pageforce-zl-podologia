"use client";

import { useEffect, useState } from "react";

export interface Point {
  x: number;
  y: number;
}

export interface ViewportSize {
  width: number;
  height: number;
}

const DEFAULT_VIEWPORT: ViewportSize = {
  width: 1440,
  height: 900,
};

export const MENU_OPEN_MS = 540;
export const MENU_CLOSE_MS = 450;
export const MENU_FADE_MS = 200;

export const ROUTE_COVER_MS = 400;
export const ROUTE_REVEAL_MS = 350;
export const ROUTE_FADE_MS = 250;

export const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
].join(", ");

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useViewportSize() {
  const [viewport, setViewport] = useState<ViewportSize>(DEFAULT_VIEWPORT);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return viewport;
}

export function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reducedMotion;
}

export function isSimpleMaskViewport(width: number) {
  return width <= 480;
}

export function getRightEdgeSeed(viewport: ViewportSize): Point {
  return {
    x: viewport.width - clamp(viewport.width * 0.035, 28, 52),
    y: clamp(viewport.height * 0.07, 28, 56),
  };
}

export function getMenuButtonSeed(viewport: ViewportSize): Point {
  if (typeof document === "undefined") {
    return getRightEdgeSeed(viewport);
  }

  const button = document.querySelector<HTMLElement>("[data-menu-button]");
  if (!button) {
    return getRightEdgeSeed(viewport);
  }

  const bounds = button.getBoundingClientRect();

  return {
    x: bounds.left + bounds.width / 2,
    y: bounds.top + bounds.height / 2,
  };
}

export function getOppositeEdgeSeed(
  seed: Point,
  viewport: ViewportSize,
): Point {
  const gutter = 72;

  return {
    x: seed.x >= viewport.width / 2 ? -gutter : viewport.width + gutter,
    y: clamp(viewport.height - seed.y, gutter, viewport.height - gutter),
  };
}

export function getCoverRadius(seed: Point, viewport: ViewportSize) {
  const dx = Math.max(seed.x, viewport.width - seed.x);
  const dy = Math.max(seed.y, viewport.height - seed.y);

  return Math.hypot(dx, dy) + 96;
}
