import z from "zod"

export interface LikeDislikePostInputDTO {
  id: string,
  like: boolean,
  token: string
}

export interface LikeDislikePostOutputDTO {
  message: string
}

export const LikeDislikePostSchema = z.object({
  id: z.string().min(1),
  like: z.boolean(),
  token: z.string().min(1)
}).transform(data => data as LikeDislikePostInputDTO)