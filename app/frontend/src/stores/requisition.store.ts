import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IProductRequirementInfoCreate, IRequestProduct, IRequisitionStore } from '@/types'
import { showToast, showErrorToast } from '@/utils'
import toast from 'react-hot-toast'

export const useRequisitionStore = create<IRequisitionStore>()(
  persist(
    (set, get) => ({
      requisition: undefined,
      setRequisition: (requisition: IProductRequirementInfoCreate) => {
        set({ requisition })
      },
      clearRequisition: () => set({ requisition: undefined }),
      addProductToRequisition: (product: IRequestProduct) => {
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
            toast.success('Đã thêm vật tư vào phiếu yêu cầu!')
          }
        }
      },
      updateProductToRequisition: (product: IRequestProduct) => {
        const currentRequisition = get().requisition
        if (currentRequisition) {
          const productIndex = currentRequisition.products.findIndex((p) => p.code === product.code)
          if (productIndex === -1) {
            showErrorToast(1000)
          } else {
            const updatedProducts = [...currentRequisition.products]
            updatedProducts[productIndex] = product
            set({ requisition: { ...currentRequisition, products: updatedProducts } })
            toast.success('Cập nhhật vật tư thành công!')
          }
        }
      },
      deleteProductToRequisition: (product: IRequestProduct) => {
        const currentRequisition = get().requisition
        if (currentRequisition) {
          const updatedProducts = currentRequisition.products.filter((p) => p.code !== product.code)
          set({ requisition: { ...currentRequisition, products: updatedProducts } })
          showToast('Đã xóa vật tư trong phiếu yêu cầu!')
        }
      }
    }),
    {
      name: 'requisition-storage'
    }
  )
)
