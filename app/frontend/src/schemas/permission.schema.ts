import * as z from 'zod'

export const createPermissionSchema = z.object({
  resource: z.object({
    label: z.string().min(1),
    value: z.string().min(1)
  }),
  authority: z.object({
    label: z.string().min(1),
    value: z.string().min(1)
  }),
  requiredOwner: z.boolean().default(false)
})

export type TCreatePermissionSchema = z.infer<typeof createPermissionSchema>
