import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/users'
import { getProducts } from '@/api/products'
import { IProductQuery, IUserQuery } from '@/types'

export const useUsers = (q: IUserQuery) => {
  return useQuery({
    queryKey: ['users', JSON.stringify(q)],
    queryFn: () => getUsers(q)
  })
}

export const useProducts = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(q)],
    queryFn: () => getProducts(q),
    placeholderData: keepPreviousData
  })
}
