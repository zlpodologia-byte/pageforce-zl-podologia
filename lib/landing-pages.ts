import { getShowcase, type Showcase } from "@/lib/showcases";

export type StandardLandingSlug = "clinica" | "odontologia" | "estetica";

export interface LandingFocusArea {
  title: string;
  description: string;
}

export interface LandingStep {
  title: string;
  body: string;
}

export interface LandingDifferential {
  title: string;
  body: string;
}

export interface StandardLandingData {
  slug: StandardLandingSlug;
  showcase: Showcase;
  eyebrow: string;
  headline: string;
  lead: string;
  heroPanelTitle: string;
  heroPanelItems: readonly string[];
  focusAreas: readonly [LandingFocusArea, LandingFocusArea, LandingFocusArea];
  processSteps: readonly [LandingStep, LandingStep, LandingStep, LandingStep];
  differentials: readonly [
    LandingDifferential,
    LandingDifferential,
    LandingDifferential,
  ];
  closingTitle: string;
  closingCopy: string;
  closingBullets: readonly [string, string, string];
  primaryHref: string;
  diagnosticHref: string;
}

function requireShowcase(slug: StandardLandingSlug): Showcase {
  const showcase = getShowcase(slug);
  if (!showcase) {
    throw new Error(`Showcase not found for slug: ${slug}`);
  }
  return showcase;
}

const STANDARD_LANDINGS: Record<StandardLandingSlug, StandardLandingData> = {
  clinica: {
    slug: "clinica",
    showcase: requireShowcase("clinica"),
    eyebrow: "Pagina padrao · Clinica medica",
    headline:
      "Landing de clinica que organiza o primeiro contato antes do WhatsApp virar fila.",
    lead:
      "A pagina precisa explicar especialidade, filtrar o tipo de atendimento e deixar claro como o paciente agenda sem depender de uma secretária improvisando triagem no inbox.",
    heroPanelTitle: "O que essa pagina precisa resolver",
    heroPanelItems: [
      "Especialidade e unidade certas logo no primeiro clique.",
      "Convênio, urgencia e perfil do atendimento triados antes do humano.",
      "Agenda, mapa e prova institucional no mesmo fluxo.",
      "Origem do lead medida por profissional e por unidade.",
    ],
    focusAreas: [
      {
        title: "Especialidades com pagina propria",
        description:
          "Clinica geral, check-up, exames e retorno precisam de entrada clara para nao cair tudo no mesmo formulario.",
      },
      {
        title: "Agenda e WhatsApp no mesmo trilho",
        description:
          "A landing conduz o paciente para uma pergunta objetiva, nao para um contato aberto que consome a recepcao.",
      },
      {
        title: "Presenca local que reduz duvida",
        description:
          "Mapa, bairro, equipe e credenciais aparecem cedo para diminuir inseguranca antes do agendamento.",
      },
    ],
    processSteps: [
      {
        title: "Busca especifica",
        body: "O paciente chega por bairro, especialidade ou convenio e cai numa promessa objetiva.",
      },
      {
        title: "Triagem curta",
        body: "A pagina pergunta o minimo necessario para separar consulta, retorno, exame e urgencia.",
      },
      {
        title: "Contato orientado",
        body: "WhatsApp e agenda entram com contexto, nao como caixa vazia de atendimento.",
      },
      {
        title: "Retorno previsivel",
        body: "O sistema registra origem, agendamento e faltas para a operacao ajustar o fluxo da unidade.",
      },
    ],
    differentials: [
      {
        title: "WhatsApp operado como trilho",
        body: "A conversa comeca com contexto, horario e especialidade. A equipe humana so entra no ponto certo.",
      },
      {
        title: "SEO local orientado a demanda real",
        body: "A pagina nasce pensando em mapa, bairro, unidade e busca de especialidade — nao em institucional generico.",
      },
      {
        title: "BI de agendamento e comparecimento",
        body: "Nao basta captar. A pagina precisa devolver leitura semanal de origem, conversao e no-show.",
      },
    ],
    closingTitle: "Diagnosticar a operacao da clinica antes de mexer no design.",
    closingCopy:
      "Se a clinica ja recebe demanda, a prioridade e descobrir onde o contato trava: pagina, triagem, agenda ou resposta. O modelo existe para isso virar sistema e nao percepcao.",
    closingBullets: [
      "Promessa clara por especialidade.",
      "Contato com contexto antes do humano.",
      "Medicao da jornada ate o comparecimento.",
    ],
    primaryHref: "/contact?origin=clinica-landing",
    diagnosticHref: "/diagnostic?from=clinica-landing",
  },
  odontologia: {
    slug: "odontologia",
    showcase: requireShowcase("odontologia"),
    eyebrow: "Pagina padrao · Odontologia",
    headline:
      "Landing odontologica que transforma busca por procedimento em avaliacao marcada.",
    lead:
      "Implante, alinhador, clareamento e reabilitacao nao podem dividir a mesma narrativa. O paciente chega com uma duvida especifica e a pagina precisa responder isso com prova, faixa de caminho e proximo passo.",
    heroPanelTitle: "O que essa pagina precisa resolver",
    heroPanelItems: [
      "Procedimento explicado sem parecer folder de clinica.",
      "Foto, faixa de investimento e avaliacao entram cedo no fluxo.",
      "Prova social autorizada reduz medo antes do orçamento.",
      "BI separa lead, avaliacao, aceite e retorno anual.",
    ],
    focusAreas: [
      {
        title: "Pagina por procedimento",
        description:
          "Implante, aparelho, lente e clareamento pedem rotas proprias porque a intencao de busca ja vem qualificada.",
      },
      {
        title: "Avaliacao chega mais pronta",
        description:
          "A landing precisa capturar foto, contexto e disponibilidade para o primeiro contato nao recomecar do zero.",
      },
      {
        title: "Autoridade com prova certa",
        description:
          "Nao e sobre inflar discurso. E sobre mostrar caso, metodo, etapa e previsibilidade do tratamento.",
      },
    ],
    processSteps: [
      {
        title: "Busca pelo procedimento",
        body: "A intencao nasce em termos como implante, alinhador ou clareamento. A pagina precisa espelhar isso sem ruido.",
      },
      {
        title: "Qualificacao visual",
        body: "Foto, objetivo e historico entram antes da equipe comercial para o orçamento sair melhor.",
      },
      {
        title: "Avaliacao orientada",
        body: "WhatsApp e agenda entram com faixa de valor, etapas e proxima vaga — nao apenas com 'ola, tudo bem?'.",
      },
      {
        title: "Tratamento e retorno",
        body: "A pagina conversa com CRM, lembrando retorno anual e reativando paciente no tempo certo.",
      },
    ],
    differentials: [
      {
        title: "Prova social com criterio",
        body: "Antes e depois, depoimento e especialidade aparecem na ordem certa para reduzir medo e elevar a confianca.",
      },
      {
        title: "Copy orientada a fechamento",
        body: "Cada bloco responde objecoes classicas: dor, prazo, investimento, naturalidade e acompanhamento.",
      },
      {
        title: "Operacao rastreada por procedimento",
        body: "A clinica entende o que gera avaliacao, o que gera plano aceito e qual procedimento sustenta ticket.",
      },
    ],
    closingTitle: "A pagina precisa vender a avaliacao antes de vender o tratamento.",
    closingCopy:
      "Na odontologia, o ganho vem quando o visitante deixa de pedir informacao solta e passa a entrar num fluxo de avaliacao qualificada. O diagnostico mostra exatamente onde esse trilho quebra hoje.",
    closingBullets: [
      "Procedimento como entrada principal.",
      "Prova e objecao tratadas no mesmo fluxo.",
      "Conversao medida da busca ao plano aceito.",
    ],
    primaryHref: "/contact?origin=odontologia-landing",
    diagnosticHref: "/diagnostic?from=odontologia-landing",
  },
  estetica: {
    slug: "estetica",
    showcase: requireShowcase("estetica"),
    eyebrow: "Pagina padrao · Estetica",
    headline:
      "Landing de estetica que vende protocolo com agenda travada e retorno no ciclo certo.",
    lead:
      "A pagina precisa equilibrar desejo, seguranca e decisao. O visitante quer sentir premium, mas tambem precisa entender o procedimento, confiar na profissional e enxergar o proximo passo sem atrito.",
    heroPanelTitle: "O que essa pagina precisa resolver",
    heroPanelItems: [
      "Procedimento como vitrine, nao como menu generico.",
      "Sinal pago e agenda travada sem vai-e-volta.",
      "Prova visual autorizada com criterio e contexto.",
      "Retorno do protocolo acionado no ciclo certo.",
    ],
    focusAreas: [
      {
        title: "Vitrines por procedimento",
        description:
          "Facial, corporal, laser e harmonizacao precisam de entradas separadas para manter desejo e clareza na mesma tela.",
      },
      {
        title: "Agenda e sinal no mesmo fluxo",
        description:
          "A pagina precisa levar a cliente para avaliacao ou reserva com contexto, nao para um inbox que demora a responder.",
      },
      {
        title: "Retorno como parte da oferta",
        description:
          "Protocolo bom nao termina na primeira sessao. A landing precisa preparar recompra e ciclo de retorno.",
      },
    ],
    processSteps: [
      {
        title: "Desejo com recorte",
        body: "A cliente chega por um procedimento especifico. A pagina precisa traduzir isso em promessa concreta e sem excesso de ruido.",
      },
      {
        title: "Seguranca antes do clique",
        body: "Equipe, metodo, prova e contexto reduzem a sensacao de risco antes do contato.",
      },
      {
        title: "Reserva orientada",
        body: "WhatsApp e agenda entram com procedimento, disponibilidade e opcao de sinal para travar a vaga.",
      },
      {
        title: "Ciclo de retorno",
        body: "A operacao passa a lembrar o momento certo de reativar, remarcar ou vender protocolo complementar.",
      },
    ],
    differentials: [
      {
        title: "Premium com funcao comercial",
        body: "A atmosfera vende desejo, mas cada bloco existe para reduzir atrito e conduzir para uma decisao.",
      },
      {
        title: "Operacao por protocolo ativo",
        body: "A landing conversa com a recorrencia do tratamento e nao so com a primeira sessao.",
      },
      {
        title: "Leitura de LTV e agenda",
        body: "A pagina passa a mostrar o que traz cliente recorrente, sinal pago e retorno dentro do ciclo certo.",
      },
    ],
    closingTitle: "A pagina precisa vender o protocolo inteiro, nao so a primeira sessao.",
    closingCopy:
      "O ganho aparece quando desejo e operacao deixam de brigar. A pagina premium continua bonita, mas passa a orientar agenda, sinal, retorno e recompra com leitura real do funil.",
    closingBullets: [
      "Desejo ancorado em seguranca.",
      "Agenda com sinal e contexto.",
      "Retorno acionado no ritmo do procedimento.",
    ],
    primaryHref: "/contact?origin=estetica-landing",
    diagnosticHref: "/diagnostic?from=estetica-landing",
  },
};

export function getStandardLanding(
  slug: StandardLandingSlug,
): StandardLandingData {
  return STANDARD_LANDINGS[slug];
}
