import {z} from 'zod'


export const usenameValidation = z.string()
.min(2, "Username must be atlest 2 character")
.max(20, "Username must be no more than 20 character")
.regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")

export const signUpSchema = z.object({
  username: usenameValidation,
  email: z.string().email({message: "Invalid email address"}),
  password: z.string().min(6, {message: "password must be at least 6 charecter"})
})