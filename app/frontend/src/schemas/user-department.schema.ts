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

export const updateUserDepartmentSchema = z.object({
  slug: z.string().min(1, 'Mã bộ phận không được để trống'),
  department: z.string().min(1, 'Bộ phận không được để trống')
})

export type TCreateUserDepartmentSchema = z.infer<typeof createUserDepartmentSchema>
export type TUpdateUserDepartmentSchema = z.infer<typeof updateUserDepartmentSchema>
