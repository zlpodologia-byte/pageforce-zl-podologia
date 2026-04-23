"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionPreference } from "@/components/shell/motion";

const TARGET_SELECTOR = "[data-cursor-target]";
const IGNORE_SELECTOR =
  "[data-cursor-ignore], input, textarea, select, option, [contenteditable='true']";
const LERP_FACTOR = 0.2;
const ENTRY_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const BASE_SIZE = 8;
const TARGET_SCALE = 3.5;

function closestElement(
  target: EventTarget | null,
  selector: string,
): HTMLElement | null {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<HTMLElement>(selector);
}

export function Cursor() {
  const reducedMotion = useReducedMotionPreference();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const activeTargetRef = useRef<HTMLElement | null>(null);
  const hasPointerRef = useRef(false);
  const suppressedRef = useRef(false);

  const [finePointer, setFinePointer] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);
  const [isSuppressed, setIsSuppressed] = useState(false);
  const [isTargeted, setIsTargeted] = useState(false);

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateMedia = () => {
      const nextFinePointer = finePointerQuery.matches;

      setFinePointer(nextFinePointer);

      if (!nextFinePointer) {
        hasPointerRef.current = false;
        suppressedRef.current = false;
        activeTargetRef.current = null;
        setHasPointer(false);
        setIsSuppressed(false);
        setIsTargeted(false);
      }
    };

    updateMedia();
    finePointerQuery.addEventListener("change", updateMedia);

    return () => {
      finePointerQuery.removeEventListener("change", updateMedia);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-custom-cursor", finePointer && hasPointer);

    return () => {
      document.body.classList.remove("has-custom-cursor");
    };
  }, [finePointer, hasPointer]);

  useEffect(() => {
    if (!finePointer) {
      return;
    }

    let frameId = 0;

    const tick = () => {
      const pointer = pointerRef.current;
      const current = currentRef.current;
      const nextX = reducedMotion
        ? pointer.x
        : current.x + (pointer.x - current.x) * LERP_FACTOR;
      const nextY = reducedMotion
        ? pointer.y
        : current.y + (pointer.y - current.y) * LERP_FACTOR;

      currentRef.current = { x: nextX, y: nextY };

      if (rootRef.current) {
        rootRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [finePointer, reducedMotion]);

  useEffect(() => {
    if (!finePointer) {
      return;
    }

    const resetPointer = () => {
      activeTargetRef.current = null;
      hasPointerRef.current = false;
      suppressedRef.current = false;
      setHasPointer(false);
      setIsSuppressed(false);
      setIsTargeted(false);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      pointerRef.current = { x: event.clientX, y: event.clientY };

      if (!hasPointerRef.current) {
        hasPointerRef.current = true;
        currentRef.current = { x: event.clientX, y: event.clientY };

        if (rootRef.current) {
          rootRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        }

        setHasPointer(true);
      }

      const nextSuppressed = closestElement(event.target, IGNORE_SELECTOR) !== null;
      if (suppressedRef.current !== nextSuppressed) {
        suppressedRef.current = nextSuppressed;
        setIsSuppressed(nextSuppressed);
      }

      const nextTarget = nextSuppressed
        ? null
        : closestElement(event.target, TARGET_SELECTOR);

      if (activeTargetRef.current !== nextTarget) {
        activeTargetRef.current = nextTarget;
        setIsTargeted(nextTarget !== null);
      }
    };

    const onMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget === null) {
        resetPointer();
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", resetPointer);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", resetPointer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [finePointer]);

  if (!finePointer) {
    return null;
  }

  const visible = hasPointer && !isSuppressed;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 120ms linear",
        willChange: "transform, opacity",
      }}
    >
      <div
        className="relative"
        style={{
          transform: "translate3d(-50%, -50%, 0)",
        }}
      >
        <div
          className="relative overflow-hidden rounded-full"
          style={{
            width: `${BASE_SIZE}px`,
            height: `${BASE_SIZE}px`,
            backgroundColor: "var(--color-ink)",
            transform: `scale(${isTargeted ? TARGET_SCALE : 1})`,
            transformOrigin: "center",
            transition: reducedMotion
              ? "none"
              : `transform 180ms ${ENTRY_EASING}, border-radius 180ms ${ENTRY_EASING}`,
            willChange: "transform",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              opacity: isTargeted ? 1 : 0,
              transition: reducedMotion
                ? "none"
                : `opacity 120ms linear, transform 180ms ${ENTRY_EASING}`,
              transform: isTargeted ? "scale(1)" : "scale(0.7)",
            }}
          >
            <svg
              viewBox="0 0 20 20"
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.2 7.5C5.9 6.9 6.9 6.7 7.8 6.9"
                stroke="var(--color-canvas)"
                strokeLinecap="round"
                strokeWidth="1.35"
              />
              <path
                d="M12.2 6.9C13.1 6.7 14.1 6.9 14.8 7.5"
                stroke="var(--color-canvas)"
                strokeLinecap="round"
                strokeWidth="1.35"
              />
              <path
                d="M6.2 12.4C7.4 13.6 8.7 14.2 10 14.2C11.3 14.2 12.6 13.6 13.8 12.4"
                stroke="var(--color-canvas)"
                strokeLinecap="round"
                strokeWidth="1.35"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
