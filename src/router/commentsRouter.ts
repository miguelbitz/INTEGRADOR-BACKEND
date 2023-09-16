import express from "express";
import { CommentsBusiness } from "../business/CommentsBusiness";
import { CommentsController } from "../controller/CommentsController";
import { CommentsDatabase } from "../database/CommentsDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const commentsRouter = express.Router();

const commentsController = new CommentsController(
  new CommentsBusiness(
    new CommentsDatabase(),
    new IdGenerator(),
    new TokenManager()
  )
);

commentsRouter.get("/post/:id/comments", commentsController.getCommentsForPost);
//commentsRouter.post("/create", commentsController.createComment);
//commentsRouter.put("/:commentId/edit", commentsController.editComment);
//commentsRouter.delete("/:commentId/delete", commentsController.deleteComment);

export default commentsRouter;
