// src/stores/requestStore.ts
import { create } from 'zustand'

interface RequestStoreState {
  requestQueueSize: number
  incrementRequestQueueSize: () => void
  decrementRequestQueueSize: () => void
}

export const useRequestStore = create<RequestStoreState>(set => ({
  requestQueueSize: 0,

  incrementRequestQueueSize: () => set(state => ({ requestQueueSize: state.requestQueueSize + 1 })),
  decrementRequestQueueSize: () => set(state => ({ requestQueueSize: state.requestQueueSize - 1 }))
}))
