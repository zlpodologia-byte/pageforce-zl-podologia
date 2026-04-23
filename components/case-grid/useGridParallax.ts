"use client";

import { useEffect, useRef } from "react";
import {
  useReducedMotionPreference,
  useViewportSize,
} from "@/components/shell/motion";

export function useGridParallax(
  columnCount: number,
  multipliers: readonly number[],
) {
  const columnRefs = useRef<Array<HTMLElement | null>>([]);
  const viewport = useViewportSize();
  const reducedMotion = useReducedMotionPreference();
  const multiplierKey = multipliers.join(",");

  useEffect(() => {
    columnRefs.current.length = columnCount;
  }, [columnCount]);

  useEffect(() => {
    const shouldAnimate =
      !reducedMotion && viewport.width >= 960 && columnCount > 1;

    let frameId = 0;

    const applyTransforms = () => {
      const scrollY = window.scrollY;

      for (let index = 0; index < columnCount; index += 1) {
        const column = columnRefs.current[index];
        if (!column) {
          continue;
        }

        const multiplier = multipliers[index] ?? 1;
        const translateY = shouldAnimate ? scrollY * (multiplier - 1) : 0;

        column.style.setProperty(
          "--case-grid-translate-y",
          `${translateY.toFixed(2)}px`,
        );
      }
    };

    const scheduleUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        applyTransforms();
      });
    };

    applyTransforms();

    if (!shouldAnimate) {
      return () => {
        if (frameId !== 0) {
          window.cancelAnimationFrame(frameId);
        }
      };
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [columnCount, multiplierKey, reducedMotion, viewport.width]);

  const setColumnRef = (index: number) => (node: HTMLElement | null) => {
    columnRefs.current[index] = node;

    if (node) {
      node.style.setProperty("--case-grid-translate-y", "0px");
    }
  };

  return { setColumnRef };
}
