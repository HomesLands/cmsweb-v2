import { IRole } from './role.type'
import { IUserInfo } from './user.type'

export interface ICreateUserRole {
  role: string
  user: string
}

export interface IUserRole {
  role: IRole
  user: IUserInfo
}
