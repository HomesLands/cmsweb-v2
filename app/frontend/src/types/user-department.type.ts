import { IDepartment } from './department.type'
import { IUserInfo } from './user.type'

export interface ICreateUserDepartment {
  departmentSlug: string
  userSlug: string
}

export interface IUserDepartment {
  department: IDepartment
  user: IUserInfo
}
