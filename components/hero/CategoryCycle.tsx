"use client";

import { startTransition, useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionPreference } from "@/components/shell/motion";

const ENTER_EASE = [0.16, 1, 0.3, 1] as const;
const EXIT_EASE = [0.4, 0, 1, 1] as const;

interface CategoryCycleProps {
  words: string[];
  interval?: number;
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2";
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  reducedMotion?: boolean;
}

function normalizeIndex(index: number, count: number) {
  if (count <= 0) {
    return 0;
  }

  return ((index % count) + count) % count;
}

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function CategoryCycle({
  words,
  interval = 3000,
  className,
  style,
  as = "h1",
  activeIndex,
  onActiveIndexChange,
  reducedMotion,
}: CategoryCycleProps) {
  const prefersReducedMotion = useReducedMotionPreference();
  const shouldReduce = reducedMotion ?? prefersReducedMotion ?? false;
  const isControlled = activeIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(0);

  const count = words.length;
  const resolvedInterval = shouldReduce ? Math.max(interval, 4000) : interval;
  const currentIndex = normalizeIndex(
    isControlled ? activeIndex ?? 0 : internalIndex,
    count,
  );
  const currentWord = words[currentIndex] ?? "";
  const Tag = as;

  useEffect(() => {
    if (count <= 0 || isControlled) {
      return;
    }

    const nextIndex = normalizeIndex(currentIndex + 1, count);
    const timeoutId = window.setTimeout(() => {
      startTransition(() => {
        setInternalIndex(nextIndex);
        onActiveIndexChange?.(nextIndex);
      });
    }, resolvedInterval);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    count,
    currentIndex,
    isControlled,
    onActiveIndexChange,
    resolvedInterval,
  ]);

  return (
    <Tag
      aria-live="polite"
      aria-atomic="true"
      className={joinClassNames("category-cycle", className)}
      style={{
        position: "relative",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        minHeight: "1.05em",
        maxHeight: "1.05em",
        width: "100%",
        textAlign: "center",
        ...style,
      }}
    >
      <span className="sr-only">{currentWord}</span>

      <span
        aria-hidden="true"
        style={{
          position: "relative",
          display: "block",
          width: "100%",
          minHeight: "1.05em",
          maxHeight: "1.05em",
          overflow: "hidden",
        }}
      >
        <AnimatePresence initial mode="sync">
          <motion.span
            key={`${currentWord}-${currentIndex}`}
            initial={
              shouldReduce
                ? { opacity: 0 }
                : { opacity: 0, y: "110%" }
            }
            animate={
              shouldReduce
                ? {
                    opacity: 1,
                    transition: { duration: 0.22, ease: "linear" },
                  }
                : {
                    opacity: 1,
                    y: "0%",
                    transition: {
                      opacity: { duration: 0.4, ease: ENTER_EASE },
                      y: { duration: 0.4, ease: ENTER_EASE },
                    },
                  }
            }
            exit={
              shouldReduce
                ? {
                    opacity: 0,
                    transition: { duration: 0.22, ease: "linear" },
                  }
                : {
                    opacity: 0,
                    y: "-110%",
                    transition: {
                      opacity: { duration: 0.3, ease: EXIT_EASE },
                      y: { duration: 0.3, ease: EXIT_EASE },
                    },
                  }
            }
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
              willChange: "transform, opacity",
            }}
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </span>

      <style jsx>{`
        .category-cycle {
          text-wrap: balance;
        }

        @media (max-width: 40rem) {
          .category-cycle {
            min-height: 1.08em;
            max-height: 1.08em;
          }
        }
      `}</style>
    </Tag>
  );
}
