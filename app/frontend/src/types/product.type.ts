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

export interface IUnit {
  slug: string
  name: string
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
  code?: string
  project: string //Project slug
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

export interface IProductNameSearch {
  name: string
}

export interface IProductInfo {
  code?: string
  slug?: string
  name: string
  provider: string
  description: string
  unit: {
    slug: string
    name: string
  }
  quantity: number
}

export interface INonExistingProductInfo {
  name: string
  provider: string
  description: string
  unit: {
    slug: string
    name: string
  }
  quantity: number
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
}

export interface IProductQuery extends IQuery {
  searchTerm?: string
}

export interface IApproveProductRequisition {
  formSlug: string
  approvalLog: {
    status: ApprovalLogStatus
    content: string
  }
}
