# ZL Podologia - Expansão de Páginas SEO

Data: 2026-04-27

## Páginas criadas

Serviços:

- `/ortonixia-fortaleza`
- `/podoprofilaxia-fortaleza`
- `/pe-diabetico-fortaleza`

Bairros:

- `/podologia-aldeota`
- `/podologia-centro-fortaleza`
- `/podologia-cidade-dos-funcionarios`
- `/podologia-maraponga`
- `/podologia-messejana`

## Regras aplicadas

- Todas entram no `sitemap.xml`.
- Todas têm canonical próprio.
- Todas têm CTA WhatsApp com `source` próprio.
- Todas expõem JSON-LD com `WebPage`, `Service`, `FAQPage` e `BreadcrumbList`.
- Páginas de bairro declaram que a ZL fica na Parquelândia e que não há unidade no bairro.
- Página de pé diabético usa tom conservador e reforça que não substitui acompanhamento médico.

## Validações

- `npm.cmd run typecheck`: passou.
- `npx.cmd playwright test zl-service-cluster-pages.spec.ts zl-neighborhood-pages.spec.ts`: 10 testes passaram.
- `npx.cmd playwright test zl-ingrown-page.spec.ts zl-fungus-page.spec.ts zl-service-cluster-pages.spec.ts zl-neighborhood-pages.spec.ts zl-wa-attribution.spec.ts`: 18 testes passaram.
- `npm.cmd run build`: passou, com todas as novas rotas geradas como estáticas.

## Links para indexação

- `https://www.zlpodologia.com.br/ortonixia-fortaleza`
- `https://www.zlpodologia.com.br/podoprofilaxia-fortaleza`
- `https://www.zlpodologia.com.br/pe-diabetico-fortaleza`
- `https://www.zlpodologia.com.br/podologia-aldeota`
- `https://www.zlpodologia.com.br/podologia-centro-fortaleza`
- `https://www.zlpodologia.com.br/podologia-cidade-dos-funcionarios`
- `https://www.zlpodologia.com.br/podologia-maraponga`
- `https://www.zlpodologia.com.br/podologia-messejana`
