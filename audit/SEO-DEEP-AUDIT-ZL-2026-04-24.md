# SEO Deep Audit — ZL Podologia

Data: 2026-04-24
URL auditada: https://www.zlpodologia.com.br/
Commit base: 31517a2

## Veredito

Nota SEO atual: 78/100
Confianca: media-alta

Resumo: a base tecnica de indexabilidade esta boa: home prerenderizada, HTML inicial rico, robots/sitemap ativos, canonical correto, H1 unico, schema local e FAQ. O que segura a nota nao e bloqueio tecnico, e sim maturidade SEO: falta arquitetura de rotas por servico/intencao, falta evidencia de indexacao/GSC, GA4 nao esta injetado e a performance mobile tem LCP alto por imagens sem otimizacao.

Lighthouse laboratorio:
- Performance: 79
- SEO: 100
- Acessibilidade: 93
- Boas praticas: 96
- FCP: 1,4s
- LCP: 4,9s
- CLS: 0
- TBT: 80ms

## Evidencias

Confirmado:
- `https://www.zlpodologia.com.br/` retorna 200, `text/html; charset=utf-8`.
- Apex `https://zlpodologia.com.br/` redireciona 307 para `https://www.zlpodologia.com.br/`.
- Header de producao inclui `X-Nextjs-Prerender: 1`; a home e SSG/prerender.
- HTML inicial contem conteudo real: ~3.082 palavras, 1 H1, 13 H2, 32 links, 33 imagens.
- HTML inicial contem title, meta description, canonical, Open Graph, Twitter Card e JSON-LD.
- `robots.txt` retorna 200, permite `/` e bloqueia `/api/`.
- `sitemap.xml` retorna 200 e lista `/` e `/politica-de-imagens`.
- Middleware redireciona rotas antigas/internas (`/about`, `/services`, `/work`, `/showcases`, `/product`) para `/`, evitando indexacao de paginas Pageforce irrelevantes.
- Googlebot recebe HTML significativo: conteudo principal, schema e ausencia de `noindex`.
- `npm run build` passa.
- `npm run typecheck` passa apos build. Antes do build, falha se `.next/types` nao existir porque o `tsconfig` inclui `.next/types/**/*.ts`.
- `check:image-policy` e `check:sacred-catalog` passam.

Hipotese forte:
- LCP alto vem principalmente do hero e logo servidos como arquivos estaticos grandes, porque `next.config.ts` esta com `images.unoptimized: true`.
- A home ja consegue ranquear para termos branded e local low-competition, mas a falta de paginas especificas limita termos como `unha encravada fortaleza`, `podoprofilaxia fortaleza`, `reflexologia podal fortaleza`, `ortese para unha fortaleza`.
- O site ainda deve ter indexacao publica minima/incerta por ser novo e por nao haver evidencia de GSC nesta auditoria.

Validar:
- Google Search Console: cobertura, sitemap enviado, queries, CTR, paginas indexadas.
- GA4/GTM: `NEXT_PUBLIC_GA_ID` nao apareceu no HTML publico; eventos server-side existem, mas GA4 ainda nao esta visivel.
- Dados reais de Core Web Vitals de campo, quando houver trafego suficiente.
- Ficha do Google Business Profile: NAP, link do site, horario, categorias e posts.

## Principais Riscos

P0:
- Nenhum bloqueio P0 confirmado. Nao ha `noindex`, robots bloqueante, canonical errado ou app shell vazio.

P1:
- Falta arquitetura SEO por servico. Hoje o sitemap publico tem apenas home e politica de imagens. Para SEO local e non-branded, isso limita cobertura.
- Performance mobile abaixo do ideal: Lighthouse performance 79 e LCP 4,9s.
- `images.unoptimized: true` desliga o pipeline de otimizacao do Next Image e faz o browser baixar imagens maiores que o necessario.
- GA4 nao esta injetado em producao. Sem isso, fica mais dificil correlacionar query/click/lead fora dos logs da Vercel.
- Acessibilidade com problemas que tambem afetam UX/SEO indireto: contraste baixo, `aria-label` em `div` sem role, label visivel divergente do accessible name.

P2:
- OG principal usa foto vertical/alta; para compartilhamento, uma imagem 1200x630 dedicada tende a performar melhor.
- Schema `logo` ainda aponta para asset antigo (`/zl-podologia/social/marca/logo-oficial.jpg`), nao para a logo premium transparente.
- `sitemap.ts` usa `new Date()` no build; aceitavel, mas melhor fixar `lastModified` por release quando houver fluxo editorial.
- `Organization` schema em `lib/site.ts` usa `foundingDate: "2026"`; validar se isso nao passa a impressao errada da clinica se ela ja existia antes.

## Nota Por Pilar

- Indexabilidade tecnica: 23/25
- On-page semantico: 18/20
- Conteudo, GEO e AEO: 15/20
- Performance e UX mobile: 10/15
- CRO e clareza comercial: 8/10
- Autoridade e dados externos: 4/10

Total: 78/100

Cap aplicado: sem rotas internas por servico em negocio dependente de busca non-branded, nota maxima pratica atual fica perto de 82 ate criar arquitetura de conteudo.

## Plano Para 90+

1. Criar rotas publicas por intencao local:
   - `/unha-encravada-fortaleza`
   - `/fungos-nas-unhas-fortaleza`
   - `/podoprofilaxia-fortaleza`
   - `/ortese-para-unha-fortaleza`
   - `/reflexologia-podal-fortaleza`
   Cada rota com H1 proprio, FAQ visivel, schema `Service`/`MedicalProcedure`, CTA WhatsApp com source proprio e links internos.

2. Otimizar imagens:
   - remover ou condicionar `images.unoptimized: true`;
   - gerar WebP/AVIF ou usar pipeline do Next Image;
   - criar variantes menores para logo e hero mobile;
   - manter `priority` somente no LCP real.

3. Corrigir LCP:
   - reduzir peso do hero `profissional-close-autoridade-pro.jpg`;
   - conferir se o LCP esta descoberto cedo no HTML;
   - reduzir fontes iniciais se possivel;
   - preservar CLS 0.

4. Configurar medicao:
   - adicionar `NEXT_PUBLIC_GA_ID` ou GTM;
   - manter `/api/zl-events` como backup server-side;
   - configurar GSC e submeter sitemap;
   - adicionar UTM nos links de bio/social/campanhas.

5. Ajustar acessibilidade:
   - aumentar contraste de CTAs/badges;
   - trocar `aria-label` em `div` por `role="img"` ou texto screen-reader;
   - alinhar accessible name do link do mapa ao texto visivel.

6. Refinar schema e social preview:
   - atualizar `logo` para logo premium;
   - criar OG 1200x630 dedicada;
   - revisar `foundingDate`;
   - manter FAQ schema apenas para perguntas visiveis na pagina.

## Comandos E Validacoes

Executado:
- `git status --short`
- `npm.cmd run typecheck`
- `npm.cmd run build`
- `npm.cmd run check:image-policy`
- `npm.cmd run check:sacred-catalog`
- `curl -I https://www.zlpodologia.com.br/`
- `curl https://www.zlpodologia.com.br/robots.txt`
- `curl https://www.zlpodologia.com.br/sitemap.xml`
- `npx --yes lighthouse https://www.zlpodologia.com.br/ --output=json`

Observacao: Lighthouse finalizou com JSON valido, mas falhou ao limpar diretorio temporario do Chrome com `EPERM`. Os scores foram extraidos do JSON gerado.
