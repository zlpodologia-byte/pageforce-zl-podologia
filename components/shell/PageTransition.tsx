"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { GooeyMaskLayer } from "@/components/shell/GooeyMaskLayer";
import {
  ROUTE_COVER_MS,
  ROUTE_FADE_MS,
  ROUTE_REVEAL_MS,
  getOppositeEdgeSeed,
  getRightEdgeSeed,
  type Point,
  useReducedMotionPreference,
  useViewportSize,
} from "@/components/shell/motion";
import { useAppStore } from "@/lib/store";

type TransitionPhase = "idle" | "covering" | "revealing";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const viewport = useViewportSize();
  const reducedMotion = useReducedMotionPreference();
  const setRouteTransition = useAppStore((state) => state.setRouteTransition);
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [expanded, setExpanded] = useState(false);
  const [seed, setSeed] = useState<Point>(() => getRightEdgeSeed(viewport));
  const [announcement, setAnnouncement] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const lastPathRef = useRef(pathname);
  const pendingHrefRef = useRef<string | null>(null);
  const controlledNavigationRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    for (const timer of timersRef.current) {
      window.clearTimeout(timer);
    }
    timersRef.current = [];
  };

  const finishTransition = () => {
    setPhase("idle");
    setExpanded(false);
    setRouteTransition("idle");
    setShowLoader(false);

    window.requestAnimationFrame(() => {
      setAnnouncement(document.title);

      const heading = document.querySelector<HTMLElement>(
        "main h1, main h2, [data-page-heading]",
      );

      if (!heading) {
        return;
      }

      const previousTabIndex = heading.getAttribute("tabindex");
      if (previousTabIndex === null) {
        heading.setAttribute("tabindex", "-1");
        heading.addEventListener(
          "blur",
          () => {
            heading.removeAttribute("tabindex");
          },
          { once: true },
        );
      }

      heading.focus({ preventScroll: true });
    });
  };

  useEffect(() => {
    setPortalReady(true);
    setAnnouncement(document.title);
  }, []);

  useEffect(() => {
    const beginControlledTransition = (origin: Point) => {
      clearTimers();
      controlledNavigationRef.current = true;
      setSeed(origin);
      setShowLoader(false);
      setPhase("covering");
      setRouteTransition("exiting");
      setExpanded(false);

      const frame = window.requestAnimationFrame(() => {
        setExpanded(true);
      });

      timersRef.current.push(
        window.setTimeout(() => {
          const nextHref = pendingHrefRef.current;
          if (!nextHref) {
            return;
          }

          startTransition(() => {
            router.push(nextHref);
          });
        }, reducedMotion ? Math.round(ROUTE_FADE_MS / 2) : ROUTE_COVER_MS),
      );

      timersRef.current.push(
        window.setTimeout(() => {
          if (pendingHrefRef.current) {
            setShowLoader(true);
          }
        }, reducedMotion ? ROUTE_FADE_MS : ROUTE_COVER_MS + 60),
      );

      return () => window.cancelAnimationFrame(frame);
    };

    const onClickCapture = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        phase !== "idle"
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) {
        return;
      }

      if (
        anchor.target &&
        anchor.target !== "_self" &&
        anchor.target !== ""
      ) {
        return;
      }

      if (anchor.hasAttribute("download")) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      const nextUrl = new URL(anchor.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) {
        return;
      }

      if (
        nextUrl.pathname === window.location.pathname &&
        nextUrl.search === window.location.search &&
        nextUrl.hash === window.location.hash
      ) {
        return;
      }

      if (
        nextUrl.hash &&
        nextUrl.pathname === window.location.pathname &&
        nextUrl.search === window.location.search
      ) {
        return;
      }

      event.preventDefault();
      pendingHrefRef.current = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;

      const origin =
        event.detail === 0 || (event.clientX === 0 && event.clientY === 0)
          ? getRightEdgeSeed(viewport)
          : { x: event.clientX, y: event.clientY };

      beginControlledTransition(origin);
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [phase, reducedMotion, router, setRouteTransition, viewport]);

  useEffect(() => {
    if (pathname === lastPathRef.current) {
      return;
    }

    lastPathRef.current = pathname;
    clearTimers();
    pendingHrefRef.current = null;
    setShowLoader(false);
    setRouteTransition("entering");
    setPhase("revealing");

    if (controlledNavigationRef.current) {
      controlledNavigationRef.current = false;
      setSeed((current) => getOppositeEdgeSeed(current, viewport));
    } else {
      const rightEdgeSeed = getRightEdgeSeed(viewport);
      setSeed(getOppositeEdgeSeed(rightEdgeSeed, viewport));
      setExpanded(true);
    }

    timersRef.current.push(
      window.setTimeout(() => {
        setExpanded(false);
      }, reducedMotion ? 20 : 120),
    );

    timersRef.current.push(
      window.setTimeout(
        finishTransition,
        reducedMotion ? ROUTE_FADE_MS : ROUTE_REVEAL_MS + 120,
      ),
    );
  }, [pathname, reducedMotion, setRouteTransition, viewport]);

  useEffect(() => clearTimers, []);

  const overlay =
    portalReady && phase !== "idle"
      ? createPortal(
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[80]"
          >
            {reducedMotion ? (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "var(--color-canvas-invert)",
                  opacity: expanded ? 1 : 0,
                  transition: `opacity ${Math.round(ROUTE_FADE_MS / 2)}ms var(--ease-out-expo)`,
                }}
              />
            ) : (
              <GooeyMaskLayer
                color="var(--color-canvas-invert)"
                duration={phase === "covering" ? ROUTE_COVER_MS : ROUTE_REVEAL_MS}
                expanded={expanded}
                filterId="page-transition-goo"
                seed={seed}
              />
            )}

            {showLoader ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-ink-invert)]">
                  <span
                    className={`block h-4 w-4 rounded-full border border-[rgba(245,239,227,0.28)] border-t-[var(--color-ink-invert)] ${
                      reducedMotion ? "" : "animate-spin"
                    }`}
                    aria-hidden="true"
                  />
                  <span>Loading</span>
                </div>
              </div>
            ) : null}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="route-announcer"
      >
        {announcement}
      </div>
      {overlay}
      {children}
    </>
  );
}
