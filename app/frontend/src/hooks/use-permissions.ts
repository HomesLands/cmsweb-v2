import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createPermission, deletePermission, getPermissions, updatePermission } from '@/api'
import { ICreatePermission, IQuery, IUpdatePermission } from '@/types'

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

export const useUpdatePermission = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: IUpdatePermission) => updatePermission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] })
    }
  })
}

export const useDeletePermission = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (slug: string) => {
      return deletePermission(slug)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] })
    }
  })
}
