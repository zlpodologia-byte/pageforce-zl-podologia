"use client";

import Image from "next/image";

export function ExactHeroSection({
  eyebrow,
  title,
  body,
  badge,
  ctaLabel,
}: {
  eyebrow: string;
  title: string;
  body: string;
  badge: string;
  ctaLabel: string;
}) {
  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FCFAF7_0%,#F4ECE5_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(239,159,39,0.14),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(55,138,221,0.12),transparent_28%),radial-gradient(circle_at_50%_110%,rgba(226,75,74,0.08),transparent_40%)]" />
      <div className="container-x relative mx-auto max-w-[1440px] pb-14 pt-8 lg:pb-20 lg:pt-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(20rem,1.08fr)] lg:items-center">
          <div className="relative">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#B67F66]">
              {eyebrow}
            </p>
            <h1
              className="mt-5 max-w-[12ch] text-[clamp(2.8rem,6vw,5.7rem)] leading-[0.92] tracking-[-0.06em] text-[#2E2732]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h1>
            <p className="mt-6 max-w-[35ch] text-[1rem] leading-[1.8] text-[#6E6570]">
              {body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contato"
                className="inline-flex items-center rounded-full bg-[#EF9F27] px-6 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_22px_48px_-24px_rgba(239,159,39,0.85)] transition-transform hover:-translate-y-0.5"
              >
                {ctaLabel}
              </a>
              <a
                href="#clinica"
                className="inline-flex items-center gap-2 text-[0.82rem] font-medium text-[#8E7B74] underline-offset-4 hover:underline"
              >
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#B67F66]" />
                {badge}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2.4rem] border border-[#E7DCD4] bg-white p-1.5 shadow-[0_30px_80px_-34px_rgba(71,53,44,0.28)]">
              <div className="relative aspect-[0.98] overflow-hidden rounded-[calc(2.4rem-0.375rem)]">
                <Image
                  src="/zl-podologia/social/edited-pro/procedimentos/frontal-instrumento-fino-pro.jpg"
                  alt="Podologa da ZL atendendo um caso clinico com instrumento fino e luva em ambiente cuidadoso"
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  style={{ objectPosition: "58% 32%" }}
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_46%,rgba(246,239,232,0.62)_100%)]" />
                <div className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-[#8E7B74] backdrop-blur">
                  Clinica real
                </div>
              </div>
            </div>
            <div className="absolute -left-6 bottom-6 hidden rounded-[1.3rem] border border-[#E8DDD4] bg-white/92 p-3 shadow-[0_20px_46px_-24px_rgba(71,53,44,0.22)] backdrop-blur md:block">
              <p className="text-[0.63rem] uppercase tracking-[0.24em] text-[#B67F66]">
                Atendimento
              </p>
              <p className="mt-1 text-[0.88rem] text-[#2E2732]">
                Protocolos claros e individualizados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

