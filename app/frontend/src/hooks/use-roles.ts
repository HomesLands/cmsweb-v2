import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

import { createRole, getRoles } from '@/api'
import { ICreateRole, IQuery } from '@/types'

export const useRoles = (q: IQuery) => {
  return useQuery({
    queryKey: ['roles', JSON.stringify(q)],
    queryFn: () => getRoles(q),
    placeholderData: keepPreviousData,
    select: (data) => data.result
  })
}

export const useCreateRole = () => {
  return useMutation({
    mutationFn: async (data: ICreateRole) => {
      return createRole(data)
    }
  })
}
