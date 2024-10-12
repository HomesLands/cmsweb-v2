import { useMutation, useQuery } from '@tanstack/react-query'

import { createDepartment, getDepartments } from '@/api/departments'
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
