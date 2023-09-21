import { UserBusiness } from "../../../src/business/UserBusiness"
import { EditUserEmailSchema } from "../../../src/dtos/users/editUserEmail.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando editUserEmail", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve editar email", async () => {
        const input = EditUserEmailSchema.parse({
            id: "id-mock-miguel",
            newEmail: "miguel2@gmail.com",
            token: "token-mock-miguel"
        })

        const output = await userBusiness.editUserEmail(input)

        expect(output).toEqual({
            "message": "Email editado com sucesso",
            "newEmail": "miguel2@gmail.com"
        })
    })

    test("user nao encontrado", async () => {
        expect.assertions(2)

        try {
            const input = EditUserEmailSchema.parse({
                id: "id-mock-invalido",
                newEmail: "miguel2@gmail.com",
                token: "token-mock-miguel"
            })

            const output = await userBusiness.editUserEmail(input)

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

            const input = EditUserEmailSchema.parse({
                id: "id-mock-miguel",
                newEmail: "miguelbitz-new",
                token: "token-mock-invalido"
            })

            const output = await userBusiness.editUserEmail(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Token inválido")
            }
        }
    })
    
    /* test("sem permissao para editar", async () => {
        expect.assertions(2)

        try {
            const input = EditUserEmailSchema.parse({
                id: "id-mock-invalido",
                newEmail: "miguel@gmail.com",
                token: "token-mock-miguel"
            })

            const output = await userBusiness.editUserEmail(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Você não tem permissão para editar este user")
            }
        }
    }) */
})