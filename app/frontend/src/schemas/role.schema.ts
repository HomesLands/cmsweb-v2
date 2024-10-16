import * as z from 'zod'

export const createRoleSchema = z.object({
  nameNormalize: z.string().min(1, 'Mã yêu cầu không hợp lệ'),
  description: z.string().min(1, 'Mô tả không hợp lệ'),
  nameDisplay: z.string().min(1, 'Tên hiển thị không hợp lệ')
})

export const updateRoleSchema = createRoleSchema.extend({
  slug: z.string().min(1)
})

export type TCreateRoleSchema = z.infer<typeof createRoleSchema>
export type TUpdateRoleSchema = z.infer<typeof updateRoleSchema>
