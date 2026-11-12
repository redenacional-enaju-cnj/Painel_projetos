# ENAJU — Painel de Gestão Integrada

Aplicação web estática, sem dependências externas, para acompanhar **20 frentes de projeto**, **15 demandas/rotinas** e **22 marcos preliminares** da ENAJU conforme a base gerencial de 12/11/2026. A identidade visual utiliza o logotipo ENAJU fornecido pela equipe.

## Acessar o painel

- **Código do painel (acesso imediato com login GitHub):** [abrir `index.html`](https://github.com/redenacional-enaju-cnj/Painel_projetos/blob/main/index.html). **Atenção:** o GitHub mostra o arquivo-fonte; esse endereço não executa o dashboard.
- **Site do painel:** **não publicado intencionalmente**. Decisão de 12/11/2026: **permanecer privado até nova autorização expressa**. O GitHub Pages comum **não é o destino autorizado**, porque a conta proprietária é pessoal e a publicação do site não teria o controle de acesso desejado.
- **Não habilitar o Pages ainda.** A branch `main` existe e já contém o projeto; a limitação é o nível de privacidade da hospedagem, não a ausência do código. Para um acesso privado pelo navegador, avaliar uma hospedagem com autenticação obrigatória, como Cloudflare Pages protegido integralmente por Cloudflare Access, inclusive o domínio de produção e as prévias.
- **Privacidade:** o repositório atual é **privado**, mas um site comum do GitHub Pages pode ser **público**, mesmo com repositório privado. A base `data/portfolio.json` contém informações de gestão; avaliar a classificação dos dados antes de habilitar a hospedagem. Publicação privada com controle de acesso não é fornecida pelo Pages comum e requer infraestrutura/plano apropriado.
- **Executar sem publicar:** baixar ou clonar o repositório e iniciar `python -m http.server 8000` na pasta raiz; abrir `http://localhost:8000/` no próprio computador.

---
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

## Repositório e publicação

Repositório confirmado (privado): [redenacional-enaju-cnj/Painel_projetos](https://github.com/redenacional-enaju-cnj/Painel_projetos).

1. A conta `redenacional-enaju-cnj` já está autorizada no conector GitHub do ChatGPT com permissão de escrita no repositório. Esta autorização **não** é uma credencial do site.
2. Após o acesso autorizado, publique o **conteúdo deste pacote na raiz** da branch padrão (`index.html`, `app.js`, `styles.css`, `data/`, `assets/` e demais arquivos); não faça upload apenas do ZIP como arquivo.
3. Se optar por GitHub Pages: nas configurações do repositório, abra **Pages** e escolha a publicação pela branch padrão, pasta `/ (root)`, ou a configuração Pages disponibilizada pelo seu plano. Não presuma que a URL do site seja privada quando o repositório for privado.
4. Para a edição no navegador, clique em **Conectar GitHub**, insira um *fine-grained personal access token* limitado a esse repositório, com **Contents: Read and write**, edite os registros e clique em **Enviar alterações**. O token não é salvo em nenhum arquivo, cookie ou armazenamento persistente.

### Segurança — leia antes de publicar

**O JSON contém registros de gestão e nomes de responsáveis**. GitHub Pages é um serviço de arquivos estáticos e não fornece, por si só, autenticação privada nem banco de dados com controle de acesso. **Se este repositório ou o conteúdo do site forem públicos, a base JSON pode ficar publicamente acessível.** Avalie a classificação dos dados, remova informações internas/sigilosas e confirme a política de acesso da instituição antes de publicar o site.

Para autenticação por conta **Google ENAJU** com edição multiusuário e controle de acesso centralizado, será necessário configurar um backend (por exemplo, Firebase Auth + Firestore com regras restritivas), ou outro serviço institucional autorizado. **Esta versão usa autenticação GitHub por token temporário; não implementa Google login.** Nunca insira tokens no chat, no código ou no JSON.

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
```