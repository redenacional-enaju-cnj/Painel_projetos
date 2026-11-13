# ENAJU — Painel de Gestão Integrada

Aplicação web estática com base versionada no GitHub, atualizada em 13/11/2026, para acompanhar **14 projetos na carteira principal**, **32 demandas/rotinas** e **21 marcos de planejamento**, além dos itens preservados em backlog e histórico. A identidade visual utiliza o logotipo ENAJU fornecido pela equipe.

## Publicação com endereço fixo — GitHub Pages

**Decisão em 13/11/2026:** a coordenação autorizou que o painel e o repositório possam ficar públicos para acesso pelo link. A implantação escolhida é **GitHub Pages a partir de `main`, pasta `/ (root)`**, sem build. O código e a carteira `data/portfolio.json` serão públicos assim que a visibilidade for alterada e o Pages for habilitado.

- **URL permanente do painel:** https://redenacional-enaju-cnj.github.io/Painel_projetos/
- **Configurar visibilidade:** [Settings → General](https://github.com/redenacional-enaju-cnj/Painel_projetos/settings) → **Danger Zone → Change repository visibility → Public**.
- **Habilitar hospedagem:** [Settings → Pages](https://github.com/redenacional-enaju-cnj/Painel_projetos/settings/pages) → **Build and deployment → Source: Deploy from a branch → Branch: main → Folder: / (root) → Save**.
- **Atualização da base:** sempre que `data/portfolio.json` for alterado e salvo em commit na branch `main`, o GitHub Pages republica os arquivos automaticamente. A URL não muda; recarregue a página para obter a versão mais recente.
- **Edição:** o site público é de leitura para os visitantes. Alterar e enviar a base exige permissão de escrita no GitHub, e a interface pode solicitar um token de sessão. O comando `atualize` no chat da ENAJU poderá atualizar a base pelo conector GitHub autorizado.
- **Atenção à publicidade:** processos, responsáveis, histórico, arquivos e versões anteriores da carteira passam a ficar acessíveis na internet. Não armazenar senhas, tokens, CPF, dados pessoais sensíveis ou documentos internos no repositório. Revisar a classificação dos dados antes de converter a visibilidade.
- O middleware `functions/_middleware.js` é usado apenas na opção **Cloudflare Pages**. **GitHub Pages não o executa e não exige login e senha.** O protótipo público não possui autenticação.

**Estado da publicação (13/11/2026):** repositório público e GitHub Pages ativado; o workflow `pages build and deployment` [concluiu com sucesso](https://github.com/redenacional-enaju-cnj/Painel_projetos/actions/runs/43477696533). **Abrir o [painel publicado](https://redenacional-enaju-cnj.github.io/Painel_projetos/)**. O deploy foi confirmado pela plataforma; o carregamento da URL externa não pôde ser testado diretamente por esta sessão.

## Ajustes executivos — 13/11/2026

- A aba SEI apresenta a coluna **Unidade** e o estado do andamento diretamente, mantendo a fonte e a data da informação na base. A unidade é aquela informada pela coordenação, sem pretensão de consulta automática ao SEI.
- O dashboard inclui o botão **Baixar base de dados**, que exporta o JSON com os dados atualmente carregados no navegador, inclusive atualizações locais ainda não enviadas; para obter a base oficial, use **Recarregar** antes do download.
- Está em levantamento um catálogo de painéis, apresentações e arquivos HTML; os links **não serão publicados neste dashboard sem aprovação da coordenação**.

## Painel de acompanhamento SEI (13/11/2026)
**Atualização de localização em 13/11/2026:** a coordenação informou as unidades atuais dos 10 SEIs: 21240/DIGN, 20736/DIGN, 20608/ENAJU-DG, 20650/DTI, 21997/SCS (para diagramação), 02704/Presidência (publicação autorizada, seguirá à COIN), 16537/DIGN, 15083/SCS, 18501/SCS e 20451/SEP (solicitação de Jailson, seguirá à SGP). **A fonte é o relato da coordenação, não uma consulta direta ao SEI**. Datas dos trâmites antigos foram preservadas.


- A página inicial ganhou um cartão **SEI prioritários**, e a navegação inclui **SEI prioritários** com número, situação, unidade atual (quando verificada), última unidade ou destino informado, o que está aguardando e data da informação.
- **Link direto para a aba:** https://redenacional-enaju-cnj.github.io/Painel_projetos/#sei
- **Lista atualizada (13/11/2026): onze processos prioritários acompanhados** — 21240/2026, 20736/2026, 20608/2026, 20650/2026, 21997/2026, 02704/2026, 16537/2026, 15083/2026, 18501/2026, 20451/2026 e **21372/2026 (Programa ENAJU; prioritário, Igor, SEP)**. O SEI 08366/2026 saiu da lista prioritária e foi conservado no histórico, sem pressupor encerramento.
- **Não há integração com a caixa SEI**: unidades e situações atuais ficam como não verificadas até registro de movimentação com fonte. Última tramitação histórica não comprova localização atual.
- A edição no navegador é local até usar **Enviar alterações** com autenticação GitHub. Os dados ficam no mesmo arquivo `data/portfolio.json` e a URL pública permanece inalterada.
- O acompanhamento de rotina no ChatGPT deve fazer a checagem diária nos dias úteis, comparar revisões documentadas e notificar somente alterações relevantes; não declarar que consultou a caixa SEI sem efetivamente ter acesso.
- **Atenção:** este é um repositório e site públicos, portanto não inclua informação processual sigilosa ou dados pessoais sensíveis.
**Evidência da rodada de 13/11:** lista recebida da equipe, com movimentações em datas entre 28/08 e 05/11 e algumas sem data individual. Os campos de unidade atual seguem não verificados porque o painel não consulta o SEI diretamente. As respostas aguardadas e as cinco providências apontadas pela DTI no processo 20650/2026 constam no JSON.


## V2 — dashboard executivo institucional (13/11/2026)

- Visão inicial agora apresenta indicadores reais da base, situação do portfólio, distribuição por eixo, acompanhamento de demandas e agenda.
- Os gráficos são calculados no navegador a partir de `data/portfolio.json`, sem dados ilustrativos. Os filtros por situação e eixo abrem a carteira correspondente.
- A marca textual improvisada do CNJ foi substituída pela imagem institucional disponibilizada no [portal de marcas do CNJ](https://www.cnj.jus.br/sobre-o-cnj/logotipos-e-marcas/). Para evitar uma reprodução apócrifa, não se redesenhou a marca; o recurso gráfico é carregado do domínio oficial do CNJ.
- O endereço público do GitHub Pages permanece o mesmo. Nenhuma estrutura ou registro do JSON foi modificado neste redesign.

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

## Decisão de publicação — 13/11/2026

A coordenação autorizou que o repositório e o painel possam ser **públicos**, para que qualquer pessoa com o endereço visualize o portfólio. Antes da mudança de visibilidade, conferir se `data/portfolio.json` e o histórico do Git contêm apenas informações apropriadas à divulgação pública.

**Método selecionado: GitHub Pages** (branch `main`, diretório `/ (root)`). A versão HTML, CSS, JavaScript e JSON já está na raiz, sem etapa de build. O link fica estável e o JSON atualizado é republicado quando houver novo commit na `main`.

O código adicional em `functions/_middleware.js`, `build.sh` e `docs/CLOUDFLARE_DEPLOY.md` documenta a alternativa antiga de publicação privada via Cloudflare Pages, **não usada pelo GitHub Pages**, e não deve ser confundido com login protegido na versão pública.

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
## Demandas por responsável — atualização de 13/11/2026

- A aba **Por responsável** reúne os cards das demandas em cada pessoa e permite abrir/editar a demanda, consultar o projeto e acompanhar status, prioridade e prazo.
- Demandas compartilhadas aparecem para cada participante sem duplicação na base. Atribuições ainda sugeridas são identificadas como tais.
- O **SEI 21372/2026** foi incluído como prioritário, unidade atual **SEP**, responsabilidade **Igor**, com vínculo à demanda **R09** do projeto **P01**. Referência de fonte **S22** (captura do SEI e atualização da coordenação).
