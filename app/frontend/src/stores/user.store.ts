import { create } from 'zustand'
import { IUserInfo, IUserState } from '@/types'

const encodeToken = (token: string): string => {
  return btoa(token)
}

const decodeToken = (token: string | null): string | null => {
  try {
    return token ? atob(token) : null
  } catch (e) {
    console.error('Failed to decode token:', e)
    return null
  }
}

export const useUserStore = create<IUserState>((set) => ({
  userInfo: undefined,
  token: decodeToken(localStorage.getItem('token')) || undefined,
  refreshToken: decodeToken(localStorage.getItem('refreshToken')) || undefined,
  expireTime: localStorage.getItem('expireTime') || undefined,
  isAuthenticated: () => !!localStorage.getItem('token'),
  setUserInfo: (userInfo: IUserInfo) => set({ userInfo }),
  setToken: (token: string) => {
    const encodedToken = encodeToken(token)
    console.log('Check encodedToken', encodedToken)
    localStorage.setItem('token', encodedToken)
    // set({ token: encodedToken })
  },
  setRefreshToken: (refreshToken: string) => {
    const encodedRefreshToken = encodeToken(refreshToken)
    localStorage.setItem('refreshToken', encodedRefreshToken)
  },
  setExpireTime: (expireTime: string) => {
    localStorage.setItem('expireTime', expireTime)
    // set({ expireTime })
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expireTime')
    set({ userInfo: undefined, token: undefined })
  }
}))
