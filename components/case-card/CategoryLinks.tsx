"use client";

import Link from "next/link";
import { startTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getCategoryFromSlug,
  getCategorySlug,
  type Category,
} from "@/lib/cases";

interface CategoryLinksProps {
  categories: Category[];
}

const LINK_CLASS_NAME =
  "text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-muted)] underline decoration-[1px] underline-offset-[0.35em] transition-[color,text-decoration-color] duration-300 hover:text-[var(--color-ink)]";

export function CategoryLinks({ categories }: CategoryLinksProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = getCategoryFromSlug(searchParams.get("filter"));
  const isWorkIndex = pathname === "/work";

  const handleCategorySelect = (category: Category) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", getCategorySlug(category));

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative z-20 mt-4 flex flex-wrap gap-x-3 gap-y-2">
      {categories.map((category) => {
        const isActive = activeFilter === category;

        if (isWorkIndex) {
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              className={LINK_CLASS_NAME}
              data-cursor-target
              onClick={() => handleCategorySelect(category)}
              style={{
                color: isActive ? "var(--color-ink)" : undefined,
                textDecorationColor: isActive
                  ? "var(--color-ink)"
                  : "currentColor",
              }}
            >
              {category}
            </button>
          );
        }

        return (
          <Link
            key={category}
            href={`/work?filter=${getCategorySlug(category)}`}
            className={LINK_CLASS_NAME}
            data-cursor-target
            style={{
              textDecorationColor: isActive ? "var(--color-ink)" : "currentColor",
            }}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}
