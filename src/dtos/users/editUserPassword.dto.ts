import z from "zod"

export interface EditUserPasswordInputDTO {
    id: string,
    newPassword: string,
    token: string
}

export interface EditUserPasswordOutputDTO {
    message: string
    newPassword: string
}

export const EditUserPasswordSchema = z.object({
    id: z.string().min(1),
    newPassword: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as EditUserPasswordInputDTO)