export const ZL_WHATSAPP_NUMBER = "5585994358505";

/**
 * Canonical source for every WhatsApp source tag used by the landing.
 * Keep this list narrow on purpose — every new origin should be an
 * explicit entry below so GA4/utm reports stay consistent.
 */
export const ZL_WHATSAPP_SOURCES = [
  "hero_primary",
  "topbar_mini",
  "sticky_mobile",
  "explorer_ingrown",
  "explorer_fungus",
  "explorer_orthosis",
  "explorer_laser",
  "explorer_podoprofilaxia",
  "explorer_plantar_wart",
  "explorer_tungiasis",
  "explorer_reflexology",
  "explorer_diabetic",
  "quiz_result",
  "cta_final",
  "footer_wa",
  "storyteller_ingrown",
  "service_ingrown_page",
  "service_fungus_page",
  "service_orthosis_page",
  "service_podoprofilaxia_page",
  "service_diabetic_page",
  "neighborhood_aldeota",
  "neighborhood_centro_fortaleza",
  "neighborhood_cidade_dos_funcionarios",
  "neighborhood_maraponga",
  "neighborhood_messejana",
  "faq_wa",
  "convenios",
  "fiduciary_bar",
  "packages",
  "experience_podopro_reflexology",
  "experience_noiva_sublime",
  "experience_noiva_majestosa",
  "experience_momento_essencial",
  "experience_encanto",
  "gbp_website",
  "gbp_appointment",
  "gbp_post_launch",
  "gbp_maps",
] as const;

export type ZlWhatsappSource = (typeof ZL_WHATSAPP_SOURCES)[number];

const ZL_WHATSAPP_SOURCE_SET = new Set<string>(ZL_WHATSAPP_SOURCES);

export function isZlWhatsappSource(
  value: string | null | undefined
): value is ZlWhatsappSource {
  return Boolean(value && ZL_WHATSAPP_SOURCE_SET.has(value));
}

/**
 * Build an internal WhatsApp redirect link with an encoded patient-facing
 * message body.
 *
 * Attribution stays in `/api/wa` + GA events; never append internal source
 * tags to the message the patient sees.
 */
export function buildWhatsappLink(
  message: string,
  source: ZlWhatsappSource = "cta_final"
): string {
  const params = new URLSearchParams({
    source,
    text: message,
  });
  return `/api/wa?${params.toString()}`;
}

export const zlLinks = {
  whatsapp: buildWhatsappLink(
    "Olá, quero agendar um horário na ZL Podologia em Fortaleza.",
    "hero_primary"
  ),
  whatsappUrgente: buildWhatsappLink(
    "Olá, estou com dor ou inflamação e queria um atendimento na ZL Podologia.",
    "cta_final"
  ),
  whatsappConvenios: buildWhatsappLink(
    "Oi, gostaria de saber quais convênios e condições a ZL Podologia aceita.",
    "convenios"
  ),
  whatsappTopbar: buildWhatsappLink(
    "Olá, quero agendar um horário na ZL Podologia em Fortaleza.",
    "topbar_mini"
  ),
  whatsappSticky: buildWhatsappLink(
    "Olá, quero agendar um horário na ZL Podologia em Fortaleza.",
    "sticky_mobile"
  ),
  whatsappFooter: buildWhatsappLink(
    "Olá, quero agendar um horário na ZL Podologia em Fortaleza.",
    "footer_wa"
  ),
  whatsappFinalCta: buildWhatsappLink(
    "Olá, quero agendar um horário na ZL Podologia em Fortaleza.",
    "cta_final"
  ),
  whatsappGoogleBusinessWebsite: buildWhatsappLink(
    "Olá, quero agendar um horário na ZL Podologia em Fortaleza.",
    "gbp_website"
  ),
  whatsappGoogleBusinessAppointment: buildWhatsappLink(
    "Olá, quero agendar um horário na ZL Podologia em Fortaleza.",
    "gbp_appointment"
  ),
  whatsappGoogleBusinessPostLaunch: buildWhatsappLink(
    "Olá, vi o site novo da ZL Podologia e quero agendar um horário em Fortaleza.",
    "gbp_post_launch"
  ),
  whatsappPackages: buildWhatsappLink(
    "Oi, gostaria de saber sobre um plano de cuidado personalizado na ZL Podologia.",
    "packages"
  ),
  whatsappPodoproReflexology: buildWhatsappLink(
    "Oi, quero saber sobre a oferta Podoprofilaxia + Reflexologia por R$ 180.",
    "experience_podopro_reflexology"
  ),
  whatsappNoivaSublime: buildWhatsappLink(
    "Oi, quero presentear com a experiência Noiva Sublime (Pre-Wedding 50 min, R$ 180).",
    "experience_noiva_sublime"
  ),
  whatsappNoivaMajestosa: buildWhatsappLink(
    "Oi, quero a experiência Noiva Majestosa (Pre-Wedding terapêutica 50 min, R$ 240).",
    "experience_noiva_majestosa"
  ),
  whatsappMomentoEssencial: buildWhatsappLink(
    "Oi, quero presentear com o Vale Presente Momento Essencial (Reflexologia 50min, R$ 120).",
    "experience_momento_essencial"
  ),
  whatsappExperienciaEncanto: buildWhatsappLink(
    "Oi, quero presentear com o Vale Presente Experiência Encanto (Reflexologia terapêutica + cartão ilustrado personalizado, R$ 160).",
    "experience_encanto"
  ),
  whatsappNumber: ZL_WHATSAPP_NUMBER,
  // Google Maps: busca oficial que cai direto na ficha certa da ZL em
  // Fortaleza (Galeria José Bernardo, Parquelândia). Prefere-se a busca
  // por nome para evitar dependência de shortlinks que podem expirar.
  maps: "https://www.google.com/maps/search/ZL+Podologia+Fortaleza",
  googleBusinessProfile: "https://www.google.com/maps/search/ZL+Podologia+Fortaleza",
  instagram: "https://www.instagram.com/zlpodologia/",
  facebook: "https://www.facebook.com/zl.podologia",
  linktree: "https://linktr.ee/zlpodologia",
  phoneTel: "tel:+5585994358505",
  imagePolicy: "/politica-de-imagens",
} as const;

export const zlContact = {
  whatsappDisplay: "(85) 9 9435-8505",
  phoneDisplay: "(85) 9 9435-8505",
  handle: "@zlpodologia",
  email: "zlpodologia@gmail.com",
  emailLegacy: "contato@zlpodologia.com.br",
} as const;

export const zlHeroProof = [
  { label: "Nota Google", value: "5,0", caption: "11 avaliações públicas, cuidado artesanal." },
  { label: "Atendimento", value: "Ter - Sab", caption: "Fortaleza, hora marcada." },
  { label: "Triagem", value: "Leitura clínica", caption: "Direcionamento antes do horário." },
] as const;

/* ------------------------------------------------------------------ */
/* v8-merge: Proof strip 4-col (entre Hero e Faixa Fiduciaria)         */
/* ------------------------------------------------------------------ */

/**
 * Quatro cartões de prova editorial abaixo do hero. Paleta rose-wash
 * (`#FBF7F4` bg + `#E6D2C7` borders). Cada item é uma confirmação
 * concreta - número, protocolo, postura clínica ou endereço. Denso o
 * suficiente pra ser escaneável sem virar parede de texto.
 */
export type ZlProofStripKind =
  | "google_stars"
  | "protocol"
  | "individual"
  | "location";

export interface ZlProofStripItem {
  kind: ZlProofStripKind;
  eyebrow: string;
  title: string;
  body: string;
}

export const zlProofStripItems: readonly ZlProofStripItem[] = [
  {
    kind: "google_stars",
    eyebrow: "5,0 no Google",
    title: "Nota máxima em 11 avaliações públicas",
    body: "Avaliações reais e públicas na ficha oficial da clínica.",
  },
  {
    kind: "protocol",
    eyebrow: "Conduta explicada",
    title: "Você entende cada etapa",
    body: "A podóloga avalia o canto da unha, explica o cuidado indicado e orienta o retorno quando necessário.",
  },
  {
    kind: "individual",
    eyebrow: "Atendimento individual",
    title: "Uma paciente por vez",
    body: "Hora marcada, sem correria entre atendimentos.",
  },
  {
    kind: "location",
    eyebrow: "Fortaleza / Parquelândia",
    title: "Galeria José Bernardo",
    body: "Av. Bezerra de Menezes, 2203 - Sala 5. Ponto físico com rota no Maps.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* v8-merge: Benefícios da podologia clínica                           */
/* ------------------------------------------------------------------ */

/**
 * Bloco educativo extraído do `-exact` + reescrito com voz real da ZL.
 * Entra entre o Symptom Grid e o Service Explorer - contextualiza o
 * cuidado sem comparar com outras profissões.
 */
export const zlComparePodology = {
  eyebrow: "Podologia clínica",
  title: "Cuidado técnico para pés, unhas e pele.",
  body:
    "Na ZL, o atendimento começa pela escuta da queixa e pela leitura do caso. A paciente entende o que será feito, quando precisa de procedimento e quando faz sentido retornar.",
  podology: {
    title: "No atendimento clínico",
    subtitle: "O que sustenta o cuidado da ZL Podologia.",
    items: [
      "Zucarina é a podóloga responsável pela leitura e condução clínica.",
      "Instrumental esterilizado e kit individualizado por atendimento.",
      "Explicação clara do cuidado indicado antes de começar.",
      "Procedimento definido conforme queixa, foto enviada e leitura presencial.",
      "Orientação de cuidados em casa e retorno quando o caso pede.",
      "Atendimento com hora marcada, sem correria entre pacientes.",
    ],
  },
  triage: {
    title: "Antes do horário",
    subtitle: "Como a clínica direciona o próximo passo.",
    items: [
      "Você explica a queixa pelo WhatsApp, sem precisar decidir sozinho.",
      "A foto ajuda a orientar a conversa quando o caso permite.",
      "Dor, inflamação, fungos e calos recebem direcionamento específico.",
      "A clínica indica o serviço mais adequado antes de reservar o horário.",
      "O retorno só é sugerido quando faz sentido para o caso.",
      "Jannié atua na reflexologia podal e no bem-estar complementar.",
    ],
  },
} as const;

// Tagline oficial da ZL Podologia (copy real extraída do Instagram @zlpodologia).
export const zlBrandTagline = "Pés bem cuidados fazem toda a diferença";

// Micro-assinatura da marca (fechamento natural usado pela ZL em posts).
export const zlBrandSignature =
  "Cuidar dos pés é cuidar da sua qualidade de vida.";

// Mantido vazio para remover ruído redundante do hero sem quebrar o map atual.
export const zlHeroChips = [] as const;

// Micro-review usado no hero — prova imediata (Fix 2 da reflexão E).
// Fonte: Ivia D., avaliação pública no Google (nota 5 / 5).
export const zlHeroMicroReview = {
  quote:
    "Ambiente organizado e acolhedor. Zucarina, profissional competente e delicada.",
  author: "Ivia D.",
  source: "avaliação pública no Google",
} as const;

// Mini destaques que aparecem logo abaixo do hero (barra de confiança rápida).
export const zlQuickStrip = [
  { label: "Avaliação", body: "Leitura clínica do caso antes do procedimento." },
  { label: "Laser", body: "Tecnologia como apoio em protocolos de unha e pele." },
  { label: "Humanizado", body: "Atendimento calmo, explicando cada etapa." },
  { label: "WhatsApp", body: "Resposta rápida para agendar ou tirar dúvida." },
] as const;

// Promessa editorial do topo: 2 queixas de urgência + 2 continuidades.
export const zlPromessaPivot =
  "Unha encravada e fungos costumam pedir resposta mais rápida. Órtese e laser entram quando o caso precisa de continuidade.";

export const zlTrustPoints = [
  "Podologia clínica em Fortaleza (Parquelândia) com avaliação, procedimento e orientação de retorno.",
  "Galeria José Bernardo, endereço claro e horário visível antes do agendamento.",
  "Uma paciente por vez: atenção individual mantém a nota 5,0 com 11 avaliações públicas no Google.",
  "Ambiente mais leve, sem visual de salão e sem frieza hospitalar.",
] as const;

export type ZlServiceId =
  | "ingrown"
  | "fungus"
  | "orthosis"
  | "laser"
  | "podoprofilaxia"
  | "plantar_wart"
  | "tungiasis"
  | "reflexology"
  | "diabetic";

/**
 * Cards principais do Service Explorer na v7-final — 6 cards, ordem
 * obrigatória por prioridade comercial (catálogo F confirmado pela
 * Zucarina em 2026-04-21):
 *
 * 1. Unha encravada — produto principal de conversão
 * 2. Fungos — recorrência + gap de venda declarado
 * 3. Órtese — diferencial técnico (promovido de sub-variante v7a)
 * 4. Laserterapia — alto valor percebido (promovido de sub-variante v7a)
 * 5. Podoprofilaxia — porta de entrada, mais volumoso hoje
 * 6. Verruga plantar — lesão dolorosa na sola do pé
 * 7. Tungíase — bicho de pé, atendimento local direcionado
 * 8. Reflexologia podal — bem-estar
 *
 * Pé diabético não entra como card principal (default: sub-variante de
 * Podoprofilaxia + linha no Pricing). Pre-Wedding removido do Explorer
 * e mencionado apenas como oferta premium discreta no Pricing/Ambiente.
 */
export const ZL_MAIN_SERVICE_IDS: readonly ZlServiceId[] = [
  "ingrown",
  "fungus",
  "orthosis",
  "laser",
  "podoprofilaxia",
  "plantar_wart",
  "tungiasis",
  "reflexology",
] as const;

// A6 deve consumir esta lista para limitar o badge "Prioritário" a 2 serviços.
export const ZL_PRIORITY_SERVICE_IDS: readonly ZlServiceId[] = [
  "ingrown",
  "fungus",
] as const;

export interface ZlInteractiveService {
  id: ZlServiceId;
  menuLabel: string;
  title: string;
  price: string;
  /**
   * Optional short one-line tagline/closer that sits above the steps
   * (used when the service has a ZL-owned phrase that belongs close to
   * the main promise, e.g. reflexologia).
   */
  tagline?: string;
  pain: string;
  promise: string;
  visualLabel: string;
  visualSupport: string;
  highlights: readonly [string, string, string];
  steps: readonly [string, string, string] | readonly [string, string, string, string];
  /**
   * Optional list of inclusions shown as a "o que entra" checklist. Used in
   * premium services (preWedding) and technical services (ingrown) where
   * the specific components add real authority.
   */
  includes?: readonly string[];
  /**
   * Sub-variantes listadas como "Também oferecemos" dentro do card. Usado
   * na v7-final pra encaixar encravada-com-inflamação, massagem, verruga
   * plantar, atendimento idosos, pé diabético dentro dos cards corretos.
   */
  subVariants?: readonly {
    title: string;
    price: string;
    body: string;
  }[];
  /**
   * Foto real dedicada ao card. Quando presente, o Explorer renderiza a
   * foto ao invés da arte 2D — fica mais autêntico e sustenta autoridade
   * clínica. `alt` deve ser descritivo pro SEO + acessibilidade.
   */
  photo?: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
  /**
   * Tratamento visual premium (eyebrow dourado + borda tintada) — reservado
   * pra quando/se Pre-Wedding voltar como card. Na v7-final não há card
   * premiumStripe ativo.
   */
  premiumStripe?: boolean;
  ctaLabel: string;
  /**
   * Short first-person WhatsApp message to open the chat with context about
   * the specific complaint this service resolves.
   */
  ctaWhatsappMessage: string;
  /**
   * Origem interna pra este card (explorer_<service>). Usado pelo redirect
   * `/api/wa` e pelos eventos de funil, sem aparecer para a paciente.
   */
  whatsappSource: ZlWhatsappSource;
}

export const zlInteractiveServices: readonly ZlInteractiveService[] = [
  {
    id: "ingrown",
    menuLabel: "Onicocriptose",
    title: "Unha encravada (onicocriptose)",
    price: "Grau 1: a partir de R$ 150 | Graus 2 e 3: a partir de R$ 200",
    pain: "Dor, inflamação e sensibilidade ao calçar ou caminhar.",
    promise:
      "A podóloga avalia o canto da unha, identifica o que está causando dor e explica o cuidado indicado antes de começar. Quando há necessidade, remove a parte da unha que machuca a pele com técnica adequada e orienta o retorno para reduzir a chance de voltar a encravar.",
    visualLabel: "Protocolo real para aliviar a dor",
    visualSupport: "Leitura do caso, alívio da dor e orientação de retorno.",
    highlights: [
      "Queixa que mais costuma chegar com urgência.",
      "Conduta explicada em linguagem simples antes do procedimento.",
      "Pode abrir caminho para órtese e retorno quando indicado, para não voltar a encravar.",
    ],
    steps: [
      "Escuta da queixa e leitura do canto da unha.",
      "Higienização e preparo da região com técnica adequada.",
      "Alívio da parte que está pressionando ou machucando a pele.",
      "Orientação pós-procedimento e retorno quando necessário.",
    ],
    includes: [
      "Grau 1: a partir de R$ 150",
      "Graus 2 e 3: a partir de R$ 200",
      "Leitura do canto da unha e do grau de desconforto",
      "Procedimento indicado conforme o estado do dedo",
      "Orientação de calçado e cuidado em casa nos primeiros dias",
      "Sugestão de retorno quando houver risco de voltar a encravar",
    ],
    subVariants: [
      {
        title: "Graus 2 e 3",
        price: "A partir de R$ 200",
        body: "Quando há inflamação mais evidente, a conduta exige mais cuidado e o valor é explicado antes do procedimento.",
      },
    ],
    photo: {
      src: "/zl-podologia/social/client-approved/2026-04-28/unha-encravada-cliente-2026-04-28.jpeg",
      alt: "Registro autorizado de atendimento para unha encravada na ZL Podologia em Fortaleza",
      objectPosition: "50% 38%",
    },
    ctaLabel: "Quero aliviar essa dor",
    ctaWhatsappMessage:
      "Oi, queria entender meu caso de unha encravada com a ZL Podologia.",
    whatsappSource: "explorer_ingrown",
  },
  {
    id: "fungus",
    menuLabel: "Onicomicose",
    title: "Onicomicose (fungos)",
    price: "R$ 100 por unha por sessão",
    pain: "Unha amarelada, grossa, frágil ou com odor persistente.",
    promise:
      "Protocolo para tratar fungos e recuperar a saúde das unhas com leitura do caso, continuidade e expectativa honesta sobre tempo de resposta. O laser entra como camada complementar quando o caso indica.",
    visualLabel: "Protocolo com acompanhamento",
    visualSupport: "Tratamento organizado sessão a sessão, sem promessa milagrosa.",
    highlights: [
      "Melhora pede continuidade, não sessão solta.",
      "Conversa honesta sobre tempo e cuidado em casa.",
      "Planos de cuidado são montados conforme o caso.",
    ],
    steps: [
      "Leitura inicial do aspecto da unha e do histórico.",
      "Definição do protocolo e da frequência das sessões.",
      "Revisão visual da evolução ao longo dos retornos.",
    ],
    subVariants: [
      {
        title: "Tratamento avançado de fungos",
        price: "R$ 100 por sessão",
        body: "Casos que pedem protocolo mais intenso, com leitura clínica antes de iniciar.",
      },
    ],
    photo: {
      src: "/zl-podologia/social/client-approved/2026-04-28/onicodistrofia-procedimento-2026-04-28.jpeg",
      alt: "Procedimento técnico em unha com alteração de cor e cuidado podológico na ZL Podologia Fortaleza",
      objectPosition: "50% 56%",
    },
    ctaLabel: "Quero entender meu caso",
    ctaWhatsappMessage: "Oi, queria tratar micose de unha na ZL Podologia.",
    whatsappSource: "explorer_fungus",
  },
  {
    id: "orthosis",
    menuLabel: "Órtese ungueal",
    title: "Órtese ungueal (anteparos)",
    price: "R$ 60 (simples) | R$ 100 (metálica) por unha",
    pain: "Correção da curvatura da unha, aliviando a dor e prevenindo encravamento.",
    promise:
      "Quando o caso pede, a órtese ajuda a reorganizar a curvatura e deixa a recuperação mais confortável. Existem duas versões: órtese simples (R$ 60 por unha) e órtese metálica (R$ 100 por unha), escolhidas a partir da avaliação do canto da unha.",
    visualLabel: "Correção de curvatura",
    visualSupport: "Aplicação técnica para reduzir recorrência.",
    highlights: [
      "Continuidade técnica para quem a unha volta a encravar.",
      "Preço por unha, escalável conforme o caso.",
      "Entra como continuidade natural do tratamento de encravada.",
    ],
    steps: [
      "Avaliação da curvatura e da frequência do incômodo.",
      "Escolha entre órtese simples ou metálica conforme o caso.",
      "Revisão da adaptação e do progresso ao longo do tratamento.",
    ],
    subVariants: [
      {
        title: "Órtese metálica",
        price: "R$ 100 por unha",
        body: "Indicada quando a curvatura pede mais reforço mecânico. Decisão clínica após a avaliação.",
      },
    ],
    // v7-vfix: foto pro real substitui ilustracao 2D.
    // aplicador-transparente-pro mostra aplicação técnica de instrumento
    // transparente - casa visualmente com a lógica de correção da curvatura
    // e com o gesto técnico de "colocar a órtese no canto da unha".
    photo: {
      src: "/zl-podologia/social/client-approved/2026-04-28/ortese-ungueal-cliente-2026-04-28.jpeg",
      alt: "Órtese ungueal aplicada para correção de curvatura na ZL Podologia em Fortaleza",
      objectPosition: "54% 42%",
    },
    ctaLabel: "Avaliar meu caso",
    ctaWhatsappMessage: "Oi, quero saber sobre órtese para unha na ZL Podologia.",
    whatsappSource: "explorer_orthosis",
  },
  {
    id: "laser",
    menuLabel: "Laserterapia",
    title: "Laserterapia como apoio clínico",
    price: "R$ 100 por sessão",
    pain: "Busca por tecnologia, conforto e apoio em protocolos de unha e pele.",
    promise:
      "Laser entra como complemento, não como promessa milagrosa, dentro do plano do caso. Auxilia protocolos de fungos, cicatrização pós-encravada e tratamentos de pele.",
    visualLabel: "Laserterapia — tecnologia usada com critério",
    visualSupport: "Apoio clínico aplicado quando o caso realmente pede, dentro do plano do paciente.",
    highlights: [
      "Soma conforto e valor percebido sem prometer milagre.",
      "Funciona bem como apoio ao protocolo de fungos.",
      "A podóloga indica quando o laser faz sentido no seu caso.",
    ],
    steps: [
      "Leitura do caso e decisão sobre aplicação do laser.",
      "Aplicação como complemento ao tratamento principal.",
      "Acompanhamento da resposta durante o protocolo.",
    ],
    // v7-vfix: foto pro real substitui ilustracao 2D do laser.
    // profissional-exame-frontal-pro mostra ambiente clínico com EPI
    // completo e interação paciente-profissional - comunica "tecnologia
    // clínica apoiada por protocolo" muito melhor que uma arte 2D abstrata.
    photo: {
      src: "/zl-podologia/social/client-approved/2026-04-28/laserterapia-cliente-2026-04-28.jpeg",
      alt: "Laserterapia aplicada como apoio clínico em protocolo podológico na ZL Podologia Fortaleza",
      objectPosition: "50% 58%",
    },
    ctaLabel: "Saber se meu caso combina",
    ctaWhatsappMessage:
      "Oi, quero saber se laserterapia combina com o meu caso na ZL Podologia.",
    whatsappSource: "explorer_laser",
  },
  {
    id: "podoprofilaxia",
    menuLabel: "Podoprofilaxia",
    title: "Podoprofilaxia completa (profilaxia técnica)",
    price: "A partir de R$ 100 no Pix ou dinheiro",
    pain: "Limpeza e cuidados preventivos para manter os pés saudáveis.",
    promise:
      "Cuidado completo de pele e unhas - a profilaxia técnica dos pés - com limpeza, corte técnico, desbaste e hidratação em uma só sessão. Serviço mais vendido hoje e porta de entrada mais volumosa da clínica.",
    visualLabel: "Cuidado completo de pele e unhas",
    visualSupport: "Sessão técnica para sair leve, limpo e em ordem.",
    highlights: [
      "Serviço mais pedido por quem quer manter o pé em dia.",
      "Inclui corte técnico, desbaste, hidratação e acabamento em uma única visita.",
      "Experiência cuidadosa sem perder a leitura clínica.",
    ],
    steps: [
      "Leitura rápida da pele, unhas e pontos de atrito.",
      "Cuidado técnico com foco em conforto e acabamento limpo.",
      "Indicação do retorno preventivo mais adequado para você.",
    ],
    includes: [
      "Corte técnico das unhas",
      "Desbaste de calos e calosidades",
      "Esfoliação e limpeza",
      "Hidratação final",
    ],
    subVariants: [
      {
        title: "Pé diabético",
        price: "R$ 120",
        body: "Atendimento adaptado com cuidado extra na sensibilidade e orientação de manutenção. Indicado para quem tem diabetes.",
      },
      {
        title: "Atendimento para idosos",
        price: "R$ 100 a R$ 180",
        body: "Sessão adaptada ao caso - paciência, ritmo próprio e atenção à pele mais fina.",
      },
      {
        title: "Verruga plantar",
        price: "A partir de R$ 100",
        body: "Dor ao pisar causada por lesão na sola do pé, com cuidado definido conforme a avaliação do caso.",
      },
    ],
    photo: {
      src: "/zl-podologia/social/client-approved/2026-04-28/podoprofilaxia-atendimento-2026-04-28.jpeg",
      alt: "Atendimento de podoprofilaxia em andamento com cuidado técnico dos pés na ZL Podologia Fortaleza",
      objectPosition: "50% 52%",
    },
    ctaLabel: "Agendar podoprofilaxia",
    ctaWhatsappMessage: "Oi, quero agendar podoprofilaxia na ZL Podologia.",
    whatsappSource: "explorer_podoprofilaxia",
  },
  {
    id: "plantar_wart",
    menuLabel: "Verruga plantar",
    title: "Verruga plantar",
    price: "A partir de R$ 100",
    pain: "Dor ao pisar causada por lesão na sola do pé.",
    promise:
      "A clínica entende a queixa, observa a região e direciona o cuidado adequado quando há suspeita de verruga plantar. O procedimento e a continuidade são definidos conforme a avaliação do caso.",
    visualLabel: "Verruga plantar — tratamento em andamento",
    visualSupport: "Registro real do tratamento em andamento na clínica, com leitura local e orientação de retorno.",
    highlights: [
      "Procure atendimento quando a dor aparece ao apoiar o pé.",
      "A foto pelo WhatsApp ajuda a orientar a conversa inicial.",
      "A conduta presencial é explicada antes do procedimento.",
    ],
    steps: [
      "Escuta da queixa e observação da região dolorida.",
      "Confirmação presencial do cuidado indicado.",
      "Orientação sobre retorno e cuidados em casa.",
    ],
    photo: {
      src: "/zl-podologia/social/client-approved/2026-04-28/verruga-plantar-cliente-2026-04-28.jpeg",
      alt: "Verruga plantar em tratamento em andamento na ZL Podologia Fortaleza — registro autorizado pela paciente",
      objectPosition: "52% 48%",
    },
    ctaLabel: "Quero avaliar essa dor",
    ctaWhatsappMessage:
      "Oi, estou com dor na sola do pé e queria orientação da ZL Podologia.",
    whatsappSource: "explorer_plantar_wart",
  },
  {
    id: "tungiasis",
    menuLabel: "Tungíase",
    title: "Tungíase (Bicho de pé)",
    price: "R$ 100,00",
    pain: "Lesão dolorosa na pele causada por parasita.",
    promise:
      "Quando há suspeita de tungíase, a ZL orienta o próximo passo pelo WhatsApp e confirma presencialmente a conduta adequada. O foco é cuidado seguro, higiene da região e orientação clara.",
    visualLabel: "Cuidado local com segurança",
    visualSupport: "Direcionamento prévio e procedimento conforme o caso.",
    highlights: [
      "A clínica pode orientar pelo WhatsApp antes de reservar o horário.",
      "O procedimento é definido com leitura presencial da região.",
      "A orientação em casa evita manipulação inadequada.",
    ],
    steps: [
      "Você explica a queixa e pode enviar foto quando ajuda.",
      "A profissional confirma o cuidado indicado presencialmente.",
      "A orientação final explica higiene, proteção e retorno se necessário.",
    ],
    photo: {
      src: "/zl-podologia/social/edited-pro/procedimentos/pos-cuidado-curativo-pro.jpg",
      alt: "Cuidado local com curativo técnico e orientação na ZL Podologia Fortaleza",
    },
    ctaLabel: "Quero orientação",
    ctaWhatsappMessage:
      "Oi, estou com suspeita de bicho de pé e queria orientação da ZL Podologia.",
    whatsappSource: "explorer_tungiasis",
  },
  {
    id: "reflexology",
    menuLabel: "Reflexologia",
    title: "Reflexologia podal (Relaxante e terapêutica)",
    price: "R$ 80 a R$ 150",
    tagline:
      "Uma experiência sensorial e terapêutica exclusiva — para quem busca mais do que um serviço.",
    pain: "Estresse constante, cansaço no corpo, ansiedade, dores crônicas, tensão muscular e necessidade de relaxar de verdade.",
    promise:
      "Cada sessão começa com anamnese profunda e criteriosa, analisando necessidades físicas e emocionais do paciente — atendimento estratégico, seguro e totalmente personalizado. Jannié conduz como reflexoterapeuta podal, com escuta individual, ritmo calmo e foco em bem-estar.",
    visualLabel: "Anamnese profunda + ritual sensorial",
    visualSupport: "Escalda-pés acolhedor, leitura individual e sessão personalizada.",
    highlights: [
      "Anamnese profunda e criteriosa: análise física e emocional antes da sessão.",
      "Ritual de escalda-pés exclusivo + escolha entre Relaxante (desaceleração) ou Terapêutica (teste de temperamento).",
      "Ambiente acolhedor e refinado, com cuidado humanizado de padrão elevado.",
    ],
    steps: [
      "Anamnese profunda: leitura individual das necessidades físicas e emocionais.",
      "Ritual de escalda-pés sensorial — momento de acolher e desacelerar antes do tratamento.",
      "Escolha da modalidade: Relaxante (desaceleração) ou Terapêutica (teste de temperamento + pontos dirigidos).",
      "Sessão personalizada — você sai mais leve, em equilíbrio físico e emocional.",
    ],
    includes: [
      "Anamnese profunda e criteriosa antes de cada sessão",
      "Ritual exclusivo de escalda-pés sensorial",
      "Reflexologia Relaxante: ambiente de desaceleração completa",
      "Reflexologia Terapêutica: teste de temperamento + pontos dirigidos",
      "Sessão personalizada com ritmo calmo, sem pressa entre pacientes",
    ],
    subVariants: [
      {
        title: "Reflexologia Relaxante",
        price: "R$ 80 a R$ 100",
        body: "Ambiente de desaceleração completa que conduz a um estado profundo de relaxamento, aliviando tensões e restaurando energia.",
      },
      {
        title: "Reflexologia Terapêutica",
        price: "R$ 100 a R$ 150",
        body: "Aplicação do teste de temperamento para abordagem refinada e individualizada — equilíbrio no corpo e no estado emocional.",
      },
      {
        title: "Massagem terapêutica",
        price: "R$ 100 a R$ 150",
        body: "Versão mais aprofundada focada em liberar tensão muscular de forma dirigida.",
      },
    ],
    photo: {
      src: "/zl-podologia/social/client-approved/2026-04-28/protocolo-podoprofilaxia-reflexologia-2026-04-28.jpeg",
      alt: "Ritual de escalda-pés sensorial conduzido por Jannié na sessão de reflexologia podal da ZL Podologia Fortaleza",
      objectPosition: "50% 50%",
    },
    ctaLabel: "Quero um momento de pausa",
    ctaWhatsappMessage:
      "Oi, quero saber sobre a reflexologia podal para relaxar na ZL Podologia.",
    whatsappSource: "explorer_reflexology",
  },
  // Pé diabético definido como serviço completo (usado em sub-variante de
  // Podoprofilaxia + linha do Pricing). Não entra em ZL_MAIN_SERVICE_IDS.
  {
    id: "diabetic",
    menuLabel: "Pé diabético",
    title: "Cuidado para pé diabético",
    price: "R$ 120",
    pain: "Você tem diabetes, pele fina ou mais idade e precisa de segurança extra no cuidado.",
    promise:
      "Atendimento mais atento e preventivo para pé diabético - avaliação cuidadosa da pele e da sensibilidade, cuidado técnico sem trauma e orientação de manutenção.",
    visualLabel: "Cuidado com atenção redobrada",
    visualSupport: "Avaliação calma, técnica leve e orientação de manutenção.",
    highlights: [
      "Avaliação prioriza sensibilidade, circulação e histórico.",
      "Cuidado sem trauma adicional - mão leve em pele fina.",
      "Orientação clara de manutenção preventiva em casa.",
    ],
    steps: [
      "Avaliação cuidadosa da pele, sensibilidade e histórico.",
      "Cuidado técnico com foco em segurança e conforto.",
      "Orientação de manutenção e retorno preventivo.",
    ],
    // v7-vfix: foto pro real substitui ilustracao 2D "sensivel".
    // pos-cuidado-curativo-pro mostra o aftercare com curativo técnico,
    // a mesma atenção redobrada que o pé diabético pede - sem imagem
    // frontal ou agressiva.
    photo: {
      src: "/zl-podologia/social/edited-pro/procedimentos/pos-cuidado-curativo-pro.jpg",
      alt: "Pós-cuidado de procedimento com curativo técnico e atenção redobrada - protocolo indicado para pé diabético na ZL Podologia Fortaleza",
    },
    ctaLabel: "Agendar com cuidado extra",
    ctaWhatsappMessage:
      "Oi, preciso de cuidado para pé diabético ou pele sensível na ZL Podologia.",
    whatsappSource: "explorer_diabetic",
  },
] as const;

/**
 * Cases com antes/depois reais — v7-refine.
 *
 * Agora cada card carrega fotos reais da ZL (antes + depois) quando
 * disponível, via campos `beforePhoto` / `afterPhoto`. O texto `before`
 * / `after` continua servindo como legenda explicativa abaixo das imagens.
 *
 * Para Podoprofilaxia (sem antes/depois visual óbvio) a copy é "Experiência
 * de atendimento" — mostramos procedimento em andamento + resultado pós.
 */
export interface ZlIllustratedCasePhoto {
  src: string;
  alt: string;
}

export interface ZlIllustratedCase {
  title: string;
  tag: string;
  before: string;
  after: string;
  note: string;
  beforePhoto?: ZlIllustratedCasePhoto;
  afterPhoto?: ZlIllustratedCasePhoto;
}

export const zlIllustratedCases: readonly ZlIllustratedCase[] = [
  {
    title: "Unha encravada",
    tag: "Antes / Depois",
    before: "Dor, pressão na borda e inflamação ao calçar.",
    after: "Mais alívio, borda organizada e retorno orientado.",
    note: "Caso real fotografado com autorização da paciente, com orientação de retorno após o procedimento.",
    beforePhoto: {
      src: "/zl-podologia/social/antes-depois/encravada-02-diagnostico.jpg",
      alt: "Antes: unhas dos hálux profundamente encravadas com inflamação visível na borda, diagnóstico clínico antes do procedimento na ZL Podologia Fortaleza",
    },
    afterPhoto: {
      src: "/zl-podologia/social/antes-depois/encravada-05-alivio-bandagem.jpg",
      alt: "Depois: área protegida com bandagem técnica e orientação de retorno, alívio real após o procedimento de unha encravada na ZL Podologia Fortaleza",
    },
  },
  {
    title: "Onicodistrofia traumática",
    tag: "Protocolo",
    before: "Alteração da unha causada por trauma, com mudança visual e fragilidade.",
    after: "Acompanhamento orientado para entender evolução, proteção e continuidade.",
    note: "Registro clínico autorizado para mostrar alteração ungueal traumática e acompanhamento do aspecto da unha ao longo do protocolo.",
    beforePhoto: {
      src: "/zl-podologia/social/client-approved/fungos-protocolo-2026-04-26-01.jpeg",
      alt: "Registro autorizado de onicodistrofia traumática com alteração de cor e espessamento antes do direcionamento clínico na ZL Podologia Fortaleza",
    },
    afterPhoto: {
      src: "/zl-podologia/social/client-approved/fungos-protocolo-2026-04-26-02.jpeg",
      alt: "Registro autorizado de acompanhamento de alteração traumática da unha na ZL Podologia Fortaleza",
    },
  },
  {
    title: "Podoprofilaxia",
    tag: "Experiência",
    before: "Procedimento em andamento: fresa técnica em uso.",
    after: "Acabamento limpo e aplicação do protocolo final.",
    note: "Registro do atendimento em andamento e do acabamento final, sem comparação artificial.",
    beforePhoto: {
      src: "/zl-podologia/social/client-approved/2026-04-28/podoprofilaxia-atendimento-2026-04-28.jpeg",
      alt: "Procedimento em andamento durante podoprofilaxia na ZL Podologia Fortaleza",
    },
    afterPhoto: {
      src: "/zl-podologia/social/edited-pro/equipe/profissional-exame-frontal-pro.jpg",
      alt: "Atendimento clínico e acabamento técnico durante podoprofilaxia na ZL Podologia Fortaleza",
    },
  },
] as const;

/**
 * Pricing v7-final — 3 buckets (Básicos / Intermediários / Avançados)
 * reescritos a partir do catálogo F oficial. Linhas em pares
 * serviço + valor/faixa, com nota curta onde faz sentido.
 */
export type ZlPricingBucket = "basicos" | "intermediarios" | "avancados";

export interface ZlPricingRow {
  label: string;
  price: string;
  note: string;
  tone?: "soft" | "accent";
}

export interface ZlPricingBucketGroup {
  bucket: ZlPricingBucket;
  title: string;
  subtitle: string;
  rows: readonly ZlPricingRow[];
}

export const zlValueSectionCopy = {
  eyebrow: "Valores e continuidade",
  title: "Valores, retornos e continuidade do cuidado.",
  body:
    "Valores dos atendimentos, retornos, plano de cuidado personalizado e presentes da ZL, com clareza sobre cada etapa.",
} as const;

export const zlPricingGroups: readonly ZlPricingBucketGroup[] = [
  {
    bucket: "basicos",
    title: "Triagem, manutenção e prevenção",
    subtitle: "Para começar o cuidado ou manter o pé em ordem.",
    rows: [
      {
        label: "Podoprofilaxia",
        price: "A partir de R$ 100 no Pix ou dinheiro",
        note: "Limpeza completa, corte técnico, desbaste e hidratação. Serviço mais vendido.",
        tone: "accent",
      },
      {
        label: "Protocolo Podoprofilaxia + Reflexologia",
        price: "R$ 180",
        note: "Oferta especial com podoprofilaxia, reflexologia e escalda-pés diferenciado como cuidado complementar.",
        tone: "accent",
      },
      {
        label: "Desbaste de calos (isolado)",
        price: "R$ 100",
        note: "Remoção pontual de calos e calosidades fora da podoprofilaxia completa.",
      },
      {
        label: "Hidratação de parafina",
        price: "R$ 100",
        note: "Camada de hidratação profunda com parafina para pele ressecada.",
      },
      {
        label: "Triagem prévia no WhatsApp",
        price: "Sem cobrança isolada",
        note: "Você explica a queixa, pode enviar foto e recebe direcionamento para o procedimento adequado.",
      },
    ],
  },
  {
    bucket: "intermediarios",
    title: "Dor, inflamação e resolução",
    subtitle: "Quando o pé já pede procedimento técnico e alívio rápido.",
    rows: [
      {
        label: "Unha encravada (onicocriptose) - Grau 1",
        price: "A partir de R$ 150",
        note: "Dor inicial ou desconforto localizado, com orientação de retorno.",
        tone: "accent",
      },
      {
        label: "Unha encravada (onicocriptose) - Graus 2 e 3",
        price: "A partir de R$ 200",
        note: "Quando há inflamação mais evidente, a conduta exige mais cuidado.",
      },
      {
        label: "Tratamento de fungos (onicomicose)",
        price: "R$ 100 por unha por sessão",
        note: "Protocolo para tratar fungos e acompanhar a recuperação da saúde das unhas com continuidade e cuidado em casa.",
      },
      {
        label: "Verruga plantar",
        price: "A partir de R$ 100",
        note: "Dor ao pisar causada por lesão na sola do pé, com conduta definida conforme o caso.",
      },
      {
        label: "Tungíase (Bicho de pé)",
        price: "R$ 100,00",
        note: "Lesão dolorosa na pele causada por parasita, com conduta definida conforme o caso.",
      },
      {
        label: "Atendimento para idosos",
        price: "R$ 100 a R$ 180",
        note: "Sessão adaptada ao caso - ritmo próprio e atenção à pele mais fina.",
      },
    ],
  },
  {
    bucket: "avancados",
    title: "Continuidade do tratamento",
    subtitle: "Órtese, laser e protocolos que pedem retorno.",
    rows: [
      {
        label: "Órtese simples",
        price: "R$ 60 por unha",
        note: "Correção de curvatura - continuidade para quem a unha volta a encravar.",
      },
      {
        label: "Órtese metálica",
        price: "R$ 100 por unha",
        note: "Versão reforçada, indicada após avaliação do canto da unha.",
      },
      {
        label: "Laserterapia",
        price: "R$ 100",
        note: "Apoio clínico em protocolos de fungos e cicatrização.",
      },
      {
        label: "Tratamento avançado de fungos",
        price: "R$ 100 por sessão",
        note: "Protocolo mais intenso - requer leitura clínica antes de iniciar.",
      },
      {
        label: "Reflexologia podal",
        price: "R$ 80 a R$ 150",
        note: "Relaxante e terapêutica, conforme necessidade indicada no atendimento.",
      },
      {
        label: "Massagem terapêutica",
        price: "R$ 100 a R$ 150",
        note: "Versão mais aprofundada, focada em liberar tensão muscular.",
      },
      {
        label: "Pé diabético",
        price: "R$ 120",
        note: "Atendimento adaptado com cuidado extra em sensibilidade e pele fina.",
      },
    ],
  },
] as const;

/**
 * Rodapé do Pricing — notas finais (plano de cuidado, Pre-Wedding,
 * pagamento). Centraliza a copy pra não dispersar detalhes.
 */
export const zlPricingFooterNotes = [
  "A clínica não cobra avaliação isolada: o primeiro direcionamento acontece pelo WhatsApp, com relato e foto quando ajuda.",
  "Seu plano de cuidado personalizado é montado no atendimento para orientar continuidade, retornos e cuidados em casa.",
  "Também há experiências e presentes sob medida, inclusive Pre-Wedding terapêutica.",
  "Formas de pagamento: dinheiro, Pix ou cartão. Condições específicas do cartão são confirmadas direto na clínica.",
] as const;

// Legacy flat pricing — mantido como re-export pra cobrir refs antigas,
// mas não é mais fonte de verdade. Usar `zlPricingGroups`.
export const zlPricing: readonly ZlPricingRow[] = zlPricingGroups.flatMap(
  (g) => g.rows
);

export const zlTeamValues = [
  "Atendimento humanizado do primeiro contato ao retorno.",
  "Podóloga responsável na condução clínica e reflexoterapeuta podal no cuidado complementar.",
  "Ritual de cuidado que combina técnica, delicadeza e orientação clara.",
  "Sala reservada, hora marcada e sem correria entre pacientes.",
] as const;

/**
 * Urgência honesta (Fix 6 da reflexão E) — converte a "pequenez" da ZL
 * (11 reviews) em vantagem narrativa. Usado na Faixa Fiduciaria e na
 * seção de Equipe/Pricing conforme espaço permitir.
 */
export const zlUrgencyCopy = {
  title: "Uma paciente por vez.",
  body:
    "Atendimento individualizado — por isso mantemos nota 5,0 com 11 avaliações públicas no Google.",
} as const;

/**
 * Profissionais da ZL Podologia confirmadas publicamente em avaliações
 * do Google e no Instagram da clínica. A bio é em primeira pessoa, em
 * torno de 50-70 palavras, combinando linguagem pública dos reviews
 * com voz da própria ZL (copy do IG). Não inventar CRT, formação, anos
 * de experiência ou especialidades sem fonte da própria ZL.
 */
export interface ZlProfessional {
  name: string;
  role: string;
  /** Curta descrição em palavras já públicas nos reviews do Google. */
  description: string;
  /** Bio em primeira pessoa (50-70 palavras). */
  bio: string;
  /** Identificador textual exibido na seção. */
  handle?: string;
  /** Path da foto quando há retrato disponível; fallback vai pro avatar SVG. */
  photo?: {
    src: string;
    alt: string;
    /**
     * Indica se o crop esconde o rosto (LGPD fallback). True = usar crop
     * editorial lateral/parcial; false = retrato completo liberado.
     *
     * Na v7-final a foto pro (profissional-close-autoridade-pro) é
     * autorizada, portanto cropProtected = false.
     */
    cropProtected?: boolean;
  };
}

export const zlProfessionals: readonly ZlProfessional[] = [
  {
    name: "Zucarina",
    role: "Podóloga responsável",
    description:
      "Profissional competente que trata o cliente com atenção e delicadeza, nas palavras das pacientes.",
    bio: "Eu sou a Zucarina. Cuido dos pés de cada paciente como se fossem únicos, uma por vez, com tempo para ouvir o caso antes de colocar a mão no instrumental. Gosto de explicar o que estou fazendo e por quê, porque pé bem cuidado é pé entendido. Aqui na ZL, em Fortaleza, você não vai ser mais uma ficha.",
    // v7-earthy: foto close-autoridade-pro (jaleco branco + touca descartável
    // + máscara cirúrgica + óculos pretos) confirmada pelo Yuri como sendo
    // da Zucarina em 2026-04-21. cropProtected=false pq é autorizada.
    photo: {
      src: "/zl-podologia/social/edited-pro/equipe/profissional-close-autoridade-pro.jpg",
      alt: "Zucarina, podóloga responsável da ZL Podologia, em close clínico com EPI completo — jaleco branco, touca descartável e máscara cirúrgica — em Fortaleza",
      cropProtected: false,
    },
  },
  {
    name: "Jannié",
    role: "Reflexoterapeuta podal",
    description:
      "Reflexoterapeuta podal da ZL, atenciosa no cuidado de bem-estar e continuidade da experiência da clínica.",
    bio: "Eu sou a Jannié. Atuo com reflexologia podal e apoio o cuidado de bem-estar da ZL, mantendo o mesmo ritmo calmo, atenção individual e acolhimento no atendimento.",
    handle: "@jannier.silva412",
    // v7-earthy BLOCO B: foto real da Jannié em jannie-retrato.jpg — wide
    // shot top-down da sala onde Jannié aparece sentada de jaleco verde,
    // óculos e cabelo preto curto, à esquerda-centro do frame. O crop via
    // object-position customizado no ZlProfessionalHero centraliza nela.
    // cropProtected=false — autorização LGPD já coberta pela mesma política.
    photo: {
      src: "/zl-podologia/social/equipe/jannie-retrato.jpg",
      alt: "Jannié, reflexoterapeuta podal da ZL Podologia, atendendo uma paciente na sala da clínica em Fortaleza — jaleco verde, óculos, atenção individualizada",
      cropProtected: false,
    },
  },
] as const;

export const zlTeamHeadline = {
  eyebrow: "Quem cuida dos seus pés",
  title: "Zucarina na podologia clínica e Jannié na reflexologia podal.",
  body:
    "Zucarina conduz os procedimentos de podologia. Jannié atua como reflexoterapeuta podal no bem-estar complementar, mantendo atenção individual e o ritmo calmo da clínica.",
} as const;

export const zlConsultFlow = [
  "Você chega com hora marcada, com o motivo do atendimento já entendido.",
  "A consulta começa pela avaliação do pé, da unha e do nível de desconforto.",
  "A profissional executa o cuidado principal e explica o que pede continuidade.",
  "Se fizer sentido, o retorno já sai sugerido dentro do mesmo ciclo.",
] as const;

export const zlPodologyFacts = [
  {
    title: "O que a podologia trata",
    body: "Podologia cuida e previne problemas nos pés, nas unhas e na pele, com foco técnico, orientação e continuidade quando necessário.",
  },
  {
    title: "Quando procurar ajuda",
    body: "Dor ao andar, unha encravada, calos, fungos, fissuras ou pés sensíveis já são bons motivos para buscar atendimento.",
  },
  {
    title: "Cuidado clínico, não só aparência",
    body: "A ZL observa dor, pele, unha, sensibilidade, histórico e rotina para indicar o procedimento mais adequado.",
  },
  {
    title: "Quando o caso pede continuidade",
    body: "Fungos, unhas com tendência a encravar e pés sensíveis tendem a evoluir melhor com retorno e acompanhamento.",
  },
] as const;

export const zlFaq = [
  {
    q: "Em quanto tempo consigo atendimento na ZL Podologia em Fortaleza?",
    a: "A ZL trabalha com hora marcada. Quando envolve dor ou inflamação, a clínica tenta encaixe no mesmo dia ou no próximo útil.",
  },
  {
    q: "Atende casos com dor ou unha inflamada?",
    a: "Sim. Esses são justamente os casos prioritários: o ideal é avaliar logo para evitar piora e orientar a continuidade. Unha encravada (onicocriptose): grau 1 a partir de R$ 150; graus 2 e 3 a partir de R$ 200, conforme o caso.",
  },
  {
    q: "Qual a diferença entre avaliação e procedimento?",
    a: "A clínica não trabalha com avaliação avulsa paga. Normalmente você explica a queixa pelo WhatsApp, pode enviar uma foto e recebe um direcionamento prévio. No atendimento presencial, a podóloga confirma o caso e executa o procedimento indicado, com valor conforme o serviço.",
  },
  {
    q: "Faz acompanhamento para fungos?",
    a: "Sim. Fungos costumam pedir protocolo com várias sessões (R$ 100 por unha por sessão). A clínica orienta sobre tempo, frequência e cuidado em casa. Para casos mais intensos, existe o tratamento avançado (R$ 100 por sessão).",
  },
  {
    q: "Atende idosos e pé diabético?",
    a: "Atende sim, com cuidado extra na avaliação, segurança e orientação de manutenção. Pé diabético: R$ 120. Atendimento para idosos: R$ 100 a R$ 180 conforme o caso.",
  },
  {
    q: "Como funciona o plano de cuidado?",
    a: "Sim. A ZL monta seu plano de cuidado personalizado no atendimento para garantir melhores resultados e continuidade dos cuidados. É só perguntar pelo WhatsApp.",
  },
  {
    q: "Posso agendar pelo WhatsApp?",
    a: "Sim. O WhatsApp é o canal principal para marcar horário, confirmar e tirar dúvidas. Você fala direto com a clínica.",
  },
  {
    q: "Como é o pagamento?",
    a: "As formas de pagamento são dinheiro, Pix ou cartão. A forma de pagamento e qualquer condição específica do cartão são confirmadas direto na clínica, junto do agendamento.",
  },
  {
    q: "Como chegar na Bezerra de Menezes?",
    a: "A clínica fica na Av. Bezerra de Menezes, 2203 - sala 5, Parquelândia, Fortaleza, dentro da Galeria José Bernardo. Há rota direta pelo Google Maps.",
  },
] as const;

export const zlLocation = {
  city: "Fortaleza - CE",
  state: "CE",
  country: "BR",
  address: "Av. Bezerra de Menezes, 2203 - Sala 5",
  streetAddress: "Av. Bezerra de Menezes, 2203 - Sala 5 - Galeria José Bernardo",
  district: "Parquelândia",
  zipcode: "60325-105",
  // Landmark oficial registrado no Google Maps - ajuda o paciente a
  // localizar a entrada certa da sala na avenida.
  landmark: "Galeria José Bernardo",
  // Coordenadas reais da ficha do Google Business (plus code 7C7P+M7
  // Parquelândia). Usadas pelo Schema.org e pela política de imagens.
  latitude: -3.7358889,
  longitude: -38.5643333,
  hours: "Terça a sexta, 09:00 às 16:00. Sábado, 09:00 às 12:00.",
  note: "Agendamento e confirmação pelo WhatsApp. Segunda e domingo, fechado.",
} as const;

export const zlHoursRows = [
  { day: "Segunda", hours: "Fechado", tone: "muted" },
  { day: "Terça", hours: "09:00 - 16:00", tone: "open" },
  { day: "Quarta", hours: "09:00 - 16:00", tone: "open" },
  { day: "Quinta", hours: "09:00 - 16:00", tone: "open" },
  { day: "Sexta", hours: "09:00 - 16:00", tone: "open" },
  { day: "Sábado", hours: "09:00 - 12:00", tone: "open" },
  { day: "Domingo", hours: "Fechado", tone: "muted" },
] as const;

/**
 * Horário em formato schema.org (Tu-Fr 09:00-16:00, Sa 09:00-12:00).
 * Fonte de verdade única pra JSON-LD + microdata.
 */
export const zlScheduleSchema = [
  { day: "Tuesday", open: "09:00", close: "16:00" },
  { day: "Wednesday", open: "09:00", close: "16:00" },
  { day: "Thursday", open: "09:00", close: "16:00" },
  { day: "Friday", open: "09:00", close: "16:00" },
  { day: "Saturday", open: "09:00", close: "12:00" },
] as const;

/**
 * Horário em formato numérico pra usar no cálculo de "aberto agora"
 * (ZlOpenStatus, Fix 1 da reflexão E). JavaScript Date.getDay() usa
 * 0 = Domingo, 1 = Segunda, ..., 6 = Sábado.
 */
export interface ZlOpenHoursSlot {
  dayIndex: number;
  dayLabel: string;
  dayShort: string;
  openMinutes: number;
  closeMinutes: number;
}

export const zlOpenHours: readonly ZlOpenHoursSlot[] = [
  { dayIndex: 2, dayLabel: "Terça", dayShort: "ter", openMinutes: 9 * 60, closeMinutes: 16 * 60 },
  { dayIndex: 3, dayLabel: "Quarta", dayShort: "qua", openMinutes: 9 * 60, closeMinutes: 16 * 60 },
  { dayIndex: 4, dayLabel: "Quinta", dayShort: "qui", openMinutes: 9 * 60, closeMinutes: 16 * 60 },
  { dayIndex: 5, dayLabel: "Sexta", dayShort: "sex", openMinutes: 9 * 60, closeMinutes: 16 * 60 },
  { dayIndex: 6, dayLabel: "Sábado", dayShort: "sab", openMinutes: 9 * 60, closeMinutes: 12 * 60 },
] as const;

/* ------------------------------------------------------------------ */
/* Fiduciary Bar (v7a - consolida TrustBar + QuickStrip)              */
/* ------------------------------------------------------------------ */

export type ZlFiduciaryBarItemKind =
  | "anvisa"
  | "podologa"
  | "google"
  | "open_status"
  | "whatsapp";

export interface ZlFiduciaryBarItem {
  kind: ZlFiduciaryBarItemKind;
  eyebrow: string;
  title: string;
  body: string;
  cta?: { href: string; label: string };
}

export const zlFiduciaryBarItems: readonly ZlFiduciaryBarItem[] = [
  {
    kind: "anvisa",
    eyebrow: "Selo",
    title: "Anvisa",
    body: "Protocolos de biossegurança alinhados às diretrizes sanitárias.",
  },
  {
    kind: "podologa",
    eyebrow: "Profissional",
    title: "Podóloga registrada",
    body: "Podologia clínica com formação técnica reconhecida.",
  },
  {
    kind: "google",
    eyebrow: "Reputação",
    title: "Google 5,0 / 11",
    body: "Nota máxima em 11 avaliações públicas reais.",
    cta: {
      href: "https://www.google.com/maps/search/ZL+Podologia+Fortaleza",
      label: "Ver no Google",
    },
  },
  {
    // "Aberto agora" — renderizado dinamicamente (ZlOpenStatus). Os
    // valores aqui servem de fallback SSR/no-JS.
    kind: "open_status",
    eyebrow: "Agenda",
    title: "Ter-Sex 9-16h | Sab 9-12h",
    body: "Atendemos com hora marcada. O status em tempo real aparece se o JavaScript estiver ativo.",
  },
  {
    kind: "whatsapp",
    eyebrow: "Canal",
    title: "WhatsApp direto",
    body: "Resposta rápida no (85) 9 9435-8505.",
    cta: {
      href: buildWhatsappLink(
        "Olá, quero agendar um horário na ZL Podologia em Fortaleza.",
        "fiduciary_bar"
      ),
      label: "Falar agora",
    },
  },
] as const;

// Backwards-compat: TrustBar legacy (não usado mais pela landing v7a, mas
// ainda exportado pra cobertura de refs que possam sobrar).
export type ZlTrustBarItemKind = ZlFiduciaryBarItemKind;
export type ZlTrustBarItem = ZlFiduciaryBarItem;
export const zlTrustBarItems = zlFiduciaryBarItems;

/* ------------------------------------------------------------------ */
/* Biossegurança section                                               */
/* ------------------------------------------------------------------ */

export type ZlBiosafetyItemKind =
  | "autoclave"
  | "ultrasound"
  | "kit"
  | "disposable";

export interface ZlBiosafetyItem {
  kind: ZlBiosafetyItemKind;
  title: string;
  body: string;
}

export const zlBiosafetyItems: readonly ZlBiosafetyItem[] = [
  {
    kind: "autoclave",
    title: "Autoclave classe B",
    body: "Esterilização validada de todo instrumental, com ciclo monitorado.",
  },
  {
    kind: "ultrasound",
    title: "Lavagem ultrassônica",
    body: "Remoção mecânica de resíduos antes de cada ciclo de esterilização.",
  },
  {
    kind: "kit",
    title: "Instrumental individualizado",
    body: "Kit único por atendimento: nada circula entre pacientes.",
  },
  {
    kind: "disposable",
    title: "Descartáveis de classe hospitalar",
    body: "Lâmina, lixa e gaze abertas à vista, diante de você.",
  },
] as const;

export const zlBiosafetyNote =
  "Protocolos conforme diretrizes da Anvisa. Sua segurança na ZL Podologia Fortaleza não é opcional.";

/* ------------------------------------------------------------------ */
/* Symptom-to-Solution                                                 */
/* ------------------------------------------------------------------ */

export type ZlSymptomKind =
  | "pain"
  | "odor"
  | "orthosis"
  | "laser"
  | "heel"
  | "wart"
  | "tungiasis"
  | "prevention"
  | "eventos";

export interface ZlSymptom {
  kind: ZlSymptomKind;
  title: string;
  body: string;
  /**
   * Primary service to scroll to / highlight in the ZlServiceExplorer
   * when the user picks this symptom.
   */
  primaryService: ZlServiceId;
  related: readonly string[];
}

export const zlSymptoms: readonly ZlSymptom[] = [
  {
    kind: "pain",
    title: "Onicocriptose (unha encravada)",
    body: "Dor, inflamação e sensibilidade ao calçar ou caminhar.",
    primaryService: "ingrown",
    related: ["Dor", "Inflamação"],
  },
  {
    kind: "odor",
    title: "Onicomicose (fungos)",
    body: "Protocolo para tratar fungos e acompanhar a recuperação da saúde das unhas.",
    primaryService: "fungus",
    related: ["Fungos", "Unhas"],
  },
  {
    kind: "orthosis",
    title: "Órtese ungueal (anteparos)",
    body: "Correção da curvatura da unha, aliviando a dor e prevenindo encravamento.",
    primaryService: "orthosis",
    related: ["Curvatura", "Recorrência"],
  },
  {
    kind: "laser",
    title: "Laserterapia",
    body: "Auxilia no tratamento de fungos e inflamações, acelerando a recuperação.",
    primaryService: "laser",
    related: ["Apoio clínico", "Recuperação"],
  },
  {
    kind: "heel",
    title: "Podoprofilaxia",
    body: "Limpeza e cuidados preventivos para manter os pés saudáveis.",
    primaryService: "podoprofilaxia",
    related: ["Limpeza", "Prevenção"],
  },
  {
    kind: "wart",
    title: "Verruga plantar",
    body: "Dor ao pisar causada por lesão na sola do pé.",
    primaryService: "plantar_wart",
    related: ["Sola do pé", "Dor ao pisar"],
  },
  {
    kind: "tungiasis",
    title: "Tungíase (Bicho de pé)",
    body: "Lesão dolorosa na pele causada por parasita.",
    primaryService: "tungiasis",
    related: ["Bicho de pé", "Pele"],
  },
  {
    kind: "prevention",
    title: "Reflexologia podal (Relaxante e terapêutica)",
    body: "Relaxante: Técnica suave que promove relaxamento e alívio do estresse. Terapêutica: Estimulação de pontos específicos para equilíbrio e bem-estar do organismo.",
    primaryService: "reflexology",
    related: ["Relaxante", "Terapêutica"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Diagnostic Quiz (3 perguntas) — v7a: pergunta 2 = localização      */
/* ------------------------------------------------------------------ */

export interface ZlQuizOption {
  value: string;
  label: string;
  /**
   * Serviço mapeado por opção. Quando a opção é selecionada, entra como
   * voto no roteamento do resultado. A pergunta 1 (concern) tem maior
   * peso; pergunta 2 (localização) desempata; pergunta 3 (history) ajusta.
   */
  service?: ZlServiceId;
}

export interface ZlQuizQuestion {
  id: "concern" | "location" | "history";
  title: string;
  options: readonly ZlQuizOption[];
}

export const zlQuizQuestions: readonly ZlQuizQuestion[] = [
  {
    id: "concern",
    title: "O que está te incomodando agora?",
    options: [
      { value: "dor", label: "Dor", service: "ingrown" },
      { value: "espessamento", label: "Espessamento", service: "podoprofilaxia" },
      { value: "cor-odor", label: "Cor ou odor", service: "fungus" },
      { value: "prevencao", label: "Prevenção", service: "podoprofilaxia" },
      { value: "verruga", label: "Verruga plantar", service: "plantar_wart" },
      { value: "tungiase", label: "Bicho de pé", service: "tungiasis" },
      { value: "tensao", label: "Tensão / cansaço", service: "reflexology" },
      { value: "pele-fina", label: "Pele fina ou diabete", service: "diabetic" },
    ],
  },
  {
    id: "location",
    title: "Onde exatamente incomoda?",
    options: [
      { value: "dedao", label: "Dedão (hálux)", service: "ingrown" },
      { value: "borda", label: "Borda da unha", service: "ingrown" },
      { value: "calcanhar", label: "Calcanhar", service: "podoprofilaxia" },
      { value: "sola", label: "Sola do pé", service: "plantar_wart" },
      { value: "todos", label: "Todos os pontos", service: "podoprofilaxia" },
    ],
  },
  {
    id: "history",
    title: "Já tentou tratar antes?",
    options: [
      { value: "nunca", label: "Nunca tratei" },
      { value: "em casa", label: "Tentei em casa" },
      { value: "com profissional", label: "Com profissional" },
      { value: "cirurgia", label: "Já fiz cirurgia" },
    ],
  },
] as const;

export const zlQuizCopy = {
  eyebrow: "Triagem inicial",
  title: "Organize seu atendimento em 3 perguntas.",
  body: "Não é diagnóstico online. São 3 perguntas para resumir a queixa antes de falar com a clínica no WhatsApp.",
  resultEyebrow: "Resumo inicial",
  resultTitle: "Seu caso em resumo.",
  resultBody:
    "Leve este resumo para o WhatsApp da ZL. A clínica usa essas informações, e uma foto quando ajuda, para direcionar o procedimento mais adequado antes do horário.",
  resultCta: "Enviar resumo pelo WhatsApp",
  progress: (step: number, total: number) => `${step} de ${total}`,
} as const;

/**
 * Recomendação por serviço com base nas 3 respostas. Algoritmo simples:
 * 1) Coleta votos das opções que trazem `service` anexado (concern +
 *    location).
 * 2) Serviço com maior contagem vence. Empate: concern prevalece.
 * 3) Fallback final: podoprofilaxia (serviço vitrine).
 */
export function recommendServiceFromQuiz(answers: {
  concern: string;
  location: string;
  history: string;
}): ZlServiceId {
  const concernQ = zlQuizQuestions[0];
  const locationQ = zlQuizQuestions[1];

  const concernOption = concernQ.options.find((o) => o.value === answers.concern);
  const locationOption = locationQ.options.find((o) => o.value === answers.location);

  const votes: Partial<Record<ZlServiceId, number>> = {};
  const addVote = (service?: ZlServiceId, weight: number = 1) => {
    if (!service) return;
    votes[service] = (votes[service] ?? 0) + weight;
  };

  // Pergunta 1 tem peso 2 (dor maior que localização).
  addVote(concernOption?.service, 2);
  addVote(locationOption?.service, 1);

  // História de cirurgia = puxar pra encravada (caso crônico).
  if (answers.history === "cirurgia") {
    addVote("ingrown", 1);
  }

  const ranked = (Object.entries(votes) as [ZlServiceId, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  if (ranked.length > 0) {
    return ranked[0][0];
  }
  return "podoprofilaxia";
}

export function buildQuizWhatsappLink(answers: {
  concern: string;
  location: string;
  history: string;
}): string {
  const service = recommendServiceFromQuiz(answers);
  const serviceObj = zlInteractiveServices.find((s) => s.id === service);
  const serviceName = serviceObj?.menuLabel ?? "atendimento";
  const msg = `Oi, respondi a triagem da ZL Podologia. Queixa: ${answers.concern}. Onde incomoda: ${answers.location}. Já tentei: ${answers.history}. Cuidado sugerido: ${serviceName}. Quero agendar um horário.`;
  // Mantém UTM padrão + source quiz_result pra GA4.
  return buildWhatsappLink(msg, "quiz_result");
}

/* ------------------------------------------------------------------ */
/* Jornada do Herói - depoimentos reais do Google                      */
/* ------------------------------------------------------------------ */

/**
 * Depoimentos públicos reais, coletados das avaliações públicas do perfil
 * da ZL Podologia no Google Maps (Fortaleza, 5,0 com 11 avaliações).
 * Por serem reviews públicos, podem ser citados textualmente.
 */
export interface ZlTestimonial {
  firstName: string;
  fullAuthor: string;
  caption: string;
  body: string;
  rating: 5;
  /**
   * Microlinha exibida no rodapé do card para reforçar a origem pública
   * da avaliação (Google) e o volume atual da clínica.
   */
  source: string;
  /** Data aproximada pra marcação Schema.org (não exibida no card). */
  datePublished: string;
}

export const zlTestimonials: readonly ZlTestimonial[] = [
  {
    firstName: "Ivia D.",
    fullAuthor: "Ivia Dias",
    caption: "Cliente verificada - Google",
    body: "Ambiente organizado e acolhedor. Zucarina, profissional competente e trata o cliente com atenção e delicadeza. Jannié é muito atenciosa. Serviço para unha encravada, podologia e muito mais, com excelente atendimento. Vale super a pena! Indico demais!",
    rating: 5,
    source: "Avaliação pública no Google - 5,0 com 11 avaliações",
    datePublished: "2025-11-01",
  },
  {
    firstName: "Jarlon S.",
    fullAuthor: "Jarlon Silva",
    caption: "Cliente verificado - Google",
    body: "O serviço foi ótimo. Fui bem atendido por uma podóloga muito competente e cuidadosa. O lugar era limpo e organizado, o que deixou tudo mais agradável. O tratamento foi eficaz e os preços justos. Recomendo para quem quer cuidar bem dos pés.",
    rating: 5,
    source: "Avaliação pública no Google - 5,0 com 11 avaliações",
    datePublished: "2025-04-01",
  },
  {
    firstName: "Daiane S.",
    fullAuthor: "Daiane Santos",
    caption: "Cliente verificada - Google (Local Guide)",
    body: "Excelente atendimento. Serviço com preço justo e de qualidade. Realizei uma profilaxia e gostei muito do resultado.",
    rating: 5,
    source: "Avaliação pública no Google - 5,0 com 11 avaliações",
    datePublished: "2025-07-01",
  },
] as const;

export const zlTestimonialsCopy = {
  eyebrow: "Avaliações públicas",
  title: "Pacientes que avaliaram a clínica no Google.",
  body: "Depoimentos públicos da ficha da ZL Podologia, com nota 5,0 em 11 avaliações.",
  allReviewsCta: "Ver todos os 11 no Google",
} as const;

/* ------------------------------------------------------------------ */
/* SEO + GEO helpers                                                   */
/* ------------------------------------------------------------------ */

/**
 * URL canônica da landing. Usada no metadata + em Schema.org. Centralizar
 * aqui evita drift quando migrar para subdomain/root em v7b.
 */
export const ZL_CANONICAL_URL = "https://www.zlpodologia.com.br";

/**
 * Palavras-chave locais espalhadas no copy das seções principais (hero,
 * promessa, biossegurança, explorer, FAQ). Mantido aqui pra referência +
 * possível uso em metadata.keywords. Não usá-las em keyword-stuffing — o
 * princípio é: 1x natural por seção, onde cabe.
 */
export const zlLocalKeywords = [
  "podologia em Fortaleza",
  "podóloga Parquelândia",
  "unha encravada Fortaleza",
  "clínica de pés Fortaleza CE",
  "atendimento podológico Bezerra de Menezes",
  "reflexologia podal Fortaleza",
  "podoprofilaxia Fortaleza",
  "laserterapia para fungos Fortaleza",
  "órtese unha Fortaleza",
  "cuidado pé diabético Fortaleza",
  "pre-wedding terapêutico noiva Fortaleza",
  "vale presente aniversário reflexologia",
] as const;

/* ------------------------------------------------------------------ */
/* v9: Experiências e Presentes — Pre-Wedding + Vale Presente          */
/* ------------------------------------------------------------------ */

/**
 * Ofertas premium confirmadas pela Zucarina em 2026-04-22. Consolidadas
 * em UMA seção dedicada "Experiências e Presentes" com 2 grupos (4 cards).
 * Pre-Wedding saiu do Pricing footer notes e Vale Presente é novidade v9.
 */
export interface ZlExperienceCard {
  id:
    | "podopro_reflexologia"
    | "noiva_sublime"
    | "noiva_majestosa"
    | "momento_essencial"
    | "experiencia_encanto";
  group: "oferta_especial" | "pre_wedding" | "vale_presente";
  eyebrow: string;
  title: string;
  duration: string;
  includes: readonly string[];
  price: string;
  priceValue: number;
  featured?: boolean;
  featuredLabel?: string;
  ctaLabel: string;
  whatsappLink: string;
  image?: {
    src: string;
    alt: string;
    coverLayout?: "editorial_full_bleed";
    coverTone?: "ritual_claro" | "ritual_profundo" | "presente_suave" | "presente_assinatura";
    focalPoint?: string;
  };
}

export const zlExperienciasPresentes = {
  eyebrow: "PRESENTES E EXPERIÊNCIAS",
  title: "Presentear ou desacelerar com a assinatura da ZL",
  subtitle:
    "Reflexologia, escalda-pés e rituais de cuidado que podem virar presente digital ou pausa antes do casamento.",
  groups: [
    {
      id: "oferta_especial" as const,
      eyebrow: "OFERTA ESPECIAL",
      title: "Protocolo de podoprofilaxia + reflexologia",
      intro:
        "Uma sessão combinada para cuidar dos pés e desacelerar, com escalda-pés diferenciado como complemento do momento de cuidado.",
      cards: [
        {
          id: "podopro_reflexologia" as const,
          group: "oferta_especial" as const,
          eyebrow: "PROTOCOLO COMBINADO",
          title: "Podoprofilaxia + Reflexologia",
          duration: "Sessão com hora marcada",
          includes: [
            "Podoprofilaxia completa",
            "Reflexologia podal",
            "Escalda-pés diferenciado como cuidado complementar",
          ],
          price: "R$ 180",
          priceValue: 180,
          featured: true,
          featuredLabel: "Oferta especial",
          ctaLabel: "Reservar protocolo",
          whatsappLink: buildWhatsappLink(
            "Oi, quero saber sobre a oferta Podoprofilaxia + Reflexologia por R$ 180.",
            "experience_podopro_reflexology"
          ),
          image: {
            src: "/zl-podologia/social/client-approved/2026-04-28/protocolo-podoprofilaxia-reflexologia-2026-04-28.jpeg",
            alt: "Sessão de reflexologia com escalda-pés preparado para protocolo combinado de podoprofilaxia e reflexologia na ZL Podologia",
            coverLayout: "editorial_full_bleed",
            coverTone: "ritual_claro",
            focalPoint: "50% 52%",
          },
        },
      ],
    },
    {
      id: "pre_wedding" as const,
      eyebrow: "CUIDADO PARA NOIVA",
      title: "Para chegar mais leve ao grande dia",
      intro:
        "Reflexologia e escalda-pés pensados para aliviar a tensão dos preparativos e desacelerar com calma.",
      cards: [
        {
          id: "noiva_sublime" as const,
          group: "pre_wedding" as const,
          eyebrow: "PRE-WEDDING",
          title: "Noiva Sublime",
          duration: "50 minutos",
          includes: [
            "Reflexologia Podal Relaxante",
            "Escalda-pés terapêutico como mimo",
            "Ambientação acolhedora",
          ],
          price: "R$ 180",
          priceValue: 180,
          ctaLabel: "Quero presentear Noiva Sublime",
          whatsappLink: buildWhatsappLink(
            "Oi, quero presentear com a experiência Noiva Sublime (Pre-Wedding 50 min, R$ 180).",
            "experience_noiva_sublime"
          ),
          image: {
            src: "/zl-podologia/generated/v10/value-offer/experience-noiva-sublime.jpg",
            alt: "Composição editorial clara com toalhas, bowl terapêutico e vela usada para contextualizar a experiência Noiva Sublime da ZL Podologia",
            coverLayout: "editorial_full_bleed",
            coverTone: "ritual_claro",
            focalPoint: "52% 58%",
          },
        },
        {
          id: "noiva_majestosa" as const,
          group: "pre_wedding" as const,
          eyebrow: "PRE-WEDDING TERAPÊUTICA",
          title: "Noiva Majestosa",
          duration: "50 minutos",
          includes: [
            "Reflexologia Podal Terapêutica (cuidado profundo)",
            "Escalda-pés especial",
            "Ambientação diferenciada",
            "Mimo especial preparado para a noiva",
          ],
          price: "R$ 240",
          priceValue: 240,
          featured: true,
          featuredLabel: "Mais escolhida pelas noivas",
          ctaLabel: "Quero a experiência Noiva Majestosa",
          whatsappLink: buildWhatsappLink(
            "Oi, quero a experiência Noiva Majestosa (Pre-Wedding terapêutica 50 min, R$ 240).",
            "experience_noiva_majestosa"
          ),
          image: {
            src: "/zl-podologia/generated/v10/value-offer/experience-noiva-majestosa.jpg",
            alt: "Composição editorial terrosa com bowl ritual, velas e textura premium usada para contextualizar a experiência Noiva Majestosa da ZL Podologia",
            coverLayout: "editorial_full_bleed",
            coverTone: "ritual_profundo",
            focalPoint: "50% 48%",
          },
        },
      ],
    },
    {
      id: "vale_presente" as const,
      eyebrow: "VALE-PRESENTE",
      title: "Presente digital com cuidado real",
      intro:
        "Duas opções prontas para presentear com reflexologia e um ritual calmo. A versão Encanto adiciona cartão personalizado.",
      cards: [
        {
          id: "momento_essencial" as const,
          group: "vale_presente" as const,
          eyebrow: "PRESENTE",
          title: "Vale Presente Momento Essencial",
          duration: "50 minutos",
          includes: [
            "Reflexologia Podal Relaxante",
            "Escalda-pés com mimo especial",
            "Ambientação acolhedora",
            "Vale presente digital",
          ],
          price: "R$ 120",
          priceValue: 120,
          ctaLabel: "Presentear Momento Essencial",
          whatsappLink: buildWhatsappLink(
            "Oi, quero presentear com o Vale Presente Momento Essencial (Reflexologia 50min, R$ 120).",
            "experience_momento_essencial"
          ),
          image: {
            src: "/zl-podologia/generated/v10/value-offer/value-gift-card-essencial.jpg",
            alt: "Vale Presente Momento Essencial em envelope claro com amarração delicada e composição editorial suave",
            coverLayout: "editorial_full_bleed",
            coverTone: "presente_suave",
            focalPoint: "50% 52%",
          },
        },
        {
          id: "experiencia_encanto" as const,
          group: "vale_presente" as const,
          eyebrow: "PRESENTE PREMIUM",
          title: "Vale Presente Experiência Encanto",
          duration: "50 minutos",
          includes: [
            "Reflexologia Podal Terapêutica",
            "Escalda-pés especial",
            "Ambientação diferenciada",
            "Vale presente em PDF personalizado",
            "Cartão ilustrado personalizado",
          ],
          price: "R$ 160",
          priceValue: 160,
          featured: true,
          featuredLabel: "Cartão Disney personalizado",
          ctaLabel: "Presentear Experiência Encanto",
          whatsappLink: buildWhatsappLink(
            "Oi, quero presentear com o Vale Presente Experiência Encanto (Reflexologia terapêutica + cartão ilustrado personalizado, R$ 160).",
            "experience_encanto"
          ),
          image: {
            src: "/zl-podologia/generated/v10/value-offer/value-gift-card-encanto.jpg",
            alt: "Vale Presente Experiência Encanto em envelope premium com lacre terroso e composição editorial de presente",
            coverLayout: "editorial_full_bleed",
            coverTone: "presente_assinatura",
            focalPoint: "50% 50%",
          },
        },
      ],
    },
  ],
  closing:
    "Todas as experiências têm hora marcada e podem ser ajustadas no WhatsApp.",
} as const;

export type ZlExperienceGroup = (typeof zlExperienciasPresentes.groups)[number];
