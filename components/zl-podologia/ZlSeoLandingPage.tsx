import Image from "next/image";
import Link from "next/link";
import { ZlAnalytics } from "@/components/zl-podologia/ZlAnalytics";
import {
  ZlPinIcon,
  ZlPrimaryLink,
  ZlSecondaryLink,
  ZlWhatsappIcon,
} from "@/components/zl-podologia/ZlCtaLink";
import type { ZlSeoLandingPageDefinition } from "@/components/zl-podologia/zlSeoLandingTypes";
import {
  buildWhatsappLink,
  zlLinks,
} from "@/components/zl-podologia/zlPodologiaContent";

export function ZlSeoLandingPage({
  page,
}: {
  page: ZlSeoLandingPageDefinition;
}) {
  const whatsappHref = buildWhatsappLink(page.ctaMessage, page.ctaSource);

  return (
    <>
      <ZlAnalytics />
      <main className="min-h-screen bg-[#F8F7F4] text-[#26302B]">
        <HeroSection page={page} whatsappHref={whatsappHref} />
        <section className="border-y border-[#E4E0D8] bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-2 md:px-8">
            <Checklist checklist={page.primaryChecklist} />
            <Checklist checklist={page.secondaryChecklist} />
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <SectionHeader
            eyebrow="Como funciona"
            title="Atendimento com leitura do caso e orientação clara"
            body="A conduta é definida depois da avaliação. Quando há sinal de risco ou necessidade médica, a orientação vem antes de qualquer procedimento."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {page.steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[22px] border border-[#E4E0D8] bg-white p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F6B46] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h2 className="mt-5 text-lg font-semibold text-[#14211A]">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#5B655F]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </section>
        <ProofSection page={page} />
        <FaqSection page={page} whatsappHref={whatsappHref} />
      </main>
    </>
  );
}

function HeroSection({
  page,
  whatsappHref,
}: {
  page: ZlSeoLandingPageDefinition;
  whatsappHref: string;
}) {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-16 pt-8 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pb-20 md:pt-12">
      <div className="flex flex-col justify-center">
        <Link
          href="/"
          className="mb-8 w-fit rounded-full border border-[#D9DAD7] bg-white/70 px-4 py-2 text-xs font-medium text-[#0F6B46] transition hover:border-[#0F6B46]"
        >
          ZL Podologia
        </Link>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#0F6B46]">
          {page.eyebrow}
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.02em] text-[#14211A] md:text-6xl">
          {page.h1}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-[#4B5650] md:text-lg">
          {page.intro}
        </p>
        <div className="mt-8 grid gap-3 text-sm text-[#26302B] sm:grid-cols-2">
          {page.prices.map((price) => (
            <PriceCard
              key={price.label}
              label={price.label}
              value={price.value}
            />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ZlPrimaryLink
            href={whatsappHref}
            label={page.ctaLabel}
            icon={<ZlWhatsappIcon />}
          />
          <ZlSecondaryLink
            href={zlLinks.maps}
            label="Ver rota"
            icon={<ZlPinIcon />}
          />
        </div>
        <p className="mt-5 max-w-xl text-sm leading-6 text-[#6B746F]">
          {page.locationNote}
        </p>
      </div>
      <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-[#E4E0D8] bg-white shadow-[0_24px_70px_rgba(38,48,43,0.12)]">
        <Image
          src={page.heroImage}
          alt={page.heroAlt}
          fill
          priority
          sizes="(min-width: 768px) 46vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

function ProofSection({ page }: { page: ZlSeoLandingPageDefinition }) {
  return (
    <section className="bg-[#EEF2EC]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[0.92fr_1.08fr] md:px-8">
        <div className="relative min-h-[360px] overflow-hidden rounded-[24px] border border-[#D9DAD7] bg-white">
          <Image
            src={page.proof.image}
            alt={page.proof.imageAlt}
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <SectionHeader
            eyebrow={page.proof.eyebrow}
            title={page.proof.title}
            body={page.proof.body}
          />
        </div>
      </div>
    </section>
  );
}

function FaqSection({
  page,
  whatsappHref,
}: {
  page: ZlSeoLandingPageDefinition;
  whatsappHref: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <SectionHeader
        eyebrow="Dúvidas rápidas"
        title="FAQ"
        body="Respostas objetivas para decidir se vale chamar a ZL agora ou procurar orientação médica primeiro."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {page.faqs.map((item) => (
          <article
            key={item.question}
            className="rounded-[22px] border border-[#E4E0D8] bg-white p-6"
          >
            <h2 className="text-base font-semibold text-[#14211A]">
              {item.question}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#5B655F]">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-10 rounded-[26px] border border-[#D9DAD7] bg-[#14211A] p-6 text-white md:flex md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Quer orientação da ZL?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">
            Envie sua queixa pelo WhatsApp. A clínica orienta o melhor próximo
            passo antes de confirmar o horário.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <ZlPrimaryLink
            href={whatsappHref}
            label="Chamar a ZL"
            icon={<ZlWhatsappIcon />}
            tone="blush"
          />
        </div>
      </div>
    </section>
  );
}

function PriceCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-[#E4E0D8] bg-white p-4">
      <p className="text-lg font-semibold text-[#14211A]">
        {label}: {value}
      </p>
    </div>
  );
}

function Checklist({
  checklist,
}: {
  checklist: ZlSeoLandingPageDefinition["primaryChecklist"];
}) {
  const markerClass =
    checklist.tone === "alert"
      ? "bg-[#8E2F2E]"
      : checklist.tone === "clinical"
        ? "bg-[#378ADD]"
        : "bg-[#0F6B46]";

  return (
    <article className="rounded-[24px] border border-[#E4E0D8] bg-[#F8F7F4] p-6">
      <h2 className="text-2xl font-semibold text-[#14211A]">
        {checklist.title}
      </h2>
      <ul className="mt-6 space-y-4">
        {checklist.items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-7 text-[#4B5650]"
          >
            <span className={`mt-2 h-2.5 w-2.5 rounded-full ${markerClass}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {checklist.note ? (
        <p className="mt-5 text-sm leading-6 text-[#6B746F]">
          {checklist.note}
        </p>
      ) : null}
    </article>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F6B46]">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.01em] text-[#14211A] md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-[#5B655F]">
        {body}
      </p>
    </div>
  );
}
