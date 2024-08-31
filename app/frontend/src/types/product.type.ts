export interface IProductApprovalInfo {
  id: string
  createdBy: string
  createdAt?: Date
  updatedAt?: Date
  //CHT
  commanderApprovalStatus?: string
  commanderApprovalContent?: string
  // TPDA
  projectManagerApprovalStatus?: string
  projectManagerApprovalContent?: string
  // GD
  directorApprovalStatus?: string
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

export interface IProductNameSearch{
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


