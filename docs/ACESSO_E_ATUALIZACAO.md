# Guia operacional — acesso, atualização e alertas

## Edição e envio

1. Abra o painel. A visão inicial usa `data/portfolio.json` do mesmo endereço do site (sem alteração remota).
2. Na coluna **Projeto / frente**, clique no nome ou em **Editar**. É possível registrar situação, responsáveis, próximo marco e evidência.
3. Para apresentar percentual, informe **total de entregas pactuadas**, **número de entregas aceitas** e **fonte que sustenta o escopo/aceite**. Não use percentual estimado.
4. Clique **Salvar edição local**; o cabeçalho indicará alterações pendentes.
5. Clique **Conectar GitHub**, use um token limitado ao repositório e confirme a leitura do JSON remoto.
6. **Preferência:** conecte antes de editar. Se já houver alterações locais, o painel só as preserva se a versão remota ainda for igual à base da sessão; caso contrário, exige exportação/conciliação para evitar sobrescrita.
7. Clique **Enviar alterações**. O sistema envia o JSON atualizado para o GitHub com o SHA da versão atual. Em caso de conflito, exporte e concilie antes de enviar.
8. Use **Recarregar** para obter a última versão salva no repositório.

## Token de acesso ao GitHub

No GitHub, use Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token. Configure o owner adequado, selecione **somente** `Painel_projetos`, conceda **Contents: Read and write** e mantenha o prazo de validade restrito. Se a organização bloquear tokens pessoais, a alternativa é um backend institucional (GitHub App, Firebase ou outro serviço autorizado).

## Responsáveis por área

- Pesquisa: Danielly e Igor.
- Cursos/formação: Alana e Jan.
- Estratégia/governança: Fábio e Dr. Daniel.

As sugestões aparecem nos projetos pela natureza da frente. Não são comprovação de designação funcional e podem ser editadas.

## Monitoramento no ChatGPT

Quando escrever **`atualize`** no chat do projeto ENAJU, o assistente deverá:

1. Ler a versão mais recente de `data/portfolio.json` pelo conector GitHub, se autorizado.
2. Confrontar com as novidades e documentos efetivamente disponíveis no projeto; não inventar mudança de SEI, reunião, prazo ou resultado.
3. Identificar alterações por projeto/demanda e classificar críticas apenas as ações verificadas (prazos confirmados próximos/vencidos, bloqueios atuais), atenção por prazos da semana, e verificar por lacunas cadastrais.
4. Apresentar no máximo três alertas prioritários e os demais em resumo; se houver alterações confirmadas autorizadas e permissão no repositório, persistir com commit e informar o resultado.
5. Se o GitHub não estiver acessível, devolver diagnóstico com pendência de autenticação; **nunca declarar que sincronizou sem confirmação da API**.

Um lembrete de atualização pode ser agendado no ChatGPT para o fim do expediente. O GitHub Pages não consegue despertar uma conversa sozinho.

## Dados confidenciais e a conta Google

GitHub Pages publica conteúdo estático; não use o JSON do painel como repositório de dados sensíveis se a implantação for pública. Para permitir edição por login Google e banco privado será necessário integrar serviço de autenticação e armazenamento com regras de segurança verificadas; isso não está ativo neste pacote.