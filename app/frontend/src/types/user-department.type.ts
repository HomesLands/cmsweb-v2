import { IDepartment } from './department.type'
import { IUserInfo } from './user.type'

export interface ICreateUserDepartment {
  department: string
  user: string
}

export interface IUserDepartment {
  department: IDepartment
  user: IUserInfo
}
