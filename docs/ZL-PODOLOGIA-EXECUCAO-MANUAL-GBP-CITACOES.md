# ZL Podologia - Execucao Manual GBP e Citacoes

Data: 2026-04-27

## Estado confirmado

No Gerenciador de Perfis de Empresas do Google:

- Perfil: `ZL Podologia`
- Status: `Confirmado`
- Visibilidade do painel: `1 empresa`, `100% verificados`
- Endereco exibido: `Avenida Bezerra de Menezes, 2203 - SALA 5 - Parquelandia, Fortaleza - Ceara, 60325-105`

O CEP `60325-105` esta coerente com o GBP e deve ser mantido como canonico no site, schema, diretorios e materiais.

## GBP - Campos para revisar/salvar

Antes de salvar, conferir se estes campos estao exatamente assim:

Nome:

```text
ZL Podologia
```

Categoria primaria:

```text
Podologo
```

Telefone:

```text
+55 85 99435-8505
```

Website:

```text
https://www.zlpodologia.com.br/?utm_source=google&utm_medium=organic_profile&utm_campaign=gbp&utm_content=website
```

Link de agendamento:

```text
https://www.zlpodologia.com.br/api/wa?source=gbp_appointment&text=Ol%C3%A1%2C%20quero%20agendar%20um%20hor%C3%A1rio%20na%20ZL%20Podologia%20em%20Fortaleza.
```

Horario:

```text
Segunda: fechado
Terca: 09:00-16:00
Quarta: 09:00-16:00
Quinta: 09:00-16:00
Sexta: 09:00-16:00
Sabado: 09:00-12:00
Domingo: fechado
```

Descricao:

```text
Podologia clinica em Fortaleza, na Galeria Jose Bernardo, com atendimento individual e hora marcada. Cuidado para unha encravada, fungos nas unhas, podoprofilaxia, ortese, laserterapia, reflexologia podal e orientacao de retorno. Atendimento com EPI, ambiente organizado e canal direto pelo WhatsApp.
```

Servicos para cadastrar:

```text
Avaliacao inicial
Unha encravada
Fungos nas unhas
Podoprofilaxia
Ortese para unha
Laserterapia
Reflexologia podal
Pe diabetico e pele sensivel
Pacotes de cuidado
Vale presente
```

## GSC

O arquivo de verificacao esta publico:

```text
https://www.zlpodologia.com.br/googleed77e9ab4edd9965.html
```

No Search Console:

1. Criar propriedade de prefixo de URL: `https://www.zlpodologia.com.br/`
2. Escolher verificacao por arquivo HTML.
3. Confirmar verificacao.
4. Enviar sitemap: `https://www.zlpodologia.com.br/sitemap.xml`
5. Usar "Inspecionar URL" para `/` e solicitar indexacao se a URL ainda nao estiver no indice.

## GA4

O codigo ja esta pronto para GA4 via variavel:

```text
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Sem essa variavel no ambiente da Vercel, o GA4 direto nao carrega. O site continua registrando:

- Vercel Analytics
- `dataLayer`
- endpoint interno `/api/zl-events`
- logs de redirect do WhatsApp em `/api/wa`

Para ativar GA4:

1. Criar uma propriedade GA4.
2. Criar stream Web para `https://www.zlpodologia.com.br`.
3. Copiar o Measurement ID `G-...`.
4. Adicionar `NEXT_PUBLIC_GA_ID` na Vercel.
5. Fazer redeploy.
6. Testar em Realtime/DebugView clicando nos CTAs do WhatsApp.

## Citacoes P0 - mensagens de correcao

### SeniorBemestar

URL:

```text
https://seniorbemestar.com/podologos/fortaleza/zlpodologia/
```

Mensagem:

```text
Solicito a correcao do cadastro da ZL Podologia.

Dados corretos:
Nome: ZL Podologia
Site oficial: https://www.zlpodologia.com.br/
Telefone/WhatsApp: +55 85 99435-8505
Endereco: Av. Bezerra de Menezes, 2203 - Sala 5 - Galeria Jose Bernardo - Parquelandia, Fortaleza - CE, 60325-105
Horario: terca a sexta 09:00-16:00; sabado 09:00-12:00; segunda e domingo fechado.

O cadastro atual aponta para site antigo/trakto.link e horario divergente. Favor substituir pelo dominio oficial e horario acima.
```

### Bendito Guia

URL:

```text
https://www.benditoguia.com.br/empresa/zlpodologia-sao-gerardo-fortaleza-ce
```

Mensagem:

```text
Solicito a correcao do cadastro da ZL Podologia.

Problemas atuais:
- O titulo usa bairro incorreto: "Sao Gerardo".
- O texto menciona Atibaia, que nao tem relacao com a empresa.
- O horario esta generico e divergente.

Dados corretos:
Nome: ZL Podologia
Site oficial: https://www.zlpodologia.com.br/
Telefone/WhatsApp: +55 85 99435-8505
Endereco: Av. Bezerra de Menezes, 2203 - Sala 5 - Galeria Jose Bernardo - Parquelandia, Fortaleza - CE, 60325-105
Cidade/UF: Fortaleza - CE
Bairro: Parquelandia
Horario: terca a sexta 09:00-16:00; sabado 09:00-12:00; segunda e domingo fechado.
```

### SpotWay

URL:

```text
https://spotway.com.br/ce/fortaleza/segmento/podologia
```

Contato publico observado:

```text
contato@spotway.com.br
```

Mensagem:

```text
Solicito a correcao do cadastro da ZL Podologia listado em Fortaleza/CE.

Problema atual:
- O endereco aparece como "Avenida Bezerra De Menezes 2450, 2203 - Sao Gerardo", misturando numero e bairro incorretos.

Dados corretos:
Nome: ZL Podologia
Site oficial: https://www.zlpodologia.com.br/
Telefone/WhatsApp: +55 85 99435-8505
Endereco: Av. Bezerra de Menezes, 2203 - Sala 5 - Galeria Jose Bernardo - Parquelandia, Fortaleza - CE, 60325-105
Horario: terca a sexta 09:00-16:00; sabado 09:00-12:00; segunda e domingo fechado.
```

### Encontra Fortaleza

URL:

```text
https://www.encontrafortaleza.com/local/zlpodologia-fortaleza-ce
```

Pagina de contato:

```text
https://www.encontrafortaleza.com/tudo-sobre/contato
```

Mensagem:

```text
Solicito a atualizacao do cadastro da ZL Podologia.

URL do cadastro:
https://www.encontrafortaleza.com/local/zlpodologia-fortaleza-ce

Dados corretos:
Nome: ZL Podologia
Site oficial: https://www.zlpodologia.com.br/
Telefone/WhatsApp: +55 85 99435-8505
Endereco: Av. Bezerra de Menezes, 2203 - Sala 5 - Galeria Jose Bernardo - Parquelandia, Fortaleza - CE, 60325-105
Horario: terca a sexta 09:00-16:00; sabado 09:00-12:00; segunda e domingo fechado.

O horario atual do cadastro esta divergente do perfil oficial.
```

## Observacao de execucao

A automacao direta no navegador do Codex nao ficou confiavel nesta sessao. Nenhuma alteracao foi salva em GBP ou diretorios por automacao.
