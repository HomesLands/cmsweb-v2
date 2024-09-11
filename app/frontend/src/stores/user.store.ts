import { create } from 'zustand'
import { IUserInfo, IUserState } from '@/types'

const encodeToken = (token: string): string => {
  return btoa(token)
}

const decodeToken = (token: string | null): string | null => {
  return token ? atob(token) : null
}

export const useUserStore = create<IUserState>((set) => ({
  userInfo: undefined,
  token: decodeToken(localStorage.getItem('token')) || undefined,
  isAuthenticated: () => !!localStorage.getItem('token'),
  setUserInfo: (userInfo: IUserInfo) => set({ userInfo }),
  setToken: (token: string) => {
    const encodedToken = encodeToken(token)
    localStorage.setItem('token', encodedToken)
    set({ token: encodedToken })
  },
  setExpireTime: (expireTime: string) => {
    localStorage.setItem('expireTime', expireTime)
    set({ expireTime })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ userInfo: undefined, token: undefined })
  }
}))
