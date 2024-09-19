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
  products: IProductInfo[]
  createdAt: string
}

export interface IProductNameSearch {
  productName: string
}

// export interface IProductInfoSearch {
//   productCode: string
//   productName: string
//   modelOrSerialNumber: string
//   supplier: string
//   importDate: string // Change this to string
//   unit: string
//   quantity: string
//   address: string
//   note?: string
// }

//ADD NEW PRODUCT
// export interface IProductInfo {
//   code: string
//   createdBy: string
//   productCode: string
//   productName: string
//   modelOrSerialNumber: string
//   supplier: string
//   importDate: string // Change this to string
//   unit: string
//   quantity: string
//   address: string
//   note?: string
//   createdAt?: Date
// }

export interface IProductInfo {
  createdAt: string
  code: string
  name: string
  provider: string
  status?: string
  description?: string
  unit: string
  quantity: string
}

export interface IUserQuery {
  page: number
  pageSize: number
}

export interface IProductQuery {
  order: string
  page: number
  pageSize: number
}
