import { IQuery } from './base.type'
import {
  ApprovalLogStatus,
  RequestRequisitionStatus,
  RequestRequisitionType
} from './request-requisition.type'

export interface IProductApprovalInfo {
  id: string
  createdBy: string
  createdAt?: string
  updatedAt?: string
  commanderApprovalStatus: RequestRequisitionStatus
  commanderApprovalContent?: string
  projectManagerApprovalStatus: RequestRequisitionStatus
  projectManagerApprovalContent?: string
  directorApprovalStatus: RequestRequisitionStatus
  directorApprovalContent?: string
  notes?: string
}

export interface IProductRequirementInfoCreate {
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
  type: RequestRequisitionType
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
  description?: string
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
  // status?: string
  description?: string
  unit: {
    slug: string
    name: string
  }
  quantity: number
}

export interface IProductRequisitionInfo {
  createdAt?: string
  updatedAt?: string
  code: string
  product: string
  name: string
  provider: string
  status?: string
  description?: string
  unit: {
    slug: string
    name: string
  }
  requestQuantity: number
  // product: IProductInfo
}

export interface IProductQuery extends IQuery {
  searchTerm?: string
}

export interface IApproveProductRequisition {
  formSlug: string
  approvalUserSlug: string
  approvalLogStatus: ApprovalLogStatus
  approvalLogContent: string
}
