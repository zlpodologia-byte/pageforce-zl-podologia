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
  ZL_FUNGUS_AFTER_IMAGE,
  ZL_FUNGUS_BEFORE_IMAGE,
  ZL_FUNGUS_HERO_IMAGE,
  ZL_FUNGUS_WHATSAPP_HREF,
  zlFungusExpectations,
  zlFungusFaqs,
  zlFungusPrices,
  zlFungusSignals,
  zlFungusSteps,
} from "@/components/zl-podologia/zlFungusServiceContent";
import { zlLinks } from "@/components/zl-podologia/zlPodologiaContent";

export function ZlFungusServicePage() {
  return (
    <>
      <ZlAnalytics />
      <main className="min-h-screen bg-[#F8F7F4] text-[#26302B]">
        <HeroSection />
        <section className="border-y border-[#E4E0D8] bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-2 md:px-8">
            <Checklist title="Sinais comuns" items={zlFungusSignals} />
            <Checklist
              title="O que esperar"
              items={zlFungusExpectations}
              tone="clinical"
              note="O objetivo é confirmar a suspeita, montar continuidade e alinhar tempo realista de resposta."
            />
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <SectionHeader
            eyebrow="Protocolo"
            title="Fungo na unha pede constância, não promessa rápida"
            body="A ZL trata onicomicose como um processo: avaliação, conduta técnica, orientação de cuidado em casa e retorno quando indicado."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {zlFungusSteps.map((step, index) => (
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
          Onicomicose com acompanhamento
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.02em] text-[#14211A] md:text-6xl">
          Fungo na unha em Fortaleza
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-[#4B5650] md:text-lg">
          Avaliação para unha amarelada, grossa, frágil ou com odor persistente.
          O atendimento monta um protocolo com cuidado em casa, retorno e laser
          quando indicado, sem promessa de cura rápida.
        </p>
        <div className="mt-8 grid gap-3 text-sm text-[#26302B] sm:grid-cols-2">
          {zlFungusPrices.map((price) => (
            <PriceCard
              key={price.label}
              label={price.label}
              value={price.value}
            />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ZlPrimaryLink
            href={ZL_FUNGUS_WHATSAPP_HREF}
            label="Avaliar meu caso"
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
          Sala 5, Galeria José Bernardo. Onicomicose não é tratamento de sessão
          única; a evolução depende do caso e da continuidade.
        </p>
      </div>
      <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-[#E4E0D8] bg-white shadow-[0_24px_70px_rgba(38,48,43,0.12)]">
        <Image
          src={ZL_FUNGUS_HERO_IMAGE}
          alt="Atendimento podológico para fungo na unha na ZL Podologia Fortaleza"
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
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1fr_1fr] md:px-8">
        <div className="grid grid-cols-2 gap-3">
          <CaseImage
            src={ZL_FUNGUS_BEFORE_IMAGE}
            alt="Registro autorizado de unha com suspeita de fungo antes do protocolo"
          />
          <CaseImage
            src={ZL_FUNGUS_AFTER_IMAGE}
            alt="Registro autorizado de acompanhamento de protocolo para fungo na unha"
          />
        </div>
        <div className="flex flex-col justify-center">
          <SectionHeader
            eyebrow="Registro autorizado"
            title="Acompanhamento visual ajuda a medir evolução"
            body="Fungo na unha costuma mudar devagar. Fotos autorizadas e retorno ajudam a comparar espessura, cor, aderência e resposta ao protocolo."
          />
          <div className="mt-8 rounded-[22px] border border-[#D9DAD7] bg-white/82 p-6 text-sm leading-7 text-[#4B5650]">
            O laser pode entrar como apoio quando a avaliação aponta benefício,
            mas o centro do plano é continuidade: sessão, orientação, cuidado em
            casa e ajuste do protocolo conforme a unha responde.
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
        title="FAQ sobre onicomicose"
        body="Respostas objetivas para quem suspeita de fungo na unha e quer entender preço, tempo e papel do laser."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {zlFungusFaqs.map((item) => (
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
            Quer saber se sua unha parece fungo?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">
            Envie uma foto e conte há quanto tempo a unha mudou. A ZL orienta o
            melhor próximo passo pelo WhatsApp.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <ZlPrimaryLink
            href={ZL_FUNGUS_WHATSAPP_HREF}
            label="Chamar a ZL"
            icon={<ZlWhatsappIcon />}
            tone="blush"
          />
        </div>
      </div>
    </section>
  );
}

function CaseImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[24px] border border-[#D9DAD7] bg-white">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 24vw, 48vw"
        className="object-cover"
      />
    </div>
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
  tone?: "default" | "clinical";
}) {
  const markerClass = tone === "clinical" ? "bg-[#378ADD]" : "bg-[#0F6B46]";

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
