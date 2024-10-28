import React, { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
import _ from 'lodash'

import { loginSChema } from '@/schemas'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { LoginBackground } from '@/assets/images'
import { LoginForm } from '@/components/app/form'
import { useLogin, useUser, useUserInfoPermission } from '@/hooks'
import { IApiResponse, ILoginResponse, IUserInfo } from '@/types'
import { useAuthStore, useThemeStore, useUserInfoPermissionsStore, useUserStore } from '@/stores'
import { ROUTE } from '@/constants'
import { showErrorToast, showToast } from '@/utils'
import { cn } from '@/lib/utils'

const Login: React.FC = () => {
  const { t } = useTranslation(['auth'])
  const { setToken, setRefreshToken, setExpireTime, setExpireTimeRefreshToken, setSlug } =
    useAuthStore()
  const { getTheme } = useThemeStore()
  const { isAuthenticated } = useAuthStore()

  const { setUserRoles } = useUserInfoPermissionsStore()
  const { setUserInfo } = useUserStore()
  const navigate = useNavigate()
  const loginMutation = useLogin()
  const [isLoading, setIsLoading] = useState(false)
  const { refetch: refetchUserInfoPermission } = useUserInfoPermission()
  const { refetch: refetchUserInfo } = useUser()

  const handleSubmit = async (data: z.infer<typeof loginSChema>) => {
    setIsLoading(true)
    try {
      const response: IApiResponse<ILoginResponse> = await loginMutation.mutateAsync(data)

      // Save to auth store
      const decodedToken = jwtDecode(response.result.token) as { sub: string }
      setSlug(decodedToken.sub)
      setToken(response.result.token)
      setRefreshToken(response.result.refreshToken)
      setExpireTime(response.result.expireTime)
      setExpireTimeRefreshToken(response.result.expireTimeRefreshToken)

      // Fetch user info and permissions
      const { data: userRoles } = await refetchUserInfoPermission()
      const { data: userInfo } = await refetchUserInfo()
      setUserRoles(Array.isArray(userRoles) ? userRoles : []) // Handle roles being non-array safely
      setUserInfo(userInfo as IUserInfo)

      navigate(ROUTE.HOME, { replace: true })
      toast.success(t('login.loginSuccess'))
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          showToast(error.response?.data?.errorCode)
          return
        }
        if (error.code === 'ERR_NETWORK') {
          showErrorToast(error.response?.data?.errorCode)
          return
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Redirect if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate(ROUTE.HOME, { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <img src={LoginBackground} className="absolute top-0 left-0 w-full h-full sm:object-fill" />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <Card className="sm:min-w-[24rem] mx-auto border-none shadow-xl backdrop-blur-xl">
          <CardHeader>
            <CardTitle className={cn('text-2xl', getTheme() === 'light' ? 'text-black' : '')}>
              {t('login.title')}{' '}
            </CardTitle>
            <CardDescription> {t('login.description')} </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
