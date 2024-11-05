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

export interface IProductApprovalInfo {
  id: string
  createdBy: string
  createdAt?: string
  updatedAt?: string
  commanderApprovalStatus: ProductRequisitionStatus
  commanderApprovalContent?: string
  projectManagerApprovalStatus: ProductRequisitionStatus
  projectManagerApprovalContent?: string
  directorApprovalStatus: ProductRequisitionStatus
  directorApprovalContent?: string
  notes?: string
}

export interface IProductRequisitionFormCreate {
  code?: string
  requester: string
  deadlineApproval: string
  company: {
    slug: string
    name: string
    logo: string
  }
  department: {
    slug: string
    name: string
  }
  site: {
    slug: string
    name: string
  }
  projectName: string
  // project: {
  //   slug: string
  //   name: string
  // }
  type: ProductRequisitionType
  requestProducts: IProductRequisitionInfo[]
  note?: string
}

export interface IFinalProductRequisition {
  code?: string
  projectName: string //Project name
  type: 'normal' | 'urgent'
  description: string
  deadlineApproval: string
  requestProducts: {
    product?: string
    requestQuantity: number
    name: string
    provider: string
    unit: string
    description: string
  }[]
}

export interface IAddNewProductInRequisitionUpdate {
  form: string //Form slug
  product: string //Product slug
  name: string
  provider: string
  description: string
  unit: string //Unit slug
  requestQuantity: number
}

//Update product requisition quantity
export interface IRequestProductInfo {
  slug: string
  isExistProduct: boolean
  product: IProductInfo
  requestQuantity: number
}

export interface IRequestProductInfoUpdate {
  slug: string
  description: string
  isExistProduct: boolean
  product: IProductInfo
  temporaryProduct: IProductInfo
  requestQuantity: number
}

export interface IProductRequisitionInfo {
  slug: string
  isExistProduct: boolean
  requestQuantity: number
  product: IProductInfo
  temporaryProduct?: IProductInfo
}

export interface IProductRequisitionFormInfo {
  code?: string
  type: ProductRequisitionType
  status: ProductRequisitionStatus
  roleApproval?: string
  isRecalled: boolean
  deadlineApproval: string
  description: string
  projectName: string
  // project: {
  //   name: string
  //   startDate: string
  //   description: string
  //   createdAt: string
  //   updatedAt: string
  //   slug: string
  // }
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

export interface IRequisitionByUserApproval {
  approvalUserSlug: string
  roleApproval: string
  productRequisitionForm: IProductRequisitionFormInfo
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
  name: string
  provider: string
  unit: string
  description: string
  requestQuantity: number
}

export interface IUpdateProductRequisitionGeneralInfo {
  slug: string
  projectName: string
  // project: {
  //   slug: string
  //   name: string
  // }
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

export type IExportProductRequisitionFormRequest = {
  slug: string
  code: string
}
