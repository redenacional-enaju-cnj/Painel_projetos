# Implantação do protótipo ENAJU com usuário e senha

**Situação:** o código foi preparado no GitHub, mas a hospedagem só estará ativa quando o proprietário vincular a conta Cloudflare ao repositório e configurar as credenciais. Não inventar uma URL de site antes do deploy.

## Segurança adotada para o protótipo

O arquivo `functions/_middleware.js` intercepta **todas as solicitações**, inclusive `index.html`, `app.js`, `styles.css`, imagens e `data/portfolio.json`.

- **Sem segredos configurados:** resposta **503**, nenhum arquivo da base é liberado.
- **Sem login ou com login incorreto:** resposta **401**, com solicitação de usuário e senha pelo navegador.
- **Com login válido:** o painel e a base são entregues sobre HTTPS. A resposta instrui o navegador e caches intermediários a não armazenar os dados.
- Usuário e senha são armazenados **somente como segredos criptografados na Cloudflare**. Não gravar credenciais no GitHub, no HTML, no README, em prints ou no ChatGPT.
- A autenticação é adequada para um **protótipo de acesso restrito**, com credencial compartilhada temporária. Para operação institucional multiusuário e trilha de auditoria individual, migrar para Cloudflare Access + Google Workspace.

## Passo a passo — Cloudflare Pages

1. Abra https://dash.cloudflare.com/ e entre/crie uma conta.
2. Em **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**, escolha **GitHub**.
3. Autorize o aplicativo **Cloudflare Pages** a acessar **somente** o repositório `redenacional-enaju-cnj/Painel_projetos`. Não é preciso tornar o repositório público.
4. Selecione o repositório e configure:
   - **Production branch:** `main`
   - **Framework preset:** `None` / sem framework
   - **Build command:** `sh build.sh`
   - **Build output directory:** `dist`
   - **Root directory:** padrão, raiz do repositório
5. Faça o primeiro **Save and Deploy**. O primeiro endereço temporário `https://<projeto>.pages.dev` deve responder **503 — acesso suspenso** até que os segredos sejam configurados. Isso é intencional.
6. No projeto Pages, abra **Settings → Variables and Secrets → Add** e configure, como **Secrets/Encrypt**:
   - `ENAJU_BASIC_USER` = nome de usuário escolhido por você (ex.: `gestor-enaju`)
   - `ENAJU_BASIC_PASSWORD` = senha forte, única e não compartilhada por mensagem
   Configure as mesmas credenciais para **Production** e **Preview**, caso permita previews de branches.
7. Faça **Retry deployment** ou **Redeploy** para que os segredos estejam disponíveis na execução.
8. Abra o endereço definitivo fornecido pela Cloudflare. O navegador deve exibir um diálogo de usuário e senha. Insira suas credenciais; o painel carregará após autenticação.
9. Verifique usando uma janela anônima nova (sem credenciais armazenadas pelo navegador):
   - `https://<projeto>.pages.dev/` → **401 / login**
   - `https://<projeto>.pages.dev/data/portfolio.json` → **401 / login**
   - endereço principal com login correto → **200 / dashboard**
   - com credenciais incorretas → **401**
   Se o JSON abrir sem pedir login, **desative a implantação imediatamente** e não compartilhe o link.
10. Compartilhe conosco **apenas a URL do projeto Pages** (sem senha); verificaremos a disponibilidade e adicionaremos o endereço funcional ao README do GitHub.

## Edição dos dados

- A proteção por usuário/senha **controla a leitura do site**, mas **não dá permissão de gravar no GitHub** automaticamente.
- Para alterar dados pelo site e fazer commits, a versão atual solicita um token GitHub **fine-grained** no botão **Conectar GitHub** (acesso de escrita a este repositório). Esse token não é guardado persistentemente, mas é preferível usar as atualizações por ChatGPT até existir um backend com identidade individual e escopos restritos.
- Para pedir atualização pelo ChatGPT, escreva `atualize` no projeto ENAJU; a conexão GitHub autorizada pode registrar as alterações solicitadas.
- O JSON é a base gerencial; percentuais sem evidências validadas devem continuar vazios.

## Evolução para acesso por Google

A etapa institucional recomendada é substituir a credencial compartilhada por **Cloudflare Access**. Deve proteger **produção e previews**, utilizar uma lista restrita de endereços ou identidades Google autorizadas e testar que a URL `/data/portfolio.json` não pode ser acessada anonimamente. A Cloudflare documenta ajustes adicionais para proteger o domínio de produção `*.pages.dev`, além dos subdomínios de preview.

Referências técnicas:

- https://developers.cloudflare.com/pages/configuration/git-integration/
- https://developers.cloudflare.com/pages/functions/middleware/
- https://developers.cloudflare.com/pages/functions/bindings/
- https://developers.cloudflare.com/pages/platform/known-issues/