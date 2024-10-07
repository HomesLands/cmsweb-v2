import * as z from 'zod'

export const createUserRoleSchema = z.object({
  user: z.object({
    label: z.string().min(1),
    value: z.string().min(1)
  }),
  role: z.object({
    label: z.string().min(1),
    value: z.string().min(1)
  })
})

export type TCreateUserRoleSchema = z.infer<typeof createUserRoleSchema>
