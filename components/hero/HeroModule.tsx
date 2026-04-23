"use client";

import { startTransition, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroBlob } from "@/components/hero-blob/HeroBlob";
import { CategoryCycle } from "./CategoryCycle";
import { IllustrationTwoFigures } from "./IllustrationTwoFigures";
import { PaginationDots } from "./PaginationDots";

const HERO_WORDS = [
  "Captar",
  "Converter",
  "Responder",
  "Organizar",
  "Medir",
] as const;

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const HERO_BLOB_COLORS = ["#1a1a1a", "#5a5048", "#f5d5c4"];

function revealTransition(delayMs: number, reducedMotion: boolean) {
  return {
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reducedMotion ? 0.36 : 0.72,
      delay: delayMs / 1000,
      ease: REVEAL_EASE,
    },
  };
}

export function HeroModule() {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const resolvedInterval = reducedMotion ? 4000 : 3000;

  useEffect(() => {
    if (HERO_WORDS.length <= 1) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      startTransition(() => {
        setActiveIndex((current) => (current + 1) % HERO_WORDS.length);
      });
    }, resolvedInterval);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeIndex, resolvedInterval]);

  const handleSelect = (index: number) => {
    startTransition(() => {
      setActiveIndex(index);
    });
  };

  return (
    <section className="container-x relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden py-16 text-center sm:py-20">
      <motion.p
        {...revealTransition(0, reducedMotion)}
        className="text-[0.72rem] uppercase tracking-[0.24em] sm:text-xs"
        style={{ color: "var(--color-muted)" }}
      >
        Pageforce {"\u00b7"} engrenagem comercial digital
      </motion.p>

      <motion.div
        {...revealTransition(200, reducedMotion)}
        className="mt-6 flex justify-center text-[var(--color-ink)] sm:mt-7"
        style={{ width: "clamp(10rem, 18vw, 17rem)" }}
      >
        <HeroBlob className="w-full" colors={HERO_BLOB_COLORS}>
          <IllustrationTwoFigures
            className="w-full"
            paused={reducedMotion}
            style={{ mixBlendMode: "multiply" }}
          />
        </HeroBlob>
      </motion.div>

      <motion.div
        {...revealTransition(400, reducedMotion)}
        className="mt-6 flex w-full justify-center sm:mt-7"
      >
        <CategoryCycle
          as="h1"
          words={[...HERO_WORDS]}
          activeIndex={activeIndex}
          interval={resolvedInterval}
          reducedMotion={reducedMotion}
          className="max-w-full"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 7.5vw, 7.5rem)",
            fontWeight: 300,
            lineHeight: 0.82,
            letterSpacing: "-0.045em",
          }}
        />
      </motion.div>

      <motion.div
        {...revealTransition(600, reducedMotion)}
        className="mt-5 sm:mt-7"
      >
        <PaginationDots
          count={HERO_WORDS.length}
          active={activeIndex}
          onSelect={handleSelect}
        />
      </motion.div>
    </section>
  );
}
