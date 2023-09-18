import z from "zod"
import { CommentsDetails } from "../../models/Comments"

export interface GetCommentsFromPostInputDTO {
    postId: string,
    token: string
}

export type GetCommentsFromPostOutputDTO = CommentsDetails[]

export const GetCommentsFromPostSchema = z.object({
    postId: z.string().min(1).optional(),
    token: z.string().min(1)
}).transform(data => data as GetCommentsFromPostInputDTO)