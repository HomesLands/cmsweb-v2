import { useMutation } from '@tanstack/react-query'

import { ILoginRequest } from '@/types'
import { loginApi } from '@/api'

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: ILoginRequest) => {
      return loginApi(data)
    }
    // meta: {
    //   ignoreGlobalError: true
    // }
  })
}
