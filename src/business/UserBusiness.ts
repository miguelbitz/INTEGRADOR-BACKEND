import { UserDatabase } from "../database/UserDatabase"
import { DeleteUserInputDTO, DeleteUserOutputDTO } from "../dtos/users/deleteUsers.dto"
import { EditUserEmailInputDTO, EditUserEmailOutputDTO } from "../dtos/users/editUserEmail.dto"
import { EditUserNicknameInputDTO, EditUserNicknameOutputDTO} from "../dtos/users/editUserNickname.dto"
import { EditUserPasswordInputDTO, EditUserPasswordOutputDTO } from "../dtos/users/editUserPassword.dto"
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/users/getUsers.dto"
import { GetUserByIdInputDTO, GetUserByIdOutputDTO } from "../dtos/users/getUsersById.dto"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/users/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/users/signup.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { USER_ROLES, User, TokenPayload } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager} from "../services/TokenManager"

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) { }

  public getUsers = async (
    input: GetUsersInputDTO
  ): Promise<GetUsersOutputDTO> => {
    const { q, token } = input

    const payload = this.tokenManager.getPayload(token)

    if(payload === null){
      throw new BadRequestError("token invalido")
    }

    if(payload.role !== USER_ROLES.ADMIN){
      throw new BadRequestError("somente admins podem acessar esse recurso")
    }

    const usersDB = await this.userDatabase.findUsers(q)

    const users = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.nickname,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
      )

      return user.toBusinessModel()
    })

    const output: GetUsersOutputDTO = users

    return output
  }

  public getUserById = async (
    input: GetUserByIdInputDTO
  ): Promise<GetUserByIdOutputDTO> => {
    const { id, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
        throw new BadRequestError("token inválido")
    } 

    const userDB = await this.userDatabase.findUserById(id)

    if (!userDB) {
      throw new NotFoundError("id não existe")
    }

    const user = new User(
      userDB.id,
      userDB.nickname,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    )

    const output: GetUserByIdOutputDTO = {
      user: user.toBusinessModel()
    }

    return output
  }

  public signup = async (
    input: SignupInputDTO
  ): Promise<SignupOutputDTO> => {
    const { nickname, email, password } = input

    const isEmailRegistered = await this.userDatabase.findUserByEmail(email)

    if (isEmailRegistered) {
      throw new BadRequestError("e-mail já existe")
    }

    const id = this.idGenerator.generate()

    const hashedPassword = await this.hashManager.hash(password)

    const newUser = new User(
      id,
      nickname,
      email,
      hashedPassword,
      USER_ROLES.NORMAL,
      new Date().toISOString()
    )

    const newUserDB = newUser.toDBModel()
    await this.userDatabase.insertUser(newUserDB)

    const tokenPayload: TokenPayload = {
      id: newUser.getId(),
      nickname: newUser.getNickname(),
      role: newUser.getRole()
    }

    const token = this.tokenManager.createToken(tokenPayload)

    const output: SignupOutputDTO = {
      message: "Cadastro realizado com sucesso",
      token
    }

    return output
  }

  public login = async (
    input: LoginInputDTO
  ): Promise<LoginOutputDTO> => {
    const { email, password } = input

    const userDB = await this.userDatabase.findUserByEmail(email)

    if (!userDB) {
      throw new NotFoundError("'email' não encontrado")
    }
    
    const hashedPassword = userDB.password

    const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

    if (!isPasswordCorrect) {
      throw new BadRequestError("'email' ou 'password' incorretos")
    }

    const tokenPayload: TokenPayload = {
      id: userDB.id,
      nickname:  userDB.nickname,
      role:  userDB.role
    }

    const token = this.tokenManager.createToken(tokenPayload)

    const output: LoginOutputDTO = {
      message: "Login realizado com sucesso",
      token
    }

    return output
  }

  public editUserNickname = async (
    input: EditUserNicknameInputDTO
  ): Promise<EditUserNicknameOutputDTO> => {
    const { id, newNickname, token } = input

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const userDB = await this.userDatabase.findUserById(id);

    if (!userDB) {
      throw new NotFoundError("User não encontrado");
    }

    if (userDB.id !== payload.id) {
      throw new BadRequestError("Você não tem permissão para editar este user");
    }

    await this.userDatabase.editUserNickname(id, newNickname)

    const output: EditUserNicknameOutputDTO = {
      message: "Nickname editado com sucesso",
      newNickname: newNickname
    }

    return output;
  }

  public editUserEmail = async (
    input: EditUserEmailInputDTO
  ): Promise<EditUserEmailOutputDTO> => {
    const { id, newEmail, token } = input

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const userDB = await this.userDatabase.findUserById(id);

    if (!userDB) {
      throw new NotFoundError("User não encontrado");
    }

    if (userDB.id !== payload.id) {
      throw new BadRequestError("Você não tem permissão para editar este user");
    }

    await this.userDatabase.editUserEmail(id, newEmail)

    const output: EditUserEmailOutputDTO = {
      message: "Email editado com sucesso",
      newEmail: newEmail
    }

    return output;
  }

  public editUserPassword = async (
    input: EditUserPasswordInputDTO
  ): Promise<EditUserPasswordOutputDTO> => {
    const { id, newPassword, token } = input

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const userDB = await this.userDatabase.findUserById(id);

    if (!userDB) {
      throw new NotFoundError("User não encontrado");
    }

    if (userDB.id !== payload.id) {
      throw new BadRequestError("Você não tem permissão para editar este user");
    }

    await this.userDatabase.editUserPassword(id, newPassword)

    const output: EditUserPasswordOutputDTO = {
      message: "Senha editada com sucesso",
      newPassword: newPassword
    }

    return output;
  }

  public deleteUser = async (
    input: DeleteUserInputDTO
  ): Promise<DeleteUserOutputDTO> => {
    const { idToDelete, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
        throw new BadRequestError("token inválido")
    }

    if (payload.id !== idToDelete) {
      throw new BadRequestError(
          "somente quem criou a conta pode deletá-la"
      )
    }

    await this.userDatabase.deleteUser(idToDelete)

    const output: DeleteUserOutputDTO = {
      message: "Deleção realizada com sucesso"
    }

    return output
  }

  
}