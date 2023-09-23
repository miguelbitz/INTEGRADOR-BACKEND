import { BadRequestError } from "../../../src/errors/BadRequestError"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { LikeDislikeSchema } from "../../../src/dtos/likeDislike/likeDislike.dto"
import { LikeDislikeDatabaseMock } from "../../mocks/LikeDislikeDatabaseMock"
import { LikeDislikeBusiness } from "../../../src/business/LikeDislikeBusiness"

describe("Testando likeDislike", () => {
    const likeDislikeBusiness = new LikeDislikeBusiness(
        new LikeDislikeDatabaseMock(),
        new TokenManagerMock()
    )

    test("deve dar like/deslike no post", async () => {
        expect.assertions(1)
        const input = LikeDislikeSchema.parse({
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
            const input = LikeDislikeSchema.parse({
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
            const input = LikeDislikeSchema.parse({
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

            const input = LikeDislikeSchema.parse({
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

    test("deve dar like/deslike no comment", async () => {
        expect.assertions(1)
        const input = LikeDislikeSchema.parse({
            id: "id-comment-mock-miguel",
            like: true,
            token: "token-mock-gica"
        })

        const output = await likeDislikeBusiness.likeDislikeComment(input)

        expect(output).toEqual({
            message: "Interação registrada com sucesso"
        })
    })

    test("comment nao encontrado", async () => {
        expect.assertions(2)

        try {
            const input = LikeDislikeSchema.parse({
                id: "id-comment-mock-invalido",
                like: true,
                token: "token-mock-gica"
            })

            await likeDislikeBusiness.likeDislikeComment(input)

        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("Comentario não encontrado")
            }
        }
    })

    test("deve retornar erro caso payload_id nao seja igual user_id", async () => {
        expect.assertions(1)

        expect(async () => {
            const input = LikeDislikeSchema.parse({
                id: "id-comment-mock-miguel",
                like: true,
                token: "token-mock-miguel"
            })

            await likeDislikeBusiness.likeDislikeComment(input)
        }).rejects.toThrowError(new BadRequestError("Você não pode interagir com seu próprio comentario"))
    })

    test("token invalido", async () => {
        expect.assertions(2)

        try {

            const input = LikeDislikeSchema.parse({
                id: "id-comment-mock-miguel",
                like: true,
                token: "token-mock-invalido"
            })

            await likeDislikeBusiness.likeDislikeComment(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Token inválido")
            }
        }
    })
})