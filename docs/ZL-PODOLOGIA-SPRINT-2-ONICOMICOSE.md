# ZL Podologia - Sprint 2 Página de Onicomicose

Data: 2026-04-27

## Entrega

Criada a página dedicada:

- `https://www.zlpodologia.com.br/onicomicose-fortaleza`

Objetivo: capturar busca de alta intenção para fungo na unha/onicomicose em Fortaleza, com expectativa realista sobre continuidade e sem promessa de cura rápida.

## Decisões de SEO

- URL técnica: `/onicomicose-fortaleza`.
- H1 em termo leigo: `Fungo na unha em Fortaleza`.
- Canonical esperado: `https://www.zlpodologia.com.br/onicomicose-fortaleza`.
- Página incluída no `sitemap.xml`.
- Middleware liberado para acesso público direto.
- CTAs usam `/api/wa?source=service_fungus_page`.

## Schema

JSON-LD próprio da página:

- `WebPage`
- `Service`
- `FAQPage`
- `BreadcrumbList`

O schema referencia a entidade local já existente:

- `https://www.zlpodologia.com.br#business`

## Conteúdo crítico

- Termo técnico e leigo: `onicomicose` e `fungo na unha`.
- Valor explícito: `R$ 100 por unha por sessão`.
- Expectativa protegida: `não é tratamento de sessão única`.
- Laser posicionado como apoio: `laser pode entrar como apoio`.
- Sem promessa médica: `sem promessa de cura rápida`.
- Localização real: Parquelândia, Av. Bezerra de Menezes, 2203, Sala 5.
- Imagens autorizadas de acompanhamento de fungos reutilizadas como prova visual.

## Validações locais

- `npm.cmd run typecheck`: passou.
- `npm.cmd run build`: passou.
- `npx.cmd playwright test zl-fungus-page.spec.ts`: 2 testes passaram.
- `npx.cmd playwright test zl-ingrown-page.spec.ts zl-fungus-page.spec.ts zl-wa-attribution.spec.ts`: 8 testes passaram.

## Próximo passo

Após deploy:

1. Confirmar status 200 da URL pública.
2. Confirmar canonical no HTML público.
3. Confirmar presença da URL no `sitemap.xml`.
4. Solicitar indexação no Google Search Console.
5. Medir eventos com `source=service_fungus_page`.
