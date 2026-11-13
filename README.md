# ENAJU — Painel de Gestão Integrada

Aplicação web com interface estática e autenticação provisória no Cloudflare Pages, para acompanhar **20 frentes de projeto**, **15 demandas/rotinas** e **22 marcos preliminares** da ENAJU conforme a base gerencial de 12/11/2026. A identidade visual utiliza o logotipo ENAJU fornecido pela equipe.

## Publicação com endereço fixo — GitHub Pages

**Decisão em 13/11/2026:** a coordenação autorizou que o painel e o repositório possam ficar públicos para acesso pelo link. A implantação escolhida é **GitHub Pages a partir de `main`, pasta `/ (root)`**, sem build. O código e a carteira `data/portfolio.json` serão públicos assim que a visibilidade for alterada e o Pages for habilitado.

- **URL prevista (ainda depende de ativação e verificação):** https://redenacional-enaju-cnj.github.io/Painel_projetos/
- **Configurar visibilidade:** [Settings → General](https://github.com/redenacional-enaju-cnj/Painel_projetos/settings) → **Danger Zone → Change repository visibility → Public**.
- **Habilitar hospedagem:** [Settings → Pages](https://github.com/redenacional-enaju-cnj/Painel_projetos/settings/pages) → **Build and deployment → Source: Deploy from a branch → Branch: main → Folder: / (root) → Save**.
- **Atualização da base:** sempre que `data/portfolio.json` for alterado e salvo em commit na branch `main`, o GitHub Pages republica os arquivos automaticamente. A URL não muda; recarregue a página para obter a versão mais recente.
- **Edição:** o site público é de leitura para os visitantes. Alterar e enviar a base exige permissão de escrita no GitHub, e a interface pode solicitar um token de sessão. O comando `atualize` no chat da ENAJU poderá atualizar a base pelo conector GitHub autorizado.
- **Atenção à publicidade:** processos, responsáveis, histórico, arquivos e versões anteriores da carteira passam a ficar acessíveis na internet. Não armazenar senhas, tokens, CPF, dados pessoais sensíveis ou documentos internos no repositório. Revisar a classificação dos dados antes de converter a visibilidade.
- O middleware `functions/_middleware.js` é usado apenas na opção **Cloudflare Pages**. **GitHub Pages não o executa e não exige login e senha.** O protótipo público não possui autenticação.

**Situação de verificação:** enquanto o repositório não for convertido para público e o GitHub Pages não estiver ativado, o endereço previsto não deve ser divulgado como funcionando.

## O que está funcional

- Dashboard com filtros, todos os projetos, eixos, responsáveis sugeridos e próximos passos.
- Página de projetos e detalhe com escopo, histórico, SEI, marcos e tarefas vinculadas.
- Registro e edição de projetos e demandas (inclui criação de novos registros).
- Cronograma visual, preservando a distinção entre horizonte **proposto** e prazo **confirmado**.
- Cálculo de `% executado` **somente** quando o operador informa denominador pactuado, entregas aceitas e fonte de validação; sem isso, o campo permanece em branco.
- Histórico de edições na própria base e commits Git; prevenção de sobrescrita concorrente pelo SHA do arquivo.
- Edição local, importação/exportação JSON e botão **Enviar alterações** para atualizar o arquivo `data/portfolio.json` no GitHub, após autenticação.

## Como experimentar localmente

Instale Python 3 (se ainda não estiver disponível), extraia os arquivos e execute, na pasta que contém `index.html`:

```bash
python -m http.server 8000
```

Em seguida, abra `http://localhost:8000/` no navegador. Abra a visão geral, clique em **Editar** e salve; a edição é local até que um envio remoto seja confirmado.

## Decisão de privacidade — 12/11/2026

**Acesso ao painel somente para usuários autorizados, por enquanto.** O repositório `Painel_projetos` permanece privado. Não modificar a visibilidade nem disponibilizar `data/portfolio.json` em um site público sem nova decisão da coordenação. O endereço futuro do site privado só deve ser registrado após implantação, aplicação da autenticação a todos os caminhos e teste de acesso não autenticado.

## Repositório e publicação protegida

Repositório **privado**: [redenacional-enaju-cnj/Painel_projetos](https://github.com/redenacional-enaju-cnj/Painel_projetos).

A implantação recomendada é **Cloudflare Pages**, conectada ao GitHub: branch `main`, comando de build `sh build.sh`, pasta de saída `dist`. O pacote de build publica somente os arquivos da interface e `data/portfolio.json`, todos bloqueados pelo middleware quando não há login; os arquivos de origem, documentação e testes ficam fora do diretório de publicação.

**Credenciais:** cadastrar **somente na Cloudflare**, como **secrets criptografados**: `ENAJU_BASIC_USER` e `ENAJU_BASIC_PASSWORD`. Não compartilhar senha no chat, não escrever senha no HTML ou GitHub. O primeiro deploy sem secrets fica propositalmente indisponível (503), até a configuração.

**Verificação obrigatória:** após o deploy, uma nova janela anônima deve receber **401** tanto para a raiz quanto para `/data/portfolio.json`; credenciais corretas liberam a navegação. Não divulgar a URL antes dessa verificação. Todas as URLs de preview também precisam de credenciais, inclusive produção.

**Edição:** login no painel controla a **visualização**, não concede automaticamente escrita no repositório. A versão atual ainda solicita um token GitHub *fine-grained* durante a sessão para enviar alterações diretamente pelo navegador. É mais simples solicitar alterações aqui pelo comando `atualize`, usando o conector GitHub autorizado. Para operação multiusuário futura, substituir a credencial compartilhada por Cloudflare Access + login Google e implementar backend próprio para gravação.

Instruções completas: [docs/CLOUDFLARE_DEPLOY.md](docs/CLOUDFLARE_DEPLOY.md).

## Arquitetura e consistência

- Frontend: HTML + CSS + JavaScript nativo, sem CDNs nem bibliotecas de terceiros.
- Persistência: arquivo JSON versionado no GitHub, via GitHub Contents API e commit de cada envio.
- Modelo: projetos, rotinas, marcos, fontes, regras e histórico de mudanças.
- Alteração **local** não é alteração **remota**. O painel mostra quando há mudanças pendentes.
- Em conflitos de edição, o GitHub retorna erro e o painel orienta exportar o arquivo local antes de recarregar a versão remota; a versão remota não é sobrescrita silenciosamente.
- Esta ferramenta não lê automaticamente a caixa de processos SEI nem sistemas internos do CNJ.

## Atualizar pelo ChatGPT: `atualize`

No chat do projeto ENAJU, o comando **`atualize`** deve iniciar a consulta ao JSON vigente **no repositório autorizado** e ao histórico ENAJU disponível, identificar novidades verificáveis, propor ou registrar alterações permitidas e exibir os alertas acionáveis. O comando é atendido no chat, não é um webhook do site e **não altera o GitHub se a conexão não tiver acesso**.

A rotina de acompanhamento do ChatGPT pode consultar a base diariamente quando o acesso ao repositório estiver conectado. O site, por si só, **não envia notificações diretamente ao ChatGPT**.

## Dados e proveniência

- Fonte original: `ENAJU_Base_Gerencial_2026-11-12.json`, consolidada no projeto ENAJU.
- Situação atual: não verificada por acesso em tempo real ao SEI. Não classificar silêncio/informações antigas como atraso.
- Responsáveis: divisão sugerida por área informada pelo usuário em 12/11/2026; a confirmação administrativa de cada responsabilidade é uma etapa gerencial distinta.
- Foram omitidos do JSON de implantação identificadores de arquivo da biblioteca pessoal e links a materiais privados do ChatGPT, mantendo títulos, datas e referências das fontes.

## Estrutura

```text
index.html
app.js
styles.css
.nojekyll
assets/enaju-logo.png
assets/enaju-favicon.svg
data/portfolio.json
README.md
docs/ACESSO_E_ATUALIZACAO.md
tests/test_integrity.py
functions/_middleware.js
build.sh
.gitignore
docs/CLOUDFLARE_DEPLOY.md
```