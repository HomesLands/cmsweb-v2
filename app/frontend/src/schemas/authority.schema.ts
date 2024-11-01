import * as z from 'zod'

export const createAuthoritySchema = z.object({
  nameNormalize: z.string().min(1, 'Mã yêu cầu không hợp lệ'),
  description: z.string().min(1, 'Tên người yêu cầu không hợp lệ'),
  nameDisplay: z.string().min(1, 'Tên hiển thị không hợp lệ')
})

export const updateAuthoritySchema = z.object({
  slug: z.string().min(1, 'Mã yêu cầu không hợp lệ'),
  nameNormalize: z.string().min(1, 'Mã yêu cầu không hợp lệ'),
  description: z.string().min(1, 'Tên người yêu cầu không hợp lệ'),
  nameDisplay: z.string().min(1, 'Tên hiển thị không hợp lệ')
})

export type TCreateAuthoritySchema = z.infer<typeof createAuthoritySchema>
export type TUpdateAuthoritySchema = z.infer<typeof updateAuthoritySchema>
