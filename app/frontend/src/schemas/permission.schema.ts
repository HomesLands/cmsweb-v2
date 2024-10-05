import * as z from 'zod'

export const createPermissionSchema = z.object({
  role: z.object({
    label: z.string().min(1),
    value: z.string().min(1)
  }),
  authority: z.object({
    label: z.string().min(1),
    value: z.string().min(1)
  })
})

export type TCreatePermissionSchema = z.infer<typeof createPermissionSchema>
