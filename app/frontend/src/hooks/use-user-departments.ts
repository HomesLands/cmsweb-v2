import { useMutation } from '@tanstack/react-query'

import { createUserDepartment } from '@/api'
import { ICreateUserDepartment } from '@/types'

export const useCreateUserDepartment = () => {
  return useMutation({
    mutationFn: async (data: ICreateUserDepartment) => {
      return createUserDepartment(data)
    }
  })
}
