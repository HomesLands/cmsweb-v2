import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getProducts } from '@/api/products'
import { IProductQuery } from '@/types'

export const useProducts = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(q)],
    queryFn: () => getProducts(q),
    placeholderData: keepPreviousData
  })
}
