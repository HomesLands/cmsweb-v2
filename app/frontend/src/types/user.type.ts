import { IQuery } from './base.type'
import { IPermission } from './permission.type'

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

export interface IConfirmChangePassword {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface IChangePasswordResponse {
  fullname: string
  username: string
  avatar: string
  signature: string
  slug: string
}
