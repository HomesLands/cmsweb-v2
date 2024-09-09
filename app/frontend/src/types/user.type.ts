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

export interface IUserState {
  userInfo?: IUserInfo
  accessToken?: string
  isAuthenticated: () => boolean
  setUserInfo: (userInfo: IUserInfo) => void
  setAccessToken: (token: string) => void
  logout: () => void
}

export interface IUserQuery {
  page: number
  pageSize: number
}
