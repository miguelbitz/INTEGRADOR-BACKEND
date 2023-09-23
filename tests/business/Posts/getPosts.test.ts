import { PostBusiness } from "../../../src/business/PostBusiness"
import { GetPostsSchema } from "../../../src/dtos/posts/getPosts.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando getPosts", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve retornar uma lista de posts", async () => {
    expect.assertions(2)
    const input = GetPostsSchema.parse({
      q: "id-post-mock-miguel",
      token: "token-mock-miguel"
    })

    const output = await postBusiness.getPosts(input)

    expect(output).toHaveLength(1)
    expect(output).toStrictEqual([{
      id: "id-post-mock-miguel",
      content: "content-miguel",
      likes: 0,
      dislikes: 0,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      creator: {
        id: "id-mock-miguel",
        nickname: "miguelbitz"
      }
    }])
  })

  test("token invalido", async () => {
    expect.assertions(2)

    try {
      const input = GetPostsSchema.parse({
        q: "id-post-mock-miguel",
        token: "token-invalido"
      })

      const output = await postBusiness.getPosts(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.statusCode).toBe(400)
        expect(error.message).toBe("Token inválido")
      }
    }
  })
})
