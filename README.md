# Wheaton Brasil Vidros — Portal de Agendamento e Conferência Digital

Site estático (HTML + JavaScript) ligado ao Supabase. Hospedagem: GitHub Pages.

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Portal de Agendamento + administração da conferência (transportadora e administrador) |
| `conferente.html` | Conferência digital — acesso exclusivo dos conferentes |
| `config.js` | URL e chave publishable do Supabase |
| `conferencia_supabase.sql` | Cria as tabelas e permissões no Supabase |
| `manifest.webmanifest`, `conferente.webmanifest`, `sw.js`, `icon-*.png` | Instalação como aplicativo (PWA) |

## Como publicar

1. **Supabase** → SQL Editor → cole e execute `conferencia_supabase.sql`.
2. **config.js** → troque `COLOQUE_AQUI_A_CHAVE_PUBLISHABLE` pela chave *publishable* do projeto
   (Supabase → Project Settings → API Keys). Nunca use a chave *secret*.
3. **GitHub** → crie o repositório e envie todos os arquivos desta pasta na raiz.
4. **GitHub Pages** → Settings → Pages → Branch `main` / pasta `/ (root)` → Save.
5. Endereços finais:
   - `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/index.html`
   - `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/conferente.html`
6. No celular/tablet do conferente, abra `conferente.html` e use **Adicionar à tela inicial**.

## Observações

- Ao atualizar os arquivos, aumente `CACHE` em `sw.js` (ex.: `wheaton-v2`) para os aparelhos receberem a versão nova.
- O login do administrador está definido dentro do `index.html`; como o código do site é público
  no GitHub Pages, prefira repositório privado ou troque a senha antes de publicar.
