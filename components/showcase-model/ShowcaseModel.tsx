import Link from "next/link";
import type { CSSProperties } from "react";
import { JellyBorder } from "@/components/jelly-border/JellyBorder";
import type { Showcase, ShowcaseKPI } from "@/lib/showcases";

/**
 * ShowcaseModel — shared template for /showcases/[category].
 *
 * Server component. The JellyBorder islands are client internally ("use
 * client" at the primitive), but everything around them renders on the
 * server. Subhead and "o que está incluso" copy are hardcoded per slug
 * here (not in lib/showcases.ts) to keep the data layer clean.
 */

const SUBHEADS: Record<string, string> = {
  clinica:
    "Quando a clínica recebe um lead, ele já chegou triado, com convênio e sintoma. A operação começa no WhatsApp; o site só organiza.",
  odontologia:
    "Modelo de operação montado para a clínica odontológica: o paciente pesquisa o procedimento, envia a foto do sorriso e o orçamento já está em construção antes do primeiro olá.",
  estetica:
    "Vitrine por procedimento, sinal pago online e retorno do protocolo no ciclo certo. A agenda da esteticista chega cheia, não aberta.",
  diagnostico:
    "Pedido médico anexado no próprio site, preparo no WhatsApp e laudo em portal próprio. O paciente entra no fluxo uma vez e é ele que sai informado.",
  pet:
    "Banho, consulta e loja na mesma ficha do pet. O tutor agenda em dois cliques e a operação lembra da próxima vacina no ciclo certo, sem depender da memória da recepção.",
  comercio:
    "Prateleira certa, bairro certo. O visitante encontra o produto com estoque real, reserva pelo WhatsApp e aparece pra retirar em duas horas.",
  servicos:
    "Pedido de orçamento com foto e endereço entra direto no CRM. O técnico sai com roteiro pronto e o cliente acompanha cada etapa por link próprio.",
  marcenaria:
    "Briefing por ambiente, cronograma público e pós-entrega com garantia ativa. O cliente vê a peça saindo da oficina antes dela chegar em casa.",
  agro:
    "Landing por cultura e por região. A cotação chega no representante local e o produtor sente presença regional, não central de atendimento.",
  escritorios:
    "Página por área de atuação com tese, caso e autoridade legível. Quem procura o tema encontra primeiro o escritório e já chega com briefing pronto para a reunião.",
};

const VOCATIVO: Record<string, string> = {
  clinica: "clínica",
  odontologia: "clínica odontológica",
  estetica: "clínica de estética",
  diagnostico: "clínica de diagnóstico",
  pet: "operação pet",
  comercio: "loja",
  servicos: "empresa de serviços",
  marcenaria: "marcenaria",
  agro: "operação agrícola",
  escritorios: "firma",
};

const INCLUDED: Record<string, string> = {
  clinica:
    "A clínica ganha: landing por especialidade, formulário curto de primeira consulta, bot de triagem no WhatsApp, CRM com convênio e profissional, SEO local para o bairro da unidade, dashboard semanal, integração com a agenda do consultório, lembrete automático 24h antes e pós-consulta com pedido de avaliação — tudo rodando junto desde o primeiro mês.",
  odontologia:
    "A clínica odontológica ganha: página por procedimento, orçamento com foto do sorriso, confirmação automática no WhatsApp, CRM separado por etapa do tratamento, prova social com antes-e-depois autorizado, BI por dentista e ticket, SEO técnico e biblioteca de conteúdo, integração com a agenda e lembrete de retorno anual — tudo rodando junto desde o primeiro mês.",
  estetica:
    "A clínica de estética ganha: vitrine por procedimento, agenda integrada ao Instagram e ao WhatsApp Business, parcelamento e sinal pago online, CRM por protocolo ativo, lembrete do ciclo de retorno, prova visual autorizada, dashboard de LTV por cliente, SEO local e conteúdo por tipo de pele — tudo rodando junto desde o primeiro mês.",
  diagnostico:
    "A clínica de diagnóstico ganha: página por exame com convênios filtrados, upload do pedido médico, agendamento online, preparo automático pelo WhatsApp, portal do paciente com histórico, BI de tempo até laudo, integração com o radiologista, SEO local por convênio e pós-exame com entrega rastreada — tudo rodando junto desde o primeiro mês.",
  pet:
    "A operação pet ganha: landing por serviço, cadastro único do pet, agendamento de banho e consulta, loja online integrada ao estoque, lembrete de vacina e vermífugo, ficha clínica compartilhada, dashboard de recorrência e ticket, SEO local e checkout por Pix — tudo rodando junto desde o primeiro mês.",
  comercio:
    "A loja ganha: catálogo por unidade com estoque real, SEO local por bairro, reserva pelo WhatsApp com retirada em duas horas, sincronização com Instagram e marketplace, BI de giro por categoria, ficha de produto integrada, notificação de retirada, campanhas por região e relatório semanal para o gerente — tudo rodando junto desde o primeiro mês.",
  servicos:
    "A empresa de serviços ganha: landing por tipo de serviço, orçamento com foto e endereço, roteiro do técnico por bairro, acompanhamento por link próprio, pós-venda automático com pedido de review, CRM integrado à agenda, BI por técnico e ticket, SEO local e histórico do imóvel — tudo rodando junto desde o primeiro mês.",
  marcenaria:
    "A marcenaria ganha: galeria por ambiente, briefing guiado com medida e material, orçamento em etapas com assinatura digital, cronograma de produção público, fotos da oficina enviadas pelo WhatsApp, pipeline por obra, garantia ativa registrada por peça, BI de prazo versus entrega e indicação pós-entrega — tudo rodando junto desde o primeiro mês.",
  agro:
    "A operação agrícola ganha: página por cultura e por região, cotação integrada ao representante local, catálogo técnico com ficha e dosagem, CRM por talhão, dashboard de safra por cultura, SEO regional com linguagem do campo, histórico de compra, visita agendada e relatório de sazonalidade real — tudo rodando junto desde o primeiro mês.",
  escritorios:
    "A firma ganha: página por área de atuação, agendamento da primeira consulta com briefing anexo, biblioteca de artigos que sustenta o SEO, painel interno com cliente, pasta e honorário recorrente, WhatsApp institucional com checklist de reunião, casos publicados, BI por área e ticket e prova de autoridade por profissional — tudo rodando junto desde o primeiro mês.",
};

const DISCLAIMER = "Modelo demonstrativo · os números são ilustrativos.";

interface ShowcaseModelProps {
  showcase: Showcase;
}

export function ShowcaseModel({ showcase }: ShowcaseModelProps) {
  const subhead = SUBHEADS[showcase.slug] ?? showcase.hookLine;
  const vocativo = VOCATIVO[showcase.slug] ?? "operação";
  const included = INCLUDED[showcase.slug] ?? "";

  const ctaLabel = `Quero essa operação na minha ${vocativo}`;
  const diagnosticHref = `/diagnostic?from=showcases/${showcase.slug}`;

  return (
    <>
      {/* §1 — Breadcrumb + Hero */}
      <section className="container-x pt-[clamp(5rem,10vw,9rem)] pb-[clamp(3rem,6vw,5rem)]">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 text-[13px] uppercase tracking-widest text-[color:var(--color-muted)]"
        >
          <Link href="/showcases" className="link-underline">
            PageForce / Modelos
          </Link>{" "}
          / {showcase.label}
        </nav>
        <h1
          className="max-w-[22ch] text-[color:var(--color-ink)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(44px, 6vw, 88px)",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          {showcase.hookLine}
        </h1>
        <p
          className="mt-8 max-w-[56ch] text-[color:var(--color-muted)]"
          style={{
            fontSize: 22,
            lineHeight: 1.45,
          }}
        >
          {subhead}
        </p>
        <div className="mt-10">
          <HeroPillCta
            href={diagnosticHref}
            label={ctaLabel}
            testId="showcase-model-cta-primary"
          />
        </div>
      </section>

      {/* §2 — Engrenagem aplicada */}
      <section className="container-x py-[clamp(4rem,8vw,7rem)]">
        <SectionHeading>A engrenagem aplicada</SectionHeading>
        <div className="mt-[clamp(2rem,4vw,3rem)] grid grid-cols-1 gap-[clamp(1.75rem,3vw,2.5rem)] md:grid-cols-3">
          <EngrenagemColumn
            title="Captação + Conversão"
            items={[
              { axis: "Captação", text: showcase.engrenagem.capture },
              { axis: "Conversão", text: showcase.engrenagem.convert },
            ]}
          />
          <EngrenagemColumn
            title="Resposta"
            items={[{ axis: "Resposta", text: showcase.engrenagem.respond }]}
          />
          <EngrenagemColumn
            title="Organização + Medição"
            items={[
              { axis: "Organização", text: showcase.engrenagem.organize },
              { axis: "Medição", text: showcase.engrenagem.measure },
            ]}
          />
        </div>
      </section>

      {/* §3 — Página-modelo preview */}
      <section className="container-x py-[clamp(4rem,8vw,7rem)]">
        <SectionHeading>O que o visitante vê</SectionHeading>
        <p
          className="mt-4 text-[color:var(--color-muted)]"
          style={{ fontSize: 17 }}
        >
          Uma versão enxuta da home — para sentir a rhythm visual.
        </p>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] flex justify-center">
          <ModelPreviewFrame src={showcase.modelAsset} alt={showcase.label} />
        </div>
      </section>

      {/* §4 — Resultado esperado */}
      <section className="container-x py-[clamp(4rem,8vw,7rem)]">
        <SectionHeading>Resultado esperado</SectionHeading>
        <div className="mt-[clamp(2rem,4vw,3rem)] grid grid-cols-1 gap-[clamp(1.25rem,2.5vw,2rem)] md:grid-cols-3">
          {showcase.kpis.map((kpi, i) => (
            <KpiCard key={`${showcase.slug}-kpi-${i}`} kpi={kpi} />
          ))}
        </div>
      </section>

      {/* §5 — O que está incluso */}
      <section className="container-x py-[clamp(4rem,8vw,7rem)]">
        <SectionHeading>O que está incluso nessa operação</SectionHeading>
        <p
          className="mt-6 max-w-[68ch] text-[color:var(--color-ink)]"
          style={{ fontSize: 17, lineHeight: 1.6 }}
        >
          {included}
        </p>
      </section>

      {/* §6 — CTA dupla final */}
      <section className="container-x py-[clamp(4rem,8vw,7rem)]">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
          <HeroPillCta
            href={diagnosticHref}
            label="Começar pelo diagnóstico"
            testId="showcase-model-cta-primary-footer"
          />
          <Link
            href="/showcases"
            className="link-underline text-[color:var(--color-ink)]"
            style={{ fontSize: 16 }}
          >
            Ver outros modelos
          </Link>
        </div>

        {/* §7 — Disclaimer */}
        <p
          className="mt-[clamp(2.5rem,5vw,4rem)] border-t border-[color:var(--color-line)] pt-8 text-[color:var(--color-muted)]"
          style={{ fontSize: 14 }}
        >
          {DISCLAIMER}
        </p>
      </section>
    </>
  );
}

/* -------------------------- Internal primitives -------------------------- */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[color:var(--color-ink)]"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 300,
        fontSize: 32,
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

interface HeroPillCtaProps {
  href: string;
  label: string;
  testId: string;
}

function HeroPillCta({ href, label, testId }: HeroPillCtaProps) {
  // JellyBorder is a client island. We wrap the Link inside so the server
  // still owns the href/label, while jelly physics stays client-side.
  const width = 280;
  const height = 60;
  return (
    <div style={{ display: "inline-block" }}>
      <JellyBorder
        width={width}
        height={height}
        shape="rect"
        radius={999}
        maxBulge={10}
        influence={100}
        driftAmp={1.4}
        strokeColor="var(--color-accent-burnt)"
        strokeWidth={1.25}
      >
        <Link
          href={href}
          data-testid={testId}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            borderRadius: 999,
            textDecoration: "none",
            color: "var(--color-accent-burnt)",
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: "0.01em",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          {label}
        </Link>
      </JellyBorder>
    </div>
  );
}

interface EngrenagemItem {
  axis: string;
  text: string;
}

function EngrenagemColumn({
  title,
  items,
}: {
  title: string;
  items: EngrenagemItem[];
}) {
  const width = 320;
  const height = 260;
  return (
    <div style={{ width: "100%" }}>
      <JellyBorder
        width={width}
        height={height}
        shape="rect"
        radius={16}
        maxBulge={14}
        influence={120}
        driftAmp={1.6}
        strokeColor="var(--color-accent-midnight)"
        strokeWidth={1}
        style={{ width: "100%", maxWidth: "100%" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: 24,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--color-accent-teal)",
              margin: 0,
              fontWeight: 500,
            }}
          >
            {title}
          </p>
          {items.map((item, i) => (
            <div
              key={item.axis}
              className={
                i > 0
                  ? "mt-6 pt-6 border-t border-[color:var(--color-line)]"
                  : "mt-4"
              }
            >
              <p
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--color-muted)",
                  margin: 0,
                }}
              >
                {item.axis}
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: "var(--color-ink)",
                  margin: "8px 0 0 0",
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </JellyBorder>
    </div>
  );
}

interface ModelPreviewFrameProps {
  src: string;
  alt: string;
}

function ModelPreviewFrame({ src, alt }: ModelPreviewFrameProps) {
  // Desktop size; mobile is handled by constraining the wrapper and letting
  // the img maxWidth:100% safety rule scale down. For a second jelly at the
  // smaller logical size we would need a separate instance per breakpoint —
  // we keep a single instance with a max-width wrapper to stay simple.
  const width = 680;
  const height = 420;
  const imgStyle: CSSProperties = {
    display: "block",
    borderRadius: 20,
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    objectFit: "cover",
  };
  return (
    <div style={{ width: "100%", maxWidth: width }}>
      <JellyBorder
        width={width}
        height={height}
        shape="rect"
        radius={20}
        maxBulge={48}
        influence={220}
        driftAmp={3.8}
        strokeColor="var(--color-accent-midnight)"
        strokeWidth={1.25}
        style={{ width: "100%", maxWidth: "100%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={width} height={height} style={imgStyle} />
      </JellyBorder>
    </div>
  );
}

function KpiCard({ kpi }: { kpi: ShowcaseKPI }) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-window)] p-6">
      <div className="text-[13px] uppercase tracking-widest text-[color:var(--color-muted)]">
        {kpi.label}
      </div>
      <div
        className="mt-3 font-display text-[44px] leading-none text-[color:var(--color-accent-teal)]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
      >
        {kpi.value}
      </div>
      <div className="mt-3 text-[15px] text-[color:var(--color-ink)]">
        {kpi.caption}
      </div>
    </div>
  );
}
