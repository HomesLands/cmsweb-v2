import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IProductRequirementInfoCreate, IRequisitionStore } from '@/types'

export const useRequisitionStore = create<IRequisitionStore>()(
  persist(
    (set, get) => ({
      requisition: undefined,
      getRequisition: () => get().requisition,
      setRequisition: (requisition: IProductRequirementInfoCreate) => set({ requisition }),
      clearRequisition: () => set({ requisition: undefined })
    }),
    {
      name: 'requisition-storage'
    }
  )
)
