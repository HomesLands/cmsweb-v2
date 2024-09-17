import * as z from 'zod'

import { USERNAME_REGEX, PASSWORD_REGEX } from '@/constants'

export const loginSChema = z.object({
  username: z.string().regex(USERNAME_REGEX, 'Only letters allowed'),
  password: z.string()
  // .regex(
  //   PASSWORD_REGEX,
  //   'Password must be 8-20 characters, include a number and a special character'
  // )
})

export const registerSchema = z
  .object({
    fullname: z
      .string()
      .min(1, 'Full name is required')
      .max(30, 'Max 30 characters')
      .regex(USERNAME_REGEX, 'Only letters allowed'),
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(1, 'First name is required')
    .max(20, 'Max 20 characters')
    .regex(USERNAME_REGEX, 'Only letters allowed'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  role: z.string().min(1, 'Role is required'),
  dayOfBirth: z.string().min(1, 'Day of birth is required'),
  address: z.string().min(1, 'Address is required'),
  site: z.string().min(1, 'Site is required')
  // citizenIdentity: z.string().min(1, 'Citizen Identity is required') //CCCD
  // avatar: z.string().min(1, 'Avatar is required'),
  // signature: z.string().min(1, 'Signature is required')
})

export const validationSchema = z.object({
  name: z.string().min(1, 'Name is required').regex(USERNAME_REGEX, 'Only letters allowed'),
  fullName: z.string().min(1, 'Only letters allowed'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      'Password must be 8-20 characters, include a number and a special character'
    ),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  idCard: z.string().min(1, 'Citizen Identity is required'),
  address: z.string().min(1, 'Address is required')
})

export type TValidationSchema = z.infer<typeof validationSchema>
