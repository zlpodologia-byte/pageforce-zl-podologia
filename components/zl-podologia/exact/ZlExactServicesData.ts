import type { ExactGlyphKind } from "@/components/zl-podologia/exact/ZlExactAtoms";

export const zlExactServiceCards: readonly {
  title: string;
  body: string;
  icon: ExactGlyphKind;
}[] = [
  {
    title: "Unha encravada",
    body: "Tratamento preciso e humanizado para aliviar a dor, corrigir e evitar novas crises.",
    icon: "foot",
  },
  {
    title: "Fungos nas unhas",
    body: "Protocolo para tratar fungos e acompanhar a saude das unhas.",
    icon: "leaf",
  },
  {
    title: "Podoprofilaxia",
    body: "Higienizacao completa dos pes, remocao de calosidades e prevencao de fissuras.",
    icon: "drop",
  },
  {
    title: "Ortese para unhas",
    body: "Correcao da curvatura da unha, aliviando a dor e prevenindo encravamento.",
    icon: "check",
  },
  {
    title: "Laserterapia",
    body: "Tecnologia que acelera cicatrizacao, alivia dores e trata fungos com seguranca.",
    icon: "spark",
  },
  {
    title: "Cuidados para pes sensiveis",
    body: "Atencao especial para diabeticos, idosos e pessoas com sensibilidade aumentada.",
    icon: "heart",
  },
] as const;

export const zlExactCareSteps: readonly {
  title: string;
  body: string;
  icon: ExactGlyphKind;
}[] = [
  { title: "Leitura do caso", body: "Entendemos sua queixa, historico e contexto.", icon: "check" },
  { title: "Direcionamento", body: "Definimos o cuidado mais adequado para o momento.", icon: "spark" },
  { title: "Tratamento", body: "Aplicamos as tecnicas e tecnologias indicadas.", icon: "foot" },
  { title: "Manutencao", body: "Acompanhamento para orientar continuidade e cuidados em casa.", icon: "shield" },
] as const;

export const zlExactPricingCards: readonly {
  title: string;
  price: string;
  note: string;
}[] = [
  { title: "Triagem pelo WhatsApp", price: "Sem cobranca isolada", note: "Relato da queixa, foto quando ajuda e direcao para o procedimento adequado." },
  { title: "Podoprofilaxia", price: "R$ 100 dinheiro ou Pix | R$ 105 cartao", note: "Limpeza e cuidados preventivos para manter os pes saudaveis." },
  { title: "Unha encravada - Grau 1", price: "A partir de R$ 150", note: "Dor, inflamacao e sensibilidade ao calcar ou caminhar." },
  { title: "Unha encravada - Graus 2 e 3", price: "A partir de R$ 200", note: "Quando ha inflamacao mais evidente, a conduta exige mais cuidado." },
  { title: "Fungos nas unhas", price: "R$ 100 por unha por sessao", note: "Protocolo para tratar fungos e acompanhar a saude das unhas." },
  { title: "Reflexologia podal", price: "R$ 80 a R$ 150", note: "Relaxante e terapeutica, conforme necessidade indicada no atendimento." },
  { title: "Pe diabetico", price: "R$ 120", note: "Atendimento adaptado com cuidado extra em sensibilidade e pele fina." },
] as const;
