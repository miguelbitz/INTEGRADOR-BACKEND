import z from "zod"

export interface EditUserNicknameInputDTO {
    id: string,
    newNickname: string,
    token: string
}

export interface EditUserNicknameOutputDTO {
    message: string
    newNickname: string
}

export const EditUserNicknameSchema = z.object({
    id: z.string().min(1),
    newNickname: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as EditUserNicknameInputDTO)