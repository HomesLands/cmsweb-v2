// src/stores/requestStore.ts
import { IRequestProductRequisitionStore } from '@/types'
import { create } from 'zustand'

export const useRequestStore = create<IRequestProductRequisitionStore>((set) => ({
  requestQueueSize: 0,
  incrementRequestQueueSize: () =>
    set((state) => ({ requestQueueSize: state.requestQueueSize + 1 })),
  decrementRequestQueueSize: () =>
    set((state) => ({ requestQueueSize: state.requestQueueSize - 1 }))
}))
