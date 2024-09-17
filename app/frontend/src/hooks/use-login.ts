import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { IApiResponse, ILoginRequest, ILoginResponse } from '@/types'
import { loginApi } from '@/api/auth'
import { useUserStore } from '@/stores'
import { showToast } from '@/utils'

export const useLogin = () => {
  const { setToken, setRefreshToken, setExpireTime } = useUserStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: ILoginRequest) => {
      return loginApi(data)
    },
    onSuccess: (data: IApiResponse<ILoginResponse>) => {
      setToken(data.result.token)
      setRefreshToken(data.result.refreshToken)
      setExpireTime(data.result.expireTime)
      navigate('/product-requisitions/list')
      showToast('Đăng nhập thành công')
    },
    onError: (error) => {
      console.log({ error })
    }
  })
}
