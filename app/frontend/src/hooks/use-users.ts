import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getUser, getUsers } from '@/api'
import { IUserQuery } from '@/types'

export const useUsers = (q: IUserQuery) => {
  return useQuery({
    queryKey: ['users', JSON.stringify(q)],
    queryFn: () => getUsers(q)
    // placeholderData: keepPreviousData
  })
}

export const useUser = (slug: string) => {
  return useQuery({
    queryKey: ['users', slug],
    queryFn: () => getUser(slug)
  })
}
