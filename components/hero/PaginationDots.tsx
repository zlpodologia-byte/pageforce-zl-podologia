"use client";

import { useReducedMotionPreference } from "@/components/shell/motion";

interface PaginationDotsProps {
  count: number;
  active: number;
  onSelect?: (index: number) => void;
}

function normalizeIndex(index: number, count: number) {
  if (count <= 0) {
    return 0;
  }

  return ((index % count) + count) % count;
}

export function PaginationDots({
  count,
  active,
  onSelect,
}: PaginationDotsProps) {
  const reducedMotion = useReducedMotionPreference();
  const activeIndex = normalizeIndex(active, count);

  return (
    <div
      aria-label="Hero categories"
      className="flex items-center justify-center gap-1.5 sm:gap-2"
    >
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            type="button"
            data-cursor-ignore
            aria-label={`Show category ${index + 1}`}
            aria-current={isActive ? "true" : undefined}
            disabled={!onSelect}
            onClick={() => onSelect?.(index)}
            className="hero-pagination-dot group inline-flex h-11 w-11 items-center justify-center"
            style={{
              opacity: onSelect ? 1 : 0.65,
            }}
          >
            <span
              aria-hidden="true"
              className="block rounded-full border border-current"
              style={{
                width: isActive ? "0.9rem" : "0.55rem",
                height: isActive ? "0.9rem" : "0.55rem",
                backgroundColor: isActive ? "currentColor" : "transparent",
                opacity: isActive ? 1 : 0.45,
                transform: isActive ? "scale(1)" : "scale(1)",
                transition: reducedMotion
                  ? "none"
                  : "width 300ms var(--ease-out-expo), height 300ms var(--ease-out-expo), opacity 300ms var(--ease-out-expo), transform 300ms var(--ease-out-expo), background-color 300ms var(--ease-out-expo)",
              }}
            />
          </button>
        );
      })}

      <style jsx>{`
        .hero-pagination-dot[data-cursor-ignore] {
          cursor: crosshair !important;
        }

        .hero-pagination-dot:hover span,
        .hero-pagination-dot:focus-visible span {
          transform: ${reducedMotion ? "scale(1)" : "scale(1.15)"};
          opacity: 0.78;
        }

        .hero-pagination-dot[aria-current="true"]:hover span,
        .hero-pagination-dot[aria-current="true"]:focus-visible span {
          transform: ${reducedMotion ? "scale(1)" : "scale(1.12)"};
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
