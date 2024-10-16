import { useMutation, useQuery } from '@tanstack/react-query'

import { createRole, getRoles, updateRole } from '@/api'
import { ICreateRole, IQuery, IUpdateRole } from '@/types'

export const useRoles = (q: IQuery) => {
  return useQuery({
    queryKey: ['roles', JSON.stringify(q)],
    queryFn: () => getRoles(q),
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

export const useUpdateRole = () => {
  return useMutation({
    mutationFn: async (data: IUpdateRole) => {
      return updateRole(data)
    }
  })
}
