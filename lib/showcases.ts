export interface ShowcaseKPI {
  label: string;
  value: string;
  caption: string;
}

export interface ShowcaseEngrenagem {
  capture: string;
  convert: string;
  respond: string;
  organize: string;
  measure: string;
}

export interface Showcase {
  slug: string;
  label: string;
  hookLine: string;
  bullets: [string, string, string, string];
  engrenagem: ShowcaseEngrenagem;
  kpis: [ShowcaseKPI, ShowcaseKPI, ShowcaseKPI];
  coverAsset: string;
  modelAsset: string;
}

export const SHOWCASES: Showcase[] = [
  {
    slug: "clinica",
    label: "Clínicas & saúde",
    hookLine: "Agendamento que não se perde no WhatsApp.",
    bullets: [
      "Agendamento no WhatsApp triado antes do secretariado responder.",
      "Ficha da primeira consulta pré-preenchida pelo paciente.",
      "SEO local que coloca a clínica na aba do mapa.",
      "Dashboard semanal com taxa de conversão de orçamento.",
    ],
    engrenagem: {
      capture:
        "Landing por especialidade com captura do WhatsApp — dúvida comum antes da triagem humana.",
      convert:
        "Formulário curto de primeira consulta devolve um horário sugerido em menos de um minuto.",
      respond:
        "Bot de triagem confirma convênio, sintoma e urgência antes da secretária abrir o chat.",
      organize:
        "CRM por especialidade registra convênio, profissional e retorno — nada fica em caderno.",
      measure:
        "Dashboard semanal mostra origem do lead, taxa de agendamento e faltas por profissional.",
    },
    kpis: [
      {
        label: "Resposta no WhatsApp",
        value: "< 3 min",
        caption: "tempo médio antes de entrar na fila humana",
      },
      {
        label: "Agendamento direto",
        value: "+38%",
        caption: "contra formulário genérico de contato",
      },
      {
        label: "Presença no Maps",
        value: "top-3 local",
        caption: "no bairro da unidade principal",
      },
    ],
    coverAsset: "/showcases/clinica-cover.svg",
    modelAsset: "/showcases/clinica-model.svg",
  },
  {
    slug: "odontologia",
    label: "Odontologia",
    hookLine: "Novo paciente chega pronto para o orçamento.",
    bullets: [
      "Página por procedimento explica etapas, prazo e faixa de investimento.",
      "Orçamento inicial capturado com foto enviada pelo próprio paciente.",
      "Agenda do dentista integrada à confirmação automática no WhatsApp.",
      "Prova social por especialidade — antes e depois com autorização assinada.",
    ],
    engrenagem: {
      capture:
        "Páginas por procedimento capturam a dúvida exata — clareamento, implante, alinhador — com CTA único.",
      convert:
        "Formulário pede foto do sorriso e histórico — o paciente já chega dentro do funil de orçamento.",
      respond:
        "WhatsApp devolve faixa de preço, etapas e próximo horário livre antes da primeira ligação.",
      organize:
        "CRM por procedimento separa avaliação, plano aceito, em tratamento e retorno anual.",
      measure:
        "BI cruza origem do lead, procedimento fechado e ticket médio por dentista.",
    },
    kpis: [
      {
        label: "Avaliação agendada",
        value: "+52%",
        caption: "contra site institucional genérico",
      },
      {
        label: "Ticket médio",
        value: "até 2,1x",
        caption: "quando a página filtra por procedimento",
      },
      {
        label: "Faltas na avaliação",
        value: "-27%",
        caption: "com confirmação automática 24h antes",
      },
    ],
    coverAsset: "/showcases/odontologia-cover.svg",
    modelAsset: "/showcases/odontologia-model.svg",
  },
  {
    slug: "estetica",
    label: "Estética & beleza",
    hookLine: "Cada procedimento vira uma vitrine que converte.",
    bullets: [
      "Página por procedimento com antes-e-depois autorizado pela cliente.",
      "Agenda integrada ao Instagram e ao WhatsApp Business.",
      "Pacotes e protocolos vendidos com parcelamento direto na página.",
      "Lembrete automático de retorno conforme o ciclo do procedimento.",
    ],
    engrenagem: {
      capture:
        "Vitrines por procedimento puxam busca local — tipo de pele, região e faixa de preço filtram o tráfego.",
      convert:
        "Página com prova visual, protocolo e parcelamento já resolve a decisão antes do contato humano.",
      respond:
        "WhatsApp responde em segundos com horário, profissional indicada e link de sinal para travar a vaga.",
      organize:
        "CRM agrupa cliente por protocolo ativo, ciclo de retorno e pacote pago — sem perder sessão.",
      measure:
        "Dashboard liga procedimento, profissional e LTV da cliente — dá pra ver o que realmente gira caixa.",
    },
    kpis: [
      {
        label: "Sinal pago online",
        value: "+44%",
        caption: "reduz faltas e trava a agenda antecipada",
      },
      {
        label: "Retorno recorrente",
        value: "até 3,4x",
        caption: "com lembrete do ciclo do protocolo",
      },
      {
        label: "Tempo até primeira sessão",
        value: "< 48h",
        caption: "do clique no anúncio ao procedimento feito",
      },
    ],
    coverAsset: "/showcases/estetica-cover.svg",
    modelAsset: "/showcases/estetica-model.svg",
  },
  {
    slug: "diagnostico",
    label: "Diagnóstico por imagem",
    hookLine: "Laudo mais rápido, paciente mais seguro.",
    bullets: [
      "Agendamento de exame com pedido médico anexado na hora.",
      "Preparo enviado automaticamente por WhatsApp no dia anterior.",
      "Laudo entregue em portal próprio com histórico do paciente.",
      "Convênios aceitos filtrados direto na busca por exame.",
    ],
    engrenagem: {
      capture:
        "Página por exame capta intenção específica — ressonância, tomografia, ultrassom — com convênio filtrado.",
      convert:
        "Upload do pedido médico vira agendamento automático, sem ida presencial só pra marcar.",
      respond:
        "Preparo e orientações chegam no WhatsApp — menos ligação repetida, menos exame remarcado.",
      organize:
        "Fluxo do exame — agendou, compareceu, laudou, entregou — visível por paciente e por técnico.",
      measure:
        "BI mostra tempo de laudo, taxa de comparecimento e origem do paciente por convênio.",
    },
    kpis: [
      {
        label: "Tempo até o laudo",
        value: "-31%",
        caption: "com portal integrado ao radiologista",
      },
      {
        label: "Exame remarcado",
        value: "-22%",
        caption: "quando o preparo chega no WhatsApp",
      },
      {
        label: "Agendamento online",
        value: "61%",
        caption: "dos novos pacientes sem passar pelo telefone",
      },
    ],
    coverAsset: "/showcases/diagnostico-cover.svg",
    modelAsset: "/showcases/diagnostico-model.svg",
  },
  {
    slug: "pet",
    label: "Pet shop & veterinária",
    hookLine: "Consulta e banho cabem na mesma agenda.",
    bullets: [
      "Cadastro do pet guarda raça, peso e vacinas para agendar mais rápido.",
      "Banho e tosa com horário reservado pelo WhatsApp em dois cliques.",
      "Loja online puxa estoque da prateleira e fecha pelo Pix.",
      "Lembrete de vacina e vermífugo no ciclo certo, sem depender da memória.",
    ],
    engrenagem: {
      capture:
        "Landing por serviço separa banho, consulta e loja — o tutor encontra o que quer sem navegar muito.",
      convert:
        "Agendamento reaproveita o cadastro do pet — raça, peso, última vacina — e sugere o próximo horário livre.",
      respond:
        "WhatsApp confirma horário, valor e observações do tutor antes do pet sair de casa.",
      organize:
        "Ficha única do pet concentra serviços, loja e histórico clínico — vet e balconista leem a mesma tela.",
      measure:
        "Dashboard junta ticket por tutor, recorrência de banho e venda cruzada de ração mensal.",
    },
    kpis: [
      {
        label: "Recorrência de banho",
        value: "+47%",
        caption: "com lembrete no ciclo preferido do tutor",
      },
      {
        label: "Ticket combinado",
        value: "até 1,8x",
        caption: "quando loja e serviço compartilham cadastro",
      },
      {
        label: "Agenda preenchida",
        value: "92%",
        caption: "da capacidade semanal do pet shop",
      },
    ],
    coverAsset: "/showcases/pet-cover.svg",
    modelAsset: "/showcases/pet-model.svg",
  },
  {
    slug: "comercio",
    label: "Comércio & varejo regional",
    hookLine: "A prateleira certa para o bairro certo.",
    bullets: [
      "Catálogo por loja com estoque e preço atualizados todo dia.",
      "Busca local otimizada por bairro, rua e ponto de referência.",
      "Reserva de produto no WhatsApp com retirada em duas horas.",
      "Indicadores de giro por categoria visíveis para o gerente da loja.",
    ],
    engrenagem: {
      capture:
        "SEO local por bairro puxa quem já está perto — intenção geográfica vira visita na loja física.",
      convert:
        "Ficha do produto com estoque real, preço e reserva imediata encurta a decisão do cliente.",
      respond:
        "WhatsApp da loja confirma reserva, separa a peça e avisa quando está pronta pra retirada.",
      organize:
        "Catálogo central sincroniza loja, Instagram e marketplace — uma entrada alimenta todas as vitrines.",
      measure:
        "BI mostra giro por categoria, conversão por bairro e produtos que encalham por unidade.",
    },
    kpis: [
      {
        label: "Busca local ativa",
        value: "+58%",
        caption: "de cliques vindos do Google Maps do bairro",
      },
      {
        label: "Reserva para retirada",
        value: "24%",
        caption: "das vendas online no primeiro trimestre",
      },
      {
        label: "Giro de categoria",
        value: "+19%",
        caption: "nos itens destacados pelo dashboard",
      },
    ],
    coverAsset: "/showcases/comercio-cover.svg",
    modelAsset: "/showcases/comercio-model.svg",
  },
  {
    slug: "servicos",
    label: "Serviços gerais",
    hookLine: "Do orçamento ao pós-venda sem planilha solta.",
    bullets: [
      "Pedido de orçamento com foto e endereço já entra no CRM.",
      "Roteiro do técnico montado pela ordem dos bairros do dia.",
      "Cliente acompanha status do serviço por link próprio.",
      "Pós-venda automático pede avaliação no Google três dias depois.",
    ],
    engrenagem: {
      capture:
        "Landing por tipo de serviço captura foto, endereço e janela — o briefing entra pronto no CRM.",
      convert:
        "Orçamento volta no mesmo dia com faixa de preço e agenda sugerida — sem vai-e-volta infinito.",
      respond:
        "WhatsApp atualiza o cliente quando o técnico saiu, chegou e concluiu — previsibilidade visível.",
      organize:
        "Agenda do técnico, estoque de peça e histórico do imóvel ficam no mesmo painel operacional.",
      measure:
        "Dashboard cruza origem do pedido, ticket médio e avaliação pública recebida por técnico.",
    },
    kpis: [
      {
        label: "Orçamento no mesmo dia",
        value: "87%",
        caption: "dos pedidos recebidos até as 15h",
      },
      {
        label: "Avaliação no Google",
        value: "+3,2x",
        caption: "com pedido automático de review pós-serviço",
      },
      {
        label: "Retrabalho reportado",
        value: "-29%",
        caption: "com briefing fotográfico estruturado",
      },
    ],
    coverAsset: "/showcases/servicos-cover.svg",
    modelAsset: "/showcases/servicos-model.svg",
  },
  {
    slug: "marcenaria",
    label: "Marcenaria & oficinas",
    hookLine: "Projeto custom com cronograma visível.",
    bullets: [
      "Briefing por ambiente com referências, medidas e prazo desejado.",
      "Orçamento em etapas assinado digitalmente no próprio site.",
      "Cronograma de produção acompanhado pelo cliente dia a dia.",
      "Pós-entrega com garantia ativa registrada por peça fabricada.",
    ],
    engrenagem: {
      capture:
        "Galeria por ambiente — cozinha, closet, home office — puxa o cliente que já tem referência na cabeça.",
      convert:
        "Briefing guiado coleta medida, material e faixa de investimento antes da primeira visita técnica.",
      respond:
        "WhatsApp mostra etapa da produção — projeto, corte, montagem, entrega — com foto da oficina.",
      organize:
        "Pipeline por obra separa projeto aprovado, em corte, em montagem e instalado — sem tarefa perdida.",
      measure:
        "BI junta prazo real versus prometido, margem por tipo de móvel e indicação por cliente entregue.",
    },
    kpis: [
      {
        label: "Aprovação na 1ª visita",
        value: "+41%",
        caption: "com briefing estruturado online",
      },
      {
        label: "Atraso na entrega",
        value: "-35%",
        caption: "quando o cronograma fica público",
      },
      {
        label: "Indicação espontânea",
        value: "até 2,6x",
        caption: "após pós-entrega com garantia ativa",
      },
    ],
    coverAsset: "/showcases/marcenaria-cover.svg",
    modelAsset: "/showcases/marcenaria-model.svg",
  },
  {
    slug: "agro",
    label: "Agrícola & agronegócio",
    hookLine: "Do talhão ao contrato — presença regional que fecha.",
    bullets: [
      "Página por cultura atende busca específica do produtor regional.",
      "Pedido de cotação integrado ao representante da cidade mais próxima.",
      "Catálogo técnico com ficha, dosagem e compatibilidade por insumo.",
      "Dashboard de safra mostra volume captado por região e por cultura.",
    ],
    engrenagem: {
      capture:
        "Páginas por cultura e por região capturam produtor de soja, café ou milho com linguagem do campo.",
      convert:
        "Cotação puxa talhão, hectare e janela de plantio — o representante já chega com proposta aderente.",
      respond:
        "WhatsApp do representante local assume o lead em minutos — presença regional sentida, não encenada.",
      organize:
        "CRM por região liga produtor, histórico de compra, próxima safra e visita de campo agendada.",
      measure:
        "Dashboard mostra volume captado por cultura, fechamento por representante e sazonalidade real.",
    },
    kpis: [
      {
        label: "Cotação respondida",
        value: "< 2h",
        caption: "pelo representante da região do produtor",
      },
      {
        label: "Fechamento regional",
        value: "+33%",
        caption: "contra contato via distribuidor genérico",
      },
      {
        label: "Recompra na safra",
        value: "até 2,2x",
        caption: "com CRM por talhão ativo",
      },
    ],
    coverAsset: "/showcases/agro-cover.svg",
    modelAsset: "/showcases/agro-model.svg",
  },
  {
    slug: "escritorios",
    label: "Escritórios especializados",
    hookLine:
      "Advocacia, contabilidade, arquitetura: autoridade digital à altura.",
    bullets: [
      "Página por área de atuação com casos publicados e autoridade técnica.",
      "Primeira consulta agendada com briefing jurídico ou contábil anexado.",
      "Biblioteca de artigos que sustenta o SEO e alimenta reputação.",
      "Painel interno organiza cliente, pasta e honorário recorrente.",
    ],
    engrenagem: {
      capture:
        "Páginas por área de atuação mostram tese, caso e currículo — quem pesquisa o tema encontra autoridade legível.",
      convert:
        "Agendamento da primeira consulta já coleta documentos e resumo do caso — menos atrito na reunião inicial.",
      respond:
        "WhatsApp institucional confirma horário, forma de pagamento e envia checklist da reunião.",
      organize:
        "Painel interno junta cliente, pasta, prazo e honorário recorrente — sem planilha paralela sumindo.",
      measure:
        "BI liga origem do cliente, área consultada, ticket e permanência — mostra qual conteúdo realmente contrata.",
    },
    kpis: [
      {
        label: "Consulta qualificada",
        value: "+46%",
        caption: "quando a landing filtra por área de atuação",
      },
      {
        label: "Ticket médio inicial",
        value: "até 1,9x",
        caption: "com briefing técnico anexado à reunião",
      },
      {
        label: "Tráfego orgânico",
        value: "+2,8x",
        caption: "em 6 meses de biblioteca de artigos publicada",
      },
    ],
    coverAsset: "/showcases/escritorios-cover.svg",
    modelAsset: "/showcases/escritorios-model.svg",
  },
];

export function getShowcase(slug: string): Showcase | undefined {
  return SHOWCASES.find((s) => s.slug === slug);
}

export const SHOWCASE_SLUGS = SHOWCASES.map((s) => s.slug);
