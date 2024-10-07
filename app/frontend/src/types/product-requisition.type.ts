import { IProductInfo } from './product.type'
import { IUserInfo } from './user.type'

export type ProductRequisitionStatus =
  | 'cancel'
  | 'waiting'
  | 'accepted_stage_1'
  | 'accepted_stage_2'
  | 'waiting_export'
  | 'exporting'
  | 'done'
export type ProductRequisitionType = 'normal' | 'urgent'

export type ApprovalLogStatus = 'cancel' | 'accept' | 'give_back'

export type ProductRequisitionRoleApproval =
  | 'approval_stage_1'
  | 'approval_stage_2'
  | 'approval_stage_3'

export interface IProductRequisitionFormInfo {
  code?: string
  type: ProductRequisitionType
  status: ProductRequisitionStatus
  isRecalled: boolean
  deadlineApproval: string
  description: string
  project: {
    name: string
    startDate: string
    description: string
    createdAt: string
    updatedAt: string
    slug: string
  }
  creator: IUserInfo
  requestProducts: {
    requestQuantity: number
    description: string
    isExistProduct: boolean
    product: IProductInfo
    temporaryProduct: IProductInfo
    createdAt: string
    updatedAt: string
    slug: string
  }[]
  slug: string
  userApprovals: {
    userFullname: string
    userSlug: string
    approvalLogs: {
      status: string
      content: string
      createdAt: string
      updatedAt: string
      slug: string
    }[]
    assignedUserApproval: {
      formType: string
      roleApproval: string
      user: {
        fullname: string
        username: string
        slug: string
      }
    }
    createdAt: string
    updatedAt: string
    slug: string
  }[]
  createdAt?: string
  updatedAt?: string
}

export interface IProductRequisitionFormWithNewProductInfo {
  code?: string
  type: ProductRequisitionType
  status: ProductRequisitionStatus
  isRecalled: boolean
  deadlineApproval: string
  description: string
  project: {
    name: string
    startDate: string
    description: string
    createdAt: string
    updatedAt: string
    slug: string
  }
  creator: IUserInfo
  requestProducts: {
    requestQuantity: number
    description: string
    isExistProduct: boolean
    temporaryProduct: IProductInfo
    createdAt: string
    updatedAt: string
    slug: string
  }[]
  slug: string
  userApprovals: {
    userFullname: string
    userSlug: string
    approvalLogs: {
      status: string
      content: string
      createdAt: string
      updatedAt: string
      slug: string
    }[]
    assignedUserApproval: {
      formType: string
      roleApproval: string
      user: {
        fullname: string
        username: string
        slug: string
      }
    }
    createdAt: string
    updatedAt: string
    slug: string
  }[]
  createdAt?: string
  updatedAt?: string
}

export interface IUserApprovalInfo {
  userFullname: string
  userSlug: string
  assignedUserApproval: {
    formType: string
    roleApproval: string
  }
  approvalLogs: {
    status: string
    content: string
    createdAt: string
    updatedAt: string
    slug: string
  }[]
}

export interface IRequisitionFormResponseForApprover {
  createdAt: string
  updatedAt: string
  approvalUserSlug: string
  roleApproval: string
  slug: string
  productRequisitionForm: IProductRequisitionFormInfo
}

export interface IUpdateProductRequisitionQuantity {
  slug?: string //requestProductSlug
  newQuantity: number
}

export interface IUpdateProductRequisitionGeneralInfo {
  slug: string
  project: {
    slug: string
    name: string
  }
  type: ProductRequisitionType
  deadlineApproval: string
  description: string
}

export interface IResubmitProductRequisition {
  slug: string
  description: string
}

export type ProductRequisitionForm =
  | IProductRequisitionFormInfo
  | IProductRequisitionFormWithNewProductInfo
