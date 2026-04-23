"use client";

import { startTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Reveal } from "@/components/reveal/Reveal";
import {
  CASES,
  CATEGORIES,
  getCategoryFromSlug,
  getCategorySlug,
  type Category,
} from "@/lib/cases";
import { CaseGrid } from "./CaseGrid";
import { FilterBar } from "./FilterBar";

interface WorkIndexPageProps {
  initialActive?: Category | "All";
}

export function WorkIndexPage({ initialActive = "All" }: WorkIndexPageProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = getCategoryFromSlug(searchParams.get("filter")) ?? initialActive;
  const filteredItems =
    active === "All"
      ? CASES
      : CASES.filter((item) => item.categories.includes(active));

  const handleFilterChange = (value: Category | "All") => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "All") {
      params.delete("filter");
    } else {
      params.set("filter", getCategorySlug(value));
    }

    const query = params.toString();

    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  };

  return (
    <section className="container-x min-h-[100svh] pb-[clamp(5rem,8vw,8rem)] pt-[clamp(6.5rem,12vw,9.5rem)]">
      <header className="max-w-[52rem]">
        <Reveal
          as="p"
          className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]"
        >
          Work index
        </Reveal>
        <Reveal
          as="h1"
          delay={90}
          className="mt-4 max-w-[12ch] text-[clamp(3rem,7vw,5.75rem)] text-[var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
          }}
        >
          Selected work, filtered by lens.
        </Reveal>
      </header>

      <div className="mt-10">
        <FilterBar categories={CATEGORIES} active={active} onChange={handleFilterChange} />
      </div>

      <div className="mt-[clamp(2.5rem,6vw,4rem)]">
        {filteredItems.length > 0 ? (
          <CaseGrid items={filteredItems} />
        ) : (
          <div className="flex min-h-[42svh] flex-col items-center justify-center gap-6 text-center">
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
            <button
              type="button"
              className="min-h-11 rounded-full border px-5 py-3 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-ink)] transition-[border-color,background-color,color] duration-[300ms] hover:bg-[var(--color-ink)] hover:text-[var(--color-canvas)]"
              style={{ borderColor: "var(--color-ink)" }}
              onClick={() => handleFilterChange("All")}
            >
              Show all cases
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
