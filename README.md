# Wheaton • Portal de Agendamento + Conferência Digital

Dois sites estáticos ligados ao **mesmo banco Supabase**:

| Arquivo | Quem usa | O que faz |
|---|---|---|
| `index.html` | Transportadora e Administrador | Agendamento, fila, administração da conferência, romaneios finalizados (NF + certificado) e PDF |
| `conferente.html` | Conferentes | Login, senha da fila, check-list de embarque, romaneio digital e assinatura do motorista |
| `config.js` | — | URL e chave **publishable** do Supabase |
| `supabase/conferencia_supabase.sql` | — | Cria todas as tabelas e permissões |
| `manifest.webmanifest`, `conferente.webmanifest`, `sw.js`, `icon-*.png` | — | Instalação como aplicativo (PWA) |
| `.github/workflows/pages.yml` | — | Publica automaticamente no GitHub Pages |

## Passo 1 — Supabase (banco)
1. Abra o projeto `https://kdgprglbjpegeofgpmcs.supabase.co` → **SQL Editor** → **New query**.
2. Cole todo o conteúdo de `supabase/conferencia_supabase.sql` e clique em **Run**.
3. Em **Table Editor** confira as tabelas: `agendamentos`, `conf_pdfs`, `conf_romaneios`, `conf_avulsas`, `conferentes`.

## Passo 2 — GitHub
1. Crie um repositório (ex.: `portal-wheaton`) e envie **todos** os arquivos desta pasta (inclusive `.github` e `.nojekyll`).
   - Pelo site: *Add file → Upload files* (arraste a pasta; para `.github` use o Git ou crie o arquivo `.github/workflows/pages.yml` manualmente).
   - Pelo terminal:
     ```bash
     git init && git add -A && git commit -m "Portal Wheaton"
     git branch -M main
     git remote add origin https://github.com/SEU_USUARIO/portal-wheaton.git
     git push -u origin main
     ```
2. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Aguarde a aba **Actions** ficar verde. Endereços:
   - Portal: `https://SEU_USUARIO.github.io/portal-wheaton/`
   - Conferente: `https://SEU_USUARIO.github.io/portal-wheaton/conferente.html`

## Passo 3 — Primeiro uso
1. Entre no portal como **Administrador** → aba de Conferência Digital → cadastre os **conferentes** (usuário, nome, DRT e senha).
2. Importe os PDFs dos pedidos (Mapa de Preparação).
3. No celular/tablet do conferente, abra o endereço do `conferente.html` e use **Adicionar à tela inicial** / **Instalar aplicativo**.

## Observações
- A chave `sb_publishable_...` é pública por natureza. **Nunca** publique a chave `secret`/`service_role`.
- O login de administrador e o de conferente são verificados no próprio navegador e as tabelas liberam acesso ao papel `anon`. Isso atende a um uso interno, mas qualquer pessoa com a URL e a chave consegue ler/gravar. Para endurecer, o próximo passo é migrar o login para o Supabase Auth e restringir as políticas RLS.
- Ao alterar os HTML, aumente `VERSAO` em `sw.js` (ex.: `wheaton-v3`) para forçar a atualização nos aparelhos.

## Novidades desta versão (v2)
- Removido do agendamento o aviso de horário operacional, capacidade, travas e antecedência (as regras continuam valendo no sistema) e o texto do rodapé.
- Conferência Digital: o mesmo PDF de pedido não pode ser incluído mais de uma vez; quando o protocolo é finalizado, o PDF do pedido é excluído automaticamente.
- O SQL cria a coluna `pdf_info` em `conf_romaneios` (guarda cliente/transportadora do pedido, que é excluído ao finalizar). Se o banco já existe, basta rodar o SQL de novo.
- `sw.js` atualizado para `wheaton-v2`, forçando a atualização nos aparelhos.
