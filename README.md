# Projeto Web Back-end

Projeto de uma API REST desenvolvida em Node para a disciplina de Programação Web Back-end no curso de bacharelado em Engenharia de Software da UTFPR.

## Rodando o projeto

### Requisitos

Se não tiver o MongoDB instalado, instale o [Docker](https://docs.docker.com/desktop/) e o [Docker Compose](https://docs.docker.com/compose/install/) e gere um container do MongoDB:

```bash
  docker compose up -d
```

Utilize o [Node v20.17.0](https://nodejs.org/en/download/).

### Inicialização

Instale as dependências:

```bash
  npm install
```

Inicie o servidor:

```bash
  npm start
```

## Requisitos do sistema

### Usuários e sistema de autenticação

O gerenciamento e controle de usuários deverá:

- [x] Permitir o cadastro de usuários (dados pessoais, nome de usuário e senha);
- [x] Criar um usuário administrador padrão durante a instalação do sistema;
- [x] Receber o nome de usuário e senha para gerar um token JWT que permite o acesso às rotas protegidas;
- [x] Permitir que o usuário altere seus dados pessoais.

O usuário administrador deverá ter os seguintes privilégios:

- [x] Alterar usuários;
- [x] Excluir usuários;
- [x] Criar usuários administradores.

### Sistema CRUD

O sistema CRUD deverá:

- [x] Permitir a realização de três cadastros (operações de CRUD completa);
- [x] Ter relacionamentos de um-para-muitos ou muitos-para-muitos entre suas relações;
- [x] Restringir as operações de inserção, alteração e exclusão somente para usuários autenticados;
- [ ] Validar os dados recebidos pelo usuário;
- [x] Gerar mensagens de erros personalizadas conforme o erro obtido. As mensagens de erros e sucessos deverão ser enviadas juntamente com as respostas;
- [x] Empregar os métodos HTTP GET, POST, PUT e DELETE conforme a operação a ser executada;
- [x] Paginar as listagens com parâmetros de limite e número da página. O parâmetro de limite definirá quantos objetos devem ser retornados (5, 10 e 30) e o de número da página definirá o ponto em que começa o retorno. Por exemplo, limite=5 e página=1, retorna os 5 primeiros registros; limite=5 e página=3, ignora os 10 primeiros registros e retorna do 11º ao 15º registro.

### Lógica de negócio, instalador e documentação

- [ ] Deverá ser implementado alguma operação especial de livre escolha (disponível por uma ou mais rotas) implementando uma lógica de negócio que pode envolver inserção/alteração no banco de dados, geração de consultas elaboradas e/ou algum processamento dos dados sejam eles recebidos por parâmetros ou do próprio banco de dados;
- [ ] Deverá ser criado uma rota GET /install/ que realiza a instalação do banco de dados (criação das tabelas/coleções e inserção de dados no banco). Cada tabela/coleção deverá ser populada com pelo menos 5 registros.
- [ ] Deverá ser criado uma rota GET /docs contendo a documentação gerada pela ferramenta Swagger.
