import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createProduct,
  deleteProduct,
  getAllUnit,
  getProducts,
  updateProduct
} from '@/api/products'
import { IApiProductInfoCreate, IProductInfoUpdate, IProductQuery } from '@/types'

export const useProducts = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(q)],
    queryFn: () => getProducts(q),
    placeholderData: keepPreviousData
  })
}

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: IApiProductInfoCreate) => createProduct(data)
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (slug: string) => deleteProduct(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IProductInfoUpdate) => updateProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvedProductRequisition'] })
    }
  })
}

export const useUnits = () => {
  return useQuery({
    queryKey: ['units'],
    queryFn: () => getAllUnit()
  })
}
