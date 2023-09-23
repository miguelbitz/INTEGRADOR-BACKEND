import { PostBusiness } from "../../../src/business/PostBusiness"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { DeletePostSchema } from "../../../src/dtos/posts/deletePost.dto"

describe("Testando deletePost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve deletar post", async () => {
    const input = DeletePostSchema.parse({
      id: "id-post-mock-miguel",
      token: "token-mock-miguel"
    })

    const output = await postBusiness.deletePost(input)

    expect(output).toEqual({
      message: "Post deletado com sucesso"
    })
  })

  test("post nao encontrado", async () => {
    expect.assertions(2)

    try {
        const input = DeletePostSchema.parse({
          id: "id-post-mock-gica",
          token: "token-mock-miguel"
        })

        await postBusiness.deletePost(input)

    } catch (error) {
        if (error instanceof NotFoundError) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Post não encontrado")
        }
    }
})
  test("token invalido", async () => {
    expect.assertions(2)

    try {

      const input = DeletePostSchema.parse({
        id: "id-post-mock-miguel",
        token: "token-mock-invalido"
      })

      await postBusiness.deletePost(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.statusCode).toBe(400)
        expect(error.message).toBe("Token inválido")
      }
    }
  })
})