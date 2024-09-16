export interface IConstruction {
  id: string
  name: string
  address: string
  managerFullname: string
  managerId: string
}

export interface IProjectListResponse<T> {
  code: string
  message: string
  result: T
}
