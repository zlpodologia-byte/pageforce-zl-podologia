export type ExactServiceKey =
  | "ingrown"
  | "fungus"
  | "podoprofilaxia"
  | "orthosis"
  | "laser"
  | "diabetic";

export type ExactCaseKey = "ingrown" | "fungus" | "podoprofilaxia";

export type ExactStepKey = "assessment" | "diagnosis" | "treatment" | "maintenance";

export type ExactPricingTone = "highlight" | "default";

export interface ExactServiceCard {
  key: ExactServiceKey;
  title: string;
  body: string;
  action: string;
  icon: "ingrown" | "fungus" | "podoprofilaxia" | "orthosis" | "laser" | "diabetic";
}

export interface ExactCaseCard {
  key: ExactCaseKey;
  title: string;
  tag: string;
  before: string;
  after: string;
  note: string;
  beforePhoto: { src: string; alt: string };
  afterPhoto: { src: string; alt: string };
}

export interface ExactStepCard {
  key: ExactStepKey;
  title: string;
  body: string;
  icon: "clipboard" | "search" | "foot" | "shield";
  active?: boolean;
}

export interface ExactPricingCard {
  title: string;
  price: string;
  body: string;
  action: string;
  tone?: ExactPricingTone;
}

export const exactHeaderLinks = [
  { label: "Servicos", href: "#servicos" },
  { label: "Clinica", href: "#clinica" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Antes e Depois", href: "#antes-depois" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
] as const;

export const exactHeroCopy = {
  eyebrow: "NOSSOS SERVICOS",
  title: "Solucoes completas para a saude dos seus pes.",
  body:
    "Protocolos clinicos individualizados, tecnologia avancada e um olhar cuidadoso para cada detalhe da sua saude.",
  badge: "Fortaleza / Parquelandia",
  cta: "AGENDAR HORARIO",
} as const;

export const exactServiceCards: readonly ExactServiceCard[] = [
  {
    key: "ingrown",
    title: "Unha Encravada",
    body: "Tratamento preciso e humanizado para aliviar a dor, corrigir e evitar novas crises.",
    action: "Saiba mais",
    icon: "ingrown",
  },
  {
    key: "fungus",
    title: "Fungos nas Unhas",
    body: "Protocolos eficazes com laser e ativos dermatologicos para unhas mais saudaveis.",
    action: "Saiba mais",
    icon: "fungus",
  },
  {
    key: "podoprofilaxia",
    title: "Podoprofilaxia",
    body: "Higienizacao completa dos pes, remocao de calosidades e prevencao de fissuras.",
    action: "Saiba mais",
    icon: "podoprofilaxia",
  },
  {
    key: "orthosis",
    title: "Ortese para Unhas",
    body: "Correcao gradual e indolor da curvatura da unha, sem cirurgia.",
    action: "Saiba mais",
    icon: "orthosis",
  },
  {
    key: "laser",
    title: "Laserterapia",
    body: "Tecnologia que acelera a cicatrizacao, alivia dores e trata fungos com seguranca.",
    action: "Saiba mais",
    icon: "laser",
  },
  {
    key: "diabetic",
    title: "Cuidados para Pes Sensiveis",
    body: "Atencao especial para diabeticos, idosos e pessoas com sensibilidade aumentada.",
    action: "Saiba mais",
    icon: "diabetic",
  },
] as const;

export const exactCaseCards: readonly ExactCaseCard[] = [
  {
    key: "ingrown",
    title: "Unha Encravada",
    tag: "Antes / Depois",
    before: "Alivio imediato da dor e leitura tecnica da borda da unha.",
    after: "Borda organizada, sensacao de alivio e retorno orientado.",
    note: "Caso real fotografado com autorizacao. O foco e aliviar a dor, corrigir a curvatura e orientar manutencao.",
    beforePhoto: {
      src: "/zl-podologia/social/antes-depois/encravada-02-diagnostico.jpg",
      alt: "Antes: unha encravada com inflamacao e leitura clinica da borda na ZL Podologia em Fortaleza",
    },
    afterPhoto: {
      src: "/zl-podologia/social/antes-depois/encravada-05-alivio-bandagem.jpg",
      alt: "Depois: alivio apos o procedimento de unha encravada com bandagem tecnica na ZL Podologia em Fortaleza",
    },
  },
  {
    key: "fungus",
    title: "Fungos nas Unhas",
    tag: "Protocolo",
    before: "Unha opaca, fragil e sem previsibilidade de evolucao.",
    after: "Protocolo definido, acompanhamento visual e progresso honesto.",
    note: "Tratamento com leitura continua e apoio de laser quando indicado. O resultado depende da continuidade.",
    beforePhoto: {
      src: "/zl-podologia/social/procedimentos/azul-metileno-04.jpg",
      alt: "Antes: unha com fungo em leitura clinica inicial na ZL Podologia",
    },
    afterPhoto: {
      src: "/zl-podologia/social/procedimentos/azul-metileno-05-par.jpg",
      alt: "Depois: dois pes lado a lado apos protocolo para fungos nas unhas na ZL Podologia em Fortaleza",
    },
  },
  {
    key: "podoprofilaxia",
    title: "Podoprofilaxia",
    tag: "Experiencia",
    before: "Procedimento em andamento com foco em limpeza e conforto.",
    after: "Acabamento limpo e sensacao de pe renovado.",
    note: "Aqui a comparacao mostra o cuidado tecnico em execucao e o resultado da sessao, sem exagero visual.",
    beforePhoto: {
      src: "/zl-podologia/social/edited-pro/procedimentos/rotativo-procedimento-pro.jpg",
      alt: "Antes: procedimento em andamento na podoprofilaxia com motor rotativo profissional",
    },
    afterPhoto: {
      src: "/zl-podologia/social/edited-pro/procedimentos/pos-cuidado-curativo-pro.jpg",
      alt: "Depois: acabamento final com curativo e cuidado pos-sessao de podoprofilaxia",
    },
  },
] as const;

export const exactSteps: readonly ExactStepCard[] = [
  {
    key: "assessment",
    title: "Leitura do caso",
    body: "Entendemos seu caso, historico e queixas.",
    icon: "clipboard",
  },
  {
    key: "diagnosis",
    title: "Direcionamento",
    body: "Identificamos a causa e definimos o melhor plano.",
    icon: "search",
  },
  {
    key: "treatment",
    title: "Tratamento",
    body: "Aplicamos as tecnicas e tecnologias indicadas.",
    icon: "foot",
    active: true,
  },
  {
    key: "maintenance",
    title: "Manutencao",
    body: "Acompanhamento para garantir resultados duradouros.",
    icon: "shield",
  },
] as const;

export const exactPricingCards: readonly ExactPricingCard[] = [
  {
    title: "Triagem pelo WhatsApp",
    price: "Sem cobranca isolada",
    body: "Relato da queixa, foto quando ajuda e direcionamento para o procedimento adequado.",
    action: "Agendar agora",
    tone: "default",
  },
  {
    title: "Podoprofilaxia",
    price: "R$ 100 dinheiro | R$ 105 cartao",
    body: "Limpeza e cuidados preventivos para manter os pes saudaveis.",
    action: "Agendar agora",
    tone: "highlight",
  },
  {
    title: "Unha Encravada",
    price: "Grau 1: a partir de R$ 150 | Graus 2 e 3: a partir de R$ 200",
    body: "Dor, inflamacao e sensibilidade ao calcar ou caminhar.",
    action: "Agendar agora",
  },
  {
    title: "Fungos nas Unhas",
    price: "R$ 100 por unha por sessao",
    body: "Tratamento para eliminar fungos e recuperar a saude das unhas.",
    action: "Agendar agora",
  },
  {
    title: "Reflexologia Podal",
    price: "R$ 80 a R$ 150",
    body: "Relaxante e terapeutica, conforme necessidade indicada no atendimento.",
    action: "Agendar agora",
  },
  {
    title: "Pe Diabetico",
    price: "R$ 120",
    body: "Atendimento adaptado com cuidado extra em sensibilidade e pele fina.",
    action: "Agendar agora",
  },
] as const;

export const exactPricingNotes = [
  "Planos de tratamento personalizados",
  "Parcelamento facilitado no cartao de credito",
] as const;

export const exactPricingFooter =
  "*Valores confirmados conforme o procedimento indicado. Consulte condicoes pelo WhatsApp.";

export const exactFinalCtaBullets = [
  "Atendimento humanizado",
  "Tecnologia e tecnicas avancadas",
  "Ambiente seguro e acolhedor",
] as const;

export const exactFinalCtaCopy = {
  eyebrow: "PRONTA PARA CUIDAR DE VOCE?",
  title: "Agende seu atendimento e de o primeiro passo para pes saudaveis e sem dor.",
  body:
    "Atendimento humanizado, explicacao clara do caso e retorno orientado para cada necessidade.",
  primary: "AGENDAR HORARIO",
  secondary: "FALAR PELO WHATSAPP",
} as const;
