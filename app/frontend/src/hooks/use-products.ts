import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getProductList, getProducts } from '@/api/products'
import { IUserQuery } from '@/types'

export const useProducts = (q: IUserQuery) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(q)],
    queryFn: () => getProducts(q),
    placeholderData: keepPreviousData
  })
}

export const useProductList = (q: IUserQuery) => {
  return useQuery({
    queryKey: ['productList', JSON.stringify(q)],
    queryFn: () => getProductList(q),
    placeholderData: keepPreviousData
  })
}
