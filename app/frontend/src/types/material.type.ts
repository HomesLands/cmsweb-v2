export interface IMaterialInfo {
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
