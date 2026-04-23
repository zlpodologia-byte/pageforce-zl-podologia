export const ABOUT_KICKER = "Quem somos";

export const ABOUT_HEADLINE =
  "Operação enxuta. Esteira por agentes. Direção comercial.";

export const ABOUT_LEAD =
  "A Pageforce nasce com DNA de operação enxuta, velocidade alta e forte uso de IA e automação. O objetivo não é vender horas de agência. É construir sistemas comerciais replicáveis, com critério humano onde importa.";

export type ClientProfile = { label: string };

export const CLIENT_PROFILES: ClientProfile[] = [
  { label: "Clínicas" },
  { label: "Odontologia" },
  { label: "Estética" },
  { label: "Diagnóstico por imagem" },
  { label: "Comércio local e varejo regional" },
  { label: "Serviços gerais" },
  { label: "Marcenaria" },
  { label: "Oficinas" },
  { label: "Ramo agrícola" },
  { label: "Escritórios especializados" },
  { label: "Negócios com uma ou mais unidades" },
  { label: "Operações com ambição de franquia" },
];

export type Differential = {
  title: string;
  description: string;
};

export const DIFFERENTIALS: Differential[] = [
  {
    title: "Integração",
    description:
      "O mercado vende em partes — um faz o site, outro roda tráfego, outro cuida do WhatsApp e ninguém mede de ponta a ponta. A Pageforce assume responsabilidade pela engrenagem inteira.",
  },
  {
    title: "Velocidade",
    description:
      "Entrega em dias, não em meses. Velocidade gera confiança cedo e cria efeito wow no pós-venda — especialmente em mercados onde a demora virou trauma.",
  },
  {
    title: "Prova por diagnóstico",
    description:
      "A oferta nasce de busca real, leitura de concorrência, análise técnica e oportunidade mensurável. Não de promessa genérica.",
  },
  {
    title: "Estrutura por agentes",
    description:
      "Prospecção sistemática, diagnóstico rápido, produção repetível, follow-up disciplinado. Custo marginal menor, escala maior, qualidade controlada.",
  },
  {
    title: "Escada de valor",
    description:
      "Entrar por baixo, crescer por prova, ampliar por recorrência, reter por ecossistema. Sem dependência de um único ticket.",
  },
];

export type AgentRole = {
  name: string;
  role: string;
  description: string;
};

export const AGENT_ESTEIRA: AgentRole[] = [
  {
    name: "Hunter",
    role: "Encontra oportunidades",
    description:
      "Identifica negócios onde a engrenagem ainda está aberta. Lê busca, presença local e contexto antes de qualquer abordagem.",
  },
  {
    name: "Scanner",
    role: "Transforma problema em diagnóstico",
    description:
      "Roda score, dossiê e prova visual. Devolve a leitura que tira a conversa do achismo e ancora o pitch em dado.",
  },
  {
    name: "Strategist",
    role: "Monta proposta com lógica de ROI",
    description:
      "Conecta diagnóstico, oferta e degrau de entrada. A proposta nasce do cenário real, não do catálogo.",
  },
  {
    name: "Closer",
    role: "Conduz a conversão",
    description:
      "Trata objeção com critério, mantém urgência legítima e leva o cliente para a decisão guiada — sem pressão teatral.",
  },
  {
    name: "Builder",
    role: "Materializa o ativo",
    description:
      "Implanta site, SEO, WhatsApp, CRM, BI e automação como uma engrenagem só. Sem peça solta, sem improviso de execução.",
  },
  {
    name: "Deployer",
    role: "Entrega, mede e abre continuidade",
    description:
      "Coloca no ar, lê os primeiros números, ajusta e abre o ciclo de recorrência. O fim do projeto é o início da operação.",
  },
];
