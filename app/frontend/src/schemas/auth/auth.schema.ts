import * as z from 'zod'

import {USERNAME_REGEX, PASSWORD_REGEX } from '@/constants/regex'

const LoginSChema = z.object({
  username: z.string().regex(USERNAME_REGEX, 'Only letters allowed'),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      'Password must be 8-20 characters, include a number and a special character'
    )
})

const RegisterSchema = LoginSChema.extend({
  first_name: z
    .string()
    .min(1, 'First name is required')
    .max(20, 'Max 20 characters')
    .regex(USERNAME_REGEX, 'Only letters allowed'),
  last_name: z
    .string()
    .min(1, 'Last name is required')
    .max(20, 'Max 20 characters')
    .regex(USERNAME_REGEX, 'Only letters allowed')
})

export { LoginSChema, RegisterSchema }
