import { IQuery } from './base.type'
import { ApprovalLogStatus } from './product-requisition.type'

export interface IUnit {
  slug: string
  name: string
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

export interface IProductInfoUpdate {
  slug: string
  code?: string
  name: string
  provider: string
  unit: string
  description: string
}

export interface IProductInfoCreate {
  code: string
  name: string
  provider: string
  unit: {
    slug: string
    name: string
  }
  description: string
}

export interface IApiProductInfoCreate {
  code: string
  name: string
  provider: string
  unit: string
  description: string
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
