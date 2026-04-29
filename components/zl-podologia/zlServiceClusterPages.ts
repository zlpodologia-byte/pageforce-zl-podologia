import type { ZlSeoLandingPageDefinition } from "@/components/zl-podologia/zlSeoLandingTypes";

const ORTHOSIS_IMAGE =
  "/zl-podologia/social/client-approved/2026-04-28/ortese-ungueal-cliente-2026-04-28.jpeg";
const PODO_IMAGE =
  "/zl-podologia/social/edited-pro/equipe/profissional-exame-frontal-pro.jpg";
const DIABETIC_IMAGE =
  "/zl-podologia/social/edited-pro/procedimentos/closeup-clinico-sensivel-pro.jpg";

export const zlOrthonyxiaPage: ZlSeoLandingPageDefinition = {
  path: "/ortonixia-fortaleza",
  h1: "Órtese para unha em Fortaleza",
  title: "Ortonixia em Fortaleza | ZL Podologia",
  description:
    "Órtese para unha em Fortaleza, na ZL Podologia em Parquelândia. Correção de curvatura, avaliação presencial e orientação para reduzir recorrência.",
  eyebrow: "Ortonixia e órtese ungueal",
  intro:
    "Ortonixia é o cuidado podológico voltado à correção de curvatura da unha. Na ZL, a órtese pode ser indicada para quem tem unha que volta a encravar, sempre depois da avaliação do canto da unha.",
  locationNote:
    "ZL Podologia fica na Parquelândia, na Av. Bezerra de Menezes, 2203, Sala 5, Galeria José Bernardo. A órtese não substitui avaliação médica quando há infecção importante, diabetes descompensada ou problema vascular.",
  ctaLabel: "Avaliar órtese",
  ctaMessage:
    "Oi, quero saber se ortonixia/órtese para unha é indicada para o meu caso na ZL Podologia.",
  ctaSource: "service_orthosis_page",
  heroImage: ORTHOSIS_IMAGE,
  heroAlt: "Aplicação de órtese para unha na ZL Podologia Fortaleza",
  prices: [
    { label: "Órtese simples", value: "R$ 60 por unha" },
    { label: "Órtese metálica", value: "R$ 100 por unha" },
  ],
  primaryChecklist: {
    title: "Quando faz sentido",
    items: [
      "Unha que volta a encravar depois de aliviar a dor.",
      "Curvatura que pressiona o canto da pele.",
      "Desconforto recorrente ao usar calçado fechado.",
      "Necessidade de continuidade após atendimento de unha encravada.",
    ],
  },
  secondaryChecklist: {
    title: "Limites de segurança",
    tone: "alert",
    items: [
      "Não promete correção definitiva.",
      "Não substitui consulta médica em sinais de infecção.",
      "A escolha entre simples e metálica depende do caso.",
      "O retorno é definido conforme adaptação e resposta da unha.",
    ],
  },
  steps: [
    {
      title: "Avaliação da curvatura",
      body: "A podóloga observa o canto da unha, histórico de encravamento e sensibilidade antes de indicar a órtese.",
    },
    {
      title: "Escolha da órtese",
      body: "A versão simples ou metálica é definida conforme a curvatura, pressão e necessidade de reforço.",
    },
    {
      title: "Acompanhamento",
      body: "A paciente recebe orientação sobre adaptação, retorno e cuidados em casa para reduzir nova pressão.",
    },
  ],
  proof: {
    eyebrow: "Correção gradual",
    title: "Continuidade para quem sofre com recorrência",
    body: "A órtese ungueal entra quando a causa do incômodo não é só o corte da unha, mas a curvatura que favorece nova pressão no canto.",
    image: ORTHOSIS_IMAGE,
    imageAlt: "Órtese ungueal aplicada em atendimento podológico",
  },
  faqs: [
    {
      question: "Quanto custa ortonixia em Fortaleza?",
      answer:
        "A órtese simples custa R$ 60 por unha e a órtese metálica custa R$ 100 por unha. A indicação depende da avaliação presencial.",
    },
    {
      question: "Ortonixia serve para unha encravada?",
      answer:
        "Pode ajudar em casos de curvatura que favorecem encravamento, principalmente como continuidade preventiva.",
    },
    {
      question: "A órtese para unha dói?",
      answer:
        "A sensibilidade varia conforme inflamação, curvatura e histórico. A aplicação é feita com técnica e cuidado.",
    },
  ],
  schema: {
    serviceName: "Ortonixia e órtese para unha em Fortaleza",
    alternateName: "Órtese ungueal",
    serviceType: "Podologia clínica",
    offers: [
      { name: "Órtese simples por unha", price: 60 },
      { name: "Órtese metálica por unha", price: 100 },
    ],
  },
};

export const zlPodoprofilaxiaPage: ZlSeoLandingPageDefinition = {
  path: "/podoprofilaxia-fortaleza",
  h1: "Podoprofilaxia em Fortaleza",
  title: "Podoprofilaxia em Fortaleza | ZL Podologia",
  description:
    "Podoprofilaxia em Fortaleza na ZL Podologia, em Parquelândia. Limpeza técnica, corte de unhas, desbaste de calosidades e hidratação.",
  eyebrow: "Limpeza técnica dos pés",
  intro:
    "Podoprofilaxia é a profilaxia técnica dos pés, com leitura clínica antes da conduta. A sessão inclui corte técnico, desbaste de calos e calosidades, limpeza, esfoliação e hidratação final.",
  locationNote:
    "ZL Podologia fica na Parquelândia, na Av. Bezerra de Menezes, 2203, Sala 5, Galeria José Bernardo. Se houver dor intensa, ferida aberta, secreção, alteração de sensibilidade ou diabetes, a triagem precisa ser mais cuidadosa.",
  ctaLabel: "Agendar podoprofilaxia",
  ctaMessage:
    "Oi, quero agendar uma podoprofilaxia na ZL Podologia em Fortaleza.",
  ctaSource: "service_podoprofilaxia_page",
  heroImage: PODO_IMAGE,
  heroAlt: "Podoprofilaxia com motor rotativo na ZL Podologia Fortaleza",
  prices: [
    { label: "Dinheiro ou Pix", value: "R$ 100" },
    { label: "Cartão", value: "R$ 105 cartão" },
  ],
  primaryChecklist: {
    title: "O que inclui",
    items: [
      "Corte técnico das unhas.",
      "Desbaste de calos e calosidades.",
      "Esfoliação e limpeza dos pés.",
      "Hidratação final e orientação preventiva.",
    ],
  },
  secondaryChecklist: {
    title: "Quando procurar",
    tone: "clinical",
    items: [
      "Pés ressecados ou com pontos de atrito.",
      "Calosidades recorrentes.",
      "Unhas difíceis de cortar em casa.",
      "Prevenção antes de surgir dor maior.",
    ],
  },
  steps: [
    {
      title: "Leitura inicial",
      body: "A avaliação observa pele, unhas e pontos de atrito antes da limpeza técnica.",
    },
    {
      title: "Cuidado técnico",
      body: "A sessão combina corte técnico, acabamento, desbaste e hidratação conforme necessidade.",
    },
    {
      title: "Retorno preventivo",
      body: "A frequência ideal depende de rotina, calçado, pele, unhas e histórico da paciente.",
    },
  ],
  proof: {
    eyebrow: "Manutenção",
    title: "Conforto sem tratar como estética isolada",
    body: "A podoprofilaxia melhora aparência e conforto, mas na ZL é conduzida como cuidado técnico preventivo dos pés.",
    image: PODO_IMAGE,
    imageAlt: "Limpeza técnica dos pés durante podoprofilaxia",
  },
  faqs: [
    {
      question: "Quanto custa podoprofilaxia na ZL?",
      answer: "O valor é R$ 100 no dinheiro ou Pix, ou R$ 105 no cartão.",
    },
    {
      question: "O que inclui?",
      answer:
        "Inclui corte técnico das unhas, desbaste de calos e calosidades, esfoliação, limpeza e hidratação final.",
    },
    {
      question: "Podoprofilaxia é só estética?",
      answer:
        "Não. Ela melhora aparência e conforto, mas é conduzida como cuidado técnico preventivo.",
    },
  ],
  schema: {
    serviceName: "Podoprofilaxia em Fortaleza",
    alternateName: "Limpeza técnica dos pés",
    serviceType: "Podologia clínica",
    offers: [
      { name: "Podoprofilaxia no dinheiro", price: 100 },
      { name: "Podoprofilaxia no cartão", price: 105 },
    ],
  },
};

export const zlDiabeticFootPage: ZlSeoLandingPageDefinition = {
  path: "/pe-diabetico-fortaleza",
  h1: "Cuidado para pé diabético em Fortaleza",
  title: "Pé diabético em Fortaleza | ZL Podologia",
  description:
    "Cuidado podológico para pé diabético em Fortaleza, na ZL Podologia em Parquelândia. Atendimento preventivo e orientação segura.",
  eyebrow: "Cuidado preventivo com cautela",
  intro:
    "diabetes exige cuidado contínuo com pele, unhas, sensibilidade e pontos de pressão. Na ZL, o atendimento para pé diabético é adaptado para reduzir trauma e aumentar segurança.",
  locationNote:
    "ZL Podologia fica na Parquelândia, na Av. Bezerra de Menezes, 2203, Sala 5, Galeria José Bernardo. Esse cuidado não substitui acompanhamento médico com endocrinologista, vascular, dermatologista ou urgência quando houver sinais de risco.",
  ctaLabel: "Perguntar com segurança",
  ctaMessage:
    "Oi, tenho diabetes e quero saber se posso fazer um cuidado seguro dos pés na ZL Podologia.",
  ctaSource: "service_diabetic_page",
  heroImage: DIABETIC_IMAGE,
  heroAlt: "Cuidado podológico sensível para pés na ZL Podologia Fortaleza",
  prices: [
    { label: "Pé diabético", value: "R$ 120" },
    { label: "Triagem", value: "WhatsApp antes do horário" },
  ],
  primaryChecklist: {
    title: "Atenção redobrada",
    items: [
      "Pele fina ou ressecada.",
      "Sensibilidade reduzida ou formigamento relatado.",
      "Pontos de pressão causados por calçados.",
      "Unhas e calosidades que exigem técnica leve.",
    ],
  },
  secondaryChecklist: {
    title: "Procure médico primeiro",
    tone: "alert",
    items: [
      "Ferida aberta, secreção ou escurecimento da pele.",
      "Febre, dor forte ou piora rápida.",
      "Perda importante de sensibilidade.",
      "Diabetes descompensada ou problema vascular.",
    ],
  },
  steps: [
    {
      title: "Triagem cuidadosa",
      body: "A conversa inicial identifica diabetes, sensibilidade, feridas, histórico e sinais que exigem médico.",
    },
    {
      title: "Cuidado adaptado",
      body: "Quando indicado, a sessão reduz trauma e respeita pele, unhas, calosidades e pontos de pressão.",
    },
    {
      title: "Orientação preventiva",
      body: "A paciente recebe cuidados de manutenção e alerta para não cortar calos, unhas inflamadas ou feridas em casa.",
    },
  ],
  proof: {
    eyebrow: "Cuidado preventivo",
    title: "Prevenção sem promessa médica",
    body: "O foco é conforto, prevenção e orientação. Feridas, secreção, escurecimento, febre ou piora rápida devem ir para avaliação médica.",
    image: DIABETIC_IMAGE,
    imageAlt: "Atendimento podológico com cuidado sensível nos pés",
  },
  faqs: [
    {
      question: "Quanto custa o atendimento para pé diabético?",
      answer: "O valor informado no site é R$ 120.",
    },
    {
      question: "Quem tem diabetes pode fazer podologia?",
      answer:
        "Pode, mas precisa de cuidado adaptado, avaliação criteriosa e atenção a sinais de risco.",
    },
    {
      question: "A ZL trata ferida de pé diabético?",
      answer:
        "Não é essa a promessa da página. Feridas, secreção, escurecimento, febre ou piora rápida exigem atendimento médico.",
    },
  ],
  schema: {
    serviceName: "Cuidado podológico para pé diabético em Fortaleza",
    serviceType: "Podologia clínica preventiva",
    offers: [{ name: "Cuidado para pé diabético", price: 120 }],
  },
};
