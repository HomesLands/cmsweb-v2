import React from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { loginSChema } from '@/schemas'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { LoginBackground } from '@/assets/images'
import { LoginForm } from '@/components/app/form'
import { loginForm } from '@/api/auth'
import { ILogin } from '@/types'
import { useUserStore } from '@/stores'

const Login: React.FC = () => {
  const { setToken, setRefreshToken, setExpireTime } = useUserStore()
  const { t } = useTranslation(['auth'])
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSChema>) => {
      return loginForm(data)
    },
    onSuccess: (data: ILogin) => {
      setToken(data.result.token)
      setRefreshToken(data.result.refreshToken)
      setExpireTime(data.result.expireTime)
      navigate('/')
    },
    onError: (error) => {
      console.log('Check error: ', error)
    }
  })

  const handleSubmit = (data: z.infer<typeof loginSChema>) => {
    mutation.mutate(data)
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
