import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getUser, getUserInfoPermission, getUsers } from '@/api'
import { IQuery } from '@/types'
import { useAuthStore } from '@/stores'

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

export const useUserInfoPermission = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: ['user-info-permission'],
    queryFn: () => getUserInfoPermission(),
    select: (data) => data.result,
    enabled: isAuthenticated() // Only run the query if the user is authenticated
  })
}
