export interface MaterialInfo {
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

export interface PagingResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
  pages: number
}
