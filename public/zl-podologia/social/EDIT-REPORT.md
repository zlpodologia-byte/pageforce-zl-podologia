# EDIT-REPORT

## Resumo

- Batch fechado em 2026-04-21.
- 9 imagens tentadas e 9 exports finais entregues.
- Status final: 6 `success`, 3 `flagged`, 0 `failed`, 0 `blocked`.
- Modelo usado no batch: editor de imagem embutido do Codex com o runtime mais recente exposto na sessao; o app nao mostrou um model ID exato.
- Formato final em todos os assets: JPG progressivo, qualidade 88, lado maior 2048 px.

## Mapa de substituicao para a landing

| Slot landing | Edited path | Substitui asset atual |
| --- | --- | --- |
| Hero overlap / prova de atendimento | `public/zl-podologia/social/edited/procedimentos/fresa-jaleco-zl-hd.jpg` | `public/zl-podologia/social/procedimentos/fresa-jaleco-zl.jpg` |
| Biosseguranca - imagem principal | `public/zl-podologia/social/edited/procedimentos/fresa-jaleco-zl-hd.jpg` | `public/zl-podologia/social/procedimentos/fresa-jaleco-zl.jpg` |
| Ambiente - trio editorial 1 | `public/zl-podologia/social/edited/ambiente/sala-wide-topdown-hd.jpg` | `public/zl-podologia/social/ambiente/table-flowers-03.jpg` |
| Ambiente - trio editorial 2 | `public/zl-podologia/social/edited/ambiente/escalda-pes-02-hd.jpg` | `public/zl-podologia/social/ambiente/vanity-02.jpg` |
| Ambiente - trio editorial 3 | `public/zl-podologia/social/edited/ambiente/zulcarina-atendendo-01-hd.jpg` | `public/zl-podologia/social/ambiente/spa-room-01.jpg` |
| Profissional em acao - institucional | `public/zl-podologia/social/edited/ambiente/zulcarina-atendendo-02-hd.jpg` | Hoje nao ha slot dedicado; entra como candidata forte para bloco institucional ou apoio de Equipe |
| Reflexologia - foto real de apoio | `public/zl-podologia/social/edited/atendimento/reflexologia-sola-01-hd.jpg` | Hoje a secao usa arte em `components/zl-podologia/ZlClinicIllustrations.tsx` |
| Biosseguranca - apoio instrumental | `public/zl-podologia/social/edited/procedimentos/instrumental-bandeja-hd.jpg` | Hoje nao ha apoio fotografico dedicado |
| Unha encravada - close tecnico | `public/zl-podologia/social/edited/procedimentos/retirada-espicula-pro-hd.jpg` | Hoje nao ha close fotografico dedicado fora do storyteller |
| Podoprofilaxia / procedimento geral | `public/zl-podologia/social/edited/procedimentos/motor-fresa-detalhe-hd.jpg` | Hoje nao ha foto real dedicada nesse slot |

## Motivo de selecao das aprovadas

- `edited/ambiente/sala-wide-topdown-hd.jpg`: melhor prova real da sala em operacao. Mata o aspecto stock da secao Ambiente e reforca o posicionamento clinico.
- `edited/ambiente/escalda-pes-02-hd.jpg`: entrega ritual, acolhimento e leitura premium sem parecer spa genérico.
- `edited/ambiente/zulcarina-atendendo-01-hd.jpg`: conecta ambiente e atendimento real em uma imagem so. Boa para sustentar o discurso de atencao individual.
- `edited/ambiente/zulcarina-atendendo-02-hd.jpg`: melhor quadro atual da profissional em acao com rosto legivel, uniforme, cracha e instrumento. Forte como apoio institucional da Zulcarina.
- `edited/atendimento/reflexologia-sola-01-hd.jpg`: close forte, limpo e crivel para Reflexologia. E a melhor ponte para trocar ilustracao por foto real depois.
- `edited/procedimentos/fresa-jaleco-zl-hd.jpg`: continua sendo a imagem mais forte de tecnica + branding ZL. O ganho aqui e principalmente nitidez, coesao tonal e acabamento.
- `edited/procedimentos/instrumental-bandeja-hd.jpg`: organiza o repertorio visual de instrumental real sem parecer catalogo frio.
- `edited/procedimentos/retirada-espicula-pro-hd.jpg`: melhor leitura de precisao clinica para unha encravada fora do storyteller oficial.
- `edited/procedimentos/motor-fresa-detalhe-hd.jpg`: bom apoio de procedimento geral; ajuda a dar substancia real para Podoprofilaxia e servicos tecnicos.

## Descartes e nao aprovadas para esta rodada

- `public/zl-podologia/social/ambiente/spa-room-01.jpg`, `public/zl-podologia/social/ambiente/vanity-02.jpg`, `public/zl-podologia/social/ambiente/table-flowers-03.jpg`: continuam fracas porque parecem banco de imagem e derrubam autenticidade da landing.
- `public/zl-podologia/social/atendimento/massage-03.jpg`, `public/zl-podologia/social/atendimento/pedicure-hands-01.jpg`, `public/zl-podologia/social/atendimento/pedicure-hands-02.jpg`, `public/zl-podologia/social/atendimento/foot-flowers-04.jpg`: leitura mais estetica do que clinica; nao ajudam a sustentar posicionamento premium com prova real.
- `public/zl-podologia/social/antes-depois/feet-clean-02.jpg`, `public/zl-podologia/social/antes-depois/feet-flowers-01.jpg`, `public/zl-podologia/social/antes-depois/feet-soft-03.jpg`: visual fraco para landing principal e sem narrativa clinica suficiente.
- `public/zl-podologia/social/procedimentos/instrumental-01.jpg`, `public/zl-podologia/social/procedimentos/instrumental-02.jpg`, `public/zl-podologia/social/procedimentos/instrumental-03.jpg`: redundantes e com menos assinatura visual do que `instrumental-bandeja.jpg`.
- `public/zl-podologia/social/atendimento/paciente-em-sessao.jpg`: nao entrou nesta rodada por risco de LGPD maior e menor vantagem visual do que `zulcarina-atendendo-01`.

## Flags de revisao humana

- `public/zl-podologia/social/edited/ambiente/sala-wide-topdown-hd.jpg`: rosto e contexto reconheciveis. Pedir autorizacao escrita formal antes de uso amplo em campanhas.
- `public/zl-podologia/social/edited/ambiente/zulcarina-atendendo-01-hd.jpg`: podologista reconhecivel e paciente identificavel em contexto. Exige checagem de autorizacao e aprovacao interna.
- `public/zl-podologia/social/edited/ambiente/zulcarina-atendendo-02-hd.jpg`: melhor imagem de profissional em acao, mas com rosto totalmente reconhecivel. Exige a mesma cautela de autorizacao para uso publico amplo.

## Gaps remanescentes

- `public/zl-podologia/social/marca/hero-editorial-tagline.jpg` foi mantida fora desta rodada. O arquivo ja funciona no layout, mas uma edicao agressiva corre risco de deformar a tagline oficial.
- O storyteller `public/zl-podologia/social/antes-depois/encravada-01` a `-05` nao recebeu tone-match/HD nesta rodada. Vale tratar isso em um batch dedicado para nao arriscar os textos dourados oficiais.
- Mesmo com `zulcarina-atendendo-02-hd.jpg`, a secao Equipe ainda nao tem retrato formal. O arquivo funciona como institucional em servico, nao como headshot posado.
- A landing ainda nao chega em "agency-tier" completo como pacote fechado porque hero/tagline e storyteller oficial continuam sem upgrade nesta passada.

## Recomendacao clara para a landing v7

- Entrar agora com o trio real de Ambiente. Esse e o maior salto perceptivo e elimina o bloco mais fraco da pagina.
- Subir tambem o upgrade HD de `fresa-jaleco-zl` nos dois usos atuais.
- Considerar `zulcarina-atendendo-02-hd.jpg` como melhor foto atual da profissional para qualquer bloco institucional secundario.
- Tratar `reflexologia-sola-01-hd.jpg` como proximo swap quando a secao de Reflexologia sair da ilustracao para foto real.
- Guardar `instrumental-bandeja-hd.jpg`, `retirada-espicula-pro-hd.jpg` e `motor-fresa-detalhe-hd.jpg` como repertorio pronto para a proxima rodada de trocas.

## Leitura honesta da qualidade final

O batch atual ja pode entrar na landing. Ele resolve a maior incoerencia visual, aumenta autenticidade e melhora o nivel premium do set. Ainda nao e um pacote "agency-tier" completo porque faltam hero/tagline e storyteller oficial em HD coerente, mas o ganho desta rodada ja e material e imediato.

## Proximos passos

- O proximo agente troca os paths nos componentes React.
- Rodar `npm run typecheck`.
- Rodar `npm run build`.
- Gerar screenshots da landing com os assets novos e validar o delta visual final.
