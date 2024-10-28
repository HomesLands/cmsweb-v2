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

export const updateRolePermissionSchema = z.object({
  rolePermissionSlug: z.string().min(1),
  permission: z.object({
    label: z.string().min(1),
    value: z.string().min(1)
  }),
  role: z.object({
    label: z.string().min(1),
    value: z.string().min(1)
  })
})

export const deleteRolePermissionSchema = z.object({
  rolePermissionSlug: z.string().min(1),
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
export type TUpdateRolePermissionSchema = z.infer<typeof updateRolePermissionSchema>
export type TDeleteRolePermissionSchema = z.infer<typeof deleteRolePermissionSchema>
