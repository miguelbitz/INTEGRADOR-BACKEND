import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { CommentsBusiness } from "../../../src/business/CommentsBusiness"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { CreateCommentSchema } from "../../../src/dtos/comments/createComment.dto"

describe("Testando createComment", () => {
    const commentsBusiness = new CommentsBusiness(
        new CommentsDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve criar um comentario", async () => {
        expect.assertions(1)
        const input = CreateCommentSchema.parse({
            postId: "id-post-mock-miguel",
            content: "new content",
            token: "token-mock-miguel"
        });

        const output = await commentsBusiness.createComment(input)

        expect(output).toEqual({
            message: "Comentário publicado com sucesso",
            content: "new content"
        })

    });
    
    test("token invalido", async () => {
        expect.assertions(2)

        try {
            const input = CreateCommentSchema.parse({
                postId: "id-post-mock-miguel",
                content: "new content",
                token: "token-mock-invalido"
            })

            await commentsBusiness.createComment(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

})