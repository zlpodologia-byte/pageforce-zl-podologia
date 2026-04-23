export const SERVICES_KICKER = "Como a Pageforce vende";

export const SERVICES_HEADLINE = "Quatro níveis. Uma engrenagem.";

export const SERVICES_LEAD =
  "Diagnóstico antes do preço, entrada por degrau seguro, oferta principal como sistema completo, recorrência como caixa previsível. Cada nível existe por razão comercial — e a oferta inteira só faz sentido junta.";

export type OfferTier = {
  level: string;
  title: string;
  description: string;
};

export const OFFER_TIERS: OfferTier[] = [
  {
    level: "Nível 1",
    title: "Diagnóstico",
    description:
      "Score, dossiê, leitura competitiva e prova visual do problema. O preço nasce do dado, não da tabela vazia.",
  },
  {
    level: "Nível 2",
    title: "Oferta de entrada",
    description:
      "Módulos avulsos, Essencial ou Página Express. Atrito baixo, prova rápida, efeito de crédito para o próximo passo.",
  },
  {
    level: "Nível 3",
    title: "Oferta principal",
    description:
      "Site, SEO técnico e local, GMB, WhatsApp com lógica, CRM, BI e automação. Sai de peça e vira sistema.",
  },
  {
    level: "Nível 4",
    title: "Recorrência e expansão",
    description:
      "SEO vivo, conteúdo contínuo, melhorias de página e leitura mensal. Sustenta LTV e abre upsell.",
  },
];

export type LadderStep = { label: string };

export const ENTRY_LADDER: LadderStep[] = [
  { label: "Diagnóstico gratuito" },
  { label: "Módulos avulsos" },
  { label: "Essencial" },
  { label: "Base" },
  { label: "Intermediário" },
  { label: "Completo / Presença Pro" },
  { label: "Gestão Mensal" },
  { label: "Upsells específicos" },
];

export const CONSULTIVE_LADDER: LadderStep[] = [
  { label: "Diagnóstico 8D" },
  { label: "Sprint de Arrancada" },
  { label: "Engrenagem Base" },
  { label: "Engrenagem Base+" },
  { label: "Conteúdo+" },
  { label: "Ads Gestão" },
  { label: "Recorrência Pro" },
  { label: "Expansão multiunidade" },
];

export type Objection = {
  question: string;
  answer: string;
};

export const OBJECTIONS: Objection[] = [
  {
    question: "Está caro.",
    answer:
      "O custo da perda atual costuma ser maior. Existe oferta de entrada para começar pequeno, com crédito para upgrade. Velocidade e prova substituem promessa.",
  },
  {
    question: "Já tentei marketing e não funcionou.",
    answer:
      "Promessa vaga não é operação mensurável. A Pageforce integra site, SEO, resposta e BI — muitas vezes o problema está na engrenagem quebrada, não na ideia de marketing.",
  },
  {
    question: "Já tenho alguém que faz isso.",
    answer:
      "Saímos da opinião e vamos para critério técnico. O diagnóstico mostra o que está faltando e onde a operação ainda está vazando.",
  },
  {
    question: "Agora não é o momento.",
    answer:
      "Identificamos a barreira real, mostramos o custo de esperar e oferecemos um formato menor de entrada. A urgência é baseada em janela real, não em teatro.",
  },
  {
    question: "Me manda no WhatsApp.",
    answer:
      "Material disponível, sim — mas a proposta não morre em arquivamento passivo. Conduzimos para uma decisão guiada.",
  },
];
