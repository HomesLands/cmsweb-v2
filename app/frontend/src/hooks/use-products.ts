import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  getAllProduct,
  getConstructionListInProductRequisition,
  getProductList,
  // getProductList,
  getProducts,
  getProjectListInProductRequisition
} from '@/api/products'
import { IProductQuery, IUserQuery } from '@/types'

export const useProducts = (q: IUserQuery) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(q)],
    queryFn: () => getProducts(q),
    placeholderData: keepPreviousData
  })
}

export const useProductList = (q: IUserQuery) => {
  const { data, isLoading } = useQuery({
    queryKey: ['productList', JSON.stringify(q)],
    queryFn: () => getProductList(q),
    placeholderData: keepPreviousData
  })

  return { data, isLoading }
}

export const useAllProductList = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['allProductList', JSON.stringify(q)],
    queryFn: () => getAllProduct(q),
    placeholderData: keepPreviousData
  })
}

export const useProjectList = () => {
  return useQuery({
    queryKey: ['projectList'],
    queryFn: () => getProjectListInProductRequisition(),
    placeholderData: keepPreviousData
  })
}

export const useSiteList = () => {
  return useQuery({
    queryKey: ['siteList'],
    queryFn: () => getConstructionListInProductRequisition(),
    placeholderData: keepPreviousData
  })
}
