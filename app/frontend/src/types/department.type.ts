import { IBase } from './base.type'
import { IUserDepartment } from './user-department.type'

export interface IDepartment {
  slug: string
  nameNormalize?: string
  description?: string
  userDepartments: IUserDepartment[]
  site: {
    name: string
    slug: string
  }
  createdAt: string
  updatedAt: string
}

export interface ICreateDepartment {
  nameNormalize: string
  description: string
  site: string //site slug
  siteName: string
}

export interface IUpdateDepartment {
  slug: string
  nameNormalize: string
  description: string
  site: string //site slug
  siteName: string
}
