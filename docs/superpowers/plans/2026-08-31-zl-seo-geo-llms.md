# ZL Podologia SEO, GEO e llms.txt Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Do not dispatch subagents unless Yuri explicitly authorizes delegation. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar localmente uma base auditável com 500 intenções, gerar `/llms.txt`, corrigir SEO técnico e melhorar a capacidade das 12 páginas públicas de atrair tráfego orgânico qualificado, sem criar novas páginas ou alterar produção.

**Architecture:** Doze arquivos JSON são a fonte editorial das intenções. Schema, validação e renderização ficam em módulos TypeScript independentes; scripts finos carregam os dados, executam gates e geram `public/llms.txt`. As correções públicas reutilizam `PUBLIC_STATIC_ROUTES`, as constantes canônicas da ZL e os componentes existentes.

**Tech Stack:** Next.js 15.5, React 19, TypeScript 5.7, Zod 4, Node.js `node:test`, TSX, ESLint 9 e Playwright 1.59.

---

## Limites obrigatórios

- Trabalhar somente em `C:\Users\Yuri\Desktop\Yuri\.worktrees\zl-seo-geo-llms-20260831`.
- Preservar o baseline `6f8ed4a5ba9b26d950f0672b5b9d7c15f8866ca7` e o documento de design aprovado.
- Não executar commit, push, PR, merge, deploy, upload, DNS, Vercel, Google Business Profile ou Search Console.
- Não executar `npm audit fix`, `npm update` ou atualização manual de Next.js/Sharp.
- Usar TDD para funções, geradores e mudanças comportamentais.
- Usar `apply_patch` para edições deliberadas.
- Depois de cada tarefa, executar `git diff --check` e registrar um checkpoint local com `git status --short`; não criar commit.

## Mapa de arquivos

**Criar**

- `data/zl-seo/entity.json`: snapshot auditável dos fatos comerciais confirmados.
- `data/zl-seo/internal-sources.json`: IDs internos e URLs canônicas reais.
- `data/zl-seo/official-sources.json`: registro das fontes clínicas oficiais.
- `data/zl-seo/intents/*.json`: 12 arquivos editoriais, total exato de 500 entradas.
- `lib/zl-seo/schema.ts`: enums, tipos e schemas Zod.
- `lib/zl-seo/load-data.ts`: leitura determinística dos arquivos JSON.
- `lib/zl-seo/validation.ts`: gates individuais e da coleção.
- `lib/zl-seo/llms-renderer.ts`: Markdown puro e determinístico.
- `scripts/generate-zl-llms.ts`: escrita segura de `public/llms.txt`.
- `scripts/check-zl-seo.ts`: gate CLI sem escrita.
- `tests/zl-seo.test.ts`: testes unitários e editoriais.
- `tests/zl-seo-public.spec.ts`: testes públicos com Playwright.
- `tests/zl-seo-http.test.mjs`: verificação HTTP do build de produção local.
- `eslint.config.mjs`: configuração ESLint flat e não interativa.
- `public/llms.txt`: artefato gerado.

**Modificar**

- `package.json`: scripts de geração, validação, testes e lint.
- `middleware.ts`: permitir `/llms.txt`.
- `app/robots.ts`: regras explícitas de crawlers.
- `app/sitemap.ts`: remover datas artificiais e manter somente rotas canônicas.
- `app/layout.tsx`: alinhar o ID da entidade global.
- `app/lab/zl-podologia/page.tsx`: remover `meta keywords` e corrigir tipos da entidade.
- `lib/site.ts`: completar a identidade global sem duplicar fatos comerciais.
- `components/zl-podologia/zlSeoLandingTypes.ts`: links internos opcionais.
- `components/zl-podologia/ZlSeoLandingPage.tsx`: renderizar links relacionados de forma discreta.
- `components/zl-podologia/zlIngrownServiceContent.ts`: FAQ e links prioritários de unha encravada.
- `components/zl-podologia/zlFungusServiceContent.ts`: FAQ e links prioritários de micose/unhas.
- `components/zl-podologia/zlServiceClusterPages.ts`: FAQ e links das três páginas de serviços restantes.
- `components/zl-podologia/zlNeighborhoodPages.ts`: reforçar que o atendimento ocorre na Parquelândia e ligar para serviços reais.
- `components/zl-podologia/zlPodologiaContent.ts`: selecionar FAQs de maior valor na home sem aumentar a quantidade total.

## Task 1: Criar o contrato e o test runner de SEO

**Files:**

- Create: `lib/zl-seo/schema.ts`
- Create: `tests/zl-seo.test.ts`
- Modify: `package.json`

- [ ] **Step 1: adicionar primeiro o teste RED do contrato**

Criar `tests/zl-seo.test.ts` usando `node:test` e `assert/strict`. O primeiro teste deve importar `ZL_SEO_INTENT_SCHEMA`, validar um registro completo e rejeitar um registro sem `question`.

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { ZL_SEO_INTENT_SCHEMA } from "../lib/zl-seo/schema";

const validIntent = {
  id: "geral-quando-procurar-podologo",
  question: "Quando vale a pena procurar atendimento podológico?",
  searchIntent: "Entender quando o cuidado profissional pode ser útil.",
  shortAnswer: "Dor, alterações persistentes nas unhas ou na pele e dificuldade para cuidar dos pés com segurança justificam avaliação profissional.",
  category: "conceitos-gerais",
  relatedService: null,
  relatedLocation: null,
  canonicalUrl: "https://www.zlpodologia.com.br/",
  naturalTerms: ["podologia", "cuidado dos pés", "avaliação profissional"],
  professionalAlert: null,
  internalSourceId: "home-podologia-clinica",
  officialSourceIds: [],
  healthRisk: "routine",
  funnelStage: "discovery",
  trafficPriority: "high",
};

test("accepts a complete SEO intent", () => {
  assert.equal(ZL_SEO_INTENT_SCHEMA.safeParse(validIntent).success, true);
});

test("rejects an intent without a question", () => {
  const { question: _question, ...invalid } = validIntent;
  assert.equal(ZL_SEO_INTENT_SCHEMA.safeParse(invalid).success, false);
});
```

- [ ] **Step 2: adicionar scripts e confirmar a falha esperada**

Adicionar em `package.json`:

```json
"test:seo": "node --import tsx --test tests/zl-seo.test.ts",
"test": "npm run test:seo"
```

Executar `npm.cmd run test:seo`. Resultado esperado: FAIL porque `lib/zl-seo/schema.ts` ainda não existe.

- [ ] **Step 3: implementar o schema mínimo**

Criar enums Zod fechados para as 12 categorias, serviços confirmados, localizações confirmadas, risco, funil e prioridade. `question`, `searchIntent` e `shortAnswer` devem usar `.trim().min(1)`. `canonicalUrl` deve ser URL absoluta. `naturalTerms` deve ter entre 2 e 8 itens não vazios.

Os serviços aceitos são `ingrown`, `fungus`, `orthosis`, `laser`, `podoprofilaxia`, `plantar_wart`, `tungiasis`, `reflexology` e `diabetic`. As localizações aceitas são `fortaleza`, `parquelandia`, `aldeota`, `centro-fortaleza`, `cidade-dos-funcionarios`, `maraponga` e `messejana`.

Exportar também:

```ts
export const CATEGORY_COUNTS = {
  "conceitos-gerais": 40,
  "unha-encravada": 50,
  "calos-e-pressao": 45,
  "rachaduras-e-ressecamento": 40,
  "micose-e-unhas": 50,
  "pes-e-diabetes": 50,
  "cuidados-para-idosos": 35,
  "criancas-e-adolescentes": 30,
  "atletas-e-atividade-fisica": 35,
  "higiene-e-prevencao": 40,
  "atendimento-e-cuidados": 45,
  "intencoes-locais": 40,
} as const;

export const EXPECTED_INTENT_TOTAL = 500;
```

- [ ] **Step 4: executar GREEN**

Executar `npm.cmd run test:seo`. Resultado esperado: 2 testes PASS.

- [ ] **Step 5: checkpoint local**

Executar `npm.cmd run typecheck`, `git diff --check` e `git status --short`.

## Task 2: Implementar os gates de validação com TDD

**Files:**

- Create: `lib/zl-seo/validation.ts`
- Modify: `tests/zl-seo.test.ts`

- [ ] **Step 1: escrever testes RED para normalização e similaridade**

Cobrir os seguintes resultados exatos:

```ts
assert.equal(
  normalizeQuestion("  PÉ diabético: cuidados? "),
  "pe diabetico cuidados",
);
assert.equal(diceTokenBigramSimilarity("cuidar da unha encravada", "cuidar da unha encravada"), 1);
assert.equal(diceTokenBigramSimilarity("unha encravada", "calos no pé"), 0);
```

Adicionar um teste que passa duas perguntas com score `>= 0.82` e espera erro `near_duplicate_question`.

- [ ] **Step 2: executar RED**

Executar `npm.cmd run test:seo`. Resultado esperado: FAIL porque as funções ainda não existem.

- [ ] **Step 3: implementar normalização e Sørensen-Dice**

`normalizeQuestion` deve aplicar NFD, remover diacríticos, converter para minúsculas, trocar pontuação por espaço e colapsar espaços. A similaridade usa conjuntos de bigramas de tokens e retorna `2 * interseção / (total dos dois conjuntos)`.

- [ ] **Step 4: escrever testes RED para cada gate**

Adicionar fixtures pequenas que comprovem individualmente:

- resposta vazia;
- ID duplicado;
- pergunta duplicada normalizada;
- placeholder `TBD`;
- canonical com query string;
- canonical fora de `www.zlpodologia.com.br`;
- `internalSourceId` inexistente;
- `officialSourceId` inexistente;
- risco `attention` ou `urgent` sem alerta;
- expressão de garantia clínica;
- contagem de categoria incorreta;
- total diferente de 500;
- divergência de fato comercial.

Os erros devem ter `{ code, intentId, message }` e a coleção deve retornar todos os erros encontrados, em ordem determinística.

- [ ] **Step 5: implementar `validateIntentCollection`**

A função recebe `{ intents, internalSources, officialSources, entity, canonicalRoutes, expectedCounts }`. Não lê arquivos e não escreve saída. Expressões proibidas devem cobrir garantias inequívocas, como `cura garantida`, `resultado garantido`, `diagnóstico online confirmado` e `substitui consulta médica`, sem rejeitar avisos negativos como `não substitui avaliação profissional`.

- [ ] **Step 6: executar GREEN e checkpoint**

Executar `npm.cmd run test:seo`, `npm.cmd run typecheck`, `git diff --check` e `git status --short`.

## Task 3: Registrar entidade e fontes auditáveis

**Files:**

- Create: `data/zl-seo/entity.json`
- Create: `data/zl-seo/internal-sources.json`
- Create: `data/zl-seo/official-sources.json`
- Create: `lib/zl-seo/load-data.ts`
- Modify: `tests/zl-seo.test.ts`

- [ ] **Step 1: escrever teste RED de carregamento e drift**

O teste importa `SITE_URL`, `ZL_WHATSAPP_NUMBER`, `zlContact`, `zlLocation`, `zlHoursRows` e verifica igualdade com o JSON. Deve exigir:

```ts
assert.equal(entity.canonicalUrl, SITE_URL);
assert.equal(entity.whatsappNumber, ZL_WHATSAPP_NUMBER);
assert.equal(entity.email, zlContact.email);
assert.equal(entity.address.streetAddress, zlLocation.streetAddress);
assert.equal(entity.address.district, zlLocation.district);
assert.deepEqual(entity.openingHours, zlHoursRows);
```

Executar o teste e confirmar FAIL por ausência dos arquivos.

- [ ] **Step 2: criar `entity.json` somente com fatos confirmados**

Registrar nome `ZL Podologia`, categoria `Podologia clínica`, domínio canônico, WhatsApp, telefone, e-mail, Instagram, Facebook, endereço completo, Fortaleza/CE, Parquelândia, CEP, Galeria José Bernardo, horários e os serviços já publicados. Não copiar avaliações, certificações ou promessas para esse arquivo.

- [ ] **Step 3: criar as fontes internas**

Incluir IDs para home, cinco serviços, cinco bairros e política de imagens. Cada registro contém `id`, `canonicalUrl`, `label` e `evidencePath`. `canonicalUrl` deve pertencer a `PUBLIC_STATIC_ROUTES`; `evidencePath` aponta para o arquivo de código que sustenta o fato.

- [ ] **Step 4: criar o registro de fontes oficiais**

Usar IDs estáveis e as URLs verificadas:

- `ms-pe-diabetico-manual` — `https://bvsms.saude.gov.br/bvs/publicacoes/manual_pe_diabetico_estrategias_pessoa_doenca_cronica.pdf`.
- `bvsms-pe-diabetico` — `https://bvsms.saude.gov.br/pe-diabetico-3/`.
- `niddk-diabetes-foot-problems` — `https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/foot-problems`.
- `aad-nail-fungus-overview` — `https://www.aad.org/public/diseases/a-z/nail-fungus-overview`.
- `aad-nail-fungus-treatment` — `https://www.aad.org/public/diseases/a-z/nail-fungus-treatment`.
- `aad-nail-changes` — `https://www.aad.org/public/everyday-care/nail-care-secrets/basics/nail-changes-dermatologist-should-examine`.
- `nhs-athletes-foot` — `https://www.nhs.uk/conditions/athletes-foot/`.
- `nhs-corns-calluses` — `https://www.nhs.uk/conditions/corns-and-calluses/`.
- `nhs-ingrown-toenail` — `https://www.nhs.uk/conditions/ingrown-toenail/`.
- `nhs-children-foot-problems` — `https://www.nhs.uk/baby/health/leg-and-foot-problems-in-children/`.
- `aap-child-nail-care` — `https://www.healthychildren.org/English/ages-stages/baby/bathing-skin-care/Pages/Nail-Care-Fingers-and-Toes.aspx`.
- `nia-skin-care-aging` — `https://www.nia.nih.gov/health/skin-care/skin-care-and-aging`.
- `nia-late-stage-foot-care` — `https://www.nia.nih.gov/health/alzheimers-caregiving/care-last-stages-alzheimers-disease`.

Cada item contém `id`, `organization`, `title`, `url`, `language` e `topics`. Nenhum texto de terceiros é copiado para o repositório.

- [ ] **Step 5: implementar carregamento determinístico**

`load-data.ts` resolve caminhos a partir da raiz do projeto, valida JSON com Zod, ordena arquivos de intenção pelo nome e retorna objetos imutáveis. Erros de JSON devem informar o caminho sem imprimir dados sensíveis.

- [ ] **Step 6: executar GREEN e checkpoint**

Executar `npm.cmd run test:seo`, `npm.cmd run typecheck`, `git diff --check` e `git status --short`.

## Task 4: Autorizar editorialmente as 500 intenções

**Files:**

- Create: `data/zl-seo/intents/conceitos-gerais.json`
- Create: `data/zl-seo/intents/unha-encravada.json`
- Create: `data/zl-seo/intents/calos-e-pressao.json`
- Create: `data/zl-seo/intents/rachaduras-e-ressecamento.json`
- Create: `data/zl-seo/intents/micose-e-unhas.json`
- Create: `data/zl-seo/intents/pes-e-diabetes.json`
- Create: `data/zl-seo/intents/cuidados-para-idosos.json`
- Create: `data/zl-seo/intents/criancas-e-adolescentes.json`
- Create: `data/zl-seo/intents/atletas-e-atividade-fisica.json`
- Create: `data/zl-seo/intents/higiene-e-prevencao.json`
- Create: `data/zl-seo/intents/atendimento-e-cuidados.json`
- Create: `data/zl-seo/intents/intencoes-locais.json`
- Modify: `tests/zl-seo.test.ts`

- [ ] **Step 1: escrever o teste RED do conjunto completo**

Carregar todos os arquivos, executar `validateIntentCollection` e exigir:

```ts
assert.equal(intents.length, 500);
assert.deepEqual(countByCategory(intents), CATEGORY_COUNTS);
assert.deepEqual(errors, []);
```

Adicionar asserts de aquisição:

```ts
assert.ok(intents.some((item) => item.funnelStage === "local"));
assert.ok(intents.some((item) => item.funnelStage === "booking"));
assert.ok(intents.filter((item) => item.trafficPriority === "high").length >= 100);
```

Executar RED: os 12 arquivos ainda não existem.

- [ ] **Step 2: escrever o lote editorial 1 — 135 entradas**

- 40 conceitos gerais;
- 50 unha encravada;
- 45 calos e alterações de pressão.

Cada pergunta representa uma necessidade diferente: definição, sinais observáveis, prevenção, calçado, recorrência, preparo, limites do autocuidado, quando procurar profissional e conexão com o serviço real. Não variar apenas o sujeito, cidade ou ordem das palavras.

- [ ] **Step 3: escrever o lote editorial 2 — 140 entradas**

- 40 rachaduras e ressecamento;
- 50 micose e alterações visíveis nas unhas;
- 50 pés de pessoas com diabetes.

Não afirmar que alteração visual confirma micose. Em diabetes, alertas de ferida, calor, vermelhidão, secreção, perda de sensibilidade ou dificuldade de cicatrização devem recomendar avaliação de saúde e usar fontes do Ministério da Saúde ou NIDDK.

- [ ] **Step 4: escrever o lote editorial 3 — 100 entradas**

- 35 idosos;
- 30 crianças e adolescentes;
- 35 atletas e pessoas fisicamente ativas.

Não inventar que a ZL oferece atendimento pediátrico específico. Perguntas infantis informativas apontam para avaliação profissional apropriada; fatos comerciais só aparecem quando sustentados pelo site.

- [ ] **Step 5: escrever o lote editorial 4 — 125 entradas**

- 40 higiene e prevenção;
- 45 atendimento, preparação e pós-atendimento;
- 40 intenções locais e comerciais confirmadas.

Nas intenções locais, distinguir explicitamente unidade física em Parquelândia de pacientes vindos de Aldeota, Centro, Cidade dos Funcionários, Maraponga e Messejana. Não criar bairros, estacionamento, convênios, preços, prazos ou disponibilidade não confirmados.

- [ ] **Step 6: revisar manualmente os pares de maior similaridade**

Gerar relatório ordenado dos 30 maiores scores abaixo de `0,82`. Reescrever pares que representem a mesma necessidade mesmo quando o gate automático não falhar. Confirmar que perguntas de alto tráfego não são concentradas artificialmente numa única categoria.

- [ ] **Step 7: executar GREEN e checkpoint**

Executar `npm.cmd run test:seo`. Resultado esperado: 500 entradas, contagens exatas e zero erros. Depois executar `npm.cmd run typecheck`, `git diff --check` e `git status --short`.

## Task 5: Criar o renderizador, checker e gerador determinístico

**Files:**

- Create: `lib/zl-seo/llms-renderer.ts`
- Create: `scripts/check-zl-seo.ts`
- Create: `scripts/generate-zl-llms.ts`
- Create: `public/llms.txt`
- Modify: `tests/zl-seo.test.ts`
- Modify: `package.json`

- [ ] **Step 1: escrever testes RED do Markdown**

Exigir cabeçalho `# ZL Podologia`, aviso de não garantia, disclaimer clínico, domínio canônico, 12 seções, 500 linhas iniciadas por `### Pergunta`, resposta, canonical e referências oficiais. Renderizar duas vezes e comparar igualdade byte a byte.

- [ ] **Step 2: escrever teste RED do arquivo desatualizado**

`checkGeneratedLlms(expected, actual)` deve falhar quando um caractere divergir e informar `llms_out_of_date`, sem escrever arquivo.

- [ ] **Step 3: implementar o renderizador puro**

Ordenar categorias conforme `CATEGORY_COUNTS` e preservar a ordem editorial dentro de cada arquivo. Escapar somente caracteres que quebrem Markdown; não transformar respostas em HTML. Incluir referências oficiais por ID e uma seção final com os links completos.

- [ ] **Step 4: implementar os CLIs**

`check-zl-seo.ts` carrega, valida, renderiza e compara o artefato. `generate-zl-llms.ts` carrega, valida, renderiza para um arquivo temporário no diretório `public` e substitui `public/llms.txt` somente após sucesso. Remover o temporário em `finally`.

- [ ] **Step 5: adicionar scripts**

```json
"seo:generate": "tsx scripts/generate-zl-llms.ts",
"seo:check": "tsx scripts/check-zl-seo.ts"
```

- [ ] **Step 6: executar RED, gerar e executar GREEN**

Executar `npm.cmd run seo:check` antes da geração e confirmar FAIL por arquivo ausente. Executar `npm.cmd run seo:generate`, depois `npm.cmd run seo:check` e `npm.cmd run test:seo`; todos devem passar.

- [ ] **Step 7: checkpoint**

Executar `git diff --check` e `git status --short`.

## Task 6: Corrigir endpoint, robots, sitemap, metadata e JSON-LD

**Files:**

- Create: `tests/zl-seo-public.spec.ts`
- Modify: `middleware.ts`
- Modify: `app/robots.ts`
- Modify: `app/sitemap.ts`
- Modify: `app/layout.tsx`
- Modify: `app/lab/zl-podologia/page.tsx`
- Modify: `lib/site.ts`

- [ ] **Step 1: escrever Playwright RED**

Testar:

- `GET /llms.txt` retorna 200, `content-type` contém `text/plain` e o corpo tem 500 perguntas;
- robots contém blocos de `OAI-SearchBot`, `ChatGPT-User` e `*`, mantém `Disallow: /api/` para o genérico e referencia o sitemap canônico;
- sitemap contém exatamente as 12 URLs de `PUBLIC_STATIC_ROUTES`, sem query, sem fragmento e sem `lastmod` artificial;
- home não possui `meta[name="keywords"]`;
- cada rota do sitemap tem um canonical;
- JSON-LD da home não contém `MedicalBusiness`;
- o grafo contém `https://www.zlpodologia.com.br#business` e referências `provider`/`publisher` usam esse ID.

Executar `npx.cmd playwright test tests/zl-seo-public.spec.ts --project=chromium` e confirmar as falhas do baseline.

- [ ] **Step 2: permitir `/llms.txt` no middleware**

Adicionar somente `"/llms.txt"` a `EXACT_ALLOWED_PATHS`. Não alterar o fallback, APIs ou redirects existentes.

- [ ] **Step 3: corrigir robots**

Retornar três regras na ordem `OAI-SearchBot`, `ChatGPT-User`, `*`. Os dois primeiros recebem apenas `allow: "/"`; o genérico mantém `allow: "/"` e `disallow: "/api/"`. Não declarar `GPTBot`.

- [ ] **Step 4: corrigir sitemap**

Remover `lastModified: new Date()`. Continuar mapeando exclusivamente `PUBLIC_STATIC_ROUTES`, com host gerado por `absoluteSiteUrl`.

- [ ] **Step 5: remover meta keywords e alinhar JSON-LD**

Remover a propriedade `keywords` da metadata da home e qualquer import que fique sem uso. Adicionar `"@id": `${SITE_URL}#business`` ao nó global. Na entidade detalhada, trocar `['LocalBusiness', 'MedicalBusiness', 'HealthAndBeautyBusiness']` por `['LocalBusiness', 'HealthAndBeautyBusiness']`.

- [ ] **Step 6: executar GREEN e checkpoint**

Executar o teste Playwright direcionado, `npm.cmd run test:seo`, `npm.cmd run typecheck`, `git diff --check` e `git status --short`.

## Task 7: Melhorar aquisição nas páginas existentes sem criar rotas

**Files:**

- Modify: `components/zl-podologia/zlSeoLandingTypes.ts`
- Modify: `components/zl-podologia/ZlSeoLandingPage.tsx`
- Modify: `components/zl-podologia/zlIngrownServiceContent.ts`
- Modify: `components/zl-podologia/zlFungusServiceContent.ts`
- Modify: `components/zl-podologia/zlServiceClusterPages.ts`
- Modify: `components/zl-podologia/zlNeighborhoodPages.ts`
- Modify: `components/zl-podologia/zlPodologiaContent.ts`
- Modify: `tests/zl-seo-public.spec.ts`
- Modify: existing ZL Playwright regression tests only when assertions must reflect approved copy, never to hide a failure.

- [ ] **Step 1: escrever RED para conteúdo prioritário e links internos**

Exigir em cada página de serviço pelo menos dois links relacionados SSR, todos pertencentes a `PUBLIC_STATIC_ROUTES`. Exigir que as cinco páginas de bairro contenham texto inequívoco de que o atendimento ocorre na clínica da Parquelândia. Exigir que FAQ visível e JSON-LD tenham a mesma quantidade e os mesmos textos.

- [ ] **Step 2: estender o contrato das páginas**

Adicionar propriedade opcional:

```ts
relatedLinks?: readonly {
  href: `/${string}`;
  label: string;
  description: string;
}[];
```

- [ ] **Step 3: renderizar links relacionados**

Adicionar uma subseção discreta entre FAQ e CTA final, reutilizando cores, tipografia e largura atuais. Usar `next/link`, título `Continue sua pesquisa` e links textuais. Não adicionar imagens, animações ou nova rota.

- [ ] **Step 4: definir ligações editoriais**

- Unha encravada → órtese e podoprofilaxia.
- Micose/unhas → podoprofilaxia e pé diabético, com texto clínico neutro.
- Órtese → unha encravada e podoprofilaxia.
- Podoprofilaxia → pé diabético e unha encravada.
- Pé diabético → podoprofilaxia e home, sem sugerir substituição do acompanhamento médico.
- Cada página de bairro → home e duas páginas de serviço de maior intenção, sempre declarando atendimento na Parquelândia.

- [ ] **Step 5: selecionar FAQs de aquisição**

Manter quantidade enxuta. Priorizar perguntas sobre sinais observáveis, diferença entre alteração visual e confirmação diagnóstica, preparo, retorno, localização e agendamento. Remover ou reescrever qualquer promessa de encaixe, eficácia ou “melhores resultados” que não possa ser comprovada. Reutilizar respostas da matriz para evitar drift.

- [ ] **Step 6: executar GREEN e regressões ZL**

Executar:

```powershell
npx.cmd playwright test tests/zl-seo-public.spec.ts tests/zl-ingrown-page.spec.ts tests/zl-fungus-page.spec.ts tests/zl-service-cluster-pages.spec.ts tests/zl-neighborhood-pages.spec.ts --project=chromium
```

Depois executar `npm.cmd run test:seo`, `npm.cmd run typecheck`, `git diff --check` e `git status --short`.

## Task 8: Tornar o lint reproduzível

**Files:**

- Create: `eslint.config.mjs`
- Modify: `package.json`

- [ ] **Step 1: confirmar RED do baseline**

Executar `npm.cmd run lint` e registrar a falha interativa de `next lint`.

- [ ] **Step 2: criar configuração flat compatível**

Usar `FlatCompat` com base no diretório do arquivo e estender `next/core-web-vitals` e `next/typescript`. Ignorar somente `.next/**`, `node_modules/**`, `public/**` e artefatos de screenshot/vídeo já existentes. Não desativar regras em massa.

```js
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const directory = path.dirname(filename);
const compat = new FlatCompat({ baseDirectory: directory });

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "test-results/**",
      "playwright-report/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
```

`@eslint/eslintrc` já é instalado pelo ESLint direto do projeto no lockfile baseline; não adicionar ou atualizar pacote para esta configuração.

- [ ] **Step 3: migrar o script**

Trocar para:

```json
"lint": "eslint . --max-warnings=0"
```

- [ ] **Step 4: executar lint e corrigir somente erros reais no escopo**

Se o lint expuser erros pré-existentes fora dos arquivos tocados, registrar a lista e limitar o comando a fontes mantidas pelo projeto somente se essa limitação continuar cobrindo todos os arquivos alterados. Não alterar código alheio apenas para zerar ruído histórico.

- [ ] **Step 5: checkpoint**

Executar `npm.cmd run lint`, `npm.cmd run typecheck`, `git diff --check` e `git status --short`.

## Task 9: Verificação integral local e HTTP de produção

**Files:**

- Create: `tests/zl-seo-http.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: escrever o teste HTTP antes do helper**

O script deve iniciar `next start` em `127.0.0.1:3017`, aguardar resposta com timeout de 60 segundos e verificar:

- 200 e content-type correto para `/llms.txt`, `/robots.txt`, `/sitemap.xml`;
- contagem de 500 perguntas no arquivo;
- XML parseável pelo PowerShell e 12 URLs;
- todas as URLs do sitemap com 200 sem redirect usando `redirect: "manual"`;
- canonical de cada HTML igual à URL esperada;
- nenhum header `x-robots-tag` bloqueante;
- `/llms.txt` não retorna HTML.

O processo filho deve ser encerrado em `finally`, também quando houver falha.

- [ ] **Step 2: adicionar script**

```json
"test:seo:http": "node tests/zl-seo-http.test.mjs"
```

- [ ] **Step 3: executar a escada completa**

Executar nesta ordem:

```powershell
npm.cmd ci
npm.cmd run seo:generate
npm.cmd run seo:check
npm.cmd run test:seo
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:seo:http
npm.cmd audit --omit=dev --json
```

Resultado esperado para todos, exceto auditoria: exit code 0. A auditoria pode retornar exit code diferente de zero pelos achados pré-existentes; registrar contagens e pacotes sem executar correção.

- [ ] **Step 4: validar XML e JSON-LD independentemente**

Usar `[xml](Invoke-WebRequest ...)` contra o servidor local para XML. No Playwright, executar `JSON.parse` sobre cada `script[type="application/ld+json"]`. Nenhum parser deve tolerar erro silenciosamente.

- [ ] **Step 5: inspeção visual proporcional**

Abrir home, uma página de serviço e uma página de bairro em 1440×900 e 390×844. Confirmar que FAQ e links relacionados não causam overflow, sobreposição, CTA quebrado ou mudança visual fora da seção tocada.

- [ ] **Step 6: checkpoint final de código**

Executar `git diff --check`, `git status --short`, `git diff --stat` e revisar todo o diff. Confirmar que não há alterações em lockfile, dependências, analytics, WhatsApp, assets ou rotas novas inesperadas.

## Task 10: Produzir relatório de evidências

**Files:**

- Create: `audit/zl-seo-geo-llms-local-report-2026-08-31.md`

- [ ] **Step 1: registrar inventário final**

Incluir repo, branch, baseline, domínio, arquivos alterados, total e contagem por categoria, distribuição de funil/prioridade, páginas do sitemap e correções de URLs.

- [ ] **Step 2: registrar todos os comandos e resultados**

Separar PASS, FAIL pré-existente, recuperação aplicada e itens não executados. Incluir resultado HTTP de `/llms.txt`, `/robots.txt` e `/sitemap.xml`.

- [ ] **Step 3: registrar riscos e estados operacionais**

Declarar:

- conteúdo implementado e testado somente localmente;
- commit: não criado;
- PR: não criado;
- merge: não realizado;
- deploy/preview: não realizado;
- Search Console: não acessado;
- indexação e aumento de tráfego: não comprovados;
- redirect apex 307 e vulnerabilidades de dependência: pendentes fora deste escopo.

- [ ] **Step 4: revisão final sem superlativos**

Não usar `homologado`, `production-ready`, `indexado` ou `tráfego aumentado`. O resultado local somente fica pronto para revisão e eventual etapa de publicação autorizada.

- [ ] **Step 5: preservar worktree**

Não remover a branch ou o worktree. Entregar os links locais para a especificação, plano, `llms.txt` e relatório.
