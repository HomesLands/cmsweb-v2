import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getUsers } from '@/api/users'
import { IUserQuery } from '@/types'

export const useUsers = (q: IUserQuery) => {
  return useQuery({
    queryKey: ['users', JSON.stringify(q)],
    queryFn: () => getUsers(q),
    placeholderData: keepPreviousData
  })
}
