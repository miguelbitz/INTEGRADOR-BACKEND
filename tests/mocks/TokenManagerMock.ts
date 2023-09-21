import { TokenPayload, USER_ROLES } from '../../src/models/User'

export class TokenManagerMock {
  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
      // signup de nova conta
      return "token-mock"

    } else if (payload.id === "id-mock-gica") {
      // login de gica (conta normal)
      return "token-mock-gica" 

    } else {
      // login de miguel (conta admin)
      return "token-mock-miguel"
    }
  }

  public getPayload = (token: string): TokenPayload | null => {
    if (token === "token-mock-gica") {
      return {
        id: "id-mock-gica",
        nickname: "gicameine",
        role: USER_ROLES.NORMAL
      }

    } else if (token === "token-mock-miguel") {
      return {
        id: "id-mock-miguel",
        nickname: "miguelbitz",
        role: USER_ROLES.ADMIN
      }

    } else {
      return null
    }
  }
}