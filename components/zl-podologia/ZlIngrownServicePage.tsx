import Image from "next/image";
import Link from "next/link";
import { ZlAnalytics } from "@/components/zl-podologia/ZlAnalytics";
import {
  ZlPinIcon,
  ZlPrimaryLink,
  ZlSecondaryLink,
  ZlWhatsappIcon,
} from "@/components/zl-podologia/ZlCtaLink";
import {
  ZL_INGROWN_CASE_IMAGE,
  ZL_INGROWN_HERO_IMAGE,
  ZL_INGROWN_WHATSAPP_HREF,
  zlIngrownAttentionSignals,
  zlIngrownFaqs,
  zlIngrownMedicalSignals,
  zlIngrownPrices,
  zlIngrownSteps,
} from "@/components/zl-podologia/zlIngrownServiceContent";
import {
  zlLinks,
  zlLocation,
} from "@/components/zl-podologia/zlPodologiaContent";

export function ZlIngrownServicePage() {
  return (
    <>
      <ZlAnalytics />
      <main className="min-h-screen bg-[#F8F7F4] text-[#26302B]">
        <HeroSection />
        <section className="border-y border-[#E4E0D8] bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-2 md:px-8">
            <Checklist
              title="Quando procurar podologia"
              items={zlIngrownAttentionSignals}
            />
            <Checklist
              title="Quando procurar médico"
              items={zlIngrownMedicalSignals}
              tone="alert"
              note="Esses sinais pedem avaliação médica. A ZL pode orientar a triagem, mas não substitui avaliação médica."
            />
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <SectionHeader
            eyebrow="Como funciona"
            title="Atendimento com triagem, alívio e continuidade"
            body="O objetivo é resolver a queixa possível dentro da podologia e não empurrar promessa de cura. Quando o caso pede médico, isso precisa vir antes."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {zlIngrownSteps.map((step, index) => (
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
        <CaseSection />
        <FaqSection />
      </main>
    </>
  );
}

function HeroSection() {
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
          Podologia clínica na Parquelândia
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.02em] text-[#14211A] md:text-6xl">
          Unha encravada em Fortaleza
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-[#4B5650] md:text-lg">
          Atendimento para dor, inflamação e unha que volta a encravar, com
          triagem prévia, instrumental rastreado e orientação clara sobre quando
          a podologia é indicada.
        </p>
        <div className="mt-8 grid gap-3 text-sm text-[#26302B] sm:grid-cols-2">
          {zlIngrownPrices.map((price) => (
            <PriceCard
              key={price.label}
              label={price.label}
              value={price.value}
            />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ZlPrimaryLink
            href={ZL_INGROWN_WHATSAPP_HREF}
            label="Avaliar pelo WhatsApp"
            icon={<ZlWhatsappIcon />}
          />
          <ZlSecondaryLink
            href={zlLinks.maps}
            label="Ver rota"
            icon={<ZlPinIcon />}
          />
        </div>
        <p className="mt-5 max-w-xl text-sm leading-6 text-[#6B746F]">
          ZL Podologia fica na Parquelândia, na Av. Bezerra de Menezes, 2203,
          Sala 5, Galeria José Bernardo. O atendimento não substitui avaliação
          médica quando há sinais de alerta.
        </p>
      </div>
      <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-[#E4E0D8] bg-white shadow-[0_24px_70px_rgba(38,48,43,0.12)]">
        <Image
          src={ZL_INGROWN_HERO_IMAGE}
          alt="Podóloga da ZL Podologia em atendimento para unha encravada"
          fill
          priority
          sizes="(min-width: 768px) 46vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

function CaseSection() {
  return (
    <section className="bg-[#EEF2EC]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[0.92fr_1.08fr] md:px-8">
        <div className="relative min-h-[360px] overflow-hidden rounded-[24px] border border-[#D9DAD7] bg-white">
          <Image
            src={ZL_INGROWN_CASE_IMAGE}
            alt="Resultado com bandagem após atendimento de unha encravada"
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <SectionHeader
            eyebrow="Caso real autorizado"
            title="Da dor no canto da unha à orientação de retorno"
            body="A página usa o caso já documentado pela ZL: chegada com dor, avaliação do canto, remoção da espícula quando indicada, curativo e instrução de cuidado em casa."
          />
          <div className="mt-8 rounded-[22px] border border-[#D9DAD7] bg-white/82 p-6 text-sm leading-7 text-[#4B5650]">
            Para quem já teve unha encravada mais de uma vez, a conversa não
            termina no procedimento. A continuidade pode incluir ajuste de
            corte, orientação de calçado, retorno e avaliação de órtese ungueal
            quando o formato da unha favorece nova pressão na pele.
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <SectionHeader
        eyebrow="Dúvidas rápidas"
        title="FAQ de unha encravada"
        body="Respostas curtas para decidir se vale chamar a clínica agora ou procurar atendimento médico primeiro."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {zlIngrownFaqs.map((item) => (
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
          <h2 className="text-xl font-semibold">
            Quer avaliar se seu caso é podologia?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">
            Envie uma foto e descreva a dor pelo WhatsApp. Se houver sinal de
            alerta, a orientação será procurar avaliação médica.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <ZlPrimaryLink
            href={ZL_INGROWN_WHATSAPP_HREF}
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
  title,
  items,
  note,
  tone = "default",
}: {
  title: string;
  items: readonly string[];
  note?: string;
  tone?: "default" | "alert";
}) {
  const markerClass = tone === "alert" ? "bg-[#8E2F2E]" : "bg-[#0F6B46]";

  return (
    <article className="rounded-[24px] border border-[#E4E0D8] bg-[#F8F7F4] p-6">
      <h2 className="text-2xl font-semibold text-[#14211A]">{title}</h2>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-7 text-[#4B5650]"
          >
            <span className={`mt-2 h-2.5 w-2.5 rounded-full ${markerClass}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {note ? (
        <p className="mt-5 text-sm leading-6 text-[#6B746F]">{note}</p>
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
