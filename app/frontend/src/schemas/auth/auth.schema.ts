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

const CreateUserSchema = RegisterSchema.extend({
  address: z.string().min(1, 'Address is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  citizenIdentity: z.string().min(1, 'Citizen Identity is required'), //CCCD
  role: z.string().min(1, 'Role is required'),
  dayOfBirth: z.string().min(1, 'Day of birth is required'),
  department: z.string().min(1, 'Department is required'),
  avatar: z.string().min(1, 'Avatar is required'),
  signature: z.string().min(1, 'Signature is required')
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

export type ValidationSchema = z.infer<typeof validationSchema>

export { LoginSChema, RegisterSchema, CreateUserSchema }
