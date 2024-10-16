import * as z from 'zod'

import { USERNAME_REGEX } from '@/constants'

export const loginSChema = z.object({
  username: z.string().regex(USERNAME_REGEX, 'Only letters allowed'),
  password: z.string()
})

export const registerSchema = z.object({
  fullname: z
    .string()
    .min(1, 'Full name is required')
    .max(30, 'Max 30 characters')
    .regex(USERNAME_REGEX, 'Only letters allowed'),
  username: z.string().min(1),
  password: z.string().min(1)
})

export type TRegisterSchema = z.infer<typeof registerSchema>
