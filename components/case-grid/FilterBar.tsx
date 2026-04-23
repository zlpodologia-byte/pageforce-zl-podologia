"use client";

import type { Category } from "@/lib/cases";

export interface FilterBarProps {
  categories: Category[];
  active: Category | "All";
  onChange(value: Category | "All"): void;
}

const FILTER_OPTIONS = ["All"] as const;

export function FilterBar({ categories, active, onChange }: FilterBarProps) {
  const options = [...FILTER_OPTIONS, ...categories] as const;

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const isActive = option === active;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            className="group relative min-h-11 overflow-hidden rounded-full border px-5 py-3 text-[0.68rem] uppercase tracking-[0.18em] transition-[border-color,color] duration-[300ms]"
            style={{
              borderColor: isActive
                ? "var(--color-ink)"
                : "color-mix(in srgb, var(--color-ink) 22%, white)",
              color: isActive ? "var(--color-canvas)" : "var(--color-ink)",
            }}
            onClick={() => onChange(option)}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full transition-opacity duration-[300ms]"
              style={{
                backgroundColor: "var(--color-ink)",
                opacity: isActive ? 1 : 0,
              }}
            />
            <span className="relative z-10 border-b border-current/0 pb-0.5 transition-[border-color] duration-[300ms] group-hover:border-current/70">
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
}
