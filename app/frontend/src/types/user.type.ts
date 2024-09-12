export interface IUserInfo {
  id: string
  avatar: string
  fullName: string
  email: string
  // username: string
  // password: string
  phoneNumber: string
  role: string
  dob: string
  address: string
  department: string
  site: string
  // citizenIdentity: string
  // signature: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IRegister {
  fullname: string
  username: string
  password: string
}

export interface ILogin {
  code: number
  error: boolean
  message: string
  method: string
  path: string
  result: {
    expireTime: string
    token: string
  }
}

export interface IUserState {
  userInfo?: IUserInfo
  token?: string
  expireTime?: string
  isAuthenticated: () => boolean
  setUserInfo: (userInfo: IUserInfo) => void
  setToken: (token: string) => void
  setExpireTime: (expireTime: string) => void
  logout: () => void
}

export interface IUserQuery {
  page: number
  pageSize: number
}
