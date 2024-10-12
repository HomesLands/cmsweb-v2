import { useMutation } from '@tanstack/react-query'

import { createRolePermission } from '@/api'
import { ICreateRolePermission } from '@/types'

export const useCreateRolePermission = () => {
  return useMutation({
    mutationFn: async (data: ICreateRolePermission) => {
      return createRolePermission(data)
    }
  })
}
