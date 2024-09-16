import { IUserInfo } from './user.type'

export interface ILayoutStore {
  isMinimized: boolean
  toggleMinimized: () => void
}

export interface IUserStore {
  userInfo?: IUserInfo
  token?: string
  refreshToken?: string
  expireTime?: string
  isAuthenticated: () => boolean
  setUserInfo: (userInfo: IUserInfo) => void
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
