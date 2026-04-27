import {
  buildWhatsappLink,
  ZL_CANONICAL_URL,
} from "@/components/zl-podologia/zlPodologiaContent";

export const ZL_INGROWN_PAGE_PATH = "/unha-encravada-fortaleza";
export const ZL_INGROWN_PAGE_URL = `${ZL_CANONICAL_URL}${ZL_INGROWN_PAGE_PATH}`;
export const ZL_INGROWN_HERO_IMAGE =
  "/zl-podologia/social/edited-pro/procedimentos/frontal-instrumento-fino-pro.jpg";
export const ZL_INGROWN_CASE_IMAGE =
  "/zl-podologia/social/antes-depois/encravada-05-alivio-bandagem.jpg";
export const ZL_INGROWN_DESCRIPTION =
  "Atendimento para unha encravada em Fortaleza na ZL Podologia, em Parquelândia. Valores a partir de R$ 150, triagem por WhatsApp e orientação segura.";

export const ZL_INGROWN_WHATSAPP_HREF = buildWhatsappLink(
  "Oi, estou com unha encravada e queria avaliar meu caso na ZL Podologia.",
  "service_ingrown_page",
);

export const zlIngrownPrices = [
  { label: "Grau 1", value: "a partir de R$ 150" },
  { label: "Graus 2 e 3", value: "a partir de R$ 200" },
] as const;

export const zlIngrownAttentionSignals = [
  "Dor no canto da unha ao calçar, caminhar ou tocar.",
  "Vermelhidão, inchaço ou sensibilidade em volta da unha.",
  "Unha que já encravou antes e voltou a incomodar.",
  "Dúvida se o caso é podologia ou precisa avaliação médica.",
] as const;

export const zlIngrownMedicalSignals = [
  "Febre, mal-estar ou piora rápida da dor.",
  "Secreção intensa, mau cheiro forte ou sangramento persistente.",
  "Diabetes descompensada, problema vascular ou cicatrização ruim.",
  "Inflamação extensa no dedo ou dor forte que impede pisar.",
] as const;

export const zlIngrownSteps = [
  {
    title: "Triagem antes do horário",
    body: "Você envia a queixa pelo WhatsApp. Se houver sinal de alerta, a orientação é procurar atendimento médico antes do procedimento podológico.",
  },
  {
    title: "Avaliação do canto da unha",
    body: "A podóloga observa profundidade, inflamação, sensibilidade e histórico de recorrência antes de indicar a conduta.",
  },
  {
    title: "Alívio e orientação",
    body: "Quando o caso é indicado para podologia, o foco é aliviar a parte que machuca e explicar cuidados, retorno e prevenção.",
  },
] as const;

export const zlIngrownFaqs = [
  {
    question: "Quanto custa atendimento para unha encravada?",
    answer:
      "Grau 1: a partir de R$ 150. Graus 2 e 3: a partir de R$ 200. O valor final depende da avaliação presencial.",
  },
  {
    question: "A ZL atende casos com inflamação?",
    answer:
      "Alguns casos podem ser atendidos na podologia, mas sinais como febre, secreção intensa, diabetes descompensada ou piora rápida exigem avaliação médica.",
  },
  {
    question: "Onde fica a clínica?",
    answer:
      "A ZL Podologia fica na Parquelândia, na Av. Bezerra de Menezes, 2203, Sala 5, Galeria José Bernardo, em Fortaleza.",
  },
] as const;
