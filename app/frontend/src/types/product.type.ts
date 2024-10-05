import { IQuery } from './base.type'
import {
  ApprovalLogStatus,
  ProductRequisitionStatus,
  ProductRequisitionType
} from './product-requisition.type'

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
  code: string
  requester: string
  deadlineApproval: string
  company: {
    slug: string
    name: string
  }
  site: {
    slug: string
    name: string
  }
  project: {
    slug: string
    name: string
  }
  type: ProductRequisitionType
  requestProducts: IProductRequisitionInfo[]
  userApprovals: {
    userSlug: string
    roleApproval: string
  }[]
  note?: string
}

export interface IFinalProductRequisition {
  code: string
  project: string //Project slug
  type: 'normal' | 'urgent'
  description: string
  deadlineApproval: string
  requestProducts: {
    product: string
    requestQuantity: number
    name: string
    provider: string
    unit: string
    description: string
  }[]
}

export interface IRequestProduct {
  code?: string
  name?: string
  provider?: string
  description: string
  unit: {
    slug: string
    name: string
  }
  quantity?: number
}

export interface IProductNameSearch {
  name: string
}

export interface IProductInfo {
  code: string
  slug: string
  name: string
  provider: string
  description: string
  unit: {
    slug: string
    name: string
  }
  quantity: number
}

//Update product requisition quantity
export interface IRequestProductInfo {
  slug: string
  product: IProductInfo
  requestQuantity: number
}

export interface IProductRequisitionInfo {
  // createdAt?: string
  // updatedAt?: string
  // slug: string
  requestQuantity: number
  // description: string
  // isExistProduct: boolean;
  product: IProductInfo
  // temporaryProduct: string | null;
}

export interface IProductQuery extends IQuery {
  searchTerm?: string
}

// export interface IApproveProductRequisition {
//   formSlug: string
//   approvalUserSlug: string
//   approvalLogStatus: ApprovalLogStatus
//   approvalLogContent: string
// }

export interface IApproveProductRequisition {
  formSlug: string
  approvalLog: {
    status: ApprovalLogStatus
    content: string
  }
}
