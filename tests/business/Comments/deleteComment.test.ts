import { CommentsBusiness } from "../../../src/business/CommentsBusiness"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { DeletePostSchema } from "../../../src/dtos/posts/deletePost.dto"
import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { DeleteCommentSchema } from "../../../src/dtos/comments/deleteComment.dto"

describe("Testando deleteComment", () => {
    const commentsBusiness = new CommentsBusiness(
        new CommentsDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve deletar post", async () => {
        const input = DeleteCommentSchema.parse({
            commentId: "id-comment-mock-miguel",
            token: "token-mock-miguel"
        })

        const output = await commentsBusiness.deleteComment(input)

        expect(output).toEqual({
            message: "Comentário excluído com sucesso"
        })
    })

    test("post nao encontrado", async () => {
        expect.assertions(2)

        try {
            const input = DeleteCommentSchema.parse({
                commentId: "id-comment-mock-invalido",
                token: "token-mock-miguel"
            })

            await commentsBusiness.deleteComment(input)

        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("Comentario não encontrado")
            }
        }
    })
    test("token invalido", async () => {
        expect.assertions(2)

        try {

            const input = DeleteCommentSchema.parse({
                commentId: "id-comment-mock-miguel",
                token: "token-mock-invalido"
            })

            await commentsBusiness.deleteComment(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Token inválido")
            }
        }
    })
})