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
  dob: string
  gender: string
  phoneNumber: string
  address: string
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
  address: string
  phoneNumber: string
  dob: string
  gender: string
}

export interface IUpdateUsername {
  slug: string // User slug
  username: string
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
