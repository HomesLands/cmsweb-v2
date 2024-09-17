import { IUserInfo } from './user.type'

export interface ILayoutStore {
  isMinimized: boolean
  toggleMinimized: () => void
}

export interface IUserStore {
  userInfo?: IUserInfo
  setUserInfo: (userInfo: IUserInfo) => void
  removeUserInfo: () => void
}

export interface IAuthStore {
  token?: string
  refreshToken?: string
  expireTime?: string
  isAuthenticated: () => boolean
  setToken: (token: string) => void
  setRefreshToken: (refreshToken: string) => void
  setExpireTime: (expireTime: string) => void
  setLogout: () => void
}

export interface IRequestProductRequisitionStore {
  requestQueueSize: number
  incrementRequestQueueSize: () => void
  decrementRequestQueueSize: () => void
}
