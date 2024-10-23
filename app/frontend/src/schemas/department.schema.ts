import * as z from 'zod'

export const createDepartmentSchema = z.object({
  nameNormalize: z.string().min(1, 'Tên đơn vị không hợp lệ'),
  description: z.string().min(1, 'Mô tả không hợp lệ'),
  site: z.string().min(1, 'Slug địa điểm không hợp lệ'), //site slug
  siteName: z.string().min(1, 'Tên địa điểm không hợp lệ')
})

export const updateDepartmentSchema = z.object({
  slug: z.string().min(1, 'Slug đơn vị không hợp lệ'),
  nameNormalize: z.string().min(1, 'Tên đơn vị không hợp lệ'),
  description: z.string().min(1, 'Mô tả không hợp lệ'),
  site: z.string().min(1, 'Slug địa điểm không hợp lệ'), //site slug
  siteName: z.string().min(1, 'Tên địa điểm không hợp lệ')
})

export type TCreateDepartmentSchema = z.infer<typeof createDepartmentSchema>
export type TUpdateDepartmentSchema = z.infer<typeof updateDepartmentSchema>
