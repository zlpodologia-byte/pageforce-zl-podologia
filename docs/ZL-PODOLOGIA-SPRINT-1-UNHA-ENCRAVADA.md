# ZL Podologia - Sprint 1 Página de Unha Encravada

Data: 2026-04-27

## Entrega

Criada a página dedicada:

- `https://www.zlpodologia.com.br/unha-encravada-fortaleza`

Objetivo: capturar busca de alta intenção para `unha encravada fortaleza`, com foco em dor/urgência, triagem responsável e conversão por WhatsApp.

## Decisões de SEO

- H1: `Unha encravada em Fortaleza`.
- Canonical absoluto esperado: `https://www.zlpodologia.com.br/unha-encravada-fortaleza`.
- Página incluída no `sitemap.xml`.
- Middleware liberado para acesso público direto.
- CTAs usam `/api/wa?source=service_ingrown_page`, mantendo tracking interno sem poluir a mensagem do paciente.
- Conteúdo evita promessa médica: vende avaliação, alívio quando indicado, orientação e continuidade.

## Schema

JSON-LD próprio da página:

- `WebPage`
- `Service`
- `FAQPage`
- `BreadcrumbList`

O schema referencia a entidade local já existente:

- `https://www.zlpodologia.com.br#business`

## Conteúdo crítico

- Valores explícitos:
  - `Grau 1: a partir de R$ 150`
  - `Graus 2 e 3: a partir de R$ 200`
- Bloco `Quando procurar médico`, com sinais de alerta.
- Texto explícito de segurança: `não substitui avaliação médica`.
- Localização real: Parquelândia, Av. Bezerra de Menezes, 2203, Sala 5.
- Caso real autorizado reutilizado como prova visual.

## Validações locais

- `npm.cmd run typecheck`: passou.
- `npm.cmd run build`: passou.
- `npx.cmd playwright test zl-ingrown-page.spec.ts`: 2 testes passaram.
- `npx.cmd playwright test zl-wa-attribution.spec.ts zl-ingrown-page.spec.ts`: 6 testes passaram.

## Próximo passo

Após deploy:

1. Confirmar status 200 da URL pública.
2. Confirmar canonical no HTML público.
3. Confirmar presença da URL no `sitemap.xml`.
4. Solicitar indexação no Google Search Console.
5. Usar GSC e eventos `service_ingrown_page` para medir impressões, cliques e leads.
