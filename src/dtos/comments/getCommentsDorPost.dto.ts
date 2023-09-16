import z from "zod"

export interface GetCommentsForPostInputDTO {
    postId: string,
    token: string
}

export interface GetCommentsForPostOutputDTO {
    postId: string,
    content: string
}

export const GetCommentsForPostSchema = z.object({
    postId: z.string().nonempty(),
    token: z.string().nonempty()
})