import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/users'
import { getProducts } from '@/api/products'

export const useUsers = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['users', { page, pageSize }],
    queryFn: () => getUsers({ page, pageSize }),
  })
}

export const useProducts = (page: number, pageSize: number) => {
    return useQuery({
      queryKey: ['products', { page, pageSize }],
      queryFn: () => getProducts({ page, pageSize }),
      placeholderData: keepPreviousData
    })
}
