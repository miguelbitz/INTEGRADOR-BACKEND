import { UserBusiness } from "../../../src/business/UserBusiness"
import { EditUserNicknameSchema } from "../../../src/dtos/users/editUserNickname.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando editUserNickname", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve editar nickname", async () => {
        const input = EditUserNicknameSchema.parse({
            id: "id-mock-miguel",
            newNickname: "miguelbitz-new",
            token: "token-mock-miguel"
        })

        const output = await userBusiness.editUserNickname(input)

        expect(output).toEqual({
            "message": "Nickname editado com sucesso",
            "newNickname": "miguelbitz-new"
        })
    })

    test("user nao encontrado", async () => {
        expect.assertions(2)

        try {
            const input = EditUserNicknameSchema.parse({
                id: "id-mock-invalido",
                newNickname: "miguelbitz-new",
                token: "token-mock-miguel"
            })

            const output = await userBusiness.editUserNickname(input)

        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("User não encontrado")
            }
        }
    })

    test("token invalido", async () => {
        expect.assertions(2)

        try {

            const input = EditUserNicknameSchema.parse({
                id: "id-mock-miguel",
                newNickname: "miguelbitz-new",
                token: "token-mock-invalido"
            })

            const output = await userBusiness.editUserNickname(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Token inválido")
            }
        }
    })
})