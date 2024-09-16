export interface IUserInfo {
  id: string
  avatar: string
  fullName: string
  email: string
  phoneNumber: string
  role: string
  dob: string
  address: string
  department: string
  site: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserQuery {
  page: number
  pageSize: number
}
