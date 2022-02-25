# Menu Digital

## Documenta��o

#

### Objetivo

Menu Digital, API criada para gerenciar pedidos no seu restaurante, aumentar a produtividade e a qualidade do atendimento.
Com o nosso sistema, voc� ser� capaz de ger�nciar o pedido desde o momento que � feito, at� o momento que o cliente faz o pagamento da conta.

#

## Link da API hospedada no Heroku

- [Menu Digital](https://api-node-q4.herokuapp.com/api).

#

## Instala��o

- Primeiro fa�a o fork deste [reposit�rio](https://gitlab.com/gabrieldosprazeres/capstone-q4-nodejs).

- Em seguida fa�a um git clone para a sua maquina

- Instale as dependencias necess�rias utilizando o comando

```
$ yarn install
```

- Crie o container no docker

```
$ docker-compose up
```

- Crie as tabelas no banco de dados atrav�s do comando

```
$ yarn typeorm migration:run
```

- Configure suas vari�veis seguindo o `.env.example`

- Inicie a aplica��o local atrav�s do comando

```
$ yarn run dev
```

- A aplica��o inicializar� na rota http://localhost:3000/. Voc� dever� ver algo semelhante ao snippet logo abaixo no seu terminal:

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

## Documenta��o das rotas e retornos

Voc� pode acessar a documenta��o das rotas clicando em [Doc API](https://documenter.getpostman.com/view/18794559/UVkpNFjW)

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
