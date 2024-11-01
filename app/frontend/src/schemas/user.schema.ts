import * as z from 'zod'

export const createUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  fullname: z.string().min(1)
  // email: z.string().min(1)
})

//Personal Account Info
export const updateAccountInfoSchema = z.object({
  fullname: z.string().min(1, 'Họ và tên không hợp lệ'),
  address: z.string().min(1, 'Địa chỉ không hợp lệ'),
  phoneNumber: z.string().min(1, 'Số điện thoại không hợp lệ'),
  dob: z.string().min(1, 'Ngày sinh không hợp lệ'),
  gender: z.string().min(1, 'Giới tính không hợp lệ')
})

export const updateUsernameSchema = z.object({
  slug: z.string().min(1),
  username: z.string().min(1, 'Tên đăng nhập không hợp lệ')
})

export type TCreateUserSchema = z.infer<typeof createUserSchema>
export type TUpdateAccountInfoSchema = z.infer<typeof updateAccountInfoSchema>
export type TUpdateUsernameSchema = z.infer<typeof updateUsernameSchema>
