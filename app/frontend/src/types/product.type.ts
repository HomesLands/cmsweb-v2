import { RequestStatus } from './request.type'

export interface IProductApprovalInfo {
  id: string
  createdBy: string
  createdAt?: string
  updatedAt?: string
  commanderApprovalStatus: RequestStatus
  commanderApprovalContent?: string
  projectManagerApprovalStatus: RequestStatus
  projectManagerApprovalContent?: string
  directorApprovalStatus: RequestStatus
  directorApprovalContent?: string
  notes?: string
}

export interface IProductRequirementInfoCreate {
  // requestCode: string
  requester: string
  project: string
  construction: string
  approver: string
  note: string
}

export interface IProductNameSearch {
  productName: string
}

export interface IProductInfoSearch {
  productCode: string
  productName: string
  modelOrSerialNumber: string
  supplier: string
  importDate: string // Change this to string
  unit: string
  quantity: number
  address: string
  note?: string
}

//ADD NEW PRODUCT
export interface IProductInfo {
  id: string
  createdBy: string
  productCode: string
  productName: string
  modelOrSerialNumber: string
  supplier: string
  // importDate: string // Change this to string
  unit: string
  quantity?: number
  address: string
  note?: string
  createdAt?: Date
}

export interface IProductQuery {
  page: number
  pageSize: number
}
