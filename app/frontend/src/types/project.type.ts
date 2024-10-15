export interface IProject {
  slug: string
  name: string
  startDate: string
  description: string
  managerFullname: string
  managerSlug: string
}

export interface ICreateProject {
  name: string
  startDate: string
  description: string
  fileDescription: string
  site: string
  siteName: string
}
