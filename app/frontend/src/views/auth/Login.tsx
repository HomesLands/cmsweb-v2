import React from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'

import { loginSChema } from '@/schemas'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import backgroundImage from '@/assets/images/login-background.png'
import { LoginForm } from '@/components/app/form'
import { loginForm } from '@/api/auth'
import { ILogin } from '@/types'
import { useUserStore } from '@/stores'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSChema>) => {
      return loginForm(data)
    },
    onSuccess: (data: ILogin) => {
      console.log(data)
      useUserStore.getState().setToken(data.result.token)
      useUserStore.getState().setExpireTime(data.result.expireTime)
      navigate('/')
    }
  })

  const handleSubmit = (data: z.infer<typeof loginSChema>) => {
    mutation.mutate(data)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <img src={backgroundImage} className="absolute top-0 left-0 object-fill w-full h-full" />
      <div className="relative z-10 flex items-center justify-center w-full h-full ">
        <Card className="min-w-[24rem] mx-auto border-none shadow-xl backdrop-blur-xl">
          <CardHeader title="Đăng nhập">
            <CardTitle className="text-2xl"> Đăng nhập </CardTitle>
            <CardDescription> Nhập thông tin để đăng nhập vào hệ thống </CardDescription>
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
