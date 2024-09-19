import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getBySlug, getUsers } from '@/api/users'
import { IUserQuery } from '@/types'

export const useUsers = (q: IUserQuery) => {
  return useQuery({
    queryKey: ['users', JSON.stringify(q)],
    queryFn: () => getUsers(q),
    placeholderData: keepPreviousData
  })
}

// export const useUsers2 = () => {
//   return useQuery({
//     queryKey: ['users2'],
//     queryFn: () => getUsers2()
//   })
// }

export const useUserBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['users', slug],
    queryFn: () => getBySlug(slug)
  })
}
