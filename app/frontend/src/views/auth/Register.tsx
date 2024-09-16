import React from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { LoginBackground } from '@/assets/images'
import { RegisterForm } from '@/components/app/form'
import { IRegisterRequest } from '@/types'
import { useRegister } from '@/hooks'

const Register: React.FC = () => {
  const { t } = useTranslation(['auth'])
  const mutation = useRegister()

  const handleSubmit = async (data: IRegisterRequest) => {
    await mutation.mutateAsync(data)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <img src={LoginBackground} className="absolute top-0 left-0 object-fill w-full h-full" />
      <div className="relative z-10 flex items-center justify-center w-full h-full ">
        <Card className="mx-auto border-none shadow-xl backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl"> {t('register.title')} </CardTitle>
            <CardDescription className="">{t('register.description')}</CardDescription>
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
