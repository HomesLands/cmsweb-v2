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
        showToast('Tạo phiếu yêu cầu thành công!')
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
      },
      updateProductToRequisition: (product: IProductInfo) => {
        const currentRequisition = get().requisition
        if (currentRequisition) {
          const productIndex = currentRequisition.products.findIndex((p) => p.code === product.code)
          if (productIndex === -1) {
            showErrorToast(1000)
          } else {
            const updatedProducts = [...currentRequisition.products]
            updatedProducts[productIndex] = product
            set({ requisition: { ...currentRequisition, products: updatedProducts } })
            showToast('Đã cập nhật vật tư trong phiếu yêu cầu!')
          }
        }
      },
      deleteProductToRequisition: (product: IProductInfo) => {
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
