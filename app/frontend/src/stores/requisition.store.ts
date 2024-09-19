import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IProductInfo, IProductRequirementInfoCreate, IRequisitionStore } from '@/types'
import { showToast, showErrorToast } from '@/utils'

export const useRequisitionStore = create<IRequisitionStore>()(
  persist(
    (set, get) => ({
      requisition: undefined,
      getRequisition: () => get().requisition,
      setRequisition: (requisition: IProductRequirementInfoCreate) => {
        set({ requisition })
        showToast('Requisition set successfully')
      },
      clearRequisition: () => set({ requisition: undefined }),
      addProductToRequisition: (product: IProductInfo) => {
        const currentRequisition = get().requisition
        if (currentRequisition) {
          const productExists = currentRequisition.products.some((p) => p.code === product.code)
          if (productExists) {
            showErrorToast(1000)
          } else {
            set({
              requisition: {
                ...currentRequisition,
                products: [...currentRequisition.products, product]
              }
            })
            showToast('Đã thêm vật tư vào phiếu yêu cầu!')
          }
        }
      }
    }),
    {
      name: 'requisition-storage'
    }
  )
)
