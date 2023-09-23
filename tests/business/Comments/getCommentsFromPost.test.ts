import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { CommentsBusiness } from "../../../src/business/CommentsBusiness"
import { GetCommentsFromPostSchema } from "../../../src/dtos/comments/getCommentsFromPost.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"

describe("Testando getCommentsFromPost", () => {
    const commentsBusiness = new CommentsBusiness(
        new CommentsDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve retornar os comentarios do post", async () => {
        expect.assertions(2)

        const input = GetCommentsFromPostSchema.parse({
            postId: "id-post-mock-miguel",
            token: "token-mock-miguel"
        })

        const output = await commentsBusiness.getCommentsFromPost(input)

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

    test("token invalido", async () => {
        expect.assertions(2)

        try {
            const input = GetCommentsFromPostSchema.parse({
                postId: "id-post-mock-miguel",
                token: "token-mock-invalido"
            })

            const output = await commentsBusiness.getCommentsFromPost(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

})