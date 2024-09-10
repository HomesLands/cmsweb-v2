import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getProducts } from '@/api/products'
import { IUserQuery } from '@/types'
import { getUsers } from '@/api/users'

export const useProducts = (q: IUserQuery) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(q)],
    queryFn: () => getProducts(q),
    placeholderData: keepPreviousData
  })
}
