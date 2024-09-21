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
  requestCode: string
  requester: string
  project: {
    slug: string
    name: string
  }
  site: {
    slug: string
    name: string
  }
  approver: string
  priority: string
  note: string
  products: IRequestProduct[]
  createdAt: string
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
  productName: string
}

export interface IProductInfo {
  createdAt: string
  code: string
  name: string
  provider: string
  status?: string
  description?: string
  unit: string
  quantity: number
}

export interface IProductQuery extends IQuery {
  searchTerm?: string
}
