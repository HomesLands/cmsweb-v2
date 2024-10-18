import { z } from 'zod'

export const createResourceSchema = z.object({
  name: z.string().min(1)
})

export const updateResourceSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1)
})

export type TCreateResourceSchema = z.infer<typeof createResourceSchema>
export type TUpdateResourceSchema = z.infer<typeof updateResourceSchema>
