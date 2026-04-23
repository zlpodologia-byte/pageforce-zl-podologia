"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/reveal/Reveal";
import {
  ZlPrimaryLink,
  ZlWhatsappIcon,
} from "@/components/zl-podologia/ZlCtaLink";
import { ZlServiceArtwork } from "@/components/zl-podologia/ZlClinicIllustrations";
import { trackZlEvent } from "@/components/zl-podologia/ZlAnalytics";
import {
  buildWhatsappLink,
  ZL_MAIN_SERVICE_IDS,
  ZL_PRIORITY_SERVICE_IDS,
  zlInteractiveServices,
  type ZlInteractiveService,
  type ZlServiceId,
} from "@/components/zl-podologia/zlPodologiaContent";

const defaultServiceId: ZlServiceId = ZL_MAIN_SERVICE_IDS[0];

export interface ZlServiceExplorerProps {
  /**
   * Controlled selected service id. When provided, the parent
   * controls which service is shown (used by Symptom-to-Solution grid).
   */
  activeId?: ZlServiceId;
  /**
   * Called when the user clicks a service tab. Parent can sync state.
   */
  onChange?: (id: ZlServiceId) => void;
}

/**
 * Tabs internas do card â€” Bloco C v7-earthy (Opcao C do brief).
 *
 * 3 abas por servico:
 *  - atendimento: tagline + pain + descricao (promise)
 *  - protocolo: includes + steps
 *  - agendar: preco + CTA WhatsApp + subVariantes
 *
 * Aba default = "atendimento". Tabs sao acessiveis (role=tablist + aria-
 * selected + aria-controls + keyboard via arrow keys + focus natural dos
 * botoes). Em mobile as tabs ficam no topo do painel direito (wrap natural).
 */
type ServiceTabId = "atendimento" | "protocolo" | "agendar";

const SERVICE_TABS: readonly {
  id: ServiceTabId;
  label: string;
  eyebrow: string;
}[] = [
  { id: "atendimento", label: "Atendimento", eyebrow: "O que voce vai sentir" },
  { id: "protocolo", label: "Protocolo", eyebrow: "Como funciona por dentro" },
  { id: "agendar", label: "Preco e agendar", eyebrow: "Proximo passo" },
] as const;

/**
 * Service Explorer v7-earthy â€” 6 cards principais + abas internas.
 *
 * Layout: split 2-col onde coluna esquerda tem a foto editorial (50%
 * wide), coluna direita tem as tabs e o conteudo denso. Em mobile empilha
 * foto em cima, tabs embaixo.
 */
export function ZlServiceExplorer({
  activeId,
  onChange,
}: ZlServiceExplorerProps = {}) {
  const [internalId, setInternalId] = useState<ZlServiceId>(defaultServiceId);
  const selectedId = activeId ?? internalId;

  const mainServices = useMemo(
    () =>
      ZL_MAIN_SERVICE_IDS.map((id) =>
        zlInteractiveServices.find((s) => s.id === id)
      ).filter((s): s is ZlInteractiveService => Boolean(s)),
    []
  );

  const activeService =
    zlInteractiveServices.find((s) => s.id === selectedId) ?? mainServices[0];

  const handleSelect = (id: ZlServiceId) => {
    if (activeId === undefined) {
      setInternalId(id);
    }
    onChange?.(id);
  };

  return (
    <section id="servicos" className="relative border-t border-[#D2C3A6]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FAF7F2_0%,#E6DBC6_100%)]" />
      <div className="container-x relative mx-auto max-w-[1440px] py-14 lg:py-16">
        <div className="grid gap-8">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <Reveal
                as="p"
                className="text-[0.66rem] uppercase tracking-[0.26em] text-[#7A6244]"
              >
                Escolha pelo caso
              </Reveal>
              <Reveal
                as="h2"
                delay={70}
                className="mt-4 text-[clamp(2rem,3.6vw,3.3rem)] leading-[0.98] tracking-[-0.04em] text-[#3A2E23]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                Abra o servico certo e ja veja valor de entrada e WhatsApp.
              </Reveal>
              <Reveal
                as="p"
                delay={130}
                className="mt-5 max-w-[28ch] text-[0.98rem] leading-[1.7] text-[#5C4A38]"
              >
                Casos de dor e recorrencia ficam na frente. Rotina e bem-estar
                continuam aqui, mas sem competir com quem ja chegou decidido.
              </Reveal>
            </div>

            <Reveal
              as="p"
              delay={120}
              className="max-w-[42ch] text-[0.88rem] leading-[1.7] text-[#5C4A38] lg:justify-self-end"
            >
              O menu prioriza os casos de maior decisao comercial. O card
              abaixo mostra entrada, CTA e protocolo sem abrir tres superficies
              concorrentes ao mesmo tempo.
            </Reveal>
          </div>

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
            {mainServices.map((service) => {
              const active = service.id === selectedId;
              const isPriority = ZL_PRIORITY_SERVICE_IDS.includes(service.id);
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleSelect(service.id)}
                  aria-pressed={active}
                  className={`group flex shrink-0 items-center gap-3 rounded-[1.1rem] border px-4 py-3 text-left transition-all duration-300 lg:min-w-[16rem] lg:flex-1 lg:justify-between ${
                    active
                      ? "border-[#B89B77] bg-white shadow-[0_14px_36px_rgba(138,108,72,0.22)]"
                      : "border-[#D2C3A6] bg-white/70 hover:border-[#B89B77] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                        active
                          ? "bg-[linear-gradient(135deg,#9A7F5C_0%,#574433_100%)] text-white"
                          : "bg-[#E6DBC6] text-[#574433]"
                      }`}
                    >
                      <ServiceGlyph kind={service.id} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-[0.82rem] font-medium tracking-[0.01em] ${
                            active ? "text-[#3A2E23]" : "text-[#5C4A38]"
                          }`}
                        >
                          {service.menuLabel}
                        </p>
                        {isPriority ? (
                          <span className="rounded-full bg-[#FBF4EF] px-2 py-0.5 text-[0.56rem] uppercase tracking-[0.16em] text-[#B8837A]">
                            Prioridade
                          </span>
                        ) : null}
                      </div>
                      <p className="hidden text-[0.7rem] text-[#8B7862] lg:block">
                        {service.price}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`hidden text-[0.9rem] transition-transform duration-300 lg:inline-block ${
                      active
                        ? "translate-x-0 text-[#574433]"
                        : "-translate-x-1 text-[#B89B77]"
                    }`}
                    aria-hidden="true"
                  >
                    -&gt;
                  </span>
                </button>
              );
            })}
          </div>

          <ServiceCard key={activeService.id} service={activeService} />
        </div>
      </div>
    </section>
  );
}

/**
 * Card do servico com split 2-col:
 *   - Esquerda: foto editorial ocupando altura inteira (aspect 4/5 no
 *     desktop, 3/2 no mobile)
 *   - Direita: tabs + conteudo denso (reduz whitespace)
 *
 * v7-earthy: o componente gerencia seu proprio estado de tab e reseta
 * para "atendimento" quando o servico muda (via `key={activeService.id}`
 * no parent â€” remount garante reset sem effect). Keyboard nav: setas
 * esquerda/direita percorrem as tabs.
 */
function ServiceCard({ service }: { service: ZlInteractiveService }) {
  const [tab, setTab] = useState<ServiceTabId>("atendimento");

  const handleCtaClick = () => {
    trackZlEvent("wa_click", {
      source: service.whatsappSource,
      service: service.id,
    });
  };

  // Keyboard arrow navigation across the tablist.
  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const delta = e.key === "ArrowRight" ? 1 : -1;
      const next = (currentIndex + delta + SERVICE_TABS.length) % SERVICE_TABS.length;
      setTab(SERVICE_TABS[next].id);
      const el = document.getElementById(`tab-${service.id}-${SERVICE_TABS[next].id}`);
      if (el) (el as HTMLButtonElement).focus();
    }
  };

  return (
    <Reveal
      as="div"
      delay={120}
      className={`overflow-hidden rounded-[2rem] border bg-white shadow-[0_28px_70px_rgba(138,108,72,0.14)] ${
        service.premiumStripe
          ? "border-[rgba(160,131,121,0.45)] ring-1 ring-[rgba(160,131,121,0.25)]"
          : "border-[#D2C3A6]"
      }`}
    >
      {/* Pre-Wedding eyebrow editorial stripe premium (dourado mantido). */}
      {service.premiumStripe ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(160,131,121,0.25)] bg-white px-5 py-3 md:px-7">
          <p
            className="text-[0.62rem] uppercase tracking-[0.32em]"
            style={{ color: "#A08379" }}
          >
            Experiencia premium
          </p>
          <p
            className="text-[0.78rem] italic tracking-[0.02em]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              color: "#7A6244",
            }}
          >
            60 minutos so seus
          </p>
        </div>
      ) : null}

      {/* Header do card: titulo, dor principal e CTA em uma unica faixa */}
      <div className="px-5 pt-5 md:px-6 md:pt-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] ${
                  service.premiumStripe
                    ? "bg-white text-[#A08379] ring-1 ring-[rgba(160,131,121,0.45)]"
                    : "bg-[#E6DBC6] text-[#574433]"
                }`}
              >
                {service.menuLabel}
              </span>
              <span className="rounded-full border border-[#D2C3A6] bg-white px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#5C4A38]">
                {service.price}
              </span>
            </div>

            <h3
              className={`mt-4 text-[clamp(1.6rem,2.5vw,2.4rem)] leading-[1.02] tracking-[-0.03em] text-[#3A2E23] ${
                service.premiumStripe ? "italic" : ""
              }`}
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              {service.title}
            </h3>

            <p className="mt-3 max-w-[44ch] text-[0.94rem] leading-[1.7] text-[#5C4A38]">
              {service.pain}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#8B7862]">
              Entrada oficial
            </p>
            <p
              className="text-[1.18rem] leading-none tracking-[-0.02em] text-[#3A2E23]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              {service.price}
            </p>
            <div onClick={handleCtaClick} className="pt-1">
              <ZlPrimaryLink
                href={buildWhatsappLink(
                  service.ctaWhatsappMessage,
                  service.whatsappSource
                )}
                label={service.ctaLabel}
                icon={<ZlWhatsappIcon />}
                tone={service.premiumStripe ? "blush" : "whatsapp"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Split 2-col: foto + tabs */}
      <div className="mt-4 grid gap-5 px-5 pb-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-stretch md:gap-5 md:px-6 md:pb-6">
        {/* Foto editorial / arte 2D */}
        <ServiceVisual service={service} />

        {/* Tabs */}
        <div>
          <div
            role="tablist"
            aria-label={`Detalhes de ${service.menuLabel}`}
            className="flex flex-wrap items-center gap-1.5 rounded-[1rem] border border-[#D2C3A6] bg-[#FAF7F2] p-1"
          >
            {SERVICE_TABS.map((t, idx) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`tab-${service.id}-${t.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${service.id}-${t.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={`flex-1 rounded-[0.72rem] px-3 py-2 text-[0.78rem] font-medium tracking-[0.02em] transition-all duration-200 ${
                    active
                      ? "bg-white text-[#3A2E23] shadow-[0_8px_20px_rgba(138,108,72,0.22)] ring-1 ring-[#B89B77]/50"
                      : "text-[#8B7862] hover:text-[#574433]"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Eyebrow da aba selecionada */}
          <p className="mt-4 text-[0.66rem] uppercase tracking-[0.24em] text-[#7A6244]">
            {SERVICE_TABS.find((t) => t.id === tab)?.eyebrow}
          </p>

          {/* Painel das tabs â€” todas renderizadas com hidden pra preservar
              CLS/transicao; aria-controls aponta pra cada uma. */}
          <div
            role="tabpanel"
            id={`panel-${service.id}-atendimento`}
            aria-labelledby={`tab-${service.id}-atendimento`}
            hidden={tab !== "atendimento"}
            className="mt-3"
          >
            {service.tagline ? (
              <p
                className="text-[0.98rem] italic leading-[1.55] text-[#7A6244]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                {service.tagline}
              </p>
            ) : null}

            <p className="mt-4 text-[0.94rem] leading-[1.7] text-[#5C4A38]">
              {service.promise}
            </p>

            <div className="mt-5 grid gap-2.5 border-t border-[#D2C3A6] pt-4">
              {service.highlights.map((highlight, idx) => (
                <div key={highlight} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E6DBC6] text-[0.6rem] font-medium text-[#574433]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.9rem] leading-[1.55] text-[#5C4A38]">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            role="tabpanel"
            id={`panel-${service.id}-protocolo`}
            aria-labelledby={`tab-${service.id}-protocolo`}
            hidden={tab !== "protocolo"}
            className="mt-3"
          >
            {service.includes && service.includes.length > 0 ? (
              <div className="rounded-[1.1rem] border border-[#D2C3A6] bg-[#FAF7F2] p-4">
                <p className="text-[0.66rem] uppercase tracking-[0.22em] text-[#3a8c70]">
                  O que entra nesse cuidado
                </p>
                <ul className="mt-3 grid gap-2.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.9rem] leading-[1.55] text-[#5C4A38]">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e8f4ec] text-[0.6rem] font-medium text-[#3a8c70]">
                        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2.5 6.3l2.3 2.2L9.5 3.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className={service.includes && service.includes.length > 0 ? "mt-5" : ""}>
              <p className="text-[0.66rem] uppercase tracking-[0.22em] text-[#7A6244]">
                Como funciona o atendimento
              </p>
              <ol className="mt-3 grid gap-3">
                {service.steps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6DBC6] text-[0.72rem] font-medium text-[#574433]">
                      {index + 1}
                    </span>
                    <p className="text-[0.92rem] leading-[1.58] text-[#5C4A38]">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-4 text-[0.78rem] leading-[1.55] text-[#8B7862]">
              Apoio visual ideal: {service.visualSupport}
            </p>
          </div>

          <div
            role="tabpanel"
            id={`panel-${service.id}-agendar`}
            aria-labelledby={`tab-${service.id}-agendar`}
            hidden={tab !== "agendar"}
            className="mt-3"
          >
            <div className="rounded-[1.1rem] border border-[#B89B77] bg-[linear-gradient(180deg,#E6DBC6_0%,#D2C3A6_100%)] p-4">
              <p className="text-[0.66rem] uppercase tracking-[0.22em] text-[#574433]">
                Preco oficial
              </p>
              <p className="mt-2 text-[1.3rem] font-medium leading-[1.2] text-[#3A2E23]" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
                {service.price}
              </p>
              <div className="mt-4" onClick={handleCtaClick}>
                <ZlPrimaryLink
                  href={buildWhatsappLink(
                    service.ctaWhatsappMessage,
                    service.whatsappSource
                  )}
                  label={service.ctaLabel}
                  icon={<ZlWhatsappIcon />}
                />
              </div>
            </div>

            {service.subVariants && service.subVariants.length > 0 ? (
              <div className="mt-5 rounded-[1.1rem] border border-[#D2C3A6] bg-white p-4">
                <p className="text-[0.66rem] uppercase tracking-[0.22em] text-[#7A6244]">
                  Tambem oferecemos
                </p>
                <ul className="mt-3 grid gap-3">
                  {service.subVariants.map((variant) => (
                    <li key={variant.title} className="text-[0.9rem] leading-[1.55] text-[#5C4A38]">
                      <p className="flex flex-wrap items-baseline gap-2 text-[0.86rem] font-medium text-[#3A2E23]">
                        <span>{variant.title}</span>
                        <span className="text-[0.74rem] font-normal text-[#574433]">
                          {variant.price}
                        </span>
                      </p>
                      <p className="mt-1 text-[0.84rem] text-[#5C4A38]">
                        {variant.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <p className="mt-4 text-[0.78rem] leading-[1.55] text-[#8B7862]">
              Valor final depende sempre da avaliação clínica - sem surpresa no final.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Renderiza a foto real do servico quando disponivel; cai na arte 2D
 * (ilustracao) senao.
 */
function ServiceVisual({ service }: { service: ZlInteractiveService }) {
  if (service.photo) {
    return (
      <div
        className={`group relative min-h-[21rem] overflow-hidden rounded-[1.55rem] bg-[#2F241D] shadow-[0_24px_60px_rgba(138,108,72,0.16)] md:min-h-[32rem] ${
          service.premiumStripe
            ? "ring-1 ring-[rgba(160,131,121,0.32)]"
            : "ring-1 ring-[#D2C3A6]/55"
        }`}
      >
        <Image
          src={service.photo.src}
          alt={service.photo.alt}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 80vw, 100vw"
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(28,20,15,0.08)_0%,rgba(28,20,15,0.2)_30%,rgba(28,20,15,0.5)_62%,rgba(22,16,12,0.92)_100%)]" />

        <div className="absolute left-4 top-4 right-4 flex flex-wrap items-center justify-between gap-2">
          <p className="rounded-full bg-white/88 px-3 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-[#5C4A38] shadow-[0_10px_24px_rgba(22,16,12,0.14)]">
            {service.visualLabel}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <div className="max-w-[20rem] rounded-[1.15rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.09)_100%)] p-4 backdrop-blur-[2px]">
            <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#F0C3BA]">
              Apoio visual
            </p>
            <p className="mt-2 text-[0.82rem] leading-[1.48] text-white/80">
              {service.visualSupport}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ZlServiceArtwork
      kind={service.id}
      title={service.title}
      label={service.visualLabel}
    />
  );
}

function ServiceGlyph({ kind }: { kind: ZlServiceId }) {
  switch (kind) {
    case "ingrown":
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="M10 2c3 3 3 7 0 10" strokeLinecap="round" />
          <path d="M10 2c-3 3-3 7 0 10" strokeLinecap="round" />
          <circle cx="10" cy="14" r="3" fill="currentColor" opacity="0.4" />
        </svg>
      );
    case "fungus":
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="M4 12h12" strokeLinecap="round" />
          <circle cx="7" cy="8" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="13" cy="10" r="1.5" fill="currentColor" opacity="0.3" />
        </svg>
      );
    case "podoprofilaxia":
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="M5 15c0-4 2-8 5-10 3 2 5 6 5 10" strokeLinecap="round" />
          <circle cx="10" cy="13" r="1.5" fill="currentColor" />
        </svg>
      );
    case "orthosis":
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <rect x="7" y="4" width="6" height="12" rx="3" />
          <path d="M7 8h6" strokeLinecap="round" />
        </svg>
      );
    case "laser":
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="M3 10h14" strokeLinecap="round" />
          <circle cx="16" cy="10" r="2" fill="currentColor" />
          <path d="M7 5l3 5-3 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "diabetic":
      return (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 17s-6-4-6-9a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 5-6 9-6 9Z" />
        </svg>
      );
    case "reflexology":
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
          <circle cx="10" cy="10" r="7" />
          <circle cx="10" cy="10" r="3.2" />
          <circle cx="10" cy="10" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
