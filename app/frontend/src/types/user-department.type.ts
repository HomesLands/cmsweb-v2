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

export interface IUpdateUserDepartment {
  slug: string //the slug of the user department
  department: string //department slug
}
