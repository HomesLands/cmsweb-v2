import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { IRegisterRequest } from '@/types'
import { registerApi } from '@/api/auth'

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: IRegisterRequest) => {
      return registerApi(data)
    },
    onSuccess: () => {
      navigate('/auth/login')
    },
    onError: (error) => {
      console.log(error)
    }
  })
}
