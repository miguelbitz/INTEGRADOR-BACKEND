import z from "zod"

export interface LikeDislikeInputDTO {
  id: string,
  like: boolean,
  token: string
}

export interface LikeDislikeOutputDTO {
  message: string
}

export const LikeDislikeSchema = z.object({
  id: z.string().min(1),
  like: z.boolean(),
  token: z.string().min(1)
}).transform(data => data as LikeDislikeInputDTO)