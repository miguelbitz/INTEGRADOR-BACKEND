import { UserBusiness } from "../../../src/business/UserBusiness"
import { GetUsersSchema } from "../../../src/dtos/users/getUsers.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { USER_ROLES } from "../../../src/models/User"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando getUsers", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("deve retornar uma lista de users", async () => {
    expect.assertions(2)
    const input = GetUsersSchema.parse({
      token: "token-mock-miguel"
    })

    const output = await userBusiness.getUsers(input)

    expect(output).toHaveLength(2)
    expect(output).toContainEqual({
      id: "id-mock-miguel",
      nickname: "miguelbitz",
      email: "miguel@gmail.com",
      role: USER_ROLES.ADMIN,
      createdAt: expect.any(String)

    })
  })

  test("apenas admin pode visualizar", async () => {
    expect.assertions(2)

    try {
      
      const input = GetUsersSchema.parse({
        token: "token-mock-gica"
      })

      const output = await userBusiness.getUsers(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.statusCode).toBe(400)
        expect(error.message).toBe("somente admins podem acessar esse recurso")
      }
    }
  })

  test("token invalido", async () => {
    expect.assertions(2)

    try {
      
      const input = GetUsersSchema.parse({
        token: "token-invalido"
      })

      const output = await userBusiness.getUsers(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.statusCode).toBe(400)
        expect(error.message).toBe("token invalido")
      }
    }
  })
})