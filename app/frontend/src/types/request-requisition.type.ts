import { IProductRequisitionInfo } from './product.type'

export type RequestRequisitionStatus =
  | 'cancel'
  | 'waiting'
  | 'accepted_stage_1'
  | 'accepted_stage_2'
  | 'waiting_export'
  | 'exporting'
  | 'done'
export type RequestRequisitionType = 'normal' | 'urgent'

export type ApprovalLogStatus = 'cancel' | 'accept' | 'give_back'

export type RequestRequisitionRoleApproval =
  | 'approval_stage_1'
  | 'approval_stage_2'
  | 'approval_stage_3'

export interface IRequestRequisitionInfo {
  code: string
  type: RequestRequisitionType
  status: RequestRequisitionStatus
  isRecalled: boolean
  description: string | null
  company: string
  companySlug: string
  site: string
  siteSlug: string
  project: string
  projectSlug: string
  creator: string
  creatorSlug: string
  requestProducts: IProductRequisitionInfo[]
  slug: string
  userApprovals: {
    roleApproval: string
    userFullname: string
    userSlug: string
    createdAt: string
    updatedAt: string
    approvalLogs: {
      status: string
      content: string
      createdAt: string
      updatedAt: string
      slug: string
    }[]
    slug: string
  }[]
  createdAt: string
  updatedAt: string
}

export interface IRequisitionFormResponseForApprover {
  createdAt: string
  updatedAt: string
  approvalUserSlug: string
  roleApproval: string
  slug: string
  productRequisitionForm: IRequestRequisitionInfo
}

// export interface IRequisitionFormResponseForCreator {
//   code: string
//   type: RequestRequisitionType
//   status: RequestRequisitionStatus
//   isRecalled: boolean
//   description: string | null
//   company: string
//   companySlug: string
//   site: string
//   siteSlug: string
//   project: string
//   projectSlug: string
//   creator: string
//   creatorSlug: string
//   requestProducts: IProductRequisitionInfo[]
//   slug: string
//   userApprovals: {
//     roleApproval: string
//     userFullname: string
//     userSlug: string
//     createdAt: string
//     updatedAt: string
//     approvalLogs: {
//       status: string
//       content: string
//       createdAt: string
//       updatedAt: string
//       slug: string
//     }[]
//     slug: string
//   }[]
//   createdAt: string
//   updatedAt: string
// }
