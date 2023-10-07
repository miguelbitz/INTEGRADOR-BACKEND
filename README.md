# Projeto Integrador - Labeddit (Backend)

O Projeto Labeddit é uma rede social inspirada no Reddit com o objetivo de promover a interação entre os usuários por meio da criação, curtidas em publicações e comentários. 
O backend do Labeddit é construído com as tecnologias NodeJS, Typescript, Express, SQL e SQLite, utilizando o Knex para a manipulação do banco de dados. Além disso, são aplicadas boas práticas de código, como Programação Orientada a Objetos (POO) e arquitetura em camadas.


## Tecnologias

O projeto aborda as seguintes ferramentas:

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- POO
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento
- Postman

## Caminho das Requisições (Paths)

### Requisições de Usuários:

- /users

### Requisições de Posts/Likes:

- /posts

### Requisições de Comentários:

- /comments

# Exemplo de Requisições de Users

## Get Users

\```javascript
// request GET /users Retorna todos usuários cadastrados
// headers.authorization = "token jwt"
// body JSON
[
    ...
]

// response
// status 200 OK
{
  token: "um token jwt"
}
\```

## SignUp

\```javascript
// request POST /users/signup Cadastra novo usuario
// body JSON
{
    ...
}

// response
// status 201 CREATED
{
  token: "um token jwt"
}
\```

## Login

\```javascript
// request POST /users/login Gerar token para logar
// body JSON
{
    ...
}

// response
// status 200 OK
{
  token: "um token jwt"
}
\```

# Exemplo de Requisições de Posts

## Get Posts

\```javascript
// request GET /posts Retorna todos posts
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    ...
]
\```

## Create Post

\```javascript
// request POST /posts Cria novo post
// headers.authorization = "token jwt"
// body JSON
{
    ...
}

// response
// status 201 CREATED
\```

## Edit Post

\```javascript
// request PUT /posts/:id Edita conteudo do post
// headers.authorization = "token jwt"
// body JSON
{
    ...
}

// response
// status 200 OK
\```

## Delete Post

\```javascript
// request DELETE /posts/:id Deleta post
// headers.authorization = "token jwt"

// response
// status 200 OK
\```

# Exemplo de Requisições de Like/Dislike

## LikeDislike

### Like

\```javascript
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    ...
}

// response
// status 200 OK
\```

### Dislike

\```javascript
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    ...
}

// response
// status 200 OK
\```

## Documentação do Postman

[Link da API no POSTMAN](https://documenter.getpostman.com/view/26594213/2s9YJgTLMV)

# Criado por:

## Miguel Alves

![Logo Miguel](https://uploaddeimagens.com.br/images/004/544/373/original/imagem_pq.png?1689299009)

[Linkedin](https://www.linkedin.com/in/miguelbitz/)
