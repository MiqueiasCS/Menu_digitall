# Menu Digital

## Documentação

#

### Objetivo

Menu Digital, API criada para gerenciar pedidos no seu restaurante, aumentar a produtividade e a qualidade do atendimento.
Com o nosso sistema, você será capaz de gerênciar o pedido desde o momento que é feito, até o momento que o cliente faz o pagamento da conta.

#

## Link da API hospedada no Heroku

- [Menu Digital](https://api-node-q4.herokuapp.com/api).

#

## Instalação

- Primeiro faça o fork deste [repositório](https://gitlab.com/gabrieldosprazeres/capstone-q4-nodejs).

- Em seguida faça um git clone para a sua maquina

- Instale as dependencias necessárias utilizando o comando

```
$ yarn install
```

- Crie o container no docker

```
$ docker-compose up
```

- Crie as tabelas no banco de dados através do comando

```
$ yarn typeorm migration:run
```

- Configure suas variáveis seguindo o `.env.example`

- Inicie a aplicação local através do comando

```
$ yarn run dev
```

- A aplicação inicializará na rota http://localhost:3000/. Você deverá ver algo semelhante ao snippet logo abaixo no seu terminal:

```
yarn run v1.22.17
warning ../../../../../../package.json: No license field
$ ts-node-dev src/server.ts
[INFO] 21:55:49 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.5.5)
Running at http:localhost:3000
query: SELECT * FROM current_schema()
query: CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
query: SHOW server_version;
Database Connected
```

#

## Documentação das rotas e retornos

Você pode acessar a documentação das rotas clicando em [Doc API](https://documenter.getpostman.com/view/18794559/UVkpNFjW)

#

## Tecnologias Utilizadas:

- TypeScript
- NodeJS
- Express
- TypeORM
- Postgres
- Docker (docker-compose)
- Jest

#

## Projeto desenvolvido por:

- [Arthur Fenili Linemburg](https://www.linkedin.com/in/arthur-fenili-linemburg-ab8936184/)
- [Gabriel dos Prazeres](https://www.linkedin.com/in/gabrieldosprazeres/)
- [Guilherme Armesto Job](https://www.linkedin.com/in/guilherme-armesto-job/)
- [Miqueias Carvalho](https://www.linkedin.com/in/miqueias-carvalho-dos-santos/)
