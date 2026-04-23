import type { Metadata } from "next";
import { Suspense } from "react";
import { CaseGrid } from "@/components/case-grid/CaseGrid";
import { WorkIndexPage } from "@/components/case-grid/WorkIndexPage";
import {
  CASES,
  CATEGORIES,
  getCategoryFromSlug,
  type Category,
} from "@/lib/cases";

export const metadata: Metadata = {
  title: "Work - Pageforce",
  description: "Selected case studies.",
};

const FILTER_OPTIONS = ["All", ...CATEGORIES] as const;

function StaticFilterBar({ active }: { active: Category | "All" }) {
  return (
    <div className="flex flex-wrap gap-3">
      {FILTER_OPTIONS.map((option) => {
        const isActive = option === active;

        return (
          <span
            key={option}
            className="inline-flex min-h-11 items-center rounded-full border px-5 py-3 text-[0.68rem] uppercase tracking-[0.18em]"
            style={{
              borderColor: isActive
                ? "var(--color-ink)"
                : "color-mix(in srgb, var(--color-ink) 22%, white)",
              backgroundColor: isActive ? "var(--color-ink)" : "transparent",
              color: isActive ? "var(--color-canvas)" : "var(--color-ink)",
            }}
          >
            {option}
          </span>
        );
      })}
    </div>
  );
}

function StaticWorkFallback({
  active,
  items,
}: {
  active: Category | "All";
  items: typeof CASES;
}) {
  return (
    <section className="container-x min-h-[100svh] pb-[clamp(5rem,8vw,8rem)] pt-[clamp(6.5rem,12vw,9.5rem)]">
      <header className="max-w-[52rem]">
        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Work index
        </p>
        <h1
          data-page-heading
          className="mt-4 max-w-[12ch] text-[clamp(3rem,7vw,5.75rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
          }}
        >
          Selected work, filtered by lens.
        </h1>
      </header>

      <div className="mt-10">
        <StaticFilterBar active={active} />
      </div>

      <div className="mt-[clamp(2.5rem,6vw,4rem)]">
        {items.length > 0 ? (
          <CaseGrid items={items} />
        ) : (
          <div className="flex min-h-[42svh] items-center justify-center text-center">
            <p
              className="max-w-[22ch] text-[clamp(1.6rem,3vw,2.4rem)] text-[var(--color-ink)]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
              }}
            >
              Nothing under this lens {"\u2014"} try another filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const active = getCategoryFromSlug(filter) ?? "All";
  const items =
    active === "All"
      ? CASES
      : CASES.filter((item) => item.categories.includes(active));

  return (
    <Suspense fallback={<StaticWorkFallback active={active} items={items} />}>
      <WorkIndexPage initialActive={active} />
    </Suspense>
  );
}
