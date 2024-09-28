import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

import {
  approveProductRequisition,
  createProductRequisition,
  getAllProductRequisition,
  getProductRequisitionByApprover,
  getProductRequisitionByCreator,
  getProductRequisitionBySlug,
  getProducts
} from '@/api/products'
import { IApproveProductRequisition, IFinalProductRequisition, IProductQuery } from '@/types'

export const useProducts = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(q)],
    queryFn: () => getProducts(q),
    placeholderData: keepPreviousData
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
//Approve Product Requisition for Approver
export const useApproveProductRequisition = () => {
  return useMutation({
    mutationFn: (data: IApproveProductRequisition) =>
      approveProductRequisition(
        data.formSlug,
        data.approvalUserSlug,
        data.approvalLogStatus,
        data.approvalLogMessage
      )
  })
}

export const useCreateProductRequisition = () => {
  return useMutation({
    mutationFn: (data: IFinalProductRequisition) => createProductRequisition(data)
  })
}
