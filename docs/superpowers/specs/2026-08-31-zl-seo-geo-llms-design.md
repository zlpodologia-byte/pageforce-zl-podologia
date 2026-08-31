# ZL Podologia SEO, GEO e llms.txt — Especificação de Design

**Data:** 2026-08-31
**Repositório:** `zlpodologia-byte/pageforce-zl-podologia`
**Branch local:** `feat/zl-seo-geo-llms-20260831`
**Baseline:** `origin/main` em `6f8ed4a5ba9b26d950f0672b5b9d7c15f8866ca7`
**Domínio canônico:** `https://www.zlpodologia.com.br`

## 1. Objetivo

Ampliar a cobertura semântica e o potencial de aquisição orgânica da ZL Podologia sem criar páginas artificiais, alterar o design ou inventar dados comerciais e clínicos. A entrega combina uma base auditável de 500 intenções, um `llms.txt` determinístico, correções técnicas de rastreabilidade e melhorias pontuais no conteúdo indexável das 12 páginas públicas existentes.

O `llms.txt` será tratado como um recurso auxiliar de descoberta e compreensão da entidade. Ele não será apresentado como garantia de posicionamento, visita, indexação ou citação por assistentes de IA.

## 2. Estado confirmado antes da implementação

- O site público responde em `https://www.zlpodologia.com.br`.
- A página inicial, `robots.txt` e `sitemap.xml` respondem com HTTP 200.
- `/llms.txt` não existe no baseline e é redirecionado para a página inicial.
- O sitemap público contém 12 URLs, todas respondendo HTTP 200 e declarando canonical compatível.
- `robots.txt` permite o crawler genérico e bloqueia `/api/`, mas não possui regras específicas para `OAI-SearchBot` e `ChatGPT-User`.
- A home publica `meta keywords`, que deve ser removida.
- O sitemap usa a data do build como `lastModified` para todas as rotas, sem representar a data real de alteração de cada página.
- O domínio sem `www` redireciona temporariamente com HTTP 307 para o domínio canônico. A correção depende de configuração externa e não faz parte desta implementação local.
- A instalação limpa e o typecheck passam.
- O build do baseline passa e gera 62 rotas estáticas ou dinâmicas antes da filtragem pública do middleware.
- O lint do baseline não é executável de forma não interativa porque usa `next lint` sem configuração ESLint concluída.
- A auditoria de produção identifica vulnerabilidades pré-existentes em Next.js, Sharp e dependências transitivas. Atualizações de dependência não fazem parte deste escopo.

## 3. Arquitetura

### 3.1 Estrutura proposta

```text
data/zl-seo/
├── entity.json
├── internal-sources.json
├── official-sources.json
└── intents/
    ├── conceitos-gerais.json
    ├── unha-encravada.json
    ├── calos-e-pressao.json
    ├── rachaduras-e-ressecamento.json
    ├── micose-e-unhas.json
    ├── pes-e-diabetes.json
    ├── cuidados-para-idosos.json
    ├── criancas-e-adolescentes.json
    ├── atletas-e-atividade-fisica.json
    ├── higiene-e-prevencao.json
    ├── atendimento-e-cuidados.json
    └── intencoes-locais.json

lib/zl-seo/
├── schema.ts
├── validation.ts
└── llms-renderer.ts

scripts/
├── generate-zl-llms.ts
└── check-zl-seo.ts

tests/
├── zl-seo.test.ts
└── zl-seo-http.test.mjs

public/
└── llms.txt
```

Esses são os caminhos definidos para a implementação. As responsabilidades permanecem separadas entre dados, contrato, validação, renderização, geração e verificação HTTP.

### 3.2 Fluxo de dados

1. `entity.json` registra apenas fatos comerciais confirmados no site e no código atual.
2. `internal-sources.json` associa identificadores auditáveis às páginas canônicas e seções internas relevantes.
3. `official-sources.json` registra fontes clínicas oficiais permitidas, com organização, título e URL.
4. Os 12 arquivos de intenções totalizam exatamente 500 registros.
5. O schema Zod valida a estrutura e os domínios permitidos.
6. O validador aplica gates de quantidade, unicidade, similaridade, segurança clínica, fontes e URLs.
7. O renderizador produz Markdown legível e determinístico em memória.
8. O gerador somente substitui `public/llms.txt` depois que todos os gates passam.
9. O checker compara o arquivo publicado com a saída determinística para detectar edição manual ou artefato desatualizado.

## 4. Modelo de intenção

Cada entrada contém:

```ts
interface ZlSeoIntent {
  id: string;
  question: string;
  searchIntent: string;
  shortAnswer: string;
  category: CategoryId;
  relatedService: ServiceId | null;
  relatedLocation: ConfirmedLocationId | null;
  canonicalUrl: string;
  naturalTerms: string[];
  professionalAlert: string | null;
  internalSourceId: string;
  officialSourceIds: string[];
  healthRisk: "routine" | "attention" | "urgent";
  funnelStage: "discovery" | "consideration" | "local" | "booking";
  trafficPriority: "high" | "medium" | "supporting";
}
```

### 4.1 Distribuição obrigatória

| Categoria | Quantidade |
|---|---:|
| Conceitos gerais de podologia | 40 |
| Unha encravada e desconfortos ungueais | 50 |
| Calos, calosidades e alterações de pressão | 45 |
| Rachaduras e ressecamento dos pés | 40 |
| Micose e alterações visíveis nas unhas | 50 |
| Cuidados com pés de pessoas com diabetes | 50 |
| Cuidados para idosos | 35 |
| Podologia para crianças e adolescentes | 30 |
| Pés de atletas e pessoas fisicamente ativas | 35 |
| Higiene, prevenção e cuidados cotidianos | 40 |
| Atendimento, preparação e cuidados posteriores | 45 |
| Intenções locais e comerciais confirmadas | 40 |
| **Total** | **500** |

## 5. Estratégia de aquisição orgânica

O objetivo principal é aumentar visitas orgânicas qualificadas. A matriz será organizada por estágio de funil e prioridade de tráfego para evitar uma coleção sem utilidade comercial.

- `discovery`: dúvidas educativas que apresentam a categoria e problemas comuns.
- `consideration`: dúvidas que ajudam a entender quando procurar atendimento e como comparar opções seguras.
- `local`: buscas por atendimento na região realmente coberta.
- `booking`: dúvidas que antecedem contato, preparação e agendamento.

As 500 perguntas permanecem na base estruturada e no `llms.txt`. Somente uma seleção editorial de alto valor será incorporada às FAQs e aos blocos existentes das páginas públicas. Essa seleção deve melhorar resposta direta, correspondência com buscas não relacionadas à marca e ligação interna com páginas de serviço, sem criar uma parede de texto ou alterar o desenho visual.

O ganho de SEO não será atribuído ao `llms.txt` isoladamente. O potencial de aquisição virá principalmente do HTML indexável, da cobertura semântica das páginas reais, da arquitetura interna, de titles e descriptions úteis e da consistência da entidade.

## 6. Regras editoriais e clínicas

- Todas as perguntas serão escritas como intenções humanas plausíveis em português brasileiro.
- Não serão usadas permutações automáticas de cidade, serviço ou sintaxe apenas para completar a quantidade.
- Respostas devem ser curtas, factuais e úteis de forma isolada.
- Nenhuma entrada pode diagnosticar, prescrever, prometer cura ou garantir resultado.
- Entradas `attention` e `urgent` exigem `professionalAlert` explícito.
- Afirmações clínicas exigem referência a uma ou mais fontes oficiais registradas.
- Informações educativas devem declarar, quando pertinente, que não substituem avaliação profissional.
- Dados de endereço, telefone, horário, preço, profissionais, avaliações, serviços e cobertura geográfica devem corresponder ao conjunto de fatos confirmados.
- Localizações ficam restritas a Fortaleza, Parquelândia e aos bairros que já possuem páginas públicas confirmadas.
- Páginas de bairro devem deixar claro que o atendimento ocorre na unidade da Parquelândia, sem insinuar filial local.
- Não serão usadas `meta keywords`, keyword stuffing ou instruções para manipular modelos.

## 7. `llms.txt`

O arquivo gerado será Markdown em UTF-8 servido como `text/plain` e conterá:

1. Nome, categoria e resumo factual da ZL Podologia.
2. Domínio e URLs canônicas principais.
3. Endereço, horários e canais oficiais confirmados.
4. Aviso de que o arquivo não garante posicionamento ou citação.
5. Aviso de que conteúdo clínico é educativo e não substitui avaliação profissional.
6. Índice das 12 categorias.
7. As 500 perguntas agrupadas por categoria, com resposta curta, página canônica e referências aplicáveis.
8. Lista legível das fontes clínicas oficiais utilizadas.

Não haverá comandos para crawlers, prompt injection, instruções ocultas ou conteúdo integral copiado de terceiros.

## 8. SEO técnico

### 8.1 Middleware e endpoints

- Incluir `/llms.txt` na allowlist pública do middleware.
- Preservar os fluxos `/api/wa`, `/api/zl-events` e demais rotas autorizadas.
- Não alterar redirects de host ou DNS.
- Manter snapshots `.html` internos bloqueados e fora do sitemap.

### 8.2 Robots

Adicionar regras explícitas para `OAI-SearchBot` e `ChatGPT-User`, ambos com `Allow: /`. Manter o crawler genérico com `Allow: /` e `Disallow: /api/`. Não adicionar nem alterar regra de `GPTBot`.

### 8.3 Sitemap

Manter somente as 12 rotas de `PUBLIC_STATIC_ROUTES`. Remover datas artificiais geradas no build. O sitemap não inclui query strings, redirects, páginas administrativas, rotas internas, perguntas individuais ou URLs fora do host canônico.

### 8.4 Metadata e conteúdo indexável

- Remover `metadata.keywords` da home.
- Preservar um H1 por página.
- Manter `lang="pt-BR"`.
- Revisar title, description, conteúdo inicial, Open Graph e links internos, alterando somente quando houver ganho comprovável e semântica confirmada.
- Usar apenas perguntas prioritárias nas FAQs visíveis já existentes.

### 8.5 JSON-LD

- Dar ao nó global da entidade o `@id` canônico `https://www.zlpodologia.com.br#business`.
- Remover `MedicalBusiness` por falta de evidência de que a entidade seja uma clínica médica.
- Manter os tipos verdadeiros `LocalBusiness` e `HealthAndBeautyBusiness`.
- Preservar somente serviços, pessoas, endereço, telefone, horários e avaliações confirmados.
- Garantir que `provider` e `publisher` apontem para um nó existente.
- Manter `FAQPage` sincronizado apenas com FAQs visíveis.
- Validar todo bloco JSON-LD como JSON e verificar os identificadores críticos.

## 9. Validação e testes

### 9.1 Gates da matriz

- Total igual a 500.
- Quantidade mínima por categoria respeitada.
- Zero perguntas duplicadas após normalização de caixa, acentos, espaços e pontuação.
- Zero pares de perguntas com coeficiente de Sørensen-Dice igual ou superior a `0,82`, calculado sobre bigramas de tokens normalizados.
- Zero respostas vazias.
- Zero placeholders ou marcadores genéricos.
- Zero URLs fora do domínio canônico, com query, fragmento ou rota desconhecida.
- Zero referências internas inexistentes.
- Zero divergências entre domínio, contato, localização e horários de `entity.json` e as constantes canônicas já exportadas pelo site.
- Fontes oficiais presentes quando exigidas.
- Alertas profissionais presentes para riscos `attention` e `urgent`.
- Zero padrões de promessa de cura, diagnóstico remoto ou garantia de resultado.
- Artefato gerado idêntico à saída do renderizador.

### 9.2 Gates do site

- Testes unitários para schema, normalização, similaridade, validação e renderização.
- XML do sitemap válido.
- JSON-LD sintaticamente válido e com referências críticas resolvidas.
- Todas as URLs do sitemap retornando HTTP 200 sem redirect no servidor local.
- Canonical de cada página compatível com sua URL.
- `/llms.txt`, `/robots.txt` e `/sitemap.xml` acessíveis localmente.
- `llms.txt` servido como `text/plain`.
- Robots contendo `OAI-SearchBot`, `ChatGPT-User`, crawler genérico e sitemap canônico.
- Ausência de `meta keywords`, `noindex` global e `X-Robots-Tag` bloqueante.
- Instalação limpa, testes, lint, typecheck e build sem erros introduzidos.
- Auditoria de dependências executada e seus achados documentados sem correção automática.

### 9.3 Lint

Migrar o comando de lint para ESLint CLI com configuração não interativa compatível com Next.js 15. A configuração deve validar o código existente sem esconder erros por desativação ampla de regras.

### 9.4 Tratamento de falhas

O gerador valida e renderiza em memória antes de escrever. Uma falha encerra o processo com código diferente de zero e mensagem que identifica categoria, ID e regra violada. O arquivo público anterior permanece intacto quando houver erro de validação.

## 10. Limites operacionais

Esta fase é exclusivamente local. Não inclui:

- commit;
- push;
- criação ou alteração de PR;
- merge;
- deploy ou preview remoto;
- alteração em Vercel, DNS ou domínio;
- alteração em Google Search Console ou Google Business Profile;
- atualização automática de dependências vulneráveis;
- criação de novas páginas;
- redesign ou modificação dos fluxos de WhatsApp.

## 11. Evidências e relatório final

O relatório deve registrar:

- repositório, branch e SHA de baseline;
- domínio canônico;
- arquivos alterados;
- total exato e contagem por categoria;
- distribuição por estágio de funil e prioridade de tráfego;
- quantidade de páginas no sitemap;
- URLs removidas ou corrigidas;
- comandos executados e resultados;
- build, typecheck, lint e auditoria de dependências;
- resultados HTTP locais de `/llms.txt`, `/robots.txt` e `/sitemap.xml`;
- fatos e riscos não confirmados;
- estado de commit, PR, merge, deploy e Search Console;
- distinção entre conteúdo local, conteúdo publicável, conteúdo rastreável e indexação efetivamente comprovada.

Não será afirmado aumento real de visitas, indexação, homologação ou prontidão de produção sem evidência posterior em ambiente publicado e, quando aplicável, Search Console.
