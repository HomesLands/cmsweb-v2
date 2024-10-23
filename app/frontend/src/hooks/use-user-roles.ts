import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createUserRole, deleteUserRole } from '@/api'
import { ICreateUserRole } from '@/types'

export const useCreateUserRole = () => {
  return useMutation({
    mutationFn: async (data: ICreateUserRole) => {
      return createUserRole(data)
    }
  })
}

export const useDeleteUserRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (slug: string) => deleteUserRole(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}
