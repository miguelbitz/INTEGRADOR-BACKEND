import { USER_ROLES, UserDB } from "../../src/models/User";
import { BaseDatabase } from "../../src/database/BaseDatabase";

const usersMock: UserDB[] = [
  {
    id: "id-mock-miguel",
    nickname: "miguelbitz",
    email: "miguel@gmail.com",
    password: "hash-mock-miguel", // senha = "miguel1234"
    role: USER_ROLES.ADMIN,
    created_at: new Date().toISOString()
  },
  {
    id: "id-mock-gica",
    nickname: "gicameine",
    email: "gica@gmail.com",
    password: "hash-mock-gica", // senha = "gica1234"
    role: USER_ROLES.NORMAL,
    created_at: new Date().toISOString()
  },
]

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "users"

  public async findUsers(
    q: string | undefined
  ): Promise<UserDB[]> {
    if (q) {
      return usersMock.filter(user =>
        user.nickname.toLocaleLowerCase()
          .includes(q.toLocaleLowerCase()))

    } else {
      return usersMock
    }
  }

  public async findUserById(
    id: string
  ): Promise<UserDB | undefined> {
    return usersMock.find(user => user.id === id)
  }

  public async findUserByEmail(
    email: string
  ): Promise<UserDB | undefined> {
    return usersMock.find(user => user.email === email)
  }

  public async insertUser(newUserDB: UserDB): Promise<void> {
    usersMock.push(newUserDB);
  }

  public async editUserNickname(id: string, newNickname: string): Promise<void> {
    const userIndex = usersMock.findIndex(user => user.id === id);
    if (userIndex > -1) {
      usersMock[userIndex].nickname = newNickname;
    }
  }

  public async editUserEmail(id: string, newEmail: string): Promise<void> {
    const userIndex = usersMock.findIndex(user => user.id === id);
    if (userIndex > -1) {
      usersMock[userIndex].email = newEmail;
    }
  }

  public async editUserPassword(id: string, newPassword: string): Promise<void> {
    const userIndex = usersMock.findIndex(user => user.id === id);
    if (userIndex > -1) {
      usersMock[userIndex].password = newPassword;
    }
  }

  public async deleteUser(idToDelete: string): Promise<void> {
    const userIndex = usersMock.findIndex(user => user.id === idToDelete);
    if (userIndex > -1) {
      usersMock.splice(userIndex, 1);
    }
  }
}