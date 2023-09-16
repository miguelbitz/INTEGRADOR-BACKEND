import express from "express"
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness"
import { LikeDislikeController } from "../controller/LikeDislikeController"
import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase"
import { TokenManager } from "../services/TokenManager"

export const likeDislikeRouter = express.Router()

const likeDislikeController = new LikeDislikeController(
    new LikeDislikeBusiness(
        new LikeDislikeDatabase(),
        new TokenManager()
    )
)

likeDislikeRouter.put("/:id/like", likeDislikeController.likeDislikePost)

