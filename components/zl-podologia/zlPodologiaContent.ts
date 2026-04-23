const WHATSAPP_NUMBER = "5585994358505";

/**
 * Canonical source for every WhatsApp source tag used by the landing.
 * Keep this list narrow on purpose â€” every new origin should be an
 * explicit entry below so GA4/utm reports stay consistent.
 */
export type ZlWhatsappSource =
  | "hero_primary"
  | "topbar_mini"
  | "sticky_mobile"
  | "explorer_ingrown"
  | "explorer_fungus"
  | "explorer_orthosis"
  | "explorer_laser"
  | "explorer_podoprofilaxia"
  | "explorer_reflexology"
  | "explorer_diabetic"
  | "quiz_result"
  | "cta_final"
  | "footer_wa"
  | "storyteller_ingrown"
  | "faq_wa"
  | "convenios"
  | "fiduciary_bar"
  | "packages"
  | "experience_noiva_sublime"
  | "experience_noiva_majestosa"
  | "experience_momento_essencial"
  | "experience_encanto";

/**
 * Build a WhatsApp wa.me link with an encoded message body and standardized
 * UTM parameters. Every WhatsApp entry point on the landing must pass
 * through this helper so the `utm_content` is a known source value.
 *
 * Using `api.whatsapp.com/send?phone=...` here (not `wa.me`) because the
 * classic endpoint is more resilient across iOS Safari + in-app browsers
 * and accepts unescaped query parameters. Keeping UTMs *outside* the
 * text body keeps GA4 attribution clean on the destination page (if one
 * ever forwards the link into a landing).
 */
export function buildWhatsappLink(
  message: string,
  source: ZlWhatsappSource = "cta_final"
): string {
  const utmPayload = `\n\n_Origem: landing v7-final (${source})_`;
  const composed = `${message}${utmPayload}`;
  // Note: the UTM query string below is for external parsers that may
  // follow the redirect chain. WhatsApp itself strips unknown params,
  // but keeping them here keeps the tag surface readable in analytics
  // referrer logs and makes QA easier.
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(composed)}&utm_source=landing&utm_medium=whatsapp&utm_campaign=v7final&utm_content=${source}`;
}

export const zlLinks = {
  whatsapp: buildWhatsappLink(
    "OlÃ¡, quero agendar um horÃ¡rio na ZL Podologia em Fortaleza.",
    "hero_primary"
  ),
  whatsappUrgente: buildWhatsappLink(
    "OlÃ¡, estou com dor ou inflamaÃ§Ã£o e queria uma avaliaÃ§Ã£o na ZL Podologia.",
    "cta_final"
  ),
  whatsappConvenios: buildWhatsappLink(
    "Oi, gostaria de saber quais convÃªnios e condiÃ§Ãµes a ZL Podologia aceita.",
    "convenios"
  ),
  whatsappTopbar: buildWhatsappLink(
    "OlÃ¡, quero agendar um horÃ¡rio na ZL Podologia em Fortaleza.",
    "topbar_mini"
  ),
  whatsappSticky: buildWhatsappLink(
    "OlÃ¡, quero agendar um horÃ¡rio na ZL Podologia em Fortaleza.",
    "sticky_mobile"
  ),
  whatsappFooter: buildWhatsappLink(
    "OlÃ¡, quero agendar um horÃ¡rio na ZL Podologia em Fortaleza.",
    "footer_wa"
  ),
  whatsappFinalCta: buildWhatsappLink(
    "OlÃ¡, quero agendar um horÃ¡rio na ZL Podologia em Fortaleza.",
    "cta_final"
  ),
  whatsappPackages: buildWhatsappLink(
    "Oi, gostaria de saber sobre pacotes e plano mensal de cuidados na ZL Podologia.",
    "packages"
  ),
  whatsappNoivaSublime: buildWhatsappLink(
    "Oi, quero presentear com a experiÃªncia Noiva Sublime (Pre-Wedding 50 min, R$ 180).",
    "experience_noiva_sublime"
  ),
  whatsappNoivaMajestosa: buildWhatsappLink(
    "Oi, quero a experiÃªncia Noiva Majestosa (Pre-Wedding terapÃªutica 50 min, R$ 240).",
    "experience_noiva_majestosa"
  ),
  whatsappMomentoEssencial: buildWhatsappLink(
    "Oi, quero presentear com o Vale Presente Momento Essencial (Reflexologia 50min, R$ 120).",
    "experience_momento_essencial"
  ),
  whatsappExperienciaEncanto: buildWhatsappLink(
    "Oi, quero presentear com o Vale Presente ExperiÃªncia Encanto (Reflexologia terapÃªutica + cartÃ£o ilustrado personalizado, R$ 160).",
    "experience_encanto"
  ),
  whatsappNumber: WHATSAPP_NUMBER,
  // Google Maps: busca oficial que cai direto na ficha certa da ZL em
  // Fortaleza (Galeria Jos? Bernardo, Parquel?ndia). Prefere-se a busca
  // por nome para evitar dependencia de shortlinks que podem expirar.
  maps: "https://www.google.com/maps/search/ZL+Podologia+Fortaleza",
  googleBusinessProfile: "https://www.google.com/maps/search/ZL+Podologia+Fortaleza",
  instagram: "https://www.instagram.com/zlpodologia/",
  facebook: "https://www.facebook.com/zl.podologia",
  linktree: "https://linktr.ee/zlpodologia",
  phoneTel: "tel:+5585994358505",
  imagePolicy: "/lab/zl-podologia/politica-de-imagens",
} as const;

export const zlContact = {
  whatsappDisplay: "(85) 9 9435-8505",
  phoneDisplay: "(85) 9 9435-8505",
  handle: "@zlpodologia",
  email: "zlpodologia@gmail.com",
  emailLegacy: "contato@zlpodologia.com.br",
} as const;

export const zlHeroProof = [
  { label: "Nota Google", value: "5,0", caption: "11 avaliaÃ§Ãµes pÃºblicas, cuidado artesanal." },
  { label: "Atendimento", value: "Ter - Sab", caption: "Fortaleza, hora marcada." },
  { label: "AvaliaÃ§Ã£o", value: "Leitura clÃ­nica", caption: "Antes do procedimento, sem pressa." },
] as const;

/* ------------------------------------------------------------------ */
/* v8-merge: Proof strip 4-col (entre Hero e Faixa Fiduciaria)         */
/* ------------------------------------------------------------------ */

/**
 * Quatro cartoes de prova editorial abaixo do hero. Paleta rose-wash
 * (`#FBF7F4` bg + `#E6D2C7` borders). Cada item e uma confirmacao
 * concreta - numero, protocolo, postura cl?nica ou endere?o. Denso o
 * suficiente pra ser escaneavel sem virar parede de texto.
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
    title: "Nota mÃ¡xima em 11 avaliaÃ§Ãµes pÃºblicas",
    body: "AvaliaÃ§Ãµes reais e pÃºblicas na ficha oficial da clÃ­nica.",
  },
  {
    kind: "protocol",
    eyebrow: "Protocolo documentado",
    title: "EspÃ­cula + azul de metileno",
    body: "Retirada tÃ©cnica com antimicrobiano e fotossensibilizador em casos de unha encravada.",
  },
  {
    kind: "individual",
    eyebrow: "Atendimento individual",
    title: "Uma paciente por vez",
    body: "Hora marcada, sem correria entre atendimentos.",
  },
  {
    kind: "location",
    eyebrow: "Fortaleza / ParquelÃ¢ndia",
    title: "Galeria JosÃ© Bernardo",
    body: "Av. Bezerra de Menezes, 2203 - Sala 5. Ponto fÃ­sico com rota no Maps.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* v8-merge: Comparativa Podologia x Pedicure                          */
/* ------------------------------------------------------------------ */

/**
 * Comparativa educativa extraida do `-exact` + reescrita com voz real da
 * ZL. Entra entre o Symptom Grid e o Service Explorer - filtra curioso
 * e justifica o preco. Copy em primeira pessoa / factual, sem agredir
 * pedicures.
 */
export const zlComparePodology = {
  eyebrow: "Podologia x pedicure",
  title: "DiferenÃ§a entre podologia clÃ­nica e pedicure comum.",
  body:
    "A ZL cuida de unhas, pele e pÃ©s com foco clÃ­nico. Pedicure comum tem foco estÃ©tico e segue outra proposta de atendimento.",
  podology: {
    title: "Podologia clÃ­nica",
    subtitle: "O que entra no atendimento da ZL Podologia.",
    items: [
      "FormaÃ§Ã£o tÃ©cnica reconhecida em podologia.",
      "Instrumental esterilizado em autoclave classe B validada.",
      "Kit individualizado por atendimento, aberto diante de vocÃª.",
      "Protocolo documentado com espÃ­cula e azul de metileno em unha encravada.",
      "Leitura do caso antes do procedimento.",
      "OrientaÃ§Ã£o de continuidade e retorno quando o caso pede.",
    ],
  },
  pedicure: {
    title: "Pedicure comum",
    subtitle: "CaracterÃ­sticas tÃ­picas da pedicure cosmÃ©tica.",
    items: [
      "Sem formaÃ§Ã£o tÃ©cnica especÃ­fica em podologia.",
      "Instrumental nem sempre esterilizado em autoclave validada.",
      "Foco estÃ©tico em corte, lixamento e esmaltaÃ§Ã£o.",
      "Sem protocolo clÃ­nico para casos como unha encravada ou fungos.",
      "NÃ£o realiza leitura clÃ­nica antes do acabamento.",
      "Sem registro profissional regulamentado como podÃ³loga.",
    ],
  },
} as const;

// Tagline oficial da ZL Podologia (copy real extraida do Instagram @zlpodologia).
export const zlBrandTagline = "PÃ©s bem cuidados fazem toda a diferenÃ§a";

// Micro-assinatura da marca (fechamento natural usado pela ZL em posts).
export const zlBrandSignature =
  "Cuidar dos pÃ©s Ã© cuidar da sua qualidade de vida.";

// Mantido vazio para remover ruÃ­do redundante do hero sem quebrar o map atual.
export const zlHeroChips = [] as const;

// Micro-review usado no hero â€” prova imediata (Fix 2 da reflexao E).
// Fonte: Ivia D., avalia??o publica no Google (nota 5 / 5).
export const zlHeroMicroReview = {
  quote:
    "Ambiente organizado e acolhedor. Zucarina, profissional competente e delicada.",
  author: "Ivia D.",
  source: "avaliaÃ§Ã£o pÃºblica no Google",
} as const;

// Mini destaques que aparecem logo abaixo do hero (barra de confiança rápida).
export const zlQuickStrip = [
  { label: "Avaliação", body: "Leitura clínica do caso antes do procedimento." },
  { label: "Laser", body: "Tecnologia como apoio em protocolos de unha e pele." },
  { label: "Humanizado", body: "Atendimento calmo, explicando cada etapa." },
  { label: "WhatsApp", body: "Resposta rápida para agendar ou tirar dúvida." },
] as const;

// Promessa editorial do topo: 2 queixas de urgÃªncia + 2 continuidades.
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
  | "reflexology"
  | "diabetic";

/**
 * Cards principais do Service Explorer na v7-final â€” 6 cards, ordem
 * obrigatoria por prioridade comercial (catalogo F confirmado pela
 * Zucarina em 2026-04-21):
 *
 * 1. Unha encravada â€” produto principal de conversao
 * 2. Fungos â€” recorrencia + gap de venda declarado
 * 3. ?rtese â€” diferencial t?cnico (promovido de sub-variante v7a)
 * 4. Laserterapia â€” alto valor percebido (promovido de sub-variante v7a)
 * 5. Podoprofilaxia â€” porta de entrada, mais volumoso hoje
 * 6. Reflexologia podal â€” bem-estar
 *
 * P? diab?tico NAO entra como card principal (default: sub-variante de
 * Podoprofilaxia + linha no Pricing). Pre-Wedding removido do Explorer
 * e mencionado apenas como oferta premium discreta no Pricing/Ambiente.
 */
export const ZL_MAIN_SERVICE_IDS: readonly ZlServiceId[] = [
  "ingrown",
  "fungus",
  "orthosis",
  "laser",
  "podoprofilaxia",
  "reflexology",
] as const;

// A6 deve consumir esta lista para limitar o badge "PrioritÃ¡rio" a 2 serviÃ§os.
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
   * Sub-variantes listadas como "Tambem oferecemos" dentro do card. Usado
   * na v7-final pra encaixar encravada-com-inflama??o, massagem, verruga
   * plantar, atendimento idosos, p? diab?tico dentro dos cards corretos.
   */
  subVariants?: readonly {
    title: string;
    price: string;
    body: string;
  }[];
  /**
   * Foto real dedicada ao card. Quando presente, o Explorer renderiza a
   * foto ao inves da arte 2D â€” fica mais autentico e sustenta autoridade
   * cl?nica. `alt` deve ser descritivo pro SEO + acessibilidade.
   */
  photo?: {
    src: string;
    alt: string;
  };
  /**
   * Tratamento visual premium (eyebrow dourado + borda tintada) â€” reservado
   * pra quando/se Pre-Wedding voltar como card. Na v7-final nao ha card
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
   * Origem UTM pra este card (explorer_<service>). Usado pelo builder de
   * WhatsApp quando gera o link do CTA.
   */
  whatsappSource: ZlWhatsappSource;
}

export const zlInteractiveServices: readonly ZlInteractiveService[] = [
  {
    id: "ingrown",
    menuLabel: "Unha encravada",
    title: "Alívio para unha encravada em Fortaleza",
    price: "R$ 150 (simples) | R$ 200 (com inflamação)",
    pain: "Dor que impede de caminhar direito, inflamação persistente e corte errado em casa que só piora.",
    promise:
      "Limpeza cuidadosa da área, retirada da espícula (o pedaço da unha que penetra a pele) com técnica adequada para aliviar a dor sem gerar novo trauma, e aplicação de azul de metileno com fotossensibilizador - que tem ação antimicrobiana e acelera a recuperação.",
    visualLabel: "Protocolo real para aliviar a dor",
    visualSupport: "Leitura do caso, retirada da espícula e retorno orientado.",
    highlights: [
      "Queixa que mais costuma chegar com urgência.",
      "Protocolo com azul de metileno e fotossensibilizador (ação antimicrobiana real).",
      "Pode abrir caminho para órtese e retorno quando indicado, para não voltar a encravar.",
    ],
    steps: [
      "Limpeza completa da região com técnica adequada.",
      "Retirada da espícula sem trauma adicional.",
      "Aplicação de azul de metileno com fotossensibilizador.",
      "Orientação pós-procedimento e agendamento da manutenção.",
    ],
    includes: [
      "Avaliação do canto da unha e grau de inflamação",
      "Protocolo com azul de metileno e fotossensibilizador (ação antimicrobiana)",
      "Orientação de calçado e cuidado em casa nos primeiros dias",
      "Agendamento da manutenção periódica para não voltar a encravar",
    ],
    subVariants: [
      {
        title: "Encravada com inflamação",
        price: "R$ 200",
        body: "Quando a avaliação mostra inflamação ou infecção localizada, o protocolo ganha etapas extras e o valor sobe - a critério da podóloga.",
      },
    ],
    photo: {
      src: "/zl-podologia/social/edited-pro/procedimentos/frontal-instrumento-fino-pro.jpg",
      alt: "Profissional da ZL Podologia fazendo retirada de espícula de unha encravada com instrumento fino e técnica precisa em Fortaleza",
    },
    ctaLabel: "Quero aliviar essa dor",
    ctaWhatsappMessage:
      "Oi, queria entender meu caso de unha encravada com a ZL Podologia.",
    whatsappSource: "explorer_ingrown",
  },
  {
    id: "fungus",
    menuLabel: "Fungos",
    title: "Protocolo para fungos nas unhas",
    price: "R$ 100 por unha por sessão",
    pain: "Unha amarelada, grossa, frágil e receio de mostrar os pés.",
    promise:
      "Leitura do caso, protocolo estruturado e expectativa honesta sobre tempo de resposta. O laser entra como camada complementar quando o caso indica - parte dos tratamentos avançados de fungos (R$ 100 por sessão).",
    visualLabel: "Protocolo com acompanhamento",
    visualSupport: "Tratamento organizado sessão a sessão, sem promessa milagrosa.",
    highlights: [
      "Melhora pede continuidade, não sessão solta.",
      "Conversa honesta sobre tempo e cuidado em casa.",
      "Pacotes de tratamento são montados conforme o caso.",
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
        body: "Casos que pedem protocolo mais intenso, com avaliação podológica aprofundada antes de iniciar.",
      },
    ],
    photo: {
      src: "/zl-podologia/social/edited-pro/procedimentos/pos-procedimento-frasco-pro.jpg",
      alt: "Pós-procedimento de tratamento de fungos nas unhas com frasco de produto clínico e curativo na ZL Podologia Fortaleza",
    },
    ctaLabel: "Quero entender meu caso",
    ctaWhatsappMessage: "Oi, queria tratar micose de unha na ZL Podologia.",
    whatsappSource: "explorer_fungus",
  },
  {
    id: "orthosis",
    menuLabel: "Órtese",
    title: "Órtese para correção da curvatura da unha",
    price: "R$ 60 (simples) | R$ 100 (metálica) por unha",
    pain: "Unha que volta a encravar a cada semana e dor recorrente.",
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
      src: "/zl-podologia/social/edited-pro/procedimentos/aplicador-transparente-pro.jpg",
      alt: "Aplicação técnica de instrumento transparente para correção de curvatura de unha (órtese) na ZL Podologia em Fortaleza",
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
    visualLabel: "Tecnologia usada com critério",
    visualSupport: "Apoio clínico quando o caso realmente pede.",
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
      src: "/zl-podologia/social/edited-pro/equipe/profissional-exame-frontal-pro.jpg",
      alt: "Profissional da ZL Podologia em exame clínico frontal com EPI completo em ambiente tecnológico - apoio da laserterapia como protocolo clínico",
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
    price: "R$ 100 dinheiro | R$ 105 cartão",
    pain: "Calos, aspereza, desconforto e pés pesados no fim do dia.",
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
        title: "Remoção de verruga plantar",
        price: "R$ 100 por sessão",
        body: "Tratamento local quando a avaliação identifica a necessidade.",
      },
    ],
    photo: {
      src: "/zl-podologia/social/edited-pro/procedimentos/rotativo-procedimento-pro.jpg",
      alt: "Podoprofilaxia completa com motor rotativo na ZL Podologia em Fortaleza - limpeza técnica dos pés",
    },
    ctaLabel: "Agendar podoprofilaxia",
    ctaWhatsappMessage: "Oi, quero agendar podoprofilaxia na ZL Podologia.",
    whatsappSource: "explorer_podoprofilaxia",
  },
  {
    id: "reflexology",
    menuLabel: "Reflexologia",
    title: "Reflexologia podal (Relaxante e Terapêutica)",
    price: "R$ 80 a R$ 150",
    tagline:
      "Talvez o que seu corpo esteja pedindo seja só um momento de cuidado e pausa.",
    pain: "Estresse constante, cansaço no corpo, ansiedade, dores crônicas, tensão muscular e necessidade de relaxar de verdade.",
    promise:
      "A reflexologia podal usa estímulos em pontos específicos dos pés ligados a diferentes partes do corpo. Como reflexoterapeuta, realizo atendimentos personalizados em duas modalidades: Relaxante (para descanso e alívio do dia a dia) e Terapêutica (pontos reflexos de órgãos e sistemas, como apoio para dores crônicas, ansiedade, fibromialgia e desequilíbrios). Cada sessão é direcionada à sua necessidade - terapia complementar que busca estimular o equilíbrio natural do corpo.",
    visualLabel: "Pausa guiada para o corpo",
    visualSupport: "Ritmo calmo, pontos dirigidos e ambiente terapêutico.",
    highlights: [
      "Duas modalidades: Relaxante (descanso) e Terapêutica (pontos reflexos dirigidos).",
      "Terapia complementar com autoridade de reflexoterapeuta.",
      "Atende quem chega por bem-estar e quem chega com dor crônica ou ansiedade.",
    ],
    steps: [
      "Leitura rápida de como você chegou (estresse, dor, tensão, cansaço).",
      "Escolha da modalidade: Relaxante (descanso) ou Terapêutica (pontos dirigidos).",
      "Estímulo de pontos reflexos com técnica personalizada para o seu caso.",
      "Momento de pausa: você sai mais leve, mais presente e com o corpo em equilíbrio.",
    ],
    includes: [
      "Modalidade Relaxante: estresse, cansaço físico e mental, descanso profundo",
      "Modalidade Terapêutica: dores crônicas, tensão muscular, ansiedade, fibromialgia, desequilíbrios",
      "Sessão personalizada respeitando necessidade individual",
      "Ambiente calmo, sem pressa entre pacientes",
    ],
    subVariants: [
      {
        title: "Reflexologia Relaxante",
        price: "R$ 80 a R$ 100",
        body: "Para excesso de estresse, cansaço do dia a dia e necessidade de descanso profundo.",
      },
      {
        title: "Reflexologia Terapêutica",
        price: "R$ 100 a R$ 150",
        body: "Pontos reflexos dirigidos a órgãos e sistemas. Apoia alívio de dores crônicas, ansiedade, fibromialgia e desequilíbrios do organismo.",
      },
      {
        title: "Massagem terapêutica",
        price: "R$ 100 a R$ 150",
        body: "Versão mais aprofundada focada em liberar tensão muscular de forma dirigida.",
      },
    ],
    photo: {
      src: "/zl-podologia/social/edited-pro/atendimento/reflexologia-paciente-sessão-pro.jpg",
      alt: "Sessão de reflexologia podal com paciente em repouso na ZL Podologia Fortaleza",
    },
    ctaLabel: "Quero um momento de pausa",
    ctaWhatsappMessage:
      "Oi, quero saber sobre a reflexologia podal para relaxar na ZL Podologia.",
    whatsappSource: "explorer_reflexology",
  },
  // P? diab?tico definido como servi?o completo (usado em sub-variante de
  // Podoprofilaxia + linha do Pricing). NAO entra em ZL_MAIN_SERVICE_IDS.
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
 * Cases com antes/depois reais â€” v7-refine.
 *
 * Agora cada card carrega fotos reais da ZL (antes + depois) quando
 * disponivel, via campos `beforePhoto` / `afterPhoto`. O texto `before`
 * / `after` continua servindo como legenda explicativa abaixo das imagens.
 *
 * Para Podoprofilaxia (sem antes/depois visual obvio) a copy e "Experiencia
 * de atendimento" â€” mostramos procedimento em andamento + resultado pos.
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
    title: "Fungos nas unhas",
    tag: "Protocolo",
    before: "Unha opaca, grossa ou frágil, sem clareza de tratamento.",
    after: "Protocolo definido, acompanhamento visual e leitura honesta do tempo.",
    note: "Protocolo com azul de metileno documentado: hálux isolado após o início do tratamento e par de pés após o protocolo.",
    beforePhoto: {
      src: "/zl-podologia/social/procedimentos/azul-metileno-04.jpg",
      alt: "Antes: hálux com unha amarelada e aplicação de azul de metileno - estado após o início do tratamento de fungos na ZL Podologia Fortaleza",
    },
    afterPhoto: {
      src: "/zl-podologia/social/procedimentos/azul-metileno-05-par.jpg",
      alt: "Depois: dois pés lado a lado após protocolo de azul de metileno para fungos nas unhas na ZL Podologia Fortaleza",
    },
  },
  {
    title: "Podoprofilaxia",
    tag: "Experiência",
    before: "Procedimento em andamento: fresa técnica em uso.",
    after: "Acabamento limpo e aplicação do protocolo final.",
    note: "Registro do atendimento em andamento e do acabamento final, sem comparação artificial.",
    beforePhoto: {
      src: "/zl-podologia/social/procedimentos/motor-fresa-detalhe.jpg",
      alt: "Procedimento em andamento: fresa técnica em uso em sessão de podoprofilaxia na ZL Podologia Fortaleza",
    },
    afterPhoto: {
      src: "/zl-podologia/social/procedimentos/azul-metileno-03.jpg",
      alt: "Acabamento clínico após sessão de podoprofilaxia com protocolo finalizado na ZL Podologia Fortaleza",
    },
  },
] as const;

/**
 * Pricing v7-final â€” 3 buckets (Basicos / Intermediarios / Avan?ados)
 * reescritos a partir do catalogo F oficial. Linhas em pares
 * servi?o + valor/faixa, com nota curta onde faz sentido.
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
    "Valores dos atendimentos, retornos, pacotes e presentes da ZL, com clareza sobre cada etapa.",
} as const;

export const zlPricingGroups: readonly ZlPricingBucketGroup[] = [
  {
    bucket: "basicos",
    title: "Avaliação, manutenção e prevenção",
    subtitle: "Para começar o cuidado ou manter o pé em ordem.",
    rows: [
      {
        label: "Podoprofilaxia",
        price: "R$ 100 dinheiro | R$ 105 cartão",
        note: "Limpeza completa, corte técnico, desbaste e hidratação. Serviço mais vendido.",
        tone: "accent",
      },
      {
        label: "Desbaste de calos (isolado)",
        price: "R$ 100",
        note: "Remoção pontual de calos e calosidades fora do pacote de profilaxia.",
      },
      {
        label: "Hidratação de parafina",
        price: "R$ 100",
        note: "Camada de hidratação profunda com parafina para pele ressecada.",
      },
      {
        label: "Avaliação inicial",
        price: "R$ 69",
        note: "Leitura clínica do caso antes do procedimento.",
      },
    ],
  },
  {
    bucket: "intermediarios",
    title: "Dor, inflamação e resolução",
    subtitle: "Quando o pé já pede procedimento técnico e alívio rápido.",
    rows: [
      {
        label: "Unha encravada simples",
        price: "R$ 150",
        note: "Retirada da espícula com técnica + azul de metileno. Produto principal.",
        tone: "accent",
      },
      {
        label: "Unha encravada com inflamação",
        price: "R$ 200",
        note: "Protocolo mais intenso a critério da avaliação podológica.",
      },
      {
        label: "Tratamento de fungos (onicomicose)",
        price: "R$ 100 por unha por sessão",
        note: "Protocolo progressivo - resultado exige continuidade e cuidado em casa.",
      },
      {
        label: "Remoção de verruga plantar",
        price: "R$ 100 por sessão",
        note: "Tratamento local quando a avaliação identifica a necessidade.",
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
        note: "Protocolo mais intenso - requer avaliação podológica aprofundada.",
      },
      {
        label: "Reflexologia podal",
        price: "R$ 80 a R$ 100",
        note: "Camada de bem-estar com contexto terapêutico.",
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
 * Rodape do Pricing â€” notas finais (pacotes, plano mensal, Pre-Wedding,
 * pagamento). Centraliza a copy pra nao dispersar detalhes.
 */
export const zlPricingFooterNotes = [
  "AvaliaÃ§Ã£o inicial: R$ 69 para entender o caso antes do procedimento.",
  "Pacotes e plano mensal de cuidados sÃ£o montados no WhatsApp conforme o caso.",
  "TambÃ©m hÃ¡ experiÃªncias e presentes sob medida, inclusive Pre-Wedding terapÃªutica.",
  "Pagamento em dinheiro ou cartÃ£o; em alguns serviÃ§os o cartÃ£o acrescenta R$ 5.",
] as const;

// Legacy flat pricing â€” mantido como re-export pra cobrir refs antigas,
// mas nao e mais fonte de verdade. Usar `zlPricingGroups`.
export const zlPricing: readonly ZlPricingRow[] = zlPricingGroups.flatMap(
  (g) => g.rows
);

export const zlTeamValues = [
  "Atendimento humanizado do primeiro contato ao retorno.",
  "PodÃ³logas qualificadas, como jÃ¡ aparece nos ativos pÃºblicos da marca.",
  "Ritual de cuidado que combina tÃ©cnica, delicadeza e orientaÃ§Ã£o clara.",
  "Sala reservada, hora marcada e sem correria entre pacientes.",
] as const;

/**
 * Urgencia honesta (Fix 6 da reflexao E) â€” converte a "pequenez" da ZL
 * (11 reviews) em vantagem narrativa. Usado na Faixa Fiduciaria e na
 * secao de Equipe/Pricing conforme espaco permitir.
 */
export const zlUrgencyCopy = {
  title: "Uma paciente por vez.",
  body:
    "Atendimento individualizado â€” por isso mantemos nota 5,0 com 11 avaliaÃ§Ãµes pÃºblicas no Google.",
} as const;

/**
 * Profissionais da ZL Podologia confirmadas publicamente em avaliacoes
 * do Google e no Instagram da cl?nica. A bio e em primeira pessoa, em
 * torno de 50-70 palavras, combinando linguagem publica dos reviews
 * com voz da propria ZL (copy do IG). Nao inventar CRT, formacao, anos
 * de experiencia ou especialidades sem fonte da propria ZL.
 */
export interface ZlProfessional {
  name: string;
  role: string;
  /** Curta descricao em palavras j? publicas nos reviews do Google. */
  description: string;
  /** Bio em primeira pessoa (50-70 palavras). */
  bio: string;
  /** Identificador textual exibido na secao. */
  handle?: string;
  /** Path da foto quando ha retrato disponivel; fallback vai pro avatar SVG. */
  photo?: {
    src: string;
    alt: string;
    /**
     * Indica se o crop esconde o rosto (LGPD fallback). True = usar crop
     * editorial lateral/parcial; false = retrato completo liberado.
     *
     * Na v7-final a foto pro (profissional-close-autoridade-pro) e
     * autorizada, portanto cropProtected = false.
     */
    cropProtected?: boolean;
  };
}

export const zlProfessionals: readonly ZlProfessional[] = [
  {
    name: "Zucarina",
    role: "PodÃ³loga responsÃ¡vel",
    description:
      "Profissional competente que trata o cliente com atenÃ§Ã£o e delicadeza, nas palavras das pacientes.",
    bio: "Eu sou a Zucarina. Cuido dos pÃ©s de cada paciente como se fossem Ãºnicos, uma por vez, com tempo para ouvir o caso antes de colocar a mÃ£o no instrumental. Gosto de explicar o que estou fazendo e por quÃª, porque pÃ© bem cuidado Ã© pÃ© entendido. Aqui na ZL, em Fortaleza, vocÃª nÃ£o vai ser mais uma ficha.",
    // v7-earthy: foto close-autoridade-pro (jaleco branco + touca descartavel
    // + mascara cirurgica + oculos pretos) confirmada pelo Yuri como sendo
    // da Zucarina em 2026-04-21. cropProtected=false pq e autorizada.
    photo: {
      src: "/zl-podologia/social/edited-pro/equipe/profissional-close-autoridade-pro.jpg",
      alt: "Zucarina, podÃ³loga responsÃ¡vel da ZL Podologia, em close clÃ­nico com EPI completo â€” jaleco branco, touca descartÃ¡vel e mÃ¡scara cirÃºrgica â€” em Fortaleza",
      cropProtected: false,
    },
  },
  {
    name: "Jannie",
    role: "PodÃ³loga",
    description:
      "Atenciosa e cuidadosa no atendimento â€” citada nominalmente nas avaliaÃ§Ãµes pÃºblicas da clÃ­nica. Atende com EPI completo (jaleco verde, Ã³culos).",
    bio: "Eu sou a Jannie. Entro junto no cuidado de cada paciente â€” protocolo, atenÃ§Ã£o individual e o mesmo ritmo calmo que a ZL construiu. As pacientes costumam dizer que sou atenciosa, e Ã© assim mesmo que eu quero que vocÃª sinta o atendimento: tempo, explicaÃ§Ã£o e mÃ£o firme onde o caso pede.",
    handle: "@jannier.silva412",
    // v7-earthy BLOCO B: foto real da Jannie em jannie-retrato.jpg â€” wide
    // shot top-down da sala onde Jannie aparece sentada de jaleco verde,
    // oculos e cabelo preto curto, a esquerda-centro do frame. O crop via
    // object-position customizado no ZlProfessionalHero centraliza nela.
    // cropProtected=false â€” autorizacao LGPD j? coberta pela mesma politica.
    photo: {
      src: "/zl-podologia/social/equipe/jannie-retrato.jpg",
      alt: "Jannie, podÃ³loga da ZL Podologia, atendendo uma paciente na sala da clÃ­nica em Fortaleza â€” jaleco verde, Ã³culos, atenÃ§Ã£o individualizada",
      cropProtected: false,
    },
  },
] as const;

export const zlTeamHeadline = {
  eyebrow: "Quem cuida dos seus pÃ©s",
  title: "Zucarina e Jannie, as podÃ³logas da ZL em Fortaleza.",
  body:
    "Duas profissionais, mesmo ritual: leitura cuidadosa do caso, execuÃ§Ã£o tÃ©cnica com delicadeza e orientaÃ§Ã£o de retorno. Nome e atenÃ§Ã£o individual sÃ£o parte da nota 5,0.",
} as const;

export const zlConsultFlow = [
  "VocÃª chega com hora marcada, com o motivo do atendimento jÃ¡ entendido.",
  "A consulta comeÃ§a pela avaliaÃ§Ã£o do pÃ©, da unha e do nÃ­vel de desconforto.",
  "A profissional executa o cuidado principal e explica o que pede continuidade.",
  "Se fizer sentido, o retorno jÃ¡ sai sugerido dentro do mesmo ciclo.",
] as const;

export const zlPodologyFacts = [
  {
    title: "O que a podologia trata",
    body: "Podologia cuida e previne problemas nos pés, nas unhas e na pele. Vai muito além do acabamento estético da pedicure.",
  },
  {
    title: "Quando procurar ajuda",
    body: "Dor ao andar, unha encravada, calos, fungos, fissuras ou pés sensíveis já são bons motivos para buscar uma avaliação.",
  },
  {
    title: "Pedicure x podologia",
    body: "A pedicure tem foco estético. A podologia trabalha leitura clínica, prevenção e cuidado técnico do problema.",
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
    a: "Sim. Esses são justamente os casos prioritários: o ideal é avaliar logo para evitar piora e orientar a continuidade. Unha encravada simples: R$ 150. Com inflamação: R$ 200 (a critério da avaliação).",
  },
  {
    q: "Qual a diferença entre avaliação e procedimento?",
    a: "A avaliação (R$ 69) é a leitura do caso: a profissional entende o que está acontecendo e indica o cuidado certo. O procedimento é a execução do cuidado em si, com valor conforme o serviço.",
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
    q: "Tem pacotes de tratamento ou plano mensal?",
    a: "Sim, há pacotes de tratamento e plano mensal de cuidados sob consulta. O acompanhamento é organizado conforme o caso, com preço personalizado. É só perguntar pelo WhatsApp.",
  },
  {
    q: "Posso agendar pelo WhatsApp?",
    a: "Sim. O WhatsApp é o canal principal para marcar horário, confirmar e tirar dúvidas. Você fala direto com a clínica.",
  },
  {
    q: "Como é o pagamento?",
    a: "Aceita dinheiro e cartão. Em alguns serviços o cartão tem acréscimo de R$ 5. A forma de pagamento é confirmada junto do agendamento.",
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
  // Parquel?ndia). Usadas pelo Schema.org e pela politica de imagens.
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
 * Hor?rio em formato schema.org (Tu-Fr 09:00-16:00, Sa 09:00-12:00).
 * Fonte de verdade unica pra JSON-LD + microdata.
 */
export const zlScheduleSchema = [
  { day: "Tuesday", open: "09:00", close: "16:00" },
  { day: "Wednesday", open: "09:00", close: "16:00" },
  { day: "Thursday", open: "09:00", close: "16:00" },
  { day: "Friday", open: "09:00", close: "16:00" },
  { day: "Saturday", open: "09:00", close: "12:00" },
] as const;

/**
 * Hor?rio em formato numerico pra usar no calculo de "aberto agora"
 * (ZlOpenStatus, Fix 1 da reflexao E). JavaScript Date.getDay() usa
 * 0 = Domingo, 1 = Segunda, ..., 6 = Sabado.
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
    // "Aberto agora" â€” renderizado dinamicamente (ZlOpenStatus). Os
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
      href: "https://api.whatsapp.com/send?phone=5585994358505&text=" +
        encodeURIComponent("Olá, quero agendar um horário na ZL Podologia em Fortaleza.") +
        "&utm_source=landing&utm_medium=whatsapp&utm_campaign=v7final&utm_content=fiduciary_bar",
      label: "Falar agora",
    },
  },
] as const;

// Backwards-compat: TrustBar legacy (nao usado mais pela landing v7a, mas
// ainda exportado pra cobertura de refs que possam sobrar).
export type ZlTrustBarItemKind = ZlFiduciaryBarItemKind;
export type ZlTrustBarItem = ZlFiduciaryBarItem;
export const zlTrustBarItems = zlFiduciaryBarItems;

/* ------------------------------------------------------------------ */
/* Biosseguranca section                                               */
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
    body: "EsterilizaÃ§Ã£o validada de todo instrumental, com ciclo monitorado.",
  },
  {
    kind: "ultrasound",
    title: "Lavagem ultrassÃ´nica",
    body: "RemoÃ§Ã£o mecÃ¢nica de resÃ­duos antes de cada ciclo de esterilizaÃ§Ã£o.",
  },
  {
    kind: "kit",
    title: "Instrumental individualizado",
    body: "Kit Ãºnico por atendimento: nada circula entre pacientes.",
  },
  {
    kind: "disposable",
    title: "DescartÃ¡veis de classe hospitalar",
    body: "LÃ¢mina, lixa e gaze abertas Ã  vista, diante de vocÃª.",
  },
] as const;

export const zlBiosafetyNote =
  "Protocolos conforme diretrizes da Anvisa. Sua seguranÃ§a na ZL Podologia Fortaleza nÃ£o Ã© opcional.";

/* ------------------------------------------------------------------ */
/* Symptom-to-Solution                                                 */
/* ------------------------------------------------------------------ */

export type ZlSymptomKind =
  | "pain"
  | "odor"
  | "heel"
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
    title: "Dor e inflamação",
    body: "Dor ao calçar, unha encravando ou borda inflamada que não cede.",
    primaryService: "ingrown",
    related: ["Unha encravada", "Órtese"],
  },
  {
    kind: "odor",
    title: "Alterações e odor",
    body: "Unha amarelada, grossa, frágil ou com odor persistente.",
    primaryService: "fungus",
    related: ["Onicomicose", "Frieira"],
  },
  {
    kind: "heel",
    title: "Calcanhares severos",
    body: "Fissuras profundas, calos extensos e pele rachada.",
    primaryService: "podoprofilaxia",
    related: ["Fissuras", "Calo profundo"],
  },
  {
    kind: "prevention",
    title: "Prevenção e manutenção",
    body: "Pés em ordem, manutenção regular e bem-estar.",
    primaryService: "podoprofilaxia",
    related: ["Podoprofilaxia", "Reflexologia podal"],
  },
  {
    kind: "eventos",
    title: "Bem-estar e relaxamento",
    body: "Estresse, tensão acumulada ou momento de pausa antes de um dia especial.",
    primaryService: "reflexology",
    related: ["Reflexologia", "Massagem terapêutica"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Diagnostic Quiz (3 perguntas) â€” v7a: pergunta 2 = localizacao      */
/* ------------------------------------------------------------------ */

export interface ZlQuizOption {
  value: string;
  label: string;
  /**
   * Servi?o mapeado por opcao. Quando a opcao e selecionada, entra como
   * voto no roteamento do resultado. A pergunta 1 (concern) tem maior
   * peso; pergunta 2 (localizacao) desempata; pergunta 3 (history) ajusta.
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
      { value: "sola", label: "Sola do pé", service: "reflexology" },
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
    "Leve este resumo para uma avaliação de R$ 69. A profissional já recebe o histórico básico antes do atendimento.",
  resultCta: "Levar resumo para avaliação de R$ 69",
  progress: (step: number, total: number) => `${step} de ${total}`,
} as const;

/**
 * Recomendacao por servi?o com base nas 3 respostas. Algoritmo simples:
 * 1) Coleta votos das opcoes que trazem `service` anexado (concern +
 *    location).
 * 2) Servi?o com maior contagem vence. Empate: concern prevalece.
 * 3) Fallback final: podoprofilaxia (servi?o vitrine).
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

  // Pergunta 1 tem peso 2 (dor maior que localizacao).
  addVote(concernOption?.service, 2);
  addVote(locationOption?.service, 1);

  // Historia de cirurgia = puxar pra encravada (caso cronico).
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
  const serviceName = serviceObj?.menuLabel ?? "avaliação geral";
  const msg = `Oi, respondi a triagem da ZL Podologia. Queixa: ${answers.concern}. Onde incomoda: ${answers.location}. Já tentei: ${answers.history}. Cuidado sugerido: ${serviceName}. Quero agendar uma avaliação.`;
  // Mantem UTM padrao + source quiz_result pra GA4.
  return buildWhatsappLink(msg, "quiz_result");
}

/* ------------------------------------------------------------------ */
/* Jornada do Heroi - depoimentos reais do Google                      */
/* ------------------------------------------------------------------ */

/**
 * Depoimentos publicos reais, coletados das avaliacoes publicas do perfil
 * da ZL Podologia no Google Maps (Fortaleza, 5,0 com 11 avaliacoes).
 * Por serem reviews publicos, podem ser citados textualmente.
 */
export interface ZlTestimonial {
  firstName: string;
  fullAuthor: string;
  caption: string;
  body: string;
  rating: 5;
  /**
   * Microlinha exibida no rodape do card para reforcar a origem publica
   * da avalia??o (Google) e o volume atual da cl?nica.
   */
  source: string;
  /** Data aproximada pra marcacao Schema.org (nao exibida no card). */
  datePublished: string;
}

export const zlTestimonials: readonly ZlTestimonial[] = [
  {
    firstName: "Ivia D.",
    fullAuthor: "Ivia Dias",
    caption: "Cliente verificada - Google",
    body: "Ambiente organizado e acolhedor. Zucarina, profissional competente e trata o cliente com atenÃ§Ã£o e delicadeza. Jannie Ã© muito atenciosa. ServiÃ§o para unha encravada, podologia e muito mais, com excelente atendimento. Vale super a pena! Indico demais!",
    rating: 5,
    source: "AvaliaÃ§Ã£o pÃºblica no Google - 5,0 com 11 avaliaÃ§Ãµes",
    datePublished: "2025-11-01",
  },
  {
    firstName: "Jarlon S.",
    fullAuthor: "Jarlon Silva",
    caption: "Cliente verificado - Google",
    body: "O serviÃ§o foi Ã³timo. Fui bem atendido por uma podÃ³loga muito competente e cuidadosa. O lugar era limpo e organizado, o que deixou tudo mais agradÃ¡vel. O tratamento foi eficaz e os preÃ§os justos. Recomendo para quem quer cuidar bem dos pÃ©s.",
    rating: 5,
    source: "AvaliaÃ§Ã£o pÃºblica no Google - 5,0 com 11 avaliaÃ§Ãµes",
    datePublished: "2025-04-01",
  },
  {
    firstName: "Daiane S.",
    fullAuthor: "Daiane Santos",
    caption: "Cliente verificada - Google (Local Guide)",
    body: "Excelente atendimento. ServiÃ§o com preÃ§o justo e de qualidade. Realizei uma profilaxia e gostei muito do resultado.",
    rating: 5,
    source: "AvaliaÃ§Ã£o pÃºblica no Google - 5,0 com 11 avaliaÃ§Ãµes",
    datePublished: "2025-07-01",
  },
] as const;

export const zlTestimonialsCopy = {
  eyebrow: "AvaliaÃ§Ãµes pÃºblicas",
  title: "Pacientes que avaliaram a clÃ­nica no Google.",
  body: "Depoimentos pÃºblicos da ficha da ZL Podologia, com nota 5,0 em 11 avaliaÃ§Ãµes.",
  allReviewsCta: "Ver todos os 11 no Google",
} as const;

/* ------------------------------------------------------------------ */
/* SEO + GEO helpers                                                   */
/* ------------------------------------------------------------------ */

/**
 * URL canonica da landing. Usada no metadata + em Schema.org. Centralizar
 * aqui evita drift quando migrar para subdomain/root em v7b.
 */
export const ZL_CANONICAL_URL = "https://pageforce.paperclip.app/lab/zl-podologia";

/**
 * Palavras-chave locais espalhadas no copy das secoes principais (hero,
 * promessa, biosseguranca, explorer, FAQ). Mantido aqui pra referencia +
 * possivel uso em metadata.keywords. Nao usa-las em keyword-stuffing â€” o
 * principio e: 1x natural por secao, onde cabe.
 */
export const zlLocalKeywords = [
  "podologia em Fortaleza",
  "pod?loga Parquel?ndia",
  "unha encravada Fortaleza",
  "cl?nica de p?s Fortaleza CE",
  "atendimento podologico Bezerra de Menezes",
  "reflexologia podal Fortaleza",
  "podoprofilaxia Fortaleza",
  "laserterapia para fungos Fortaleza",
  "?rtese unha Fortaleza",
  "cuidado p? diab?tico Fortaleza",
  "pre-wedding terapeutico noiva Fortaleza",
  "vale presente aniversario reflexologia",
] as const;

/* ------------------------------------------------------------------ */
/* v9: Experiencias e Presentes â€” Pre-Wedding + Vale Presente          */
/* ------------------------------------------------------------------ */

/**
 * Ofertas premium confirmadas pela Zucarina em 2026-04-22. Consolidadas
 * em UMA secao dedicada "Experiencias e Presentes" com 2 grupos (4 cards).
 * Pre-Wedding saiu do Pricing footer notes e Vale Presente e novidade v9.
 */
export interface ZlExperienceCard {
  id: "noiva_sublime" | "noiva_majestosa" | "momento_essencial" | "experiencia_encanto";
  group: "pre_wedding" | "vale_presente";
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
  eyebrow: "PRESENTES E EXPERIÃŠNCIAS",
  title: "Presentear ou desacelerar com a assinatura da ZL",
  subtitle:
    "Reflexologia, escalda-pÃ©s e rituais de cuidado que podem virar presente digital ou pausa antes do casamento.",
  groups: [
    {
      id: "pre_wedding" as const,
      eyebrow: "CUIDADO PARA NOIVA",
      title: "Para chegar mais leve ao grande dia",
      intro:
        "Reflexologia e escalda-pÃ©s pensados para aliviar a tensÃ£o dos preparativos e desacelerar com calma.",
      cards: [
        {
          id: "noiva_sublime" as const,
          group: "pre_wedding" as const,
          eyebrow: "PRE-WEDDING",
          title: "Noiva Sublime",
          duration: "50 minutos",
          includes: [
            "Reflexologia Podal Relaxante",
            "Escalda-pÃ©s terapÃªutico como mimo",
            "AmbientaÃ§Ã£o acolhedora",
          ],
          price: "R$ 180",
          priceValue: 180,
          ctaLabel: "Quero presentear Noiva Sublime",
          whatsappLink: buildWhatsappLink(
            "Oi, quero presentear com a experiÃªncia Noiva Sublime (Pre-Wedding 50 min, R$ 180).",
            "experience_noiva_sublime"
          ),
          image: {
            src: "/zl-podologia/generated/v10/value-offer/experience-noiva-sublime.jpg",
            alt: "ComposiÃ§Ã£o editorial clara com toalhas, bowl terapÃªutico e vela usada para contextualizar a experiÃªncia Noiva Sublime da ZL Podologia",
            coverLayout: "editorial_full_bleed",
            coverTone: "ritual_claro",
            focalPoint: "52% 58%",
          },
        },
        {
          id: "noiva_majestosa" as const,
          group: "pre_wedding" as const,
          eyebrow: "PRE-WEDDING TERAPÃŠUTICA",
          title: "Noiva Majestosa",
          duration: "50 minutos",
          includes: [
            "Reflexologia Podal TerapÃªutica (cuidado profundo)",
            "Escalda-pÃ©s especial",
            "AmbientaÃ§Ã£o diferenciada",
            "Mimo especial preparado para a noiva",
          ],
          price: "R$ 240",
          priceValue: 240,
          featured: true,
          featuredLabel: "Mais escolhida pelas noivas",
          ctaLabel: "Quero a experiÃªncia Noiva Majestosa",
          whatsappLink: buildWhatsappLink(
            "Oi, quero a experiÃªncia Noiva Majestosa (Pre-Wedding terapÃªutica 50 min, R$ 240).",
            "experience_noiva_majestosa"
          ),
          image: {
            src: "/zl-podologia/generated/v10/value-offer/experience-noiva-majestosa.jpg",
            alt: "ComposiÃ§Ã£o editorial terrosa com bowl ritual, velas e textura premium usada para contextualizar a experiÃªncia Noiva Majestosa da ZL Podologia",
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
        "Duas opÃ§Ãµes prontas para presentear com reflexologia e um ritual calmo. A versÃ£o Encanto adiciona cartÃ£o personalizado.",
      cards: [
        {
          id: "momento_essencial" as const,
          group: "vale_presente" as const,
          eyebrow: "PRESENTE",
          title: "Vale Presente Momento Essencial",
          duration: "50 minutos",
          includes: [
            "Reflexologia Podal Relaxante",
            "Escalda-pÃ©s com mimo especial",
            "AmbientaÃ§Ã£o acolhedora",
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
            alt: "Vale Presente Momento Essencial em envelope claro com amarraÃ§Ã£o delicada e composiÃ§Ã£o editorial suave",
            coverLayout: "editorial_full_bleed",
            coverTone: "presente_suave",
            focalPoint: "50% 52%",
          },
        },
        {
          id: "experiencia_encanto" as const,
          group: "vale_presente" as const,
          eyebrow: "PRESENTE PREMIUM",
          title: "Vale Presente ExperiÃªncia Encanto",
          duration: "50 minutos",
          includes: [
            "Reflexologia Podal TerapÃªutica",
            "Escalda-pÃ©s especial",
            "AmbientaÃ§Ã£o diferenciada",
            "Vale presente em PDF personalizado",
            "CartÃ£o ilustrado personalizado",
          ],
          price: "R$ 160",
          priceValue: 160,
          featured: true,
          featuredLabel: "CartÃ£o Disney personalizado",
          ctaLabel: "Presentear ExperiÃªncia Encanto",
          whatsappLink: buildWhatsappLink(
            "Oi, quero presentear com o Vale Presente ExperiÃªncia Encanto (Reflexologia terapÃªutica + cartÃ£o ilustrado personalizado, R$ 160).",
            "experience_encanto"
          ),
          image: {
            src: "/zl-podologia/generated/v10/value-offer/value-gift-card-encanto.jpg",
            alt: "Vale Presente ExperiÃªncia Encanto em envelope premium com lacre terroso e composiÃ§Ã£o editorial de presente",
            coverLayout: "editorial_full_bleed",
            coverTone: "presente_assinatura",
            focalPoint: "50% 50%",
          },
        },
      ],
    },
  ],
  closing:
    "Todas as experiÃªncias tÃªm hora marcada e podem ser ajustadas no WhatsApp.",
} as const;

export type ZlExperienceGroup = (typeof zlExperienciasPresentes.groups)[number];
