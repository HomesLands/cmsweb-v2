import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ILayoutStore } from '@/types'

export const useLayoutStore = create<ILayoutStore>()(
  persist(
    (set) => ({
      isMinimized: false,
      toggleMinimized: () => set((state) => ({ isMinimized: !state.isMinimized }))
    }),
    {
      name: 'layout-storage'
    }
  )
)
