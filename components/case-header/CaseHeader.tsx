"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { Reveal, RevealLines } from "@/components/reveal/Reveal";
import { Logo } from "@/components/shell/Logo";
import type { CaseItem } from "@/lib/cases";
import { useAppStore } from "@/lib/store";
import { splitTitle } from "./splitTitle";

interface CaseHeaderProps {
  item: CaseItem;
}

function getAccentTone(item: CaseItem) {
  if (item.bgMode === "dark") {
    return "dark";
  }

  if (item.bgMode === "light") {
    return "light";
  }

  const hex = item.accent.replace("#", "");

  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    return "light";
  }

  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminance < 152 ? "dark" : "light";
}

export function CaseHeader({ item }: CaseHeaderProps) {
  const router = useRouter();
  const menuOpen = useAppStore((state) => state.menuOpen);
  const [closeHref, setCloseHref] = useState("/work");
  const titleLines = useMemo(() => splitTitle(item.title), [item.title]);
  const accentTone = getAccentTone(item);
  const isDark = accentTone === "dark";
  const textColor = isDark ? "var(--color-ink-invert)" : "var(--color-ink)";
  const mutedTextColor = isDark ? "rgba(245, 239, 227, 0.72)" : "rgba(0, 0, 0, 0.62)";

  useEffect(() => {
    router.prefetch("/work");

    const referrer = document.referrer;
    if (!referrer) {
      return;
    }

    try {
      const referrerUrl = new URL(referrer);
      if (referrerUrl.origin !== window.location.origin) {
        return;
      }

      const nextHref = `${referrerUrl.pathname}${referrerUrl.search}${referrerUrl.hash}` || "/work";

      if (nextHref === window.location.pathname) {
        return;
      }

      setCloseHref(nextHref);
    } catch {
      setCloseHref("/work");
    }
  }, [router]);

  const handleCloseClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push(closeHref);
  };

  return (
    <section
      data-case-detail-page
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: item.accent, color: textColor }}
    >
      <style jsx global>{`
        body:has([data-case-detail-page]) > div.fixed.left-6.top-6.z-40 {
          opacity: 0;
          pointer-events: none;
        }

        .case-header-logo > div {
          transition: filter 300ms var(--ease-out-expo);
        }

        .case-header-logo--light > div {
          filter: invert(1) brightness(1.12);
        }
      `}</style>

      <div
        className={`case-header-logo ${isDark && !menuOpen ? "case-header-logo--light" : ""}`}
      >
        <Logo />
      </div>

      <div className="container-x relative flex min-h-[100svh] flex-col justify-between pb-[clamp(1.5rem,3vw,2.25rem)] pt-[clamp(1.15rem,2.5vw,1.75rem)]">
        <div className="relative z-10">
          <Link
            href={closeHref}
            onClick={handleCloseClick}
            data-cursor-target
            data-cursor-label="Close"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[1rem] rounded-t-[0.55rem] border px-4 text-[0.68rem] uppercase tracking-[0.2em] transition-[background-color,border-color,color] duration-300"
            style={{
              color: textColor,
              borderColor: isDark ? "rgba(245, 239, 227, 0.28)" : "rgba(0, 0, 0, 0.18)",
              backgroundColor: isDark ? "rgba(10, 10, 10, 0.16)" : "rgba(255, 255, 255, 0.22)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span aria-hidden="true" className="text-[0.9rem] leading-none">
              X
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-[clamp(5.75rem,10vw,8.5rem)]">
          <div className="mx-auto max-w-[70rem] text-center">
            <RevealLines
              as="h1"
              lines={titleLines}
              stagger={80}
              className="text-balance font-bold"
              lineClassName="block"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(3rem, 7vw, 7.5rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.065em",
              }}
            />
            <Reveal
              as="p"
              delay={Math.max(titleLines.length - 1, 0) * 80 + 200}
              className="mx-auto mt-5 max-w-[28rem] text-[0.76rem] uppercase tracking-[0.28em] sm:text-[0.82rem]"
              style={{ color: mutedTextColor }}
            >
              {item.client} {"\u2022"} {item.year}
            </Reveal>
          </div>
        </div>

        <Reveal
          as="div"
          delay={320}
          className="relative z-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-4 text-[0.68rem] uppercase tracking-[0.18em] sm:text-[0.72rem]"
          style={{
            borderColor: isDark ? "rgba(245, 239, 227, 0.18)" : "rgba(0, 0, 0, 0.12)",
            color: mutedTextColor,
          }}
        >
          <span aria-hidden="true">{"\u2022"}</span>
          <span>Launch project</span>
          <span>|</span>
          <span>Type: {item.categories.join(", ")}</span>
          <span>|</span>
          <span>Client: {item.client}</span>
          <span>|</span>
          <span>Deliverables: {item.roles.join(", ")}</span>
        </Reveal>
      </div>
    </section>
  );
}
