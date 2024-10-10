export interface IConstruction {
  slug: string
  name: string
  address: string
  managerFullname: string
  managerSlug: string
}

export interface IConstructionListResponse<T> {
  code: string
  message: string
  result: T
}
