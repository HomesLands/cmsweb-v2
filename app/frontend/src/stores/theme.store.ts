import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { IThemeStore } from '@/types'

export const useThemeStore = create<IThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (theme: string) => set({ theme }),
      getTheme: () => get().theme
    }),
    {
      name: 'theme-storage'
    }
  )
)
