import { IQuery } from './base.type'

export interface IUserInfo {
  id: string
  avatar: string
  fullname: string
  email: string
  username: string
  slug: string
  phoneNumber: string
  role: string
  dob: string
  address: string
  department: string
  site: string
  createdAt?: Date
  updatedAt?: Date
}

export type IUserQuery = IQuery
