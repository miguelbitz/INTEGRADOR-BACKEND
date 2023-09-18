import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { CommentsBusiness } from "../business/CommentsBusiness";
import { EditCommentSchema } from "../dtos/comments/editComment.dto";
import { DeleteCommentSchema } from "../dtos/comments/deleteComment.dto";
import { CreateCommentSchema } from "../dtos/comments/createComment.dto";
import { GetCommentsFromPostSchema } from "../dtos/comments/getCommentsFromPost.dto";
import { GetCommentsByIdSchema } from "../dtos/comments/getCommentsById.dto";

export class CommentsController {
  constructor(private commentsBusiness: CommentsBusiness) { }

  public getCommentsFromPost = async (req: Request, res: Response) => {
    try {
      const input = GetCommentsFromPostSchema.parse({
        postId: req.query.postId,
        token: req.headers.authorization,
      });

      const output = await this.commentsBusiness.getCommentsFromPost(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  }

  public getCommentsById = async (req: Request, res: Response) => {
    try {
      const input = GetCommentsByIdSchema.parse({
        id: req.params.id,
        token: req.headers.authorization,
      });

      const output = await this.commentsBusiness.getCommentsById(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  }

  public createComment = async (req: Request, res: Response) => {
    try {
      const input = CreateCommentSchema.parse({
        postId: req.query.postId,
        content: req.body.content,
        token: req.headers.authorization,
      });

      const output = await this.commentsBusiness.createComment(input);

      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  }

  public editComment = async (req: Request, res: Response) => {
    try {
      const input = EditCommentSchema.parse({
        commentId: req.params.commentId,
        newContent: req.body.newContent, 
        token: req.headers.authorization,
      });

      const output = await this.commentsBusiness.editComment(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  }


  public deleteComment = async (req: Request, res: Response) => {
    try {
      const input = DeleteCommentSchema.parse({
        commentId: req.params.commentId,
        token: req.headers.authorization,
      });

      const output = await this.commentsBusiness.deleteComment(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  }

} 
