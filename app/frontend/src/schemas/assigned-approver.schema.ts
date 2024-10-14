import { FormApprovalType } from '@/constants'
import { z } from 'zod'

export const createAssignedApproverSchema = z.object({
  formType: z.nativeEnum(FormApprovalType),
  roleApproval: z.string().min(1),
  user: z.string().min(1),
  site: z.string().min(1)
})

export type TCreateAssignedApproverSchema = z.infer<typeof createAssignedApproverSchema>
