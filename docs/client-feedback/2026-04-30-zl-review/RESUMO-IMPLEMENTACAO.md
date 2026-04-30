# ZL Podologia - Revisao da cliente em 2026-04-30 (round 4)

## Material recebido

- 1 imagem JPEG avulsa: Zucarina em procedimento real (touca + mascara + luvas).
- 1 ZIP com 3 imagens: 1 anotacao da Dra apontando 2 fotos a trocar e 2 fotos de pes saudaveis pos-procedimento.
- 1 audio OGG (transcricao pendente — Yuri vai listar pontos).

## Principais pedidos extraidos

- Trocar a foto "Atendimento individualizado na clinica" (atualmente uniforme verde top-down) por foto autentica da Zucarina.
- Trocar o par Procedimento/Resultado da Podoprofilaxia (cases section): a "after" ainda usava stock `profissional-exame-frontal-pro.jpg`.
- (Reaberto) Alinhamento das letras F e J em todos os titulos — a swap CSS Lora nao surtiu efeito porque `--font-display-family` ainda aponta pra Fraunces em `lib/fonts.ts`. Pendente para round 5.
- Confirmacao definitiva: a grafia do nome e "Jannie" com acento agudo (e), nao circumflex (e).

## Ajustes aplicados no site (round 4)

- ZlCasesSection.tsx: card "Atendimento individualizado" agora usa `client-approved/2026-04-30/zucarina-procedimento-real-2026-04-29.jpeg`.
- zlPodologiaContent.ts: cases array da Podoprofilaxia recebe beforePhoto = zucarina-procedimento-real (Zucarina em PPE) e afterPhoto = pes-pos-procedimento-01 (substituindo a stock que ainda existia).
- 3 fotos novas adicionadas em public/zl-podologia/social/client-approved/2026-04-30/:
  - zucarina-procedimento-real-2026-04-29.jpeg
  - pes-pos-procedimento-01-2026-04-29.jpeg
  - pes-pos-procedimento-02-2026-04-29.jpeg (parked, ainda nao usado)

## Pendencias para round 5

- Letra F e J: trocar `lib/fonts.ts` Fraunces -> Lora (ou aplicar `font-variation-settings: "SOFT" 0, "WONK" 0` de novo, que foi removido por outro agente).
- Foto sorrindo da Zucarina + foto da mae (cliente ainda nao enviou).
- Foto real para Tungiase e Pe diabetico (servicos que ainda usam stock).
- Transcrever o audio OGG e mapear ajustes adicionais que estiverem la.
- Auditoria das ~10 referencias remanescentes a `edited-pro/*` (especialmente a foto que esta no hero coluna direita, OG image e schema.org).
