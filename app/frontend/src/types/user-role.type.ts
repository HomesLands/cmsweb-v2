import { IRole } from './role.type'
import { IUserInfo } from './user.type'

export interface ICreateUserRole {
  roleSlug: string
  userSlug: string
}

export interface IUserRole {
  role: IRole
  user: IUserInfo
}
