import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUserStore } from '@/types'
import { IUserInfo } from '@/types/user.type'

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      userInfo: undefined,
      setUserInfo: (userInfo?: IUserInfo) => set({ userInfo }),
      removeUserInfo: () => set({ userInfo: undefined })
    }),
    {
      name: 'user-storage' // Key for storage
    }
  )
)
