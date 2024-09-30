import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IAuthStore } from '@/types'
import moment from 'moment'

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      slug: undefined,
      token: undefined,
      refreshToken: undefined,
      expireTime: undefined,
      expireTimeRefreshToken: undefined,
      isAuthenticated: () => {
        if (
          !get().token ||
          !get().expireTime ||
          !get().refreshToken ||
          !get().expireTimeRefreshToken
        )
          return false
        const currentDate = moment()
        const expireDateRefreshToken = moment(get().expireTimeRefreshToken)
        return currentDate.isBefore(expireDateRefreshToken)
      },
      setSlug: (slug: string) => set({ slug }),
      setToken: (token: string) => set({ token }),
      setRefreshToken: (refreshToken: string) => set({ refreshToken }),
      setExpireTime: (expireTime: string) => set({ expireTime }),
      setExpireTimeRefreshToken: (expireTimeRefreshToken) => set({ expireTimeRefreshToken }),
      setLogout: () =>
        set({
          token: undefined,
          expireTime: undefined,
          refreshToken: undefined,
          expireTimeRefreshToken: undefined,
          slug: undefined
        })
    }),
    {
      name: 'auth-storage'
    }
  )
)
