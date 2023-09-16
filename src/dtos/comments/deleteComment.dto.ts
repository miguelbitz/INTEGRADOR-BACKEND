import { z } from "zod";

export interface DeleteCommentInputDTO {
    commentId: string,
    token: string
}

export interface DeleteCommentOutputDTO {
    message: string
}

export const DeleteCommentSchema = z.object({
    commentId: z.string().nonempty(),
    token: z.string().nonempty()
});
