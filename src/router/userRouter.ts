import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import { UserDatabase } from "../database/UserDatabase"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

userRouter.get("/", userController.getUsers)
userRouter.get("/:id", userController.getUserById)
userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.put("/editNickname/:id", userController.editUserNickname)
userRouter.put("/editEmail/:id", userController.editUserEmail)
userRouter.put("/editPassword/:id", userController.editUserPassword)
userRouter.delete("/delete/:id", userController.deleteUser)