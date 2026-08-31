# Relatório local — SEO técnico, GEO/AEO e `llms.txt` da ZL Podologia

Data da validação: 31/08/2026
Domínio canônico modelado: `https://www.zlpodologia.com.br`
Repositório remoto: `https://github.com/zlpodologia-byte/pageforce-zl-podologia.git`
Worktree: `C:\Users\Yuri\Desktop\Yuri\.worktrees\zl-seo-geo-llms-20260831`
Branch local: `feat/zl-seo-geo-llms-20260831`
HEAD e base testada: `6f8ed4a5ba9b26d950f0672b5b9d7c15f8866ca7`

## Estado executivo

O pacote foi implementado e validado somente no worktree local. Ele amplia a cobertura semântica, melhora a rastreabilidade técnica, explicita a entidade, adiciona uma base estruturada de 500 intenções e reforça links internos entre páginas comerciais e locais.

Essas mudanças criam condições melhores para descoberta orgânica e respostas de mecanismos de busca, mas não provam nem garantem aumento de visitas. Não houve publicação, deploy, submissão a buscadores ou medição pós-publicação.

## Entregas implementadas

- Base estruturada com 500 perguntas, respostas, intenções, estágio de jornada, prioridade, risco, fonte e URL canônica.
- Gerador determinístico e validador do `public/llms.txt`.
- Validações contra duplicidade exata, quase duplicidade, respostas genéricas, placeholders, promessas clínicas, fonte inválida e URL fora do domínio.
- `robots.txt` com regras explícitas para `OAI-SearchBot` e `ChatGPT-User`, preservando o bloqueio genérico de `/api/`.
- `sitemap.xml` restrito a 12 URLs públicas canônicas, sem datas artificiais de modificação.
- `Organization` com identificador estável `#business` e tipagem pública compatível com a operação real, sem declarar a clínica como `MedicalBusiness`.
- Remoção de `meta keywords` legado da landing principal.
- Links internos contextuais em cinco páginas de serviço e cinco páginas de bairro.
- Cluster visível na home e navegação equivalente no footer, cada um ligando às dez páginas de serviço e bairro.
- Pipeline de imagens do Next habilitado para AVIF/WebP, cache de um ano e uma única imagem LCP com prioridade alta.
- FAQ visível alinhado ao `FAQPage` em JSON-LD.
- Texto local transparente: as páginas de bairro informam que o atendimento ocorre na clínica da Parquelândia e que não existe unidade no bairro citado.
- Testes unitários, HTTP e Playwright específicos para os contratos públicos de SEO.

## Matriz de 500 intenções

| Categoria | Quantidade |
|---|---:|
| Conceitos gerais | 40 |
| Unha encravada | 50 |
| Calos e pressão | 45 |
| Rachaduras e ressecamento | 40 |
| Micose e unhas | 50 |
| Pés e diabetes | 50 |
| Cuidados para idosos | 35 |
| Crianças e adolescentes | 30 |
| Atletas e atividade física | 35 |
| Higiene e prevenção | 40 |
| Atendimento e cuidados | 45 |
| Intenções locais | 40 |
| **Total** | **500** |

Indicadores adicionais da matriz:

- 500 perguntas únicas;
- 500 respostas únicas;
- 500 intenções de busca únicas;
- 208 itens de prioridade alta;
- 122 itens no estágio de agendamento;
- 73 itens de atenção/urgência com alertas associados;
- maior similaridade abaixo do limite de bloqueio: `0,783`, contra limite `0,82`.

## URLs públicas cobertas

1. `/`
2. `/unha-encravada-fortaleza`
3. `/onicomicose-fortaleza`
4. `/ortonixia-fortaleza`
5. `/podoprofilaxia-fortaleza`
6. `/pe-diabetico-fortaleza`
7. `/podologia-aldeota`
8. `/podologia-centro-fortaleza`
9. `/podologia-cidade-dos-funcionarios`
10. `/podologia-maraponga`
11. `/podologia-messejana`
12. `/politica-de-imagens`

## Evidência de verificação

| Verificação | Resultado |
|---|---|
| `npm ci` | concluído; 390 pacotes instalados e 391 auditados a partir do lockfile |
| `npm audit --omit=dev --json` | passou; zero vulnerabilidades de produção |
| `npm audit --json` | passou; zero vulnerabilidades no conjunto completo |
| `npm run seo:generate` | passou; `llms.txt` regenerado de forma determinística |
| `npm run seo:check` | passou; 12 categorias e 500 itens válidos |
| `npm run test:seo` | passou; 17 de 17 testes |
| `npm run check:image-policy` | passou |
| `npm run check:sacred-catalog` | passou; 18 pares válidos |
| `npm run lint` | passou; zero avisos no escopo exato dos arquivos tocados |
| `npm run typecheck` | passou |
| `npm run build` | passou sobre Next 16.3.3; 61 páginas estáticas geradas |
| `npm run test:seo:http` | passou; 500 perguntas, 12 URLs e 12 rotas HTTP válidas |
| validação HTTP independente em produção local | `sitemap.xml` 200 XML; `llms.txt` 200 texto; `robots.txt` 200 texto; 12 rotas 200 |
| Playwright Chromium | passou; 26 de 26 cenários |
| `git diff --check` | passou; sem erro de whitespace |

O build exibiu avisos já presentes em áreas legadas fora do escopo alterado. O lint foi deliberadamente restrito aos arquivos tocados; este pacote não representa saneamento global do repositório. O Playwright também identificou imagens existentes como candidatas a LCP sem `loading="eager"`; os 26 cenários passaram, e esse diagnóstico permanece como otimização visual posterior para não ampliar o pacote.

## Recuperações durante a implementação

- Uma primeira geração excessivamente genérica foi rejeitada antes de virar entrega. O conteúdo foi reescrito e o validador passou a bloquear respostas genéricas.
- O build inicialmente parou em duas aspas JSX não escapadas de um componente existente. As duas ocorrências foram corrigidas cirurgicamente para entidades HTML.
- Quatro testes de bairro detectaram divergência na frase de transparência local. O texto foi normalizado e a suíte completa passou em seguida.
- O lint do arquivo da home encontrou um footer alternativo antigo, sem referências. O bloco morto e os imports exclusivos dele foram removidos; o footer ativo permaneceu inalterado fora do novo bloco de links.
- Após o Playwright, `next dev` havia substituído o manifesto do build dentro de `.next`, fazendo `next start` ler artefatos mistos. Um novo `next build` regenerou o manifesto de produção; não houve correção de código para esse efeito ambiental.
- A atualização para Next 16 tornou incompatível a ponte `FlatCompat` usada pelo lint. A configuração passou a consumir as exportações flat nativas do `eslint-config-next`, e o mesmo comando de lint voltou a passar.
- A convenção `middleware.ts`, descontinuada no Next 16, foi migrada para `proxy.ts` sem alteração da lógica de allowlist, redirecionamentos ou bloqueios.
- O Playwright em `127.0.0.1` revelou bloqueios de recursos de desenvolvimento introduzidos pelo Next 16. A origem local foi explicitamente permitida em `allowedDevOrigins`; uma nova execução passou em 26 de 26 cenários sem esses bloqueios.

## QA visual

- Desktop: FAQ, links de serviço e links de bairro legíveis, alinhados e sem overflow horizontal.
- Mobile: os novos links relacionados empilham corretamente e permanecem legíveis.
- Novo cluster da home: dez links renderizados em desktop e mobile, com `scrollWidth` igual ao `clientWidth` (`1440 px` e `390 px`, respectivamente).
- Há overflow horizontal preexistente na home mobile, medido em `465 px` para viewport de `390 px`, originado nos cards/carrossel de depoimentos fora das seções alteradas. Não foi ampliado para evitar uma refatoração visual não autorizada.
- O aviso de cookies sobrepõe parte inferior da captura, mas não introduziu quebra nos componentes novos.

## Fontes e limites editoriais

As respostas de saúde foram ancoradas em fontes institucionais, incluindo Ministério da Saúde/BVS, NIDDK, American Academy of Dermatology, NHS, American Academy of Pediatrics e National Institute on Aging. O conteúdo evita diagnóstico individual, garantia clínica e promessa de encaixe imediato; casos de alerta orientam avaliação profissional apropriada.

Fontes cadastradas ficam em `data/zl-seo/official-sources.json`. Entre as principais estão:

- Ministério da Saúde — Manual do pé diabético;
- NIDDK — Diabetes & Foot Problems;
- American Academy of Dermatology — Nail Fungus;
- NHS — Ingrown toenail e Corns and calluses.

## Riscos e pendências

### Dependências

As quatro vulnerabilidades altas de produção identificadas no baseline foram tratadas com atualização e nova instalação pelo lockfile:

- `next` 16.3.3;
- `sharp` 0.35.4;
- `postcss` 8.5.26 direto e 8.5.23 interno do Next;
- `nanoid` 3.3.18.

O conjunto de desenvolvimento também foi atualizado (`eslint-config-next` 16.3.3, `tsx` 4.23.13 e `esbuild` 0.28.2). Tanto `npm audit --omit=dev --json` quanto `npm audit --json` retornaram código 0 e zero vulnerabilidades. O ESLint permanece em 9.39.5 porque os plugins transitivos do `eslint-config-next` 16.3.3 ainda não declaram compatibilidade com ESLint 10; o npm informa que essa versão 9 já saiu de suporte, portanto a compatibilidade do ecossistema deve ser reavaliada em atualização futura.

### Integração Git

`git ls-remote` confirmou que o `origin/main` atual é `6f8ed4a`, exatamente a base do worktree. O checkout local de `main` aponta para `724f041` e contém quatro commits ainda não publicados em uma linhagem divergente; por isso ele não foi mesclado cegamente.

Foram comparados os commits locais `d8a9cf8` (cluster de links) e `0768d56` (pipeline de imagens). Seus comportamentos diretamente ligados a tráfego foram portados para o worktree, com copy clínica mais conservadora e testes RED→GREEN. Os outros dois commits locais eram documentação sem relação direta com esta entrega e permaneceram intactos na `main` local. Nenhum merge, rebase ou mudança da referência divergente de `main` foi executado.

### Infraestrutura e descoberta

- O redirecionamento do domínio sem `www` foi observado anteriormente como temporário (`307`) e não foi alterado neste trabalho; deve ser revalidado e, se apropriado, convertido em permanente na infraestrutura autorizada.
- Search Console, Bing Webmaster Tools, analytics e logs de crawler não foram acessados.
- Nenhum pedido de indexação ou recrawl foi enviado.

## Estado de publicação, rastreamento e indexação no fechamento da validação local

| Estado | Situação desta entrega |
|---|---|
| Escrito | sim |
| Implementado | sim, localmente |
| Testado | sim, localmente |
| Revisado visualmente | sim, nas áreas alteradas |
| Conteúdo relevante da `main` local conciliado | sim, sem mesclar o histórico divergente |
| Handoff por commit e PR | autorizado após esta validação; o resultado deve ser consultado no Git/GitHub |
| Integrado/mesclado | não |
| Deploy ou preview remoto | não |
| Publicado no domínio | não |
| Rastreado com estas mudanças | não verificável; artefato apenas local |
| Indexado com estas mudanças | não |
| Aumento de visitas comprovado | não |

O site público existente pode já ser rastreado e indexado, mas nenhuma das mudanças deste worktree pode ser considerada publicada, rastreada ou indexada antes de integração, deploy e confirmação nos mecanismos de busca.

## Próximo gate recomendado

Revisar a PR e os checks remotos antes de qualquer merge. Deploy continua fora deste gate. Depois de um deploy autorizado, validar redirecionamentos, enviar o sitemap e acompanhar impressões, cliques e visitas por pelo menos 28 dias.
