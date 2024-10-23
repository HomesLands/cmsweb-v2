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

export const updatePermissionSchema = z.object({
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
export type TUpdatePermissionSchema = z.infer<typeof updatePermissionSchema>
