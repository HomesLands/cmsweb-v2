import * as z from 'zod'

export const createCompanySchema = z.object({
  name: z.string().min(1, 'Tên công ty không hợp lệ')
})

export type TCreateCompanySchema = z.infer<typeof createCompanySchema>
