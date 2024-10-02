import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

import { createPermission, getPermissions } from '@/api'
import { ICreatePermission, IQuery } from '@/types'

export const usePermissions = (q: IQuery) => {
  return useQuery({
    queryKey: ['permissions', JSON.stringify(q)],
    queryFn: () => getPermissions(q),
    placeholderData: keepPreviousData,
    select: (data) => data.result
  })
}

export const useCreatePermission = () => {
  return useMutation({
    mutationFn: async (data: ICreatePermission) => {
      return createPermission(data)
    }
  })
}
