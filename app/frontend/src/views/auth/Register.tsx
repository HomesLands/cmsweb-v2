import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NavLink } from 'react-router-dom'

import { loginSChema } from '@/schemas'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Input,
  Button
} from '@/components/ui'

import backgroundImage from '@/assets/images/login-background.png'

const Register: React.FC = () => {
  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSChema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <img src={backgroundImage} className="absolute top-0 left-0 object-fill w-full h-full" />
      <div className="relative z-10 flex items-center justify-center w-full h-full ">
        <form onSubmit={onSubmit} className="w-full max-w-md ">
          <Card className="mx-auto border-none shadow-xl backdrop-blur-xl">
            <CardHeader title="Login">
              <CardTitle className="text-xl"> Đăng ký tài khoản </CardTitle>
              <CardDescription className="">
                {' '}
                Nhập thông tin của bạn để tạo tài khoản{' '}
              </CardDescription>
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
                {/* <Button variant="outline"> Đăng nhập với Google </Button> */}
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
