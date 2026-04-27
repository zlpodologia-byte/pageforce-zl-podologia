import { makeNeighborhoodPage } from "@/components/zl-podologia/zlNeighborhoodPageFactory";

export const zlAldeotaPage = makeNeighborhoodPage({
  path: "/podologia-aldeota",
  h1: "Podologia para pacientes da Aldeota",
  title: "Podologia para Aldeota em Fortaleza | ZL Podologia",
  description:
    "Atendimento podológico na Parquelândia para pacientes da Aldeota. Cuidados com dor, unha encravada, fungos, calosidades e manutenção.",
  ctaSource: "neighborhood_aldeota",
  neighborhoodName: "Aldeota",
  sourceAngle: "pacientes da Aldeota que procuram podologia em Fortaleza",
  intro:
    "Esta página é voltada para pacientes da Aldeota que buscam podologia em Fortaleza sem falsa promessa de unidade no bairro. A rotina com sapatos fechados, deslocamentos e eventos pode aumentar queixas de unha encravada, calosidades e desconfortos.",
  primaryChecklist: {
    title: "Queixas comuns",
    items: [
      "Dor ao caminhar ou usar calçado fechado.",
      "Unha encravada ou canto sensível.",
      "Calosidades por atrito e rotina intensa.",
      "Manutenção preventiva de unhas e pés.",
    ],
  },
  secondaryChecklist: {
    title: "Antes de sair da Aldeota",
    tone: "clinical",
    items: [
      "Confirme horário pelo WhatsApp.",
      "Confira rota até a Av. Bezerra de Menezes, 2203.",
      "Envie foto se houver dor ou inflamação.",
      "Evite cortar profundamente a unha dolorida em casa.",
    ],
  },
  faqs: [
    {
      question: "A ZL tem unidade na Aldeota?",
      answer:
        "Não. A clínica atende na Parquelândia, na Av. Bezerra de Menezes, 2203.",
    },
    {
      question: "Quem mora na Aldeota pode agendar?",
      answer:
        "Sim. A ZL atende pacientes de vários bairros de Fortaleza mediante agendamento.",
    },
    {
      question: "O que fazer com dor no sapato fechado?",
      answer:
        "Procure avaliação podológica para entender unha, calosidade, atrito ou outro ponto de pressão.",
    },
  ],
});

export const zlCentroPage = makeNeighborhoodPage({
  path: "/podologia-centro-fortaleza",
  h1: "Podologia para pacientes do Centro de Fortaleza",
  title: "Podologia para Centro de Fortaleza | ZL Podologia",
  description:
    "Podologia na Parquelândia para pacientes do Centro de Fortaleza. Atendimento para dor, calos, unha encravada e cuidados preventivos.",
  ctaSource: "neighborhood_centro_fortaleza",
  neighborhoodName: "Centro de Fortaleza",
  sourceAngle:
    "pacientes do Centro de Fortaleza que podem se deslocar até a clínica",
  intro:
    "Esta página é direcionada a pacientes do Centro de Fortaleza que passam muitas horas em pé ou se deslocam bastante e procuram cuidado para unha encravada, calos e desconforto ao caminhar.",
  primaryChecklist: {
    title: "Rotina de muito deslocamento",
    items: [
      "Calos e calosidades por pressão.",
      "Dor nas unhas depois de horas em pé.",
      "Pés cansados por caminhada e transporte.",
      "Manutenção para evitar piora no trabalho.",
    ],
  },
  secondaryChecklist: {
    title: "Transparência",
    tone: "clinical",
    items: [
      "Não há unidade da ZL no Centro.",
      "O atendimento é presencial na Parquelândia.",
      "A avaliação identifica a causa do incômodo.",
      "O cuidado depende da queixa e do estado do pé.",
    ],
  },
  faqs: [
    {
      question: "A clínica fica no Centro?",
      answer: "Não. A ZL Podologia fica na Parquelândia.",
    },
    {
      question: "Atende quem trabalha no Centro?",
      answer:
        "Sim. O atendimento é aberto para pacientes de qualquer bairro de Fortaleza, com agendamento.",
    },
    {
      question: "Podologia ajuda quem fica em pé o dia todo?",
      answer:
        "Pode ajudar quando há calosidades, unhas pressionando, fissuras ou excesso de atrito.",
    },
  ],
});

export const zlCidadeDosFuncionariosPage = makeNeighborhoodPage({
  path: "/podologia-cidade-dos-funcionarios",
  h1: "Podologia para pacientes da Cidade dos Funcionários",
  title: "Podologia para Cidade dos Funcionários | ZL Podologia",
  description:
    "Atendimento podológico na Parquelândia para pacientes da Cidade dos Funcionários. Cuidados com unhas, fungos, calos e prevenção.",
  ctaSource: "neighborhood_cidade_dos_funcionarios",
  neighborhoodName: "Cidade dos Funcionários",
  sourceAngle:
    "pacientes da Cidade dos Funcionários que buscam podologia em Fortaleza",
  intro:
    "Esta página ajuda pacientes da Cidade dos Funcionários a entender quando procurar atendimento podológico em Fortaleza. O foco é manutenção, idosos, unhas espessas, fungos, calosidades e prevenção.",
  primaryChecklist: {
    title: "Perfil preventivo",
    items: [
      "Unhas difíceis de cortar.",
      "Fungos ou mudança de cor na unha.",
      "Calos recorrentes e pele ressecada.",
      "Atenção extra para idosos.",
    ],
  },
  secondaryChecklist: {
    title: "Cuidado antes de complicar",
    tone: "clinical",
    items: [
      "Evite cortes caseiros profundos.",
      "Observe dor, fissuras e sensibilidade.",
      "Leve histórico de diabetes ou circulação.",
      "Defina manutenção conforme avaliação presencial.",
    ],
  },
  faqs: [
    {
      question: "Atende idosos da Cidade dos Funcionários?",
      answer: "Sim, mediante agendamento na unidade da Parquelândia.",
    },
    {
      question: "Existe atendimento domiciliar no bairro?",
      answer: "Consulte disponibilidade pelo WhatsApp antes de agendar.",
    },
    {
      question: "Quando fazer manutenção?",
      answer:
        "Quando há unhas difíceis de cortar, calos recorrentes, pele ressecada, dor ou necessidade de prevenção.",
    },
  ],
});

export const zlMarapongaPage = makeNeighborhoodPage({
  path: "/podologia-maraponga",
  h1: "Podologia para pacientes da Maraponga",
  title: "Podologia para Maraponga | ZL Podologia",
  description:
    "Podologia na Parquelândia para pacientes da Maraponga. Atendimento para unhas, fungos, calosidades, dor e manutenção dos pés.",
  ctaSource: "neighborhood_maraponga",
  neighborhoodName: "Maraponga",
  sourceAngle: "pacientes da Maraponga que procuram atendimento podológico",
  intro:
    "Esta página é para pacientes da Maraponga que procuram podologia em Fortaleza. O foco principal é unha alterada, suspeita de fungos, unha encravada, calosidades e orientação antes do deslocamento.",
  primaryChecklist: {
    title: "Unhas alteradas",
    items: [
      "Mudança de cor, espessura ou formato.",
      "Unha com aparência de fungo.",
      "Pressão no calçado e dor no canto.",
      "Calosidades por rotina e atrito.",
    ],
  },
  secondaryChecklist: {
    title: "Evite piorar",
    tone: "clinical",
    items: [
      "Não corte profundamente unha dolorida.",
      "Não tente remover unha grossa sem avaliação.",
      "Envie foto pelo WhatsApp quando ajudar.",
      "A conduta depende da avaliação presencial.",
    ],
  },
  faqs: [
    {
      question: "A ZL fica na Maraponga?",
      answer: "Não. A unidade fica na Parquelândia.",
    },
    {
      question: "Podologia trata unha com aparência de fungo?",
      answer:
        "Pode auxiliar no cuidado da unha e orientar o paciente; diagnóstico e medicação cabem a profissional habilitado.",
    },
    {
      question: "Unha grossa sempre é fungo?",
      answer:
        "Não. Pode ter relação com trauma, pressão do calçado, idade ou outras causas.",
    },
  ],
});

export const zlMessejanaPage = makeNeighborhoodPage({
  path: "/podologia-messejana",
  h1: "Podologia para pacientes de Messejana",
  title: "Podologia para Messejana | ZL Podologia",
  description:
    "Atendimento podológico na Parquelândia para pacientes de Messejana. Cuidados com dor, unha encravada, calos e saúde dos pés.",
  ctaSource: "neighborhood_messejana",
  neighborhoodName: "Messejana",
  sourceAngle: "pacientes de Messejana interessados em atendimento podológico",
  intro:
    "Esta página é direcionada a pacientes de Messejana que buscam podologia em Fortaleza. Dor na lateral da unha, pressão no calçado, unha encravada e incômodo ao caminhar merecem avaliação.",
  primaryChecklist: {
    title: "Dor e unha encravada",
    items: [
      "Dor na lateral da unha.",
      "Vermelhidão ou pressão no calçado.",
      "Incômodo ao caminhar.",
      "Calosidades por deslocamento diário.",
    ],
  },
  secondaryChecklist: {
    title: "Antes de tentar em casa",
    tone: "alert",
    items: [
      "Não corte profundamente sem avaliação.",
      "Dor forte ou secreção pede triagem cuidadosa.",
      "O procedimento depende do grau do problema.",
      "A unidade presencial fica na Parquelândia.",
    ],
  },
  faqs: [
    {
      question: "A ZL atende em Messejana?",
      answer:
        "Não há unidade em Messejana. O atendimento presencial acontece na Parquelândia.",
    },
    {
      question: "Podologia ajuda com unha encravada?",
      answer:
        "Sim, a avaliação podológica pode indicar o melhor cuidado conforme o caso.",
    },
    {
      question: "Devo cortar a unha encravada em casa?",
      answer:
        "Não é recomendado cortar profundamente sem avaliação, pois pode piorar dor, inflamação ou ferimentos.",
    },
  ],
});
