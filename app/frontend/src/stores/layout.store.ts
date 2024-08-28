import create from 'zustand'

interface LayoutState {
  isMinimized: boolean
  toggleMinimized: () => void
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isMinimized: false,
  toggleMinimized: () => set((state) => ({ isMinimized: !state.isMinimized }))
}))
