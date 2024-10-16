import { IUserInfo, IUserPermission } from './user.type'

export interface ILayoutStore {
  isMinimized: boolean
  toggleMinimized: () => void
}

export interface IThemeStore {
  theme: string
  setTheme: (theme: string) => void
  getTheme: () => string
}

export interface IUserStore {
  userInfo: IUserInfo | null
  setUserInfo: (userInfo: IUserInfo) => void
  getUserInfo: () => IUserInfo | null
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
  userRoles: IUserPermission[]
  setUserRoles: (userRoles: IUserPermission[]) => void
  clearUserRoles: () => void
}

export interface IDownloadStore {
  progress: number
  fileName: string
  isDownloading: boolean
  setProgress: (progress: number) => void
  setFileName: (fileName: string) => void
  setIsDownloading: (isDownloading: boolean) => void
  reset: () => void
}
