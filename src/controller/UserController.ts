import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { GetUsersSchema } from "../dtos/users/getUsers.dto"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"
import { LoginSchema } from "../dtos/users/login.dto"
import { SignupSchema } from "../dtos/users/signup.dto"
import { GetUserByIdSchema } from "../dtos/users/getUsersById.dto"
import { DeleteUserSchema } from "../dtos/users/deleteUsers.dto"
import { EditUserNicknameSchema} from "../dtos/users/editUserNickname.dto"
import { EditUserPasswordSchema } from "../dtos/users/editUserPassword.dto"
import { EditUserEmailSchema } from "../dtos/users/editUserEmail.dto"

export class UserController {
  constructor(
    private userBusiness: UserBusiness
  ) { }

  public getUsers = async (req: Request, res: Response) => {
    try {
      const input = GetUsersSchema.parse({
        q: req.query.q,
        token: req.headers.authorization
      })

      const output = await this.userBusiness.getUsers(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public signup = async (req: Request, res: Response) => {
    try {
      const input = SignupSchema.parse({
        //id: req.body.id,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password
      })

      const output = await this.userBusiness.signup(input)

      res.status(201).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public login = async (req: Request, res: Response) => {
    try {
      const input = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password
      })

      const output = await this.userBusiness.login(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public editUserNickname = async (req: Request, res: Response) => {
    try {

      const input = EditUserNicknameSchema.parse({
        id: req.params.id,
        newNickname: req.body.nickname as string | undefined,
        token: req.headers.authorization
      })

      const output = await this.userBusiness.editUserNickname(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public editUserEmail = async (req: Request, res: Response) => {
    try {

      const input = EditUserEmailSchema.parse({
        id: req.params.id,
        newEmail: req.body.email as string | undefined,
        token: req.headers.authorization
      })

      const output = await this.userBusiness.editUserEmail(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public editUserPassword = async (req: Request, res: Response) => {
    try {

      const input = EditUserPasswordSchema.parse({
        id: req.params.id,
        newPassword: req.body.password as string | undefined,
        token: req.headers.authorization
      })

      const output = await this.userBusiness.editUserPassword(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const input = DeleteUserSchema.parse({
        idToDelete: req.params.id,
        token: req.headers.authorization
      })

      const output = await this.userBusiness.deleteUser(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public getUserById = async (req: Request, res: Response) => {
    try {
      const input = GetUserByIdSchema.parse({
        id: req.params.id,
        token: req.headers.authorization
      })

      const output = await this.userBusiness.getUserById(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}