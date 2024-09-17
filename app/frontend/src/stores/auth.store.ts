import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IAuthStore } from '@/types'

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      token: undefined,
      refreshToken: undefined,
      expireTime: undefined,
      isAuthenticated: () => !!get().token,
      setToken: (token: string) => set({ token }),
      setRefreshToken: (refreshToken: string) => set({ refreshToken }),
      setExpireTime: (expireTime: string) => set({ expireTime }),
      setLogout: () =>
        set({
          token: undefined,
          expireTime: undefined,
          refreshToken: undefined
        })
    }),
    {
      name: 'auth-storage' // Key for storage
    }
  )
)
