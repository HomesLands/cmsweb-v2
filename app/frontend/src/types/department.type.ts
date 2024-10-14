import { IBase } from './base.type'
import { IUserDepartment } from './user-department.type'

export interface IDepartment extends IBase {
  nameNormalize?: string
  description?: string
  userDepartments: IUserDepartment[]
  site: {
    name: string
    slug: string
  }[]
  slug: string
}

export interface ICreateDepartment {
  nameNormalize: string
  description: string
  site: string //site slug
  siteName: string
}
