import { BadRequestError } from "../../../src/errors/BadRequestError"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { LikeDislikePostSchema } from "../../../src/dtos/posts/likeDislikePost.dto"
import { LikeDislikeDatabaseMock } from "../../mocks/LikeDislikeDatabaseMock"
import { LikeDislikeBusiness } from "../../../src/business/LikeDislikeBusiness"

describe("Testando likeDislikePost", () => {
    const likeDislikeBusiness = new LikeDislikeBusiness(
        new LikeDislikeDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve dar like/deslike no post", async () => {
        expect.assertions(1)
        const input = LikeDislikePostSchema.parse({
            id: "id-post-mock-miguel",
            like: true,
            token: "token-mock-gica"
        })

        const output = await likeDislikeBusiness.likeDislikePost(input)

        expect(output).toEqual({
            message: "Interação registrada com sucesso"
        })
    })

    test("post nao encontrado", async () => {
        expect.assertions(2)

        try {
            const input = LikeDislikePostSchema.parse({
                id: "id-post-mock-invalido",
                like: true,
                token: "token-mock-gica"
            })

            await likeDislikeBusiness.likeDislikePost(input)

        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("Post não encontrado")
            }
        }
    })

    test("deve retornar erro caso payload_id nao seja igual creator_id", async () => {
        expect.assertions(1)

        expect(async () => {
            const input = LikeDislikePostSchema.parse({
                id: "id-post-mock-miguel",
                like: true,
                token: "token-mock-miguel"
            })

            await likeDislikeBusiness.likeDislikePost(input)
        }).rejects.toThrowError(new BadRequestError("Você não pode interagir com seu próprio post"))
    })

    test("token invalido", async () => {
        expect.assertions(2)

        try {

            const input = LikeDislikePostSchema.parse({
                id: "id-post-mock-miguel",
                like: true,
                token: "token-mock-invalido"
            })

            await likeDislikeBusiness.likeDislikePost(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Token inválido")
            }
        }
    })
})