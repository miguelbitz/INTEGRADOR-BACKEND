import { ZodError } from "zod"
import { UserBusiness } from "../../../src/business/UserBusiness"
import { SignupSchema } from "../../../src/dtos/users/signup.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"

describe("Testando signup", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("deve gerar um token ao cadastrar", async () => {
    const input = SignupSchema.parse({
      nickname: "jotinha",
      email: "jota@gmail.com",
      password: "jota1234"
    })

    const output = await userBusiness.signup(input)

    expect(output).toEqual({
      message: "Cadastro realizado com sucesso",
      token: "token-mock"
    })    
  })

  test("deve disparar erro se o name não possuir pelo menos 2 char", async () => {
    expect.assertions(1)

    try {
      const input = SignupSchema.parse({
        nickname: "",
        email: "jota@gmail.com",
        password: "jota1234"
      })
      
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.issues[0].message).toBe('String must contain at least 2 character(s)')
      }
    }
  })

  test("deve disparar erro caso e-mail já exista", async () => {
    expect.assertions(2)

    try {
      
      const input = SignupSchema.parse({
        nickname: "miguelbitz",
        email: "miguel@gmail.com",
        password: "miguel1234"
      })

      const output = await userBusiness.signup(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.statusCode).toBe(400)
        expect(error.message).toBe("e-mail já existe")
      }
    }
  })
})