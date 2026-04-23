"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { GooeyMaskLayer } from "@/components/shell/GooeyMaskLayer";
import {
  FOCUSABLE_SELECTOR,
  MENU_CLOSE_MS,
  MENU_FADE_MS,
  MENU_OPEN_MS,
  getMenuButtonSeed,
  useReducedMotionPreference,
  useViewportSize,
} from "@/components/shell/motion";
import { useAppStore } from "@/lib/store";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/diagnostic", label: "Diagnostic" },
  { href: "/work", label: "Work" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
];

const SOCIAL = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://read.cv", label: "Read.cv" },
];

type OverlayPhase = "closed" | "opening" | "open" | "closing";

function getItemStyle(
  index: number,
  visible: boolean,
  delay: number,
  reducedMotion: boolean,
): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: reducedMotion
      ? "none"
      : visible
        ? "translateY(0px)"
        : "translateY(24px)",
    transitionProperty: reducedMotion ? "opacity" : "opacity, transform",
    transitionDuration: reducedMotion ? `${MENU_FADE_MS}ms` : "560ms",
    transitionTimingFunction: "var(--ease-out-expo)",
    transitionDelay: visible ? `${reducedMotion ? 0 : delay + index * 50}ms` : "0ms",
  };
}

export function MenuOverlay() {
  const { menuOpen, setMenuOpen } = useAppStore();
  const viewport = useViewportSize();
  const reducedMotion = useReducedMotionPreference();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const closeReasonRef = useRef<"dismiss" | "link">("dismiss");
  const [phase, setPhase] = useState<OverlayPhase>("closed");
  const [expanded, setExpanded] = useState(false);
  const [seed, setSeed] = useState(() => getMenuButtonSeed(viewport));

  const isRendered = phase !== "closed";
  const contentVisible = menuOpen && phase !== "closing";
  const backgroundDuration = reducedMotion
    ? MENU_FADE_MS
    : phase === "closing"
      ? MENU_CLOSE_MS
      : MENU_OPEN_MS;
  const contentDelay = reducedMotion ? 0 : MENU_OPEN_MS + 150;
  const socialDelay = reducedMotion
    ? 0
    : contentDelay + NAV_LINKS.length * 50 + 80;

  const clearTimers = () => {
    for (const timer of timersRef.current) {
      window.clearTimeout(timer);
    }
    timersRef.current = [];
  };

  const restoreTriggerFocus = () => {
    const trigger = document.querySelector<HTMLElement>("[data-menu-button]");
    trigger?.focus();
  };

  useEffect(() => {
    document.body.classList.toggle("menu-open", isRendered);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isRendered]);

  useEffect(() => {
    if (menuOpen) {
      if (phase === "open" || phase === "opening") {
        return;
      }

      clearTimers();
      setSeed(getMenuButtonSeed(viewport));
      setPhase("opening");
      setExpanded(false);

      const frame = window.requestAnimationFrame(() => {
        setExpanded(true);
      });

      timersRef.current.push(
        window.setTimeout(() => {
          setPhase("open");
          firstLinkRef.current?.focus();
        }, reducedMotion ? MENU_FADE_MS : MENU_OPEN_MS),
      );

      return () => window.cancelAnimationFrame(frame);
    }

    if (phase === "closed" || phase === "closing") {
      return;
    }

    clearTimers();
    setSeed(getMenuButtonSeed(viewport));
    setPhase("closing");
    setExpanded(false);

    timersRef.current.push(
      window.setTimeout(() => {
        setPhase("closed");
        if (closeReasonRef.current !== "link") {
          restoreTriggerFocus();
        }
        closeReasonRef.current = "dismiss";
      }, reducedMotion ? MENU_FADE_MS : MENU_CLOSE_MS),
    );
  }, [menuOpen, phase, reducedMotion, viewport]);

  useEffect(() => {
    if (!isRendered) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeReasonRef.current = "dismiss";
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusables = overlayRef.current
        ? Array.from(
            overlayRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
          ).filter(
            (node) =>
              !node.hasAttribute("disabled") &&
              node.getAttribute("aria-hidden") !== "true",
          )
        : [];

      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isRendered, setMenuOpen]);

  useEffect(() => clearTimers, []);

  if (!isRendered) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      id="main-menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      className="fixed inset-0 z-[35]"
      style={{ pointerEvents: menuOpen ? "auto" : "none" }}
    >
      {reducedMotion ? (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundColor: "var(--color-canvas-invert)",
            opacity: contentVisible ? 1 : 0,
            transition: `opacity ${MENU_FADE_MS}ms var(--ease-out-expo)`,
          }}
        />
      ) : (
        <GooeyMaskLayer
          color="var(--color-canvas-invert)"
          duration={backgroundDuration}
          expanded={expanded}
          filterId="menu-overlay-goo"
          seed={seed}
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          color: "var(--color-ink-invert)",
          pointerEvents: contentVisible ? "auto" : "none",
        }}
      >
        <nav
          className="absolute left-[55%] top-1/2 w-[min(38rem,36vw)] -translate-y-1/2 max-[480px]:left-6 max-[480px]:right-6 max-[480px]:top-[48%] max-[480px]:w-auto"
          aria-label="Main navigation"
        >
          <ul className="space-y-1">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  data-cursor-target
                  onClick={() => {
                    closeReasonRef.current = "link";
                    setMenuOpen(false);
                  }}
                  className="block text-[clamp(3.25rem,8vw,7rem)] font-light leading-[0.97] tracking-[-0.03em]"
                  style={{
                    fontFamily: "var(--font-display)",
                    ...getItemStyle(
                      index,
                      contentVisible,
                      contentDelay,
                      reducedMotion,
                    ),
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul
          className="absolute bottom-8 left-[55%] flex flex-wrap gap-x-6 gap-y-2 text-[0.72rem] uppercase tracking-[0.24em] max-[480px]:left-6 max-[480px]:right-6 max-[480px]:bottom-6"
          style={{ color: "rgba(245, 239, 227, 0.68)" }}
        >
          {SOCIAL.map((social, index) => (
            <li
              key={social.label}
              style={getItemStyle(
                index,
                contentVisible,
                socialDelay,
                reducedMotion,
              )}
            >
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline"
                data-cursor-target
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
