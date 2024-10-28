import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createRolePermission, deleteRolePermission, updateRolePermission } from '@/api'
import { ICreateRolePermission, IUpdateRolePermission } from '@/types'
import { TDeleteRolePermissionSchema } from '@/schemas'

export const useCreateRolePermission = () => {
  return useMutation({
    mutationFn: async (data: ICreateRolePermission) => {
      return createRolePermission(data)
    }
  })
}

export const useUpdateRolePermission = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: IUpdateRolePermission) => updateRolePermission(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    }
  })
}
export const useDeleteRolePermission = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: TDeleteRolePermissionSchema) => {
      return deleteRolePermission(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    }
  })
}
