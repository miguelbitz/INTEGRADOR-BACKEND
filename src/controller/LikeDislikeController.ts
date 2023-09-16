import { Request, Response } from "express"
import { BaseError } from "../errors/BaseError"
import { ZodError } from "zod"
import { LikeDislikePostSchema } from "../dtos/post/likeDislikePost.dto"
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness"


export class LikeDislikeController {
  constructor(
    private likeDislikeBusiness: LikeDislikeBusiness
  ) { }

  public likeDislikePost = async (req: Request, res: Response) => {
    try {
      const input = LikeDislikePostSchema.parse({
        id: req.params.id,
        like: req.body.like,
        token: req.headers.authorization
      })

      const output = await this.likeDislikeBusiness.likeDislikePost(input);

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