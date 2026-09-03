import type { ZlSeoLandingPageDefinition } from "@/components/zl-podologia/zlSeoLandingTypes";

const LOCATION_BASE =
  "ZL Podologia fica na Parquelândia, na Av. Bezerra de Menezes, 2203, Sala 5, Galeria José Bernardo.";

const REFLEXOLOGY_HERO_IMAGE =
  "/zl-podologia/social/edited/atendimento/reflexologia-sola-01-hd.jpg";
const REFLEXOLOGY_PROOF_IMAGE =
  "/zl-podologia/social/client-approved/2026-04-28/protocolo-podoprofilaxia-reflexologia-2026-04-28.jpeg";
const MASSAGE_HERO_IMAGE =
  "/zl-podologia/social/atendimento/reflexologia-sola-03.jpg";
const MASSAGE_PROOF_IMAGE =
  "/zl-podologia/social/equipe/jannie-retrato.jpg";

export const zlReflexologyPage: ZlSeoLandingPageDefinition = {
  path: "/reflexologia-podal-fortaleza",
  h1: "Reflexologia podal em Fortaleza",
  title: "Reflexologia Podal em Fortaleza | ZL Podologia",
  description:
    "Sessão de reflexologia podal na Parquelândia, em Fortaleza, com hora marcada, ambiente reservado e foco em relaxamento e bem-estar. Agende pelo WhatsApp.",
  eyebrow: "Bem-estar para os pés",
  intro:
    "Uma experiência de bem-estar para desacelerar e dar atenção aos pés, conduzida por Jannié em ambiente reservado na ZL Podologia, na Parquelândia.",
  locationNote: `${LOCATION_BASE} O atendimento é individual, com hora marcada. Se houver dor forte, ferida aberta, secreção ou alteração importante de sensibilidade, a triagem pelo WhatsApp orienta o melhor próximo passo antes do horário.`,
  ctaLabel: "Agendar reflexologia pelo WhatsApp",
  ctaMessage:
    "Olá, vim pela página de reflexologia podal e gostaria de consultar os horários disponíveis.",
  ctaSource: "service_reflexology_page",
  analyticsService: "reflexologia_podal",
  relatedLinks: [
    {
      href: "/podoprofilaxia-fortaleza",
      label: "Podoprofilaxia em Fortaleza",
      description: "Combine o cuidado técnico dos pés com a pausa da reflexologia: o protocolo Podoprofilaxia + Reflexologia sai por R$ 180.",
    },
    {
      href: "/massagem-relaxante-pes-fortaleza",
      label: "Massagem relaxante nos pés",
      description: "Prefere uma pausa focada em conforto para pés cansados? Conheça a massagem relaxante, também com hora marcada.",
    },
  ],
  heroImage: REFLEXOLOGY_HERO_IMAGE,
  heroAlt: "Sessão de reflexologia podal na ZL Podologia em Fortaleza",
  prices: [
    { label: "Reflexologia Relaxante", value: "R$ 80 a R$ 100" },
    { label: "Reflexologia Terapêutica", value: "R$ 100 a R$ 150" },
  ],
  primaryChecklist: {
    title: "Para quem essa experiência pode fazer sentido",
    items: [
      "Rotina cansativa e necessidade de uma pausa com hora marcada.",
      "Busca por relaxamento e atenção individual aos pés.",
      "Pessoas que passam muito tempo em pé ou caminhando.",
      "Experiência de autocuidado ou presente antes de uma ocasião especial.",
    ],
  },
  secondaryChecklist: {
    title: "O que a sessão não promete",
    tone: "alert",
    items: [
      "Não trata doenças nem substitui acompanhamento médico.",
      "Não promete cura de insônia, ansiedade ou dores crônicas.",
      "Casos com ferida, secreção ou diabetes descompensada passam por triagem antes.",
      "A conduta é explicada antes de começar, sem pressa entre pacientes.",
    ],
  },
  steps: [
    {
      title: "Recepção e entendimento da expectativa",
      body: "A conversa inicial entende o que você busca: pausa, relaxamento ou continuidade de um cuidado já feito na clínica.",
    },
    {
      title: "Preparação dos pés",
      body: "O atendimento inclui o ritual de escalda-pés, um momento de acolher e desacelerar antes da técnica.",
    },
    {
      title: "Sessão conduzida por Jannié",
      body: "Estímulos manuais nos pés em ritmo calmo, na modalidade Relaxante ou Terapêutica, conforme a sua expectativa.",
    },
    {
      title: "Finalização e orientações básicas",
      body: "Você sai com o próximo passo claro: retorno, combinação com podoprofilaxia ou apenas o registro de uma boa pausa.",
    },
  ],
  proof: {
    eyebrow: "Ambiente",
    title: "Hora marcada, atendimento individual, sala reservada",
    body: "Na ZL, a reflexologia acontece com uma paciente por vez, em sala reservada na Parquelândia, mantendo o ritmo calmo e a atenção individual da clínica.",
    image: REFLEXOLOGY_PROOF_IMAGE,
    imageAlt: "Ritual de escalda-pés preparado para sessão de bem-estar na ZL Podologia",
  },
  faqs: [
    {
      question: "O que é reflexologia podal?",
      answer:
        "É uma experiência de bem-estar com estímulos manuais nos pés, conduzida em ritmo calmo e com atenção individual. Na ZL, é um cuidado complementar de relaxamento, não um tratamento médico.",
    },
    {
      question: "Quanto tempo dura a sessão?",
      answer:
        "A duração da sessão avulsa é confirmada no agendamento pelo WhatsApp. As experiências de presente da clínica têm 50 minutos.",
    },
    {
      question: "Quanto custa a reflexologia podal?",
      answer:
        "A Reflexologia Relaxante custa de R$ 80 a R$ 100 e a Reflexologia Terapêutica custa de R$ 100 a R$ 150. O protocolo combinado de podoprofilaxia + reflexologia custa R$ 180.",
    },
    {
      question: "Reflexologia dói?",
      answer:
        "A sensibilidade varia de pessoa para pessoa. A sessão é conduzida em ritmo calmo e você pode comunicar qualquer desconforto durante o atendimento.",
    },
    {
      question: "Qual a diferença entre reflexologia e massagem nos pés?",
      answer:
        "A reflexologia trabalha estímulos manuais com leitura individual e ritual de escalda-pés, em modalidade Relaxante ou Terapêutica. A massagem relaxante é uma pausa focada em conforto para pés cansados, com movimentos manuais de relaxamento.",
    },
    {
      question: "Quem realiza a sessão?",
      answer:
        "As sessões de bem-estar são conduzidas por Jannié, reflexoterapeuta podal da ZL, com o mesmo ritmo calmo e atenção individual da clínica.",
    },
    {
      question: "Posso combinar com podoprofilaxia?",
      answer:
        "Sim. O protocolo de podoprofilaxia + reflexologia custa R$ 180 e inclui escalda-pés diferenciado como cuidado complementar.",
    },
    {
      question: "Onde fica a ZL Podologia?",
      answer:
        "Na Av. Bezerra de Menezes, 2203 - Sala 5, Galeria José Bernardo, Parquelândia, Fortaleza. Há rota direta pelo Google Maps.",
    },
    {
      question: "Como agendar?",
      answer:
        "Pelo WhatsApp, com hora marcada. Você consulta os horários disponíveis e recebe a confirmação direto com a clínica.",
    },
    {
      question: "Em quais situações devo conversar com a clínica antes de marcar?",
      answer:
        "Se você tem diabetes, está gestante, tem ferida aberta, secreção, dor forte ou alteração importante de sensibilidade, fale antes pelo WhatsApp para a triagem orientar o melhor próximo passo.",
    },
  ],
  schema: {
    serviceName: "Reflexologia podal em Fortaleza",
    alternateName: "Reflexologia em Fortaleza",
    serviceType: "Bem-estar dos pés",
    offers: [
      {
        name: "Reflexologia Relaxante",
        price: 80,
        description: "Faixa de R$ 80 a R$ 100 conforme a sessão.",
      },
      {
        name: "Reflexologia Terapêutica",
        price: 100,
        description: "Faixa de R$ 100 a R$ 150 conforme a sessão.",
      },
    ],
  },
};

export const zlFootMassagePage: ZlSeoLandingPageDefinition = {
  path: "/massagem-relaxante-pes-fortaleza",
  h1: "Massagem relaxante nos pés em Fortaleza",
  title: "Massagem Relaxante nos Pés em Fortaleza | ZL Podologia",
  description:
    "Massagem relaxante nos pés na Parquelândia, em Fortaleza, com foco em conforto, pausa e bem-estar para pés cansados. Consulte horários pelo WhatsApp.",
  eyebrow: "Bem-estar para os pés",
  intro:
    "Uma experiência de relaxamento para pés cansados, realizada com hora marcada em ambiente reservado na ZL Podologia, na Parquelândia.",
  locationNote: `${LOCATION_BASE} O atendimento é individual, com hora marcada. Se houver dor forte, ferida aberta, secreção ou alteração importante de sensibilidade, a triagem pelo WhatsApp orienta o melhor próximo passo antes do horário.`,
  ctaLabel: "Agendar massagem nos pés",
  ctaMessage:
    "Olá, vim pela página de massagem relaxante nos pés e gostaria de consultar os horários disponíveis.",
  ctaSource: "service_massage_page",
  analyticsService: "massagem_relaxante_pes",
  relatedLinks: [
    {
      href: "/reflexologia-podal-fortaleza",
      label: "Reflexologia podal em Fortaleza",
      description: "Quer uma experiência com leitura individual e ritual de escalda-pés? Conheça a reflexologia podal, de R$ 80 a R$ 150.",
    },
    {
      href: "/podoprofilaxia-fortaleza",
      label: "Podoprofilaxia em Fortaleza",
      description: "Cuidado técnico completo dos pés a partir de R$ 100, que pode ser combinado com momentos de bem-estar.",
    },
  ],
  heroImage: MASSAGE_HERO_IMAGE,
  heroAlt: "Massagem relaxante nos pés em sala reservada na Parquelândia",
  prices: [{ label: "Massagem relaxante nos pés", value: "R$ 100 a R$ 150" }],
  primaryChecklist: {
    title: "Para quem é indicada como experiência de bem-estar",
    items: [
      "Pessoas que passam muitas horas em pé.",
      "Rotina com caminhadas e deslocamentos pela cidade.",
      "Uso frequente de calçados fechados ou salto.",
      "Sensação de pés cansados e busca por relaxamento.",
      "Presente ou experiência de autocuidado.",
    ],
  },
  secondaryChecklist: {
    title: "O que a sessão não promete",
    tone: "alert",
    items: [
      "Não trata doenças, problemas circulatórios ou inflamações.",
      "Não substitui avaliação médica para dor de origem desconhecida.",
      "Não promete eliminar dores nem garantir resultado terapêutico.",
      "Casos com ferida, secreção ou diabetes descompensada passam por triagem antes.",
    ],
  },
  steps: [
    {
      title: "Conversa inicial",
      body: "A profissional entende a sua rotina, o cansaço relatado e a expectativa para a pausa.",
    },
    {
      title: "Movimentos manuais de relaxamento",
      body: "Sessão com movimentos manuais voltados ao conforto e ao relaxamento dos pés, em ritmo calmo.",
    },
    {
      title: "Finalização em ambiente reservado",
      body: "Atendimento individual com hora marcada, sem pressa entre pacientes, em sala reservada na Parquelândia.",
    },
  ],
  proof: {
    eyebrow: "Quem realiza",
    title: "Bem-estar conduzido por Jannié",
    body: "Jannié é a reflexoterapeuta podal da ZL e conduz as sessões de bem-estar com atenção individual e o ritmo calmo da clínica.",
    image: MASSAGE_PROOF_IMAGE,
    imageAlt: "Jannié, profissional de bem-estar da ZL Podologia em Fortaleza",
  },
  faqs: [
    {
      question: "Quanto custa a massagem nos pés?",
      answer:
        "A massagem relaxante nos pés custa de R$ 100 a R$ 150. O valor exato é confirmado no agendamento pelo WhatsApp.",
    },
    {
      question: "Quanto tempo dura a sessão?",
      answer:
        "A duração é confirmada no agendamento pelo WhatsApp. As experiências de presente da clínica têm 50 minutos.",
    },
    {
      question: "O que está incluído?",
      answer:
        "Movimentos manuais voltados ao relaxamento e ao conforto dos pés, em atendimento individual com hora marcada e ambiente reservado.",
    },
    {
      question: "Tem escalda-pés?",
      answer:
        "O ritual de escalda-pés faz parte da reflexologia podal e do protocolo combinado de podoprofilaxia + reflexologia. Para a massagem avulsa, confirme a composição da sessão no WhatsApp antes de agendar.",
    },
    {
      question: "Qual a diferença para a reflexologia?",
      answer:
        "A massagem relaxante é uma pausa focada em conforto para pés cansados. A reflexologia trabalha estímulos manuais com leitura individual e ritual de escalda-pés, em modalidade Relaxante ou Terapêutica. São propostas diferentes.",
    },
    {
      question: "Quem realiza?",
      answer:
        "As sessões de bem-estar são conduzidas por Jannié, reflexoterapeuta podal da ZL, com atenção individual e ritmo calmo.",
    },
    {
      question: "Pode combinar com podoprofilaxia?",
      answer:
        "Sim, o cuidado técnico pode ser combinado com momentos de bem-estar. O protocolo de podoprofilaxia + reflexologia custa R$ 180. Fale no WhatsApp para montar a combinação.",
    },
    {
      question: "É possível comprar como presente?",
      answer:
        "Sim. A clínica tem vales-presente de bem-estar, como o Momento Essencial (R$ 120) e a Experiência Encanto (R$ 160). Consulte a disponibilidade pelo WhatsApp.",
    },
    {
      question: "Onde fica a clínica?",
      answer:
        "Na Av. Bezerra de Menezes, 2203 - Sala 5, Galeria José Bernardo, Parquelândia, Fortaleza. Há rota direta pelo Google Maps.",
    },
    {
      question: "Como agendar?",
      answer:
        "Pelo WhatsApp, com hora marcada. Você consulta os horários disponíveis e recebe a confirmação direto com a clínica.",
    },
  ],
  schema: {
    serviceName: "Massagem relaxante nos pés em Fortaleza",
    alternateName: "Massagem nos pés em Fortaleza",
    serviceType: "Bem-estar dos pés",
    offers: [
      {
        name: "Massagem relaxante nos pés",
        price: 100,
        description: "Faixa de R$ 100 a R$ 150 conforme a sessão.",
      },
    ],
  },
};
