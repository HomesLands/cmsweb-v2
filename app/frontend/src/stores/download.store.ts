import { IDownloadStore } from '@/types'
import { create } from 'zustand'

export const useDownloadStore = create<IDownloadStore>((set) => ({
  progress: 0,
  fileName: '',
  isDownloading: false,
  setProgress: (progress) => set({ progress }),
  setFileName: (fileName) => set({ fileName }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  reset: () => set({ progress: 0, fileName: '', isDownloading: false })
}))
