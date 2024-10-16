import { create } from 'zustand'

interface LoadingState {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}))
