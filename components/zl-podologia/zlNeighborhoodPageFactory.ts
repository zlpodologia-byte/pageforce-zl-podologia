import type {
  ZlSeoLandingPageDefinition,
  ZlSeoStep,
} from "@/components/zl-podologia/zlSeoLandingTypes";

const LOCATION =
  "O atendimento ocorre na clínica da Parquelândia. ZL Podologia fica na Parquelândia, na Av. Bezerra de Menezes, 2203, Sala 5, Galeria José Bernardo; não temos unidade nesse bairro.";
const HERO_IMAGE =
  "/zl-podologia/social/edited-pro/ambiente/sala-wide-institucional-pro.jpg";
const PROOF_IMAGE =
  "/zl-podologia/social/edited-pro/marca/fachada-clinica-sem-grade-2026-04-28.jpg";

export type NeighborhoodPageInput = Pick<
  ZlSeoLandingPageDefinition,
  | "path"
  | "h1"
  | "title"
  | "description"
  | "ctaSource"
  | "intro"
  | "primaryChecklist"
  | "secondaryChecklist"
  | "faqs"
> & {
  neighborhoodName: string;
  sourceAngle: string;
};

export function makeNeighborhoodPage(
  input: NeighborhoodPageInput,
): ZlSeoLandingPageDefinition {
  const steps: readonly ZlSeoStep[] = [
    {
      title: "Você descreve a queixa",
      body: `A triagem entende se ${input.neighborhoodName} está buscando dor, unha encravada, fungos, calosidades ou manutenção preventiva.`,
    },
    {
      title: "A ZL orienta o melhor cuidado",
      body: "A clínica informa se faz sentido agendar, enviar foto, procurar médico primeiro ou escolher outro serviço.",
    },
    {
      title: "Atendimento na Parquelândia",
      body: "O horário é presencial na Av. Bezerra de Menezes, com endereço real e rota clara antes do deslocamento.",
    },
  ];

  return {
    ...input,
    eyebrow: "Podologia com endereço real",
    ctaLabel: "Perguntar pelo WhatsApp",
    ctaMessage: `Oi, moro ou circulo por ${input.neighborhoodName} e quero atendimento na ZL Podologia.`,
    heroImage: HERO_IMAGE,
    heroAlt: "Sala de atendimento da ZL Podologia na Parquelândia em Fortaleza",
    locationNote: LOCATION,
    prices: [
      { label: "Local", value: "Parquelândia" },
      { label: "Agendamento", value: "WhatsApp" },
    ],
    steps,
    proof: {
      eyebrow: "Transparência local",
      title: "Página de orientação, não endereço alternativo",
      body: `Esta página existe para orientar ${input.sourceAngle}. A ZL não afirma ter unidade fora da Parquelândia e evita falsa localização.`,
      image: PROOF_IMAGE,
      imageAlt: "Fachada da ZL Podologia em Fortaleza",
    },
    relatedLinks: [
      {
        href: "/",
        label: "ZL Podologia",
        description: "Confirme endereço, horários e canal oficial de agendamento.",
      },
      {
        href: "/unha-encravada-fortaleza",
        label: "Unha encravada",
        description: "Veja sinais, cuidados seguros e quando procurar avaliação.",
      },
      {
        href: "/podoprofilaxia-fortaleza",
        label: "Podoprofilaxia",
        description: "Conheça o cuidado técnico de unhas, pele e calosidades.",
      },
    ],
    schema: {
      serviceName: input.h1,
      serviceType: "Podologia clínica",
      offers: [{ name: "Atendimento podológico com hora marcada" }],
    },
  };
}
