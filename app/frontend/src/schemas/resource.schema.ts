import { z } from 'zod'

export const createResourceSchema = z.object({
  name: z.string().min(1)
})

export type TCreateResourceSchema = z.infer<typeof createResourceSchema>
