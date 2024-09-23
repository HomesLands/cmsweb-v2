export interface IProject {
  slug: string
  name: string
  startDate: string
  description: string
  managerFullname: string
  managerSlug: string
}

export interface IProjectListResponse<T> {
  code: string
  message: string
  result: T
}
