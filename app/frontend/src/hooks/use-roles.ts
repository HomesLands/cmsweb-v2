import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createRole, deleteRole, getRoles, updateRole } from '@/api'
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: IUpdateRole) => updateRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    }
  })
}

export const useDeleteRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (slug: string) => deleteRole(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    }
  })
}
