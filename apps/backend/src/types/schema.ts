import {z} from "zod";


export const signupSchema = z.object({
    username: z.string().min(4),
    email: z.email(),
    password: z.string().min(4)
})



export const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(4)
})