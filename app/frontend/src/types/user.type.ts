export interface userInfo {
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
  created_at?: Date
  updated_at?: Date
}

// export interface PagingResponse<T> {
//   items: T[]
//   total: number
//   page: number
//   page_size: number
//   pages: number
// }
