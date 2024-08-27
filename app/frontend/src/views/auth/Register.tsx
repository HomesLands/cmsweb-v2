import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NavLink } from 'react-router-dom'

import { LoginSChema } from '@/schemas/auth/auth.schema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Register: React.FC = () => {
  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm({
    resolver: zodResolver(LoginSChema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className="auth-layout ">
      {/* <img
        src="@/assets/login-background.png"
        alt="login image"
        className="absolute inset-0 z-10 object-cover w-full h-full"
      /> */}
      <div className="flex items-center justify-center">
        <form onSubmit={onSubmit}>
          <Card className="max-w-sm md:min-w-[600px] md:min-h-[400px] mx-auto border-none">
            <CardHeader title="Login">
              <CardTitle className="text-xl"> Đăng ký tài khoản </CardTitle>
              <CardDescription> Nhập thông tin của bạn để tạo tài khoản </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Họ</Label>
                    <Input
                      {...register('firstName')}
                      type="text"
                      placeholder="Enter your first name"
                    />
                    <span></span>
                  </div>
                  <div className="grid gap-2">
                    <Label>Tên</Label>
                    <Input
                      {...register('lastName')}
                      type="text"
                      placeholder="Enter your last name"
                    />
                    <span></span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input {...register('email')} type="text" placeholder="Enter your email" />
                  <span></span>
                </div>
                <div className="grid gap-2">
                  <Label>Mật khẩu</Label>
                  <Input
                    {...register('password')}
                    type="password"
                    placeholder="Enter your password"
                  />
                  <span></span>
                </div>
                <Button type="submit">Tạo tài khoản</Button>
                <Button variant="outline"> Đăng nhập với Google </Button>
              </div>
              <div className="mt-4 text-sm text-center">
                Bạn đã có tài khoản?
                <NavLink to="/auth/login" className="underline">
                  {' '}
                  Đăng nhập{' '}
                </NavLink>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}

export default Register
