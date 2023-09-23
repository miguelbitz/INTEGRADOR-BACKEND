import { PostBusiness } from "../../../src/business/PostBusiness"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { EditPostSchema } from "../../../src/dtos/posts/editPost.dto"
import { NotFoundError } from "../../../src/errors/NotFoundError"

describe("Testando editPost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

    test("deve editar o post", async () => {
        expect.assertions(1)
        const input = EditPostSchema.parse({
            id: "id-post-mock-miguel",
            content: "oi",
            token: "token-mock-miguel"
        })

        const output = await postBusiness.editPost(input)

        expect(output).toEqual({
            message: "Post editado com sucesso",
            content: "oi"
          })
    })

    test("post nao encontrado", async () => {
        expect.assertions(2)

        try {
            const input = EditPostSchema.parse({
                id: "id-post-mock-invalido",
                content: "oi",
                token: "token-mock-miguel"
            })

            const output = await postBusiness.editPost(input)

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

            const input = EditPostSchema.parse({
                id: "id-post-mock-miguel",
                content: "oi",
                token: "token-mock-invalido"
            })

            const output = await postBusiness.editPost(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Token inválido")
            }
        }
    })
    
})