import { IProductRequisitionInfo } from './product.type'

export type RequestRequisitionStatus = 'approved' | 'waiting' | 'rejected'
export type RequestRequisitionType = 'normal' | 'urgent'

export interface IRequestRequisitionInfo {
  code: string
  company: string
  companySlug: string
  description: boolean
  isRecalled: boolean
  requestProducts: IProductRequisitionInfo[]
  status: RequestRequisitionStatus
  slug: string
  type: string
  userApprovals: {
    roleApproval: string
    userFullname: string
    userSlug: string
  }[]
  createdAt: string
  updatedAt: string
}

export interface IRequisitionFormResponseForApprover {
  approvalUserSlug: string
  roleApproval: string
  slug: string
  productRequisitionForm: IRequestRequisitionInfo[]
}
