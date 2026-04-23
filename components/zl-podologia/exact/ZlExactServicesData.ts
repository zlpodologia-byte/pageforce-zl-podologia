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
    body: "Protocolos eficazes com laser e ativos dermatologicos para unhas mais saudaveis.",
    icon: "leaf",
  },
  {
    title: "Podoprofilaxia",
    body: "Higienizacao completa dos pes, remocao de calosidades e prevencao de fissuras.",
    icon: "drop",
  },
  {
    title: "Ortese para unhas",
    body: "Correcao gradual e indolor da curvatura da unha, sem cirurgia.",
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
  { title: "Avaliacao", body: "Entendemos seu caso, historico e queixas.", icon: "check" },
  { title: "Diagnostico", body: "Identificamos a causa e definimos o melhor plano.", icon: "spark" },
  { title: "Tratamento", body: "Aplicamos as tecnicas e tecnologias indicadas.", icon: "foot" },
  { title: "Manutencao", body: "Acompanhamento para garantir resultados duradouros.", icon: "shield" },
] as const;

export const zlExactPricingCards: readonly {
  title: string;
  price: string;
  note: string;
}[] = [
  { title: "Avaliacao podologica", price: "R$ 69", note: "Avaliacao completa dos pes e plano de cuidado." },
  { title: "Podoprofilaxia", price: "R$ 129", note: "Higienizacao completa, remocao de calosidades e prevencao." },
  { title: "Unha encravada", price: "R$ 149 a R$ 199", note: "Tratamento conservador com alivio da dor e correcao." },
  { title: "Fungos nas unhas", price: "R$ 149", note: "Sessao com protocolo orientado e possibilidades de continuidade." },
  { title: "Reflexologia podal", price: "R$ 139", note: "Tecnica de massagem que promove relaxamento e bem-estar." },
  { title: "Pe diabetico", price: "R$ 199", note: "Cuidados especializados para prevencao de lesoes e complicacoes." },
] as const;
