"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type JSX,
  type ReactNode,
} from "react";
import { useReducedMotionPreference } from "@/components/shell/motion";

type RevealTag = keyof JSX.IntrinsicElements;
type RevealVariant = "fade" | "line";

const REVEAL_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const REVEAL_THRESHOLD = 0.12;
const REVEAL_ROOT_MARGIN = "0px 0px -10% 0px";

interface RevealProps {
  children: ReactNode;
  as?: RevealTag;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  style?: CSSProperties;
}

interface RevealLinesProps {
  lines: ReactNode[];
  as?: RevealTag;
  className?: string;
  delay?: number;
  lineClassName?: string;
  stagger?: number;
  style?: CSSProperties;
}

export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  variant = "fade",
  style,
}: RevealProps) {
  const reducedMotion = useReducedMotionPreference();
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = elementRef.current;
    if (!node || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: REVEAL_THRESHOLD,
        rootMargin: REVEAL_ROOT_MARGIN,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, reducedMotion]);

  const setElementRef = (node: HTMLElement | null) => {
    elementRef.current = node;
  };

  const fadeStyle: CSSProperties = {
    ...style,
    opacity: isVisible || reducedMotion ? 1 : 0,
    transform: isVisible || reducedMotion ? "translateY(0px)" : "translateY(14px)",
    transition: reducedMotion
      ? "none"
      : `opacity 900ms ${REVEAL_EASING} ${delay}ms, transform 900ms ${REVEAL_EASING} ${delay}ms`,
    willChange: "opacity, transform",
  };

  const lineOuterStyle: CSSProperties = {
    ...style,
    display: "block",
    overflow: "hidden",
  };

  const lineInnerStyle: CSSProperties = {
    display: "block",
    transform: isVisible || reducedMotion ? "translateY(0%)" : "translateY(110%)",
    transition: reducedMotion
      ? "none"
      : `transform 1100ms ${REVEAL_EASING} ${delay}ms`,
    willChange: "transform",
  };

  if (variant === "line") {
    return createElement(
      as,
      { ref: setElementRef, className, style: lineOuterStyle },
      createElement("span", { style: lineInnerStyle }, children),
    );
  }

  return createElement(as, { ref: setElementRef, className, style: fadeStyle }, children);
}

export function RevealLines({
  lines,
  as = "div",
  className,
  delay = 0,
  lineClassName,
  stagger = 80,
  style,
}: RevealLinesProps) {
  return createElement(
    as,
    { className, style },
    lines.map((line, index) => (
      <Reveal
        key={index}
        as="span"
        className={lineClassName ?? "block"}
        delay={delay + index * stagger}
        variant="line"
      >
        {line}
      </Reveal>
    )),
  );
}
