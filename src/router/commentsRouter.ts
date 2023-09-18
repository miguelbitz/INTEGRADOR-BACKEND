import express from "express";
import { CommentsBusiness } from "../business/CommentsBusiness";
import { CommentsController } from "../controller/CommentsController";
import { CommentsDatabase } from "../database/CommentsDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const commentsRouter = express.Router();

const commentsController = new CommentsController(
  new CommentsBusiness(
    new CommentsDatabase(),
    new UserDatabase(),
    new IdGenerator(),
    new TokenManager()
  )
);

commentsRouter.get("/", commentsController.getCommentsFromPost);
commentsRouter.get("/:id", commentsController.getCommentsById);
commentsRouter.post("/", commentsController.createComment);
commentsRouter.put("/:commentId", commentsController.editComment);
commentsRouter.delete("/:commentId", commentsController.deleteComment);

export default commentsRouter;
