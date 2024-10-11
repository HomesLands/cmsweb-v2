export interface IDepartment {
  id: number
  name: string
}

export interface ICreateDepartment {
  nameNormalize: string
  description: string
  site: string //site slug
  siteName: string
}
