export interface ISite {
  id: string
  slug: string
  name: string
  companyId: string
  companyName: string
  companySlug: string
}

export interface ICreateSite {
  name: string
  company: string //company slug
  companyName: string
}
