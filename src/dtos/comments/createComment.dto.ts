import { z } from "zod";

export interface CreateCommentInputDTO {
    postId: string;
    content: string;
    token: string;
}

export interface CreateCommentOutputDTO {
    message: string;
    content: string;
}

export const CreateCommentSchema = z.object({
    postId: z.string().nonempty(),
    content: z.string().nonempty(),
    token: z.string().nonempty()
});
