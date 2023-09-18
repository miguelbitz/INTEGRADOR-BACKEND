import z from "zod"
import { CommentsDetails } from "../../models/Comments"

export interface GetCommentsByIdInputDTO {
    id: string,
    token: string
}

export type GetCommentsByIdOutputDTO = CommentsDetails[]

export const GetCommentsByIdSchema = z.object({
    id: z.string().min(1).optional(),
    token: z.string().min(1)
}).transform(data => data as GetCommentsByIdInputDTO)