import { IUserInfo, IUserRoleResponse } from './user.type'

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
  slug?: string
  token?: string
  refreshToken?: string
  expireTime?: string
  expireTimeRefreshToken?: string
  authorities?: string[]
  isAuthenticated: () => boolean
  setSlug: (slug: string) => void
  setToken: (token: string) => void
  setRefreshToken: (refreshToken: string) => void
  setExpireTime: (expireTime: string) => void
  setExpireTimeRefreshToken: (expireTimeRefreshToken: string) => void
  setLogout: () => void
}

export interface IRequestProductRequisitionStore {
  requestQueueSize: number
  incrementRequestQueueSize: () => void
  decrementRequestQueueSize: () => void
}

export interface IUserInfoPermissionsStore {
  userRoles: IUserRoleResponse[]
  setUserRoles: (roles: IUserRoleResponse[]) => void
  clearUserRoles: () => void
}
