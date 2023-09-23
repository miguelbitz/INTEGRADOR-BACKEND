import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { CommentsBusiness } from "../../../src/business/CommentsBusiness"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { GetCommentsByIdSchema } from "../../../src/dtos/comments/getCommentsById.dto"
import { NotFoundError } from "../../../src/errors/NotFoundError"

describe("Testando getCommentsById", () => {
    const commentsBusiness = new CommentsBusiness(
        new CommentsDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve retornar os comentarios do post pelo ID", async () => {
        expect.assertions(2)

        const input = GetCommentsByIdSchema.parse({
            id: "id-comment-mock-miguel",
            token: "token-mock-miguel"
        })

        const output = await commentsBusiness.getCommentsById(input)

        expect(output).toHaveLength(1)
        expect(output).toStrictEqual([{
            id: "id-comment-mock-miguel",
            content: "content-comment",
            likes: 0,
            dislikes: 0,
            createdAt: expect.any(String),
            user: {
                id: "id-mock-miguel",
                nickname: "miguelbitz"
            }
        }])
    })

    test("comment nao encontrado", async () => {
        expect.assertions(2)

        try {
            const input = GetCommentsByIdSchema.parse({
                id: "id-comment-mock-invalido",
                token: "token-mock-miguel"
            })

            const output = await commentsBusiness.getCommentsById(input)

        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("Comentário não encontrado")
            }
        }
    })

    test("token invalido", async () => {
        expect.assertions(2)

        try {
            const input = GetCommentsByIdSchema.parse({
                id: "id-comment-mock-miguel",
                token: "token-mock-invalido"
            })

            const output = await commentsBusiness.getCommentsById(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

})