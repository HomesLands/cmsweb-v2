import { FormApprovalType } from '@/constants'

export type TAssignedApprover = {
  formType: FormApprovalType
  roleApproval: string
  user: string
  site: string
}

export type TGetAssignedApprover = {
  formType: FormApprovalType
  roleApproval: string
}
