export const DIAGNOSTIC_KICKER = "Por onde começa";

export const DIAGNOSTIC_HEADLINE =
  "O preço nasce do dado, não da tabela vazia.";

export const DIAGNOSTIC_LEAD =
  "Antes de qualquer proposta, a Pageforce roda um diagnóstico comercial digital. Sai com score, dossiê e prova visual do problema. Você decide o próximo passo com o cenário em mãos — não com promessa.";

export const DIAGNOSTIC_OUTPUT_BLURB =
  "Cada diagnóstico devolve uma leitura curta, prática e comparável com o concorrente. É o que destrava conversa de oferta sem virar venda fria.";

export const DIAGNOSTIC_OUTPUT_ITEMS: ReadonlyArray<{
  label: string;
  detail: string;
}> = [
  {
    label: "Score 0–100",
    detail:
      "Leitura objetiva da operação digital atual: presença, descoberta, conversão, resposta, organização e medição.",
  },
  {
    label: "Dossiê 8D",
    detail:
      "Oito dimensões avaliadas em prosa direta — onde está a perda, onde está a oportunidade, onde está o risco.",
  },
  {
    label: "Comparação competitiva",
    detail:
      "Como o seu negócio aparece ao lado de quem disputa a mesma busca. Foco em distância concreta, não em ranking abstrato.",
  },
  {
    label: "Prova visual do problema",
    detail:
      "Print, gravação ou medida que mostra o problema em vez de descrevê-lo. Para apresentar internamente sem traduzir nossa palavra.",
  },
  {
    label: "Conta de oportunidade",
    detail:
      "Estimativa simples do que está sendo perdido por mês — em lead, em resposta, em fechamento.",
  },
];

export type ChannelOption = { value: string; label: string };

export const CHANNEL_OPTIONS: ChannelOption[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Google / busca" },
  { value: "indicacao", label: "Indicação" },
  { value: "outro", label: "Outro" },
];
