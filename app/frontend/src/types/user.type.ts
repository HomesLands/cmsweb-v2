import { IQuery } from './base.type'
import { IPermission } from './permission.type'
import { IUserRole } from './user-role.type'

export interface IUserInfo {
  fullname: string
  username: string
  avatar: string
  userDepartments: {
    department: {
      nameNormalize: string
      description: string
      site: {
        name: string
        company: {
          name: string
          createdAt: string
          updatedAt: string
          slug: string
          logo: string
        }
        createdAt: string
        updatedAt: string
        slug: string
      }
      createdAt: string
      updatedAt: string
      slug: string
    }
    createdAt: string
    updatedAt: string
    slug: string
  }[]
  userRoles: IUserRole[]
  signature: string
  createdAt: string
  updatedAt: string
  slug: string
}

export type IUserQuery = IQuery

export interface IUserPermission {
  role: string
  permissions: IPermission[]
}

export interface IUpdateUserGeneralInfo {
  fullname: string
  username: string
  company: string
  site: string
}
