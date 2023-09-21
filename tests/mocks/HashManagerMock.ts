export class HashManagerMock {
    public hash = async (
      plaintext: string
    ): Promise<string> => {
      return "hash-mock"
    }

    public compare = async (
      plaintext: string,
      hash: string
    ): Promise<boolean> => {
      switch(plaintext) {
        case "gica1234":
          return hash === "hash-mock-gica"

        case "miguel1234":
          return hash === "hash-mock-miguel"
          
        default:
          return false
      }
    }
}