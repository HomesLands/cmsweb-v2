import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUserInfo, IUserStore } from '@/types'

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

export const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      userInfo: undefined,
      token: undefined,
      refreshToken: undefined,
      expireTime: undefined,
      isAuthenticated: () => !!get().token,
      setUserInfo: (userInfo: IUserInfo) => set({ userInfo }),
      setToken: (token: string) => set({ token }),
      setRefreshToken: (refreshToken: string) => set({ refreshToken }),
      setExpireTime: (expireTime: string) => set({ expireTime }),
      setLogout: () =>
        set({
          userInfo: undefined,
          token: undefined,
          expireTime: undefined,
          refreshToken: undefined
        })
    }),
    {
      name: 'user-storage' // Key for storage
    }
  )
)
