import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  IUserInfoPermission,
  IUserInfoPermissionsStore,
  IUserPermission,
  IUserRole,
  IUserStore
} from '@/types'
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

export const useUserInfoPermissionsStore = create<IUserInfoPermissionsStore>()(
  persist(
    (set, get) => ({
      userRoles: [],
      getUserRoles: () => get().userRoles,
      setUserRoles: (roles: IUserRole[]) => set({ userRoles: roles }),
      clearUserRoles: () => set({ userRoles: [] })
    }),
    {
      name: 'user-info-permissions-storage'
    }
  )
)

// export const useUserInfoPermissionsStore = create<IUserInfoPermissionsStore>()(
//   persist(
//     (set) => ({
//       userRole: null,
//       setUserRole: (role: IUserRole) => set({ userRole: role }),
//       clearUserRole: () => set({ userRole: null })
//     }),
//     {
//       name: 'user-info-permissions-storage'
//     }
//   )
// )
