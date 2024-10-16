import * as z from 'zod'

export const createUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  fullname: z.string().min(1)
  // email: z.string().min(1)
})

export type TCreateUserSchema = z.infer<typeof createUserSchema>
