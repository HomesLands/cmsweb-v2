export interface IProject {
  id: string
  name: string
  startDate: string
  description: string
  managerFullname: string
  managerId: string
}

export interface IProjectListResponse<T> {
  code: string
  message: string
  result: T
}
