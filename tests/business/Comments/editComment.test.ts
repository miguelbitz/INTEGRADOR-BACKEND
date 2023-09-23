import { CommentsBusiness } from "../../../src/business/CommentsBusiness"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { EditPostSchema } from "../../../src/dtos/posts/editPost.dto"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { EditCommentSchema } from "../../../src/dtos/comments/editComment.dto"

describe("Testando editComment", () => {
    const commentsBusiness = new CommentsBusiness(
        new CommentsDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve editar o comentario", async () => {
        expect.assertions(1)
        const input = EditCommentSchema.parse({
            commentId: "id-comment-mock-miguel",
            newContent: "new content edit",
            token: "token-mock-miguel"
        })

        const output = await commentsBusiness.editComment(input)

        expect(output).toEqual({
            message: "Comentário editado com sucesso",
            newContent: "new content edit",
        })
    })

    test("post nao encontrado", async () => {
        expect.assertions(2)

        try {
            const input = EditCommentSchema.parse({
                commentId: "id-comment-mock-invalido",
                newContent: "new content edit",
                token: "token-mock-miguel"
            })

            const output = await commentsBusiness.editComment(input)

        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("Commentario não encontrado")
            }
        }
    })

    test("token invalido", async () => {
        expect.assertions(2)

        try {

            const input = EditCommentSchema.parse({
                commentId: "id-comment-mock-miguel",
                newContent: "new content edit",
                token: "token-mock-invalido"
            })

            const output = await commentsBusiness.editComment(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

})