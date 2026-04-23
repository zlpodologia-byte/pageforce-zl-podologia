"use client";

import Image from "next/image";
import {
  exactFinalCtaBullets,
  type ExactPricingCard,
} from "@/components/zl-podologia/exact/ZlExactData";
import { ExactSectionLabel, FootLineArt } from "@/components/zl-podologia/exact/ZlExactPrimitives";

export function ExactPricingSection({
  cards,
  notes,
  footer,
}: {
  cards: readonly ExactPricingCard[];
  notes: readonly string[];
  footer: string;
}) {
  return (
    <section id="clinica" className="border-t border-[#E9DED6] py-14">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <ExactSectionLabel
            eyebrow="INVESTIMENTO EM SAUDE E BEM-ESTAR"
            title="Precos transparentes."
          />
          <div className="flex flex-wrap gap-3 lg:justify-self-end">
            {notes.map((note) => (
              <span
                key={note}
                className="inline-flex items-center gap-2 rounded-full border border-[#E8DDD4] bg-white px-4 py-2 text-[0.74rem] text-[#6E6570]"
              >
                <span className="h-2 w-2 rounded-full bg-[#EF9F27]" />
                {note}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-6">
          {cards.map((card) => (
            <article
              key={card.title}
              className={[
                "flex h-full flex-col rounded-[1.35rem] border bg-white p-5 shadow-[0_16px_42px_-28px_rgba(71,53,44,0.2)]",
                card.tone === "highlight"
                  ? "border-[#F2C49A]"
                  : "border-[#E8DDD4]",
              ].join(" ")}
            >
              <h3
                className="text-[1rem] leading-[1.15] tracking-[-0.02em] text-[#2E2732]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {card.title}
              </h3>
              <p className="mt-4 text-[1.45rem] leading-none tracking-[-0.04em] text-[#378ADD] tabular-nums">
                {card.price}
              </p>
              <p className="mt-4 min-h-[4.5rem] text-[0.88rem] leading-[1.6] text-[#6E6570]">
                {card.body}
              </p>
              <a
                href="#contato"
                className="mt-auto inline-flex items-center justify-center rounded-full bg-[#FBE6D3] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#2E2732] transition-colors hover:bg-[#EF9F27] hover:text-white"
              >
                {card.action}
              </a>
            </article>
          ))}
        </div>

        <p className="mt-4 text-center text-[0.74rem] text-[#8E7B74]">
          {footer}
        </p>
      </div>
    </section>
  );
}

export function ExactFinalCtaSection({
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  body: string;
  primary: string;
  secondary: string;
}) {
  return (
    <section id="contato" className="border-t border-[#E9DED6] py-14">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="grid gap-6 overflow-hidden rounded-[2rem] border border-[#E8DDD4] bg-[#FBF8F4] p-2 shadow-[0_30px_80px_-40px_rgba(71,53,44,0.2)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:p-3">
          <div className="relative overflow-hidden rounded-[1.7rem] bg-white">
            <div className="relative aspect-[4/3] h-full w-full lg:aspect-auto lg:min-h-[24rem]">
              <Image
                src="/zl-podologia/social/edited-pro/ambiente/sala-wide-institucional-pro.jpg"
                alt="Ambiente da ZL Podologia em Fortaleza com atendimento real e sala organizada"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative flex min-h-[24rem] items-center overflow-hidden rounded-[1.7rem] bg-[linear-gradient(180deg,#FFFDFB_0%,#F4ECE4_100%)] p-7 lg:p-10">
            <div className="absolute right-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full border border-[#F0E0D5] bg-white/40 lg:block" />
            <div className="relative z-10 max-w-[30rem]">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#B67F66]">
                {eyebrow}
              </p>
              <h2
                className="mt-4 max-w-[14ch] text-[clamp(2.2rem,4.3vw,4rem)] leading-[0.96] tracking-[-0.05em] text-[#2E2732]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </h2>
              <p className="mt-4 max-w-[32ch] text-[0.98rem] leading-[1.75] text-[#6E6570]">
                {body}
              </p>

              <ul className="mt-6 grid gap-3">
                {exactFinalCtaBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.92rem] text-[#2E2732]">
                    <span className="mt-2 flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#EF9F27]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://api.whatsapp.com/send?phone=5585994358505&text=Ola%2C%20quero%20agendar%20uma%20avaliacao%20na%20ZL%20Podologia%20em%20Fortaleza."
                  className="inline-flex items-center rounded-full bg-[#EF9F27] px-6 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_18px_44px_-24px_rgba(239,159,39,0.9)] transition-transform hover:-translate-y-0.5"
                >
                  {primary}
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=5585994358505&text=Ola%2C%20quero%20falar%20com%20a%20ZL%20Podologia%20pelo%20WhatsApp."
                  className="inline-flex items-center rounded-full border border-[#E5D8CF] bg-white px-6 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#2E2732] transition-colors hover:border-[#EF9F27]"
                >
                  {secondary}
                </a>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-4 right-4 hidden lg:block">
              <FootLineArt />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

