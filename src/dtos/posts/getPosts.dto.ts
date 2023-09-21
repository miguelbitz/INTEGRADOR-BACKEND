import z from "zod"
import { PostDetails } from "../../models/Post"

export interface GetPostsInputDTO {
  q: string,
  token: string
}

export type GetPostsOutputDTO = PostDetails[]

export const GetPostsSchema = z.object({
  q: z.string().min(1).optional(),
  token: z.string().min(1)
}).transform(data => data as GetPostsInputDTO)