import { useMutation } from '@tanstack/react-query'

import { IRegisterRequest } from '@/types'
import { registerApi } from '@/api'

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: IRegisterRequest) => {
      return registerApi(data)
    }
  })
}
