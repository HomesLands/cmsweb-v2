import * as z from 'zod'

export const createCompanySchema = z.object({
  name: z.string().min(1, 'Tên công ty không hợp lệ')
})

export const updateCompanySchema = z.object({
  slug: z.string().min(1, 'Slug không hợp lệ'),
  name: z.string().min(1, 'Tên công ty không hợp lệ')
})

export type TCreateCompanySchema = z.infer<typeof createCompanySchema>
export type TUpdateCompanySchema = z.infer<typeof updateCompanySchema>
