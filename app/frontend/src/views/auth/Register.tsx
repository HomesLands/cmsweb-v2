import React from 'react'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'

import { registerSchema } from '@/schemas'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'

import backgroundImage from '@/assets/images/login-background.png'
import { RegisterForm } from '@/components/app/form'
import { registerForm } from '@/api/auth'

const Register: React.FC = () => {
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof registerSchema>) => {
      return registerForm(data)
    }
  })

  const handleSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log('Submitted Data:', data)
    mutation.mutate(data)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <img src={backgroundImage} className="absolute top-0 left-0 object-fill w-full h-full" />
      <div className="relative z-10 flex items-center justify-center w-full h-full ">
        <Card className="mx-auto border-none shadow-xl backdrop-blur-xl">
          <CardHeader title="Login">
            <CardTitle className="text-xl"> Đăng ký tài khoản </CardTitle>
            <CardDescription className="">Nhập thông tin của bạn để tạo tài khoản </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Register
