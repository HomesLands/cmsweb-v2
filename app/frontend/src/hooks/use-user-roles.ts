import { useMutation } from '@tanstack/react-query'

import { createUserRole } from '@/api'
import { ICreateUserRole } from '@/types'

export const useCreateUserRole = () => {
  return useMutation({
    mutationFn: async (data: ICreateUserRole) => {
      return createUserRole(data)
    }
  })
}
