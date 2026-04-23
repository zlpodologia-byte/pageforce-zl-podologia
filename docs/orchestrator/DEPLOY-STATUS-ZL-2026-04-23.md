# Deploy status - ZL Podologia - 2026-04-23

## Projeto

- Repositorio: `https://github.com/zlpodologia-byte/pageforce-zl-podologia`
- Branch: `main`
- Vercel project: `pageforce-zl-podologia`
- URL Vercel: `https://pageforce-zl-podologia.vercel.app/`
- Dominio final: `https://www.zlpodologia.com.br/`
- Redirect raiz: `https://zlpodologia.com.br/` -> `https://www.zlpodologia.com.br/`

## DNS configurado no HostGator

Autoritativo HostGator (`dns3.hostgator.com.br` / `dns4.hostgator.com.br`):

- `A zlpodologia.com.br` -> `76.76.21.21`
- `CNAME www.zlpodologia.com.br` -> `8883e475ac533e1f.vercel-dns-017.com`

## Status Vercel visto em 2026-04-23

- `www.zlpodologia.com.br`: `Valid Configuration / Production`
- `pageforce-zl-podologia.vercel.app`: `Valid Configuration / Production`
- `zlpodologia.com.br`: redirecionamento `307` para `www.zlpodologia.com.br`; Vercel ainda marcava `DNS Change Recommended` enquanto resolvers publicos propagavam/cachavam respostas antigas.

## Validacoes executadas

- `https://pageforce-zl-podologia.vercel.app/` retorna `200 OK`.
- `https://zlpodologia.com.br/` retorna `307 Temporary Redirect` para `https://www.zlpodologia.com.br/`.
- `https://www.zlpodologia.com.br/` retorna `200 OK` quando resolvido para os IPs novos da Vercel (`216.198.79.1` / `64.29.17.1`).
- Resolvedores publicos ainda estavam inconsistentes durante a janela de propagacao: Google DNS ja via o raiz na Vercel; Cloudflare alternava cache antigo e novo.

## Comandos uteis

```powershell
nslookup zlpodologia.com.br dns3.hostgator.com.br
nslookup -type=cname www.zlpodologia.com.br dns3.hostgator.com.br
nslookup zlpodologia.com.br 8.8.8.8
nslookup -type=cname www.zlpodologia.com.br 8.8.8.8
nslookup zlpodologia.com.br 1.1.1.1
nslookup -type=cname www.zlpodologia.com.br 1.1.1.1

curl.exe -I https://pageforce-zl-podologia.vercel.app/
curl.exe -I https://zlpodologia.com.br/
curl.exe -I https://www.zlpodologia.com.br/
```

## Pendente

- Aguardar propagacao completa de DNS/cache publico.
- Reabrir Vercel > Project `pageforce-zl-podologia` > Settings > Domains e acionar `Refresh`.
- Considerar concluido quando `zlpodologia.com.br` tambem aparecer como configurado/sem recomendacao e `https://www.zlpodologia.com.br/` responder `200 OK` de forma consistente sem `--resolve`.
