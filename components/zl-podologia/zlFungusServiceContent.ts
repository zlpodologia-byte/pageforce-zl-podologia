import {
  buildWhatsappLink,
  ZL_CANONICAL_URL,
} from "@/components/zl-podologia/zlPodologiaContent";

export const ZL_FUNGUS_PAGE_PATH = "/onicomicose-fortaleza";
export const ZL_FUNGUS_PAGE_URL = `${ZL_CANONICAL_URL}${ZL_FUNGUS_PAGE_PATH}`;
export const ZL_FUNGUS_HERO_IMAGE =
  "/zl-podologia/social/client-approved/2026-04-28/onicodistrofia-procedimento-2026-04-28.jpeg";
export const ZL_FUNGUS_BEFORE_IMAGE =
  "/zl-podologia/social/client-approved/fungos-protocolo-2026-04-26-01.jpeg";
export const ZL_FUNGUS_AFTER_IMAGE =
  "/zl-podologia/social/client-approved/fungos-protocolo-2026-04-26-02.jpeg";
export const ZL_FUNGUS_DESCRIPTION =
  "Avaliação e protocolo para fungo na unha em Fortaleza na ZL Podologia, em Parquelândia. Onicomicose pede continuidade, cuidado em casa e expectativa realista.";

export const ZL_FUNGUS_WHATSAPP_HREF = buildWhatsappLink(
  "Oi, estou com suspeita de fungo na unha e queria avaliar meu caso na ZL Podologia.",
  "service_fungus_page",
);

export const zlFungusPrices = [
  { label: "Tratamento de fungos", value: "R$ 100 por unha por sessão" },
  { label: "Protocolo avançado", value: "R$ 100 por sessão" },
] as const;

export const zlFungusSignals = [
  "Unha amarelada, esbranquiçada ou escurecida.",
  "Espessamento, descamação ou unha mais quebradiça.",
  "Odor persistente ou descolamento parcial da unha.",
  "Alteração que volta mesmo depois de cuidados caseiros.",
] as const;

export const zlFungusExpectations = [
  "Onicomicose é o nome técnico para fungo na unha.",
  "Não é tratamento de sessão única: costuma pedir protocolo e retorno.",
  "O laser pode entrar como apoio quando o caso indica.",
  "O plano é feito sem promessa de cura rápida ou milagre.",
] as const;

export const zlFungusSteps = [
  {
    title: "Leitura da unha",
    body: "A avaliação observa cor, espessura, descolamento, sensibilidade e histórico antes de definir se o caso combina com protocolo podológico.",
  },
  {
    title: "Protocolo com continuidade",
    body: "A conduta pode envolver limpeza técnica, orientação de cuidado em casa, retorno e laser como apoio quando fizer sentido.",
  },
  {
    title: "Expectativa honesta",
    body: "Fungo na unha costuma evoluir devagar. O acompanhamento existe para ajustar o plano e evitar abandono precoce.",
  },
] as const;

export const zlFungusFaqs = [
  {
    question: "Quanto custa tratamento para fungo na unha?",
    answer:
      "O tratamento de fungos custa R$ 100 por unha por sessão. Casos que pedem protocolo avançado também partem de R$ 100 por sessão.",
  },
  {
    question: "Laser resolve fungo na unha sozinho?",
    answer:
      "Não deve ser vendido como milagre. Na ZL, o laser pode entrar como apoio dentro de um protocolo, quando a avaliação indicar.",
  },
  {
    question: "Precisa de várias sessões?",
    answer:
      "Na maioria dos casos, sim. Onicomicose não é tratamento de sessão única e exige cuidado em casa, retorno e acompanhamento.",
  },
] as const;
