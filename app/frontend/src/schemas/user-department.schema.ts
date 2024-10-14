import * as z from 'zod'

export const createUserDepartmentSchema = z.object({
  user: z.object({
    label: z.string().min(1),
    value: z.string().min(1)
  }),
  department: z.object({
    label: z.string().min(1),
    value: z.string().min(1)
  })
})

export type TCreateUserDepartmentSchema = z.infer<typeof createUserDepartmentSchema>
