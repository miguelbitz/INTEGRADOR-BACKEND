# Projeto Labook (Backend)

 O Projeto Labook é uma rede social com o objetivo de promover a interação entre os usuários por meio da criação e curtidas em publicações. 
 O backend do Labook é construído com as tecnologias NodeJS, Typescript, Express, SQL e SQLite, utilizando o Knex para a manipulação do banco de dados. Além disso, são aplicadas boas práticas de código, como Programação Orientada a Objetos (POO) e arquitetura em camadas.

![alt text](https://uploaddeimagens.com.br/images/004/589/542/original/projeto-labook.png?1693094665 "Logo Title Text 1")

## Tecnologias
O projeto aborda as seguintes ferramentas:

* NodeJS
* Typescript
* Express
* SQL e SQLite
* Knex
* POO
* Arquitetura em camadas
* Geração de UUID
* Geração de hashes
* Autenticação e autorização
* Roteamento
* Postman

## Caminho das Requisições (Paths)
### Requisições de Usuários:
* /users
### Requisições de Posts/Likes:
* /posts

# Exemplo de Requisições de Users
## Get Users
```javascript
// request GET /users Retorna todos usuários cadastrados
// headers.authorization = "token jwt"
// body JSON
[
    {
        "id": "fc4cc69c-7a59-4005-aa96-84e765f1252e",
        "name": "Miguel",
        "email": "miguel@gmail.com",
        "role": "NORMAL",
        "createdAt": "2023-08-26T21:21:08.508Z"
    },
    {
        "id": "bac833fa-abea-41ce-abc4-4aba76ad2a75",
        "name": "Gica",
        "email": "gica@gmail.com",
        "role": "ADMIN",
        "createdAt": "2023-08-26T21:24:26.369Z"
    }
]

// response
// status 200 OK
{
  token: "um token jwt"
}
```
## SignUp
```javascript
// request POST /users/signup Cadastra novo usuario
// body JSON
{
    "name": "Gica",
    "email": "gica@gmail.com",
    "password": "gica1234"
}

// response
// status 201 CREATED
{
  token: "um token jwt"
}
```
## Login
```javascript
// request POST /users/login Gerar token para logar
// body JSON
{
    "email": "miguel@gmail.com",
    "password": "miguel1234"
}

// response
// status 200 OK
{
  token: "um token jwt"
}
```

# Exemplo de Requisições de Posts
## Get Posts
```javascript
// request GET /posts Retorna todos posts
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
        "id": "uma uuid v4",
        "content": "Hoje vou estudar POO!",
        "likes": 2,
        "dislikes" 1,
        "createdAt": "2023-01-20T12:11:47:000Z"
        "updatedAt": "2023-01-20T12:11:47:000Z"
        "creator": {
            "id": "uma uuid v4",
            "name": "Fulano"
        }
    },
    {
        "id": "uma uuid v4",
        "content": "kkkkkkkkkrying",
        "likes": 0,
        "dislikes" 0,
        "createdAt": "2023-01-20T15:41:12:000Z"
        "updatedAt": "2023-01-20T15:49:55:000Z"
        "creator": {
            "id": "uma uuid v4",
            "name": "Ciclana"
        }
    }
]
```
## Create Post
```javascript
// request POST /posts Cria novo post
// headers.authorization = "token jwt"
// body JSON
{
    "content": "vamo pra cima!"
}

// response
// status 201 CREATED
```
## Edit Post
```javascript
// request PUT /posts/:id Edita conteudo do post
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Partiu happy hour lá no point de sempre!"
}

// response
// status 200 OK
```

## Delete Post
```javascript
// request DELETE /posts/:id Deleta post
// headers.authorization = "token jwt"

// response
// status 200 OK
```
# Exemplo de Requisições de Like/Dislike
## LikeDislike
### Like (funcionalidade 1)
```javascript
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
```
### Dislike (funcionalidade 2)
```javascript
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
```

## Documentação do Postman
[Link da API no POSTMAN](https://documenter.getpostman.com/view/26594213/2s9Y5YS2qM)

# Criado por:
## Miguel Alves
![alt text](https://uploaddeimagens.com.br/images/004/544/373/original/imagem_pq.png?1689299009  "Logo Title Text 1" )

[Linkedin](https://www.linkedin.com/in/miguelbitz/)


