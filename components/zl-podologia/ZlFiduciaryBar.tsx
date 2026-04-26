"use client";

import { Reveal } from "@/components/reveal/Reveal";
import { ZlStarIcon } from "@/components/zl-podologia/ZlCtaLink";
import { trackZlEvent } from "@/components/zl-podologia/ZlAnalytics";
import { ZlOpenStatus } from "@/components/zl-podologia/ZlOpenStatus";
import {
  zlFiduciaryBarItems,
  zlUrgencyCopy,
  type ZlFiduciaryBarItemKind,
} from "@/components/zl-podologia/zlPodologiaContent";

/**
 * Faixa fiduciaria consolidada — v7-final (5 celulas):
 *
 * 1. Anvisa (selo biosseguranca)
 * 2. Podologa registrada (autoridade profissional)
 * 3. Google 5,0 / 11 (reputacao rastreavel)
 * 4. Aberto agora (ZlOpenStatus dinamico) — Fix 1 da reflexao E
 * 5. WhatsApp direto (canal primario)
 *
 * Abaixo das 5 celulas, microtexto "Uma paciente por vez" converte a
 * pequenez em vantagem narrativa (Fix 6 da reflexao E).
 *
 * Tom azul frio (eyebrow em castanho, corpo em cinza neutro), sem CTA
 * primario; celulas com CTA sao links diretos (Google / WhatsApp).
 */

export function ZlFiduciaryBar() {
  return (
    <section
      aria-label="Faixa fiduciaria: Anvisa, profissional registrada, Google 5,0, horario de atendimento e WhatsApp direto"
      className="relative border-b border-[#D9DAD7] bg-[#FFFFFF]"
    >
      <div className="container-x mx-auto grid max-w-[1440px] gap-0 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-[#D9DAD7]">
        {zlFiduciaryBarItems.map((item, idx) => (
          <Reveal
            key={item.kind}
            as="div"
            delay={idx * 40}
            className="relative flex items-start gap-3 border-t border-[#D9DAD7] px-4 py-5 first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0 sm:[&:nth-child(1)]:border-l-0 sm:[&:nth-child(2)]:border-l sm:[&:nth-child(3)]:border-t sm:[&:nth-child(4)]:border-t sm:[&:nth-child(5)]:border-t sm:[&:nth-child(3)]:border-l-0 sm:[&:nth-child(5)]:border-l-0 lg:border-t-0 lg:border-l-0 lg:py-6 lg:[&:nth-child(n)]:border-l-0"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFEAE4] text-[#174F3F]">
              <FiduciaryIcon kind={item.kind} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[#6F746F]">
                {item.eyebrow}
              </p>
              {item.kind === "open_status" ?(
                <div className="mt-1">
                  <ZlOpenStatus
                    variant="block"
                    className="text-[#26302B]"
                  />
                </div>
              ) : (
                <>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-[0.9rem] font-medium leading-[1.3] text-[#26302B]">
                    {item.title}
                    {item.kind === "google" ?(
                      <span
                        className="inline-flex items-center gap-0.5 align-middle text-[#8EA08E]"
                        aria-hidden="true"
                      >
                        {[0, 1, 2, 3, 4].map((i) => (
                          <ZlStarIcon key={i} />
                        ))}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-[0.78rem] leading-[1.5] text-[#6F746F]">
                    {item.body}
                  </p>
                </>
              )}
              {item.cta ?(
                <a
                  href={item.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    if (item.kind === "google") {
                      trackZlEvent("maps_click", { source: "fiduciary_bar" });
                    } else if (item.kind === "whatsapp") {
                      trackZlEvent("wa_click", { source: "fiduciary_bar" });
                    }
                  }}
                  className={`mt-1.5 inline-flex items-center gap-1 text-[0.74rem] font-medium hover:underline ${
                    item.kind === "whatsapp"
                      ?"text-[#0F6B46]"
                      : "text-[#174F3F]"
                  }`}
                >
                  {item.cta.label} -&gt;
                </a>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Fix 6 — Urgencia honesta. v7-earthy: caramelo discreto. */}
      <div className="border-t border-[#D9DAD7] bg-[#EFEAE4]">
        <div className="container-x mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-3 text-[0.82rem] leading-[1.5] text-[#6F746F] lg:px-0">
          <p className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F6B46]"
            />
            <span className="font-medium text-[#26302B]">
              {zlUrgencyCopy.title}
            </span>{" "}
            {zlUrgencyCopy.body}
          </p>
        </div>
      </div>
    </section>
  );
}

function FiduciaryIcon({ kind }: { kind: ZlFiduciaryBarItemKind }) {
  switch (kind) {
    case "anvisa":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z"
            strokeLinejoin="round"
          />
          <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "podologa":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
        </svg>
      );
    case "google":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3Z" />
        </svg>
      );
    case "open_status":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M17.6 6.3A7.85 7.85 0 0 0 12 4a7.9 7.9 0 0 0-6.7 12l-1 3.7 3.8-1a7.9 7.9 0 0 0 3.9 1h.01c4.36 0 7.9-3.53 7.9-7.9 0-2.1-.82-4.1-2.31-5.5Z" />
        </svg>
      );
  }
}
