import { useMutation } from '@tanstack/react-query'

import { ILogoutRequest } from '@/types'
import { logoutApi } from '@/api'

export const useLogout = () => {
  return useMutation({
    mutationFn: async (data: ILogoutRequest) => {
      return await logoutApi(data)
    }
  })
}
