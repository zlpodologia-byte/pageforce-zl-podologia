"use client";

import Image from "next/image";
import {
  exactCaseCards,
  exactServiceCards,
  exactSteps,
  type ExactCaseCard,
  type ExactPricingCard,
  type ExactServiceCard,
  type ExactStepCard,
} from "@/components/zl-podologia/exact/ZlExactData";
import {
  CasePairFrame,
  ExactSectionLabel,
  ServiceIcon,
  StepIcon,
} from "@/components/zl-podologia/exact/ZlExactPrimitives";

export function ExactServiceGrid({
  cards,
}: {
  cards: readonly ExactServiceCard[];
}) {
  return (
    <section id="servicos" className="relative py-12">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="mb-8 text-center">
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#B67F66]">
            O QUE TRATAMOS
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.key}
              className="rounded-[1.45rem] border border-[#EBE0D8] bg-white p-6 shadow-[0_18px_50px_-34px_rgba(71,53,44,0.18)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F7E8DD] text-[#B67F66]">
                  <ServiceIcon kind={card.icon} />
                </span>
                <div className="min-w-0">
                  <h3
                    className="text-[1.18rem] leading-[1.15] tracking-[-0.02em] text-[#2E2732]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-[1.72] text-[#6E6570]">
                    {card.body}
                  </p>
                </div>
              </div>
              <a
                href="#contato"
                className="mt-6 inline-flex items-center gap-2 text-[0.85rem] font-medium text-[#EF9F27] transition-transform hover:translate-x-1"
              >
                {card.action}
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExactBeforeAfterSection({
  cards,
}: {
  cards: readonly ExactCaseCard[];
}) {
  return (
    <section id="antes-depois" className="border-t border-[#E9DED6] py-14">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <ExactSectionLabel
            eyebrow="RESULTADOS QUE VOCE VE E SENTE"
            title="Antes e depois reais"
            body="Casos reais, fotografia real e leitura clinica sem promessas vazias."
          />
          <a
            href="#contato"
            className="inline-flex items-center self-start rounded-full border border-[#E5D8CF] bg-white px-4 py-2.5 text-[0.72rem] uppercase tracking-[0.24em] text-[#8E7B74] transition-colors hover:border-[#EF9F27] hover:text-[#2E2732]"
          >
            Ver mais casos reais
          </a>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-3">
          {cards.map((card) => (
            <article key={card.key} className="rounded-[1.55rem] bg-transparent">
              <CasePairFrame card={card} />
              <div className="mt-4">
                <h3
                  className="text-[1rem] font-medium text-[#2E2732]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {card.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-[1.7] text-[#6E6570]">
                  {card.note}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-2">
          <span className="h-1.5 w-8 rounded-full bg-[#EF9F27]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#E0D4CB]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#E0D4CB]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#E0D4CB]" />
        </div>
      </div>
    </section>
  );
}

export function ExactCareFlowSection({
  steps,
}: {
  steps: readonly ExactStepCard[];
}) {
  return (
    <section id="experiencia" className="border-t border-[#E9DED6] py-14">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end">
          <ExactSectionLabel
            eyebrow="COMO FUNCIONA"
            title="Seu cuidado em cada etapa."
            body="Um protocolo claro, seguro e personalizado para voce ter os melhores resultados."
          />

          <div className="relative">
            <div className="absolute left-6 right-6 top-10 hidden h-px bg-[#DCCFC4] lg:block" />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {steps.map((step) => (
                <article key={step.key} className="relative">
                  <div
                    className={[
                      "relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border bg-white shadow-[0_14px_36px_-24px_rgba(71,53,44,0.22)]",
                      step.active
                        ? "border-[#EF9F27] text-[#EF9F27]"
                        : "border-[#E8DDD4] text-[#8E7B74]",
                    ].join(" ")}
                  >
                    <StepIcon kind={step.icon} />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-[1rem] font-medium text-[#2E2732]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.9rem] leading-[1.65] text-[#6E6570]">
                      {step.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const exactServiceSectionPayload = {
  cards: exactServiceCards,
  cases: exactCaseCards,
  steps: exactSteps,
} as const;

