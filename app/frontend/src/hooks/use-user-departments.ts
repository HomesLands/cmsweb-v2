import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createUserDepartment, deleteUserDepartment, updateUserDepartment } from '@/api'
import { ICreateUserDepartment, IUpdateUserDepartment } from '@/types'

export const useCreateUserDepartment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: ICreateUserDepartment) => createUserDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}

export const useUpdateUserDepartment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: IUpdateUserDepartment) => updateUserDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}

export const useDeleteUserDepartment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (slug: string) => deleteUserDepartment(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}
