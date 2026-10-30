# Portal Wheaton — publicação inicial

## Arquivos
- `index.html`: interface do portal ajustada para carregar a configuração Supabase.
- `config.js`: URL e chave publishable do projeto.
- `conferencia_supabase.sql`: tabelas e políticas iniciais para teste.

## Supabase
1. Abra o SQL Editor do projeto `kdgprglbjpegeofgpmcs`.
2. Cole e execute `conferencia_supabase.sql`.
3. Em Project Settings / API, confirme que a chave é a publishable key correspondente ao projeto.

## GitHub Pages
1. Envie `index.html` e `config.js` para a raiz de um repositório GitHub.
2. Ative Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
3. Aguarde a publicação e teste a URL gerada.

## Importante — segurança
A chave `sb_publishable_...` é uma chave pública, própria para frontend; nunca publique uma `service_role` ou secret key.
O SQL incluído cria políticas públicas de teste para compatibilidade com o HTML atual, que não autentica os usuários usando Supabase Auth. Assim, qualquer pessoa que descubra a URL pode ler, alterar ou apagar os dados e os hashes dos conferentes. **Não use esse modo com dados reais ou em produção.** Antes de uso real, é necessário migrar login/perfis para Supabase Auth, restringir RLS por usuário/perfil e proteger a tabela `conferentes`.

O frontend atual não envia os PDFs originais ao Storage: ele lê o texto localmente no navegador e salva os itens extraídos no banco.
