import React from 'react'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'

import { loginSChema } from '@/schemas'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { LoginBackground } from '@/assets/images'
import { LoginForm } from '@/components/app/form'
import { useLogin } from '@/hooks'
import { IApiResponse, ILoginResponse } from '@/types'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'

const Login: React.FC = () => {
  const { t } = useTranslation(['auth'])
  const { setToken, setRefreshToken, setExpireTime, setExpireTimeRefreshToken, setSlug } =
    useAuthStore()
  const navigate = useNavigate()
  const mutation = useLogin()

  const handleSubmit = async (data: z.infer<typeof loginSChema>) => {
    await mutation.mutateAsync(data, {
      onSuccess: (data: IApiResponse<ILoginResponse>) => {
        // Save to auth store
        const decodedToken = jwtDecode(data.result.token) as { sub: string }
        setSlug(decodedToken.sub)
        setToken(data.result.token)
        setRefreshToken(data.result.refreshToken)
        setExpireTime(data.result.expireTime)
        setExpireTimeRefreshToken(data.result.expireTimeRefreshToken)

        navigate('/product-requisitions/list')
        toast.success(t('login.loginSuccess'))
      }
    })
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <img src={LoginBackground} className="absolute top-0 left-0 object-fill w-full h-full" />
      <div className="relative z-10 flex items-center justify-center w-full h-full ">
        <Card className="min-w-[24rem] mx-auto border-none shadow-xl backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl"> {t('login.title')} </CardTitle>
            <CardDescription> {t('login.description')} </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
