"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const DEFAULT_TITLE_LINES = [
  "Diagnóstico antes,",
  "engrenagem depois,",
  "previsibilidade no ciclo.",
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export interface DeepDiveSplashProps {
  kicker?: string;
  titleLines?: readonly string[];
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function DeepDiveSplash({
  kicker = "Para a operação",
  titleLines = DEFAULT_TITLE_LINES,
  body = "A Pageforce roda diagnóstico, monta a engrenagem comercial digital e entrega como sistema — site, SEO, WhatsApp, CRM, BI e automação operados em conjunto, com leitura mensal e ciclo de melhoria.",
  ctaLabel = "Pedir diagnóstico",
  ctaHref = "/diagnostic",
}: DeepDiveSplashProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -12% 0px",
  });

  return (
    <section className="container-x pb-[clamp(4rem,8vw,7rem)]">
      <div
        ref={sectionRef}
        className="relative overflow-hidden rounded-[2rem] bg-[var(--color-canvas-invert)] px-[clamp(1.5rem,4vw,3.75rem)] py-[clamp(2rem,6vw,4.5rem)] text-[var(--color-ink-invert)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(245,239,227,0.14), transparent 34%), radial-gradient(circle at 82% 72%, rgba(245,239,227,0.08), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
          }}
        />

        <div className="relative grid gap-x-[clamp(1.5rem,4vw,4.5rem)] gap-y-8 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
          <motion.p
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: reducedMotion ? 0 : 12 }
            }
            transition={{
              duration: reducedMotion ? 0.42 : 0.7,
              delay: 0.04,
              ease: EASE,
            }}
            className="text-[0.72rem] uppercase tracking-[0.24em] text-[rgba(245,239,227,0.62)] lg:pt-3"
          >
            {kicker}
          </motion.p>

          <div>
            <h2
              className="max-w-[12ch] text-[clamp(2rem,6vw,4rem)]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: "-0.045em",
              }}
            >
              {titleLines.map((line, index) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={
                      reducedMotion ? { opacity: 0 } : { y: "110%", opacity: 1 }
                    }
                    animate={
                      isInView
                        ? reducedMotion
                          ? { opacity: 1 }
                          : { y: "0%", opacity: 1 }
                        : reducedMotion
                          ? { opacity: 0 }
                          : { y: "110%", opacity: 1 }
                    }
                    transition={{
                      duration: reducedMotion ? 0.42 : 1.02,
                      delay: 0.14 + index * 0.08,
                      ease: EASE,
                    }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.div
              initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: reducedMotion ? 0 : 16 }
              }
              transition={{
                duration: reducedMotion ? 0.42 : 0.78,
                delay: 0.36,
                ease: EASE,
              }}
              className="mt-6 max-w-[52ch]"
            >
              <p className="text-[clamp(0.95rem,1.15vw,1.08rem)] leading-[1.6] text-[rgba(245,239,227,0.78)]">
                {body}
              </p>

              <Link
                href={ctaHref}
                className="link-underline mt-8 inline-flex min-h-11 items-center gap-2 text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-ink-invert)]"
                data-cursor-target
                data-cursor-label="Discover"
              >
                <span>{ctaLabel}</span>
                <span aria-hidden="true">{"\u2192"}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
