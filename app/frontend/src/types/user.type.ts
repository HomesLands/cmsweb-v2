import { IQuery } from './base.type'

export interface IUserInfo {
  fullname: string
  username: string
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
  createdAt: string
  updatedAt: string
  slug: string
}

export type IUserQuery = IQuery

export interface IUserRoleResponse {
  role: string
  authorities: string[]
}
