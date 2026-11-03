# Wheaton Brasil Vidros — Portal de Agendamento + Conferência Digital (v5)

Dois sites estáticos que usam o **mesmo banco Supabase**:

| Página | Quem usa | O que tem |
|---|---|---|
| `index.html` | Transportadora e Administrador | Agendamento, cancelamento, acompanhar status, Painel Operacional (detalhes e alterar status), Alterar Acesso e a administração da Conferência Digital (importar PDFs, cadastrar conferentes, fila) |
| `conferente.html` | Somente conferentes | Fila de conferência, romaneio digital, troca de pallet, assinatura e PDF |
| `diagnostico.html` | Quem configura | Confere o `config.js` e as 4 tabelas do banco |

## 1) Supabase (banco de dados)
1. Crie um projeto em https://supabase.com (ou use o que você já tem).
2. Abra **SQL Editor → New query**, cole o conteúdo de `supabase/conferencia_supabase.sql` e clique em **Run**.
   Pode rodar mais de uma vez; não apaga dados.
3. (Opcional) Rode `supabase/conferencia_supabase_realtime_opcional.sql` para o painel atualizar em tempo real.
4. Vá em **Project Settings → API** e copie:
   - **Project URL** (`https://xxxx.supabase.co`)
   - **Publishable key** (`sb_publishable_...`) ou **anon public** (`eyJ...`)
   - Nunca use a chave `service_role` / `secret`.

## 2) config.js
Abra o `config.js` e troque os dois textos `COLOQUE_...` pela URL e pela chave copiadas.

## 3) GitHub Pages
1. Crie um repositório **público** no GitHub.
2. Envie **todos os arquivos desta pasta** para a raiz do repositório (a pasta `supabase/` é opcional no site).
3. **Settings → Pages → Build and deployment → Deploy from a branch → Branch `main` / `(root)` → Save**.
4. Aguarde 1 a 3 minutos. Endereços:
   - Transportadora/Administrador: `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`
   - Conferentes: `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/conferente.html`
   - Diagnóstico: `.../diagnostico.html`

## 4) Primeiro uso
1. Abra `diagnostico.html`: todas as linhas devem ficar verdes.
2. Entre em `index.html` como administrador e **troque as senhas padrão** em *Alterar Acesso*.
3. Aba **Conferência Digital**: importe os PDFs dos pedidos e cadastre os conferentes.
4. Conferentes entram em `conferente.html` com o usuário e a senha criados pelo administrador.
5. Nos tablets: abra `conferente.html` e use *Adicionar à tela inicial*.

## Problemas comuns
- **Faixa laranja no topo:** `config.js` ainda com os textos `COLOQUE_...`.
- **Faixa vermelha embaixo:** um arquivo não carregou (ex.: `config.js` fora da pasta ou com nome diferente).
- **404:** o endereço precisa terminar em `/` (index) ou em `/conferente.html`; confira se o Pages está ativado.
- **Versão antiga aparecendo:** o rodapé deve mostrar `v5 - 02/11/2026`; se não, limpe os dados do site ou use aba anônima.

## Segurança
O app grava direto do navegador com a chave pública, então as permissões do banco ficam abertas a quem tem essa chave
(inclui ler as senhas já criptografadas dos conferentes e os dados dos agendamentos). Use em ambiente controlado;
para uso aberto na internet, reforce depois com login do Supabase.
