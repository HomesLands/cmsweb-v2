import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createDepartment, deleteDepartment, getDepartments } from '@/api'
import { ICreateDepartment } from '@/types'

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: () => getDepartments()
  })
}

export const useCreateDepartment = () => {
  return useMutation({ mutationFn: (data: ICreateDepartment) => createDepartment(data) })
}

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ICreateDepartment) => createDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
    }
  })
}

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (slug: string) => deleteDepartment(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
    }
  })
}
