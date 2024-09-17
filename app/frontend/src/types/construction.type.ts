export interface IConstruction {
  slug: string
  name: string
  address: string
  managerFullname: string
  managerId: string
}

export interface IConstructionListResponse<T> {
  code: string
  message: string
  result: T
}
