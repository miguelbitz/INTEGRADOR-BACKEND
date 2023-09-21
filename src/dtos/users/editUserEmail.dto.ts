import z from "zod"

export interface EditUserEmailInputDTO {
    id: string,
    newEmail: string,
    token: string
}

export interface EditUserEmailOutputDTO {
    message: string
    newEmail: string
}

export const EditUserEmailSchema = z.object({
    id: z.string().min(1),
    newEmail: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as EditUserEmailInputDTO)