import { ZodError } from "zod"
import { LoginSchema } from "../../../src/dtos/users/login.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { UserBusiness } from "../../../src/business/UserBusiness"
import { BadRequestError } from "../../../src/errors/BadRequestError"

describe("Testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("deve gerar um token ao logar", async () => {
    const input = LoginSchema.parse({
      email: "gica@gmail.com",
      password: "gica1234"
    })

    const output = await userBusiness.login(input)

    expect(output).toEqual({
      message: "Login realizado com sucesso",
      token: "token-mock-gica"
    })
  })

  test("email nao é uma string", () => {
    expect.assertions(3)
    try {
      const input = LoginSchema.parse({
        email: 28,
        password: "hash-mock-miguel"
      })
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe("Expected string, received number")
        expect(error.issues[0].path[0]).toBe('email')
        expect(error.issues).toEqual([
          {
            code: 'invalid_type',
            expected: 'string',
            received: 'number',
            path: ['email'],
            message: "Expected string, received number",
          }
        ])
      }
    }
  })

  test("email nao foi encontrado", () => {
    expect.assertions(1)

    expect(async () => {
      const input = LoginSchema.parse({
        email: "emailerrado@gmail.com",
        password: "hash-mock-miguel"
      })

      const output = await userBusiness.login(input)
    }).rejects.toThrowError(new NotFoundError("'email' não encontrado"))
  })

  test("senha errada", () => {
    expect.assertions(1)

    expect(async () => {
      const input = LoginSchema.parse({
        email: "miguel@gmail.com",
        password: "senha-errada"
      })

      const output = await userBusiness.login(input)
    }).rejects.toThrowError(new BadRequestError("'email' ou 'password' incorretos"))
  })
})
