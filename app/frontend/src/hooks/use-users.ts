import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getUser, getUsers } from '@/api'
import { IQuery } from '@/types'

export const useUsers = (q: IQuery) => {
  return useQuery({
    queryKey: ['users', JSON.stringify(q)],
    queryFn: () => getUsers(q),
    placeholderData: keepPreviousData
  })
}

export const useUser = () => {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: () => getUser()
  })
}
