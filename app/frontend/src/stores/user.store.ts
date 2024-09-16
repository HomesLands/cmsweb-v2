import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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

export const useUserStore = create<IUserState>()(
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
      logout: () =>
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

// export const useUserStore = create<IUserState>((set) => ({
//   userInfo: undefined,
//   token: decodeToken(localStorage.getItem('token')) || undefined,
//   refreshToken: decodeToken(localStorage.getItem('refreshToken')) || undefined,
//   expireTime: localStorage.getItem('expireTime') || undefined,
//   isAuthenticated: () => !!localStorage.getItem('token'),
//   setUserInfo: (userInfo: IUserInfo) => set({ userInfo }),
//   setToken: (token: string) => {
//     const encodedToken = encodeToken(token)
//     localStorage.setItem('token', encodedToken)
//   },
//   setRefreshToken: (refreshToken: string) => {
//     const encodedRefreshToken = encodeToken(refreshToken)
//     localStorage.setItem('refreshToken', encodedRefreshToken)
//   },
//   setExpireTime: (expireTime: string) => {
//     localStorage.setItem('expireTime', expireTime)
//   },
//   logout: () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('expireTime')
//     set({ userInfo: undefined, token: undefined })
//   }
// }))
