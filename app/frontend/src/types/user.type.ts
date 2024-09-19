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

export interface IUserBySlug {
  result: {
    fullname: string
    username: string
    slug: string
  }
}

export interface IUserQuery {
  page: number
  pageSize: number
}

export interface IProductQuery {
  order: string
  page: number
  pageSize: number
}
