import { z } from "zod";

export interface EditCommentInputDTO {
    commentId: string;
    newContent: string;
    token: string;
}

export interface EditCommentOutputDTO {
    message: string;
    newContent: string;
}

export const EditCommentSchema = z.object({
    commentId: z.string().nonempty(),
    newContent: z.string().nonempty(),
    token: z.string().nonempty()
});
