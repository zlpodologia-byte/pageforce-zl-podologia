"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";

/**
 * Logo — small stacked wordmark top-left.
 * Light variant (default) on canvas; inverts to ivory when menu overlay is open.
 * See docs/component-inventory.md "Logo".
 */
export function Logo() {
  const menuOpen = useAppStore((s) => s.menuOpen);

  return (
    <div className="fixed left-6 top-6 z-40 md:left-10 md:top-8">
      <Link
        href="/"
        aria-label="Pageforce — home"
        data-cursor-target
        className="group inline-block text-[10px] uppercase leading-[1.08] tracking-[0.06em] transition-colors duration-500"
        style={{
          color: menuOpen ? "var(--color-ink-invert)" : "var(--color-ink)",
        }}
      >
        <span className="block font-semibold">Pageforce</span>
        <span className="block font-semibold">Engrenagem</span>
        <span className="block opacity-60">&#8260; 2026</span>
      </Link>
    </div>
  );
}
