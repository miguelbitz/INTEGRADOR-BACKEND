import { UserBusiness } from "../../../src/business/UserBusiness"
import { EditUserPasswordSchema } from "../../../src/dtos/users/editUserPassword.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando editUserPassword", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve editar password", async () => {
        expect.assertions(1)
        const input = EditUserPasswordSchema.parse({
            id: "id-mock-miguel",
            newPassword: "mig1234",
            token: "token-mock-miguel"
        })

        const output = await userBusiness.editUserPassword(input)

        expect(output).toEqual({
            "message": "Senha editada com sucesso",
            "newPassword": "mig1234"
        })
    })

    test("user nao encontrado", async () => {
        expect.assertions(2)

        try {
            const input = EditUserPasswordSchema.parse({
                id: "id-mock-invalido",
                newPassword: "mig1234",
                token: "token-mock-miguel"
            })

            const output = await userBusiness.editUserPassword(input)

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

            const input = EditUserPasswordSchema.parse({
                id: "id-mock-miguel",
                newPassword: "miguelbitz-new",
                token: "token-mock-invalido"
            })

            const output = await userBusiness.editUserPassword(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Token inválido")
            }
        }
    })
})