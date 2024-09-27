import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

import {
  createProductRequisition,
  getAllProductRequisition,
  getProductRequisitionByApprover,
  getProductRequisitionByCreator,
  getProductRequisitionBySlug,
  getProducts
} from '@/api/products'
import { IFinalProductRequisition, IProductQuery } from '@/types'

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

export const useCreateProductRequisition = () => {
  return useMutation({
    mutationFn: (data: IFinalProductRequisition) => createProductRequisition(data)
  })
}
