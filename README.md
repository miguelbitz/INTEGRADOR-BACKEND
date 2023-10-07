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

### Requisições de Posts:

- /posts

### Requisições de Comentários:

- /comments

## 🚀 Endpoints

### 👥 User Endpoints

1. **Get Users**
    - Endpoint: `/users`
    - Method: GET
    - Headers: Authorization: Bearer YOUR_TOKEN
    - Response: List of all users.

2. **Signup**
    - Endpoint: `/signup`
    - Method: POST
    - Body:
      ```json
      {
        "nickname": "your_nickname",
        "email": "your_email",
        "password": "your_password"
      }
      ```

3. **Signup Admin**
    - Endpoint: `/signupAdmin`
    - Method: POST
    - Body:
      ```json
      {
        "nickname": "admin_nickname",
        "email": "admin_email",
        "password": "admin_password"
      }
      ```

4. **Login**
    - Endpoint: `/login`
    - Method: POST
    - Body:
      ```json
      {
        "email": "your_email",
        "password": "your_password"
      }
      ```

5. **Get User By ID**
    - Endpoint: `/users/:id`
    - Method: GET
    - Headers: Authorization: Bearer YOUR_TOKEN

6. **Delete User**
    - Endpoint: `/users/:id`
    - Method: DELETE
    - Headers: Authorization: Bearer YOUR_TOKEN

7. **Edit User Nickname**
    - Endpoint: `/users/:id/nickname`
    - Method: PUT
    - Headers: Authorization: Bearer YOUR_TOKEN
    - Body:
      ```json
      {
        "nickname": "new_nickname"
      }
      ```

8. **Edit User Email**
    - Endpoint: `/users/:id/email`
    - Method: PUT
    - Headers: Authorization: Bearer YOUR_TOKEN
    - Body:
      ```json
      {
        "email": "new_email"
      }
      ```

9. **Edit User Password**
    - Endpoint: `/users/:id/password`
    - Method: PUT
    - Headers: Authorization: Bearer YOUR_TOKEN
    - Body:
      ```json
      {
        "password": "new_password"
      }
      ```

### 📝 Posts Endpoints

1. **Get Posts**
    - Endpoint: `/posts`
    - Method: GET
    - Headers: Authorization: Bearer YOUR_TOKEN
    - Response: List of all posts.

2. **Create Post**
    - Endpoint: `/posts`
    - Method: POST
    - Headers: Authorization: Bearer YOUR_TOKEN
    - Body:
      ```json
      {
        "content": "post_content"
      }
      ```

3. **Edit Post**
    - Endpoint: `/posts/:id`
    - Method: PUT
    - Headers: Authorization: Bearer YOUR_TOKEN
    - Body:
      ```json
      {
        "content": "updated_content"
      }
      ```

4. **Like/Dislike Post**
    - Endpoint: `/posts/:id/likeDislike`
    - Method: POST
    - Headers: Authorization: Bearer YOUR_TOKEN
    - Body:
      ```json
      {
        "like": true
      }
      ```

5. **Delete Post**
    - Endpoint: `/posts/:id`
    - Method: DELETE
    - Headers: Authorization: Bearer YOUR_TOKEN

### 💬 Comments Endpoints

1. **Get Comments From Post**
    - Endpoint: `/posts/:id/comments`
    - Method: GET
    - Headers: Authorization: Bearer YOUR_TOKEN

2. **Get Comment By ID**
    - Endpoint: `/comments/:id`
    - Method: GET
    - Headers: Authorization: Bearer YOUR_TOKEN

3. **Create Comment On Post**
    - Endpoint: `/posts/:id/comments`
    - Method: POST
    - Headers: Authorization: Bearer YOUR_TOKEN
    - Body:
      ```json
      {
        "content": "comment_content"
      }
      ```

4. **Edit Comment**
    - Endpoint: `/comments/:id`
    - Method: PUT
    - Headers: Authorization: Bearer YOUR_TOKEN
    - Body:
      ```json
      {
        "content": "updated_comment_content"
      }
      ```

5. **Delete Comment**
    - Endpoint: `/comments/:id`
    - Method: DELETE
    - Headers: Authorization: Bearer YOUR_TOKEN

6. **Like/Dislike Comment**
    - Endpoint: `/comments/:id/likeDislike`
    - Method: POST
    - Headers: Authorization: Bearer YOUR_TOKEN
    - Body:
      ```json
      {
        "like": true
      }
      ```
      
[Repositorio Front-end](https://github.com/miguelbitz/integrador-frontend)

## Documentação do Postman

[Link da API no POSTMAN](https://documenter.getpostman.com/view/26594213/2s9YJgTLMV)

# 👤 Criado por:

## Miguel Alves

![Logo Miguel](https://uploaddeimagens.com.br/images/004/544/373/original/imagem_pq.png?1689299009)

[Linkedin](https://www.linkedin.com/in/miguelbitz/)
