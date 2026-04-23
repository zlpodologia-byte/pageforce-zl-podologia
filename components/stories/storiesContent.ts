export interface StoryEntry {
  date: string;
  kind: "Comercial" | "Conversão" | "KPI" | "Operação";
  title: string;
  summary: string;
  readTime: string;
  href: string;
}

export const STORIES_KICKER = "O que medimos";

export const STORIES_HEADLINE = "Notas curtas sobre o que move caixa.";

export const STORIES_LEAD =
  "Editorial breve sobre objetivos comerciais, conversão real e KPIs que importam — separados das métricas que só preenchem dashboard.";

export const STORIES: readonly StoryEntry[] = [
  {
    date: "Em breve",
    kind: "Comercial",
    title: "O que medimos no curto, no médio e no longo prazo",
    summary:
      "Conversão rápida, ticket que sobe, MRR que sustenta. Os três horizontes que organizam a operação comercial — e por que cada um cobra um KPI diferente.",
    readTime: "5 min",
    href: "/contact?topic=stories&story=horizontes",
  },
  {
    date: "Em breve",
    kind: "Conversão",
    title: "Por que a taxa de resposta vale mais que a impressão",
    summary:
      "Topo de funil sem fechamento é vaidade. Fechamento sem retenção é setup. O funil precisa converter em quatro frentes — topo, fechamento, pós-venda e reputação.",
    readTime: "6 min",
    href: "/contact?topic=stories&story=resposta-impressao",
  },
  {
    date: "Em breve",
    kind: "KPI",
    title: "KPIs do cliente vs. métricas de vaidade",
    summary:
      "Origem do lead, tempo de resposta no WhatsApp, evolução de presença local. O que a operação precisa medir — e o que pode largar sem dor de cabeça.",
    readTime: "4 min",
    href: "/contact?topic=stories&story=kpis-vaidade",
  },
] as const;
