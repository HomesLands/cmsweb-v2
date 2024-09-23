import { IQuery } from './base.type'
import { RequestRequisitionStatus } from './request-requisition.type'

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
  company: {
    slug: string
    directorSlug: string
    name: string
  }
  site: {
    slug: string
    managerSlug: string
    name: string
  }
  project: {
    slug: string
    managerSlug: string
    name: string
  }
  type: 'normal' | 'urgent'
  requestProducts: IProductRequisitionInfo[]
  userApprovals: {
    userSlug: string
    roleApproval: string
  }[]
  note?: string
}

export interface IFinalProductRequisition {
  code: string
  companySlug: string
  siteSlug: string
  projectSlug: string
  type: 'normal' | 'urgent'
  description: string
  requestProducts: {
    productSlug: string
    requestQuantity: number
  }[]
  userApprovals: {
    userSlug: string
    roleApproval: string
  }[]
}

export interface IRequestProduct {
  code?: string
  name?: string
  provider?: string
  description?: string
  unit?: string
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
  status?: string
  description?: string
  unit: string
  quantity: number
}

export interface IProductRequisitionInfo {
  code: string
  productSlug: string
  name: string
  provider: string
  status?: string
  description?: string
  unit: string
  requestQuantity: number
}

export interface IUserQuery {
  page: number
  pageSize: number
}

export interface IProductQuery extends IQuery {
  searchTerm?: string
}
