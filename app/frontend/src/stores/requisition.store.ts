import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IProductRequirementInfoCreate, IProductRequisitionInfo, IRequisitionStore } from '@/types'
import { showToast, showErrorToast } from '@/utils'
import toast from 'react-hot-toast'

export const useRequisitionStore = create<IRequisitionStore>()(
  persist(
    (set, get) => ({
      requisition: undefined,
      getRequisition: () => get().requisition,
      setRequisition: (requisition: IProductRequirementInfoCreate) => {
        const updatedRequisition = { ...requisition }

        if (requisition.type === 'normal') {
          updatedRequisition.userApprovals = [
            { userSlug: requisition.site?.managerSlug ?? '', roleApproval: 'approval_stage_1' },
            { userSlug: requisition.project?.managerSlug ?? '', roleApproval: 'approval_stage_2' },
            { userSlug: requisition.company.directorSlug ?? '', roleApproval: 'approval_stage_3' }
          ]
        } else if (requisition.type === 'urgent') {
          updatedRequisition.userApprovals = [
            { userSlug: requisition.company.directorSlug, roleApproval: 'approval_stage_3' }
          ]
        }

        set((state) => ({
          requisition: {
            ...state.requisition,
            ...updatedRequisition,
            requestProducts: state.requisition?.requestProducts ?? []
          }
        }))
        showToast('Tạo phiếu yêu cầu thành công!')
      },
      updateRequisition: (updatedFields: Partial<IProductRequirementInfoCreate>) => {
        set((state) => ({
          requisition: state.requisition
            ? {
                ...state.requisition,
                ...updatedFields,
                requestProducts: state.requisition.requestProducts
              }
            : undefined
        }))
      },
      clearRequisition: () => set({ requisition: undefined }),
      addProductToRequisition: (product: IProductRequisitionInfo) => {
        const currentRequisition = get().requisition
        if (currentRequisition) {
          const productExists = currentRequisition.requestProducts.some(
            (p) => p.code === product.code
          )
          if (productExists) {
            showErrorToast(1000)
          } else {
            set({
              requisition: {
                ...currentRequisition,
                requestProducts: [
                  ...currentRequisition.requestProducts,
                  { ...product, productSlug: product.productSlug }
                ]
              }
            })
            toast.success('Đã thêm vật tư vào phiếu yêu cầu!')
          }
        }
      },
      updateProductToRequisition: (product: IProductRequisitionInfo) => {
        const currentRequisition = get().requisition
        if (currentRequisition) {
          const productIndex = currentRequisition.requestProducts.findIndex(
            (p) => p.code === product.code
          )
          if (productIndex === -1) {
            showErrorToast(1000)
          } else {
            const updatedProducts = [...currentRequisition.requestProducts]
            updatedProducts[productIndex] = product
            set({ requisition: { ...currentRequisition, requestProducts: updatedProducts } })
            showToast('Đã cập nhật vật tư trong phiếu yêu cầu!')
          }
        }
      },
      deleteProductToRequisition: (product: IProductRequisitionInfo) => {
        const currentRequisition = get().requisition
        if (currentRequisition) {
          const updatedProducts = currentRequisition.requestProducts.filter(
            (p) => p.code !== product.code
          )
          set({ requisition: { ...currentRequisition, requestProducts: updatedProducts } })
          showToast('Đã xóa vật tư trong phiếu yêu cầu!')
        }
      }
    }),
    {
      name: 'requisition-storage'
    }
  )
)
