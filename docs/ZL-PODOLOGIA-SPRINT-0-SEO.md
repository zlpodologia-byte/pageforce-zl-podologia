# ZL Podologia - Sprint 0 SEO

Data: 2026-04-27

## Objetivo

Fechar a higiene técnica e o inventário inicial de entidade local antes de criar novas páginas.

## Correções aplicadas no código

- `LocalBusiness.address.addressLocality`: corrigido de `Parquelândia` para `Fortaleza`.
- Bairro e ponto de referência preservados como `additionalProperty`:
  - `Bairro = Parquelândia`
  - `Ponto de referencia = Galeria José Bernardo`
- Removido `aggregateRating` e `review` do `LocalBusiness` JSON-LD, porque avaliações do próprio Google/GBP no site da própria empresa são auto-referentes para rich snippet de LocalBusiness.
- Removidos `founder` e `foundingDate: "2026"` do JSON-LD global de `Organization`, até haver fonte confirmada para esses campos.

## Validações locais

- `npm.cmd run typecheck`: passou.
- `npm.cmd run build`: passou.
- HTML estático gerado em `.next/server/app/index.html` confirmou:
  - `addressLocality = Fortaleza`
  - sem `aggregateRating`
  - sem `review`
  - sem `foundingDate`
  - sem `founder`

## Validações do deploy atual

O deploy público ainda reflete a versão anterior até novo deploy.

- `https://www.zlpodologia.com.br/`: 200
- `https://www.zlpodologia.com.br/robots.txt`: 200
- `https://www.zlpodologia.com.br/sitemap.xml`: 200
- `robots.txt`: permite `/` e bloqueia `/api/`
- `sitemap.xml`: contém `/` e `/politica-de-imagens`

## Inventário inicial de citações públicas

NAP canônico para correção:

- Nome: `ZL Podologia`
- Endereço: `Av. Bezerra de Menezes, 2203 - Sala 5 - Galeria José Bernardo - Parquelândia, Fortaleza - CE, 60325-105`
- Telefone: `(85) 9 9435-8505`
- Site: `https://www.zlpodologia.com.br`

| Prioridade | Fonte | Status encontrado | Ação |
|---|---|---|---|
| P0 | SeniorBemestar | Nome/endereço/telefone OK, mas site aponta para `trakto.link`. Horário mostra sábado até 14h. | Corrigir site para domínio oficial e validar horário atual. |
| P0 | Bendito Guia | Título usa `São Gerardo`; texto menciona Atibaia; horário genérico segunda-sexta 9h-18h e sábado 9h-13h. | Solicitar correção/remover incoerências de bairro/cidade/horário. |
| P0 | SpotWay | Lista endereço como `Avenida Bezerra De Menezes 2450, 2203 - Sao Gerardo`. | Corrigir número, bairro e URL/site se houver campo. |
| P1 | Encontra Fortaleza | NAP básico quase correto, mas horário aparece segunda-sexta 9h-18h e sábado fechado; sem site visível no snippet. | Corrigir horário e adicionar domínio oficial. |
| P1 | Econodata | Dados cadastrais batem em razão social/CNPJ/fundação 2021, mas telefone exibido difere do comercial e CEP aparece `60325-004`. | Não é prioridade se fonte for Receita; usar como referência cadastral, não GBP. |
| P2 | Informe Cadastral | Dados cadastrais por CNPJ; oculta endereço por MEI e mostra telefone antigo/mascarado. | Baixa ação prática; só corrigir se houver reivindicação fácil. |

## Próximas ações operacionais

1. Fazer deploy da correção de schema.
2. Rodar Rich Results Test/Schema Validator na URL pós-deploy.
3. No GBP, usar `https://www.zlpodologia.com.br/?utm_source=google&utm_medium=organic&utm_campaign=gbp_profile&utm_content=website` como URL do site.
4. Usar `/api/wa?source=gbp_appointment` como URL de agendamento, se o GBP aceitar link direto.
5. Criar planilha de citações com status: `pendente`, `solicitado`, `corrigido`, `sem acesso`.
6. Corrigir primeiro P0: SeniorBemestar, Bendito Guia, SpotWay.
7. Depois corrigir P1: Encontra Fortaleza e diretórios equivalentes.

## Referências públicas usadas

- Google Local Ranking: https://support.google.com/business/answer/7091/improve-your-local-ranking-on-google
- Google LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google Review snippet guidelines: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- SeniorBemestar: https://seniorbemestar.com/podologos/fortaleza/zlpodologia/
- Bendito Guia: https://www.benditoguia.com.br/empresa/zlpodologia-sao-gerardo-fortaleza-ce
- SpotWay: https://spotway.com.br/ce/fortaleza/segmento/podologia
- Encontra Fortaleza: https://www.encontrafortaleza.com/local/zlpodologia-fortaleza-ce
- Econodata: https://www.econodata.com.br/consulta-empresa/40660253000106-maria-zucarina-cavalcante-de-oliveira
