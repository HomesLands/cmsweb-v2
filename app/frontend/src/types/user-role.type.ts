import { IBase } from './base.type'
import { IRole } from './role.type'
import { IUserInfo } from './user.type'

export interface ICreateUserRole {
  roleSlug: string
  userSlug: string
}

export interface IUserRole extends IBase {
  role: IRole
  user: IUserInfo
}
