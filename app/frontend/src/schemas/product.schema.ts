import * as z from 'zod'

export const updateProductInfoSchema = z.object({
  code: z.string().optional(),
  slug: z.string().min(1, { message: 'Mã vật tư không được để trống' }),
  name: z.string().min(1, { message: 'Tên vật tư không được để trống' }),
  provider: z.string().min(1, { message: 'Nhà cung cấp không được để trống' }),
  unit: z.object({
    slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
    name: z.string().min(1, 'Tên đơn vị không hợp lệ')
  }),
  description: z.string().min(1, { message: 'Mô tả không được để trống' })
})

export type TUpdateProductInfoSchema = z.infer<typeof updateProductInfoSchema>
