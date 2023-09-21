import { UserBusiness } from "../../../src/business/UserBusiness"
import { GetUserByIdSchema } from "../../../src/dtos/users/getUsersById.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { USER_ROLES } from "../../../src/models/User"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando getUserById", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("deve buscar user pelo id", async () => {
    const input = GetUserByIdSchema.parse({
      id: "id-mock-gica",
      token: "token-mock-gica"
    })

    const output = await userBusiness.getUserById(input)

    expect(output).toEqual({
      user: {
        id: "id-mock-gica",
        nickname: "gicameine",
        email: "gica@gmail.com",
        role: USER_ROLES.NORMAL,
        createdAt: expect.any(String)
        
      },
    })
  })

  test("id nao existe", async () => {
    expect.assertions(2)

    try {
      const input = GetUserByIdSchema.parse({
        id: "idnaoexiste",
        token: "token-mock-miguel"
      })

      const output = await userBusiness.getUserById(input)

    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.statusCode).toBe(404)
        expect(error.message).toBe("id não existe")
      }
    }
  })

  test("token invalido", async () => {
    expect.assertions(2)

    try {
      
      const input = GetUserByIdSchema.parse({
        id: "id-mock-miguel",
        token: "token-mock-invalido"
      })

      const output = await userBusiness.getUserById(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.statusCode).toBe(400)
        expect(error.message).toBe("token inválido")
      }
    }
  })
})