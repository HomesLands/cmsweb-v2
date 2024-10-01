import * as z from 'zod'

export const createRoleSchema = z.object({
  nameNormalize: z.string().min(1, 'Mã yêu cầu không hợp lệ'),
  description: z.string().min(1, 'Tên người yêu cầu không hợp lệ')
})

export type TCreateRoleSchema = z.infer<typeof createRoleSchema>
