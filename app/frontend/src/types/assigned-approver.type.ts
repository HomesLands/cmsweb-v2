import { FormApprovalType } from '@/constants'

export type TCreateAssignedApprover = {
  formType: FormApprovalType
  roleApproval: string
  user: string
  site: string
}

export type TAssignedApprover = {}
