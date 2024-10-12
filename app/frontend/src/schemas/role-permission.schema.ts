import * as z from 'zod'

export const createRolePermissionSchema = z.object({
  permission: z.object({
    label: z.string().min(1),
    value: z.string().min(1)
  }),
  role: z.object({
    label: z.string().min(1),
    value: z.string().min(1)
  })
})

export type TCreateRolePermissionSchema = z.infer<typeof createRolePermissionSchema>
