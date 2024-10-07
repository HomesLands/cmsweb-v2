import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  approveProductRequisition,
  createProductRequisition,
  deleteProductRequisition,
  getAllProductRequisition,
  getAllUnit,
  getProductRequisitionByApprover,
  getProductRequisitionByCreator,
  getProductRequisitionBySlug,
  getProducts,
  resubmitProductRequisition,
  updateProductRequisitionGeneralInfo,
  updateProductRequisitionQuantity
} from '@/api/products'
import {
  IApproveProductRequisition,
  IFinalProductRequisition,
  IProductQuery,
  IResubmitProductRequisition,
  IUpdateProductRequisitionGeneralInfo,
  IUpdateProductRequisitionQuantity
} from '@/types'

export const useProducts = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(q)],
    queryFn: () => getProducts(q),
    placeholderData: keepPreviousData
  })
}

export const useUnits = () => {
  return useQuery({
    queryKey: ['units'],
    queryFn: () => getAllUnit()
  })
}

export const useAllProductRequisition = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['allProductRequisition'],
    queryFn: () => getAllProductRequisition(q)
  })
}

export const useProductRequisitionBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['productRequisitionBySlug', slug],
    queryFn: () => getProductRequisitionBySlug(slug)
  })
}

export const useProductRequisitionByApprover = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['productRequisitionByApprover', JSON.stringify(q)],
    queryFn: () => getProductRequisitionByApprover(q)
  })
}

export const useProductRequisitionByCreator = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['productRequisitionByCreator', JSON.stringify(q)],
    queryFn: () => getProductRequisitionByCreator(q)
  })
}

export const useUpdateProductRequisitionQuantity = (slug: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IUpdateProductRequisitionQuantity) => updateProductRequisitionQuantity(data),
    onSuccess: () => {
      console.log('success')
      queryClient.invalidateQueries({ queryKey: ['productRequisitionBySlug', slug] })
    }
  })
}

export const useDeleteProductInRequisition = (slug: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (requestProductSlug: string) => deleteProductRequisition(requestProductSlug),
    onSuccess: () => {
      console.log('success')
      queryClient.invalidateQueries({ queryKey: ['productRequisitionBySlug', slug] })
    }
  })
}

export const useUpdateProductRequisitionGeneralInfo = () => {
  return useMutation({
    mutationFn: (data: IUpdateProductRequisitionGeneralInfo) =>
      updateProductRequisitionGeneralInfo(data)
  })
}

export const useResubmitProductRequisition = (slug: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IResubmitProductRequisition) => resubmitProductRequisition(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productRequisitionBySlug', slug] })
    }
  })
}

//Approve Product Requisition for Approver
export const useApproveProductRequisition = () => {
  return useMutation({
    mutationFn: (data: IApproveProductRequisition) =>
      approveProductRequisition(data.formSlug, data.approvalLog)
  })
}

export const useCreateProductRequisition = () => {
  return useMutation({
    mutationFn: (data: IFinalProductRequisition) => createProductRequisition(data)
  })
}
