import { PostBusiness } from "../../../src/business/PostBusiness"
import { CreatePostSchema } from "../../../src/dtos/posts/createPost.dto"
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

  describe("Testando createPost", () => {
    test("deve criar um post", async () => {
      expect.assertions(1)
      const input = CreatePostSchema.parse({
        content: "new content",
        token: "token-mock-miguel"
      });

      const output = await postBusiness.createPost(input);

      expect(output).toEqual({
        message: "Post publicado com sucesso",
        content: "new content"
      })

    });

    test("token invalido", async () => {
      expect.assertions(2);

      try {
        const input = CreatePostSchema.parse({
          content: "new content",
          token: "token-invalido"
        });

        const output = await postBusiness.createPost(input);

      } catch (error) {
        if (error instanceof BadRequestError) {
          expect(error.statusCode).toBe(400);
          expect(error.message).toBe("Token inválido");
        }
      }
    });
  });
})