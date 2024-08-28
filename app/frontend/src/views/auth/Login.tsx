import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NavLink } from 'react-router-dom'

import { LoginSChema } from '@/schemas/auth/auth.schema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
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
          <Card className="max-w-sm md:min-w-[400px] md:min-h-[400px] mx-auto border-none">
            <CardHeader title="Login">
              <CardTitle className="text-2xl"> Login </CardTitle>
              <CardDescription>
                {' '}
                Enter your username below to login to your account{' '}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Username</Label>
                  <Input {...register('username')} type="text" placeholder="Enter your username" />
                  <span></span>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label>Password</Label>
                    <NavLink
                      to="/auth/forgot-password"
                      className="inline-block ml-auto text-sm underline"
                    >
                      Forgot your password?
                    </NavLink>
                  </div>
                  <Input
                    {...register('password')}
                    type="password"
                    placeholder="Enter your password"
                  />
                  <span></span>
                </div>
                <Button type="submit">Sign in</Button>
                <Button variant="outline"> Login with Google </Button>
              </div>
              <div className="mt-4 text-sm text-center">
                Don't have an account?
                <NavLink to="/auth/register" className="underline">
                  {' '}
                  Sign up{' '}
                </NavLink>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}

export default Login
