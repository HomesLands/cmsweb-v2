import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

import { createAuthority, getAuthorities } from '@/api'
import { ICreateAuthority, IQuery } from '@/types'

export const useAuthorites = (q: IQuery) => {
  return useQuery({
    queryKey: ['authorities', JSON.stringify(q)],
    queryFn: () => getAuthorities(q),
    placeholderData: keepPreviousData,
    select: (data) => data.result
  })
}

export const useCreateAuthority = () => {
  return useMutation({
    mutationFn: async (data: ICreateAuthority) => {
      return createAuthority(data)
    }
  })
}
