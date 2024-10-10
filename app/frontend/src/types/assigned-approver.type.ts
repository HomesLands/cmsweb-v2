import { FormApprovalType } from '@/constants'

export type TAssignedApprover = {
  formType: FormApprovalType
  roleApproval: string
  user: string
}
