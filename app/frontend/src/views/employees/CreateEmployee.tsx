import React from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { CreateEmployeeForm } from '@/components/app/form'
import { TRegisterSchema } from '@/schemas'
import { useRegister } from '@/hooks'
import toast from 'react-hot-toast'
import { IRegisterRequest } from '@/types'

const CreateEmployee: React.FC = () => {
  const { t } = useTranslation(['employees'])
  const mutation = useRegister()

  const onSubmit = (values: TRegisterSchema) => {
    const requestData = { ...values } as IRegisterRequest
    console.log({ requestData })
    mutation.mutate(requestData, {
      onSuccess: () => {
        toast.success('Tạo nhân viên thành công')
      }
    })
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full border-b font-beVietNam">
          <div className="flex flex-col gap-1 items-start py-2">
            <CardTitle>{t('employees.createUser')}</CardTitle>
            <CardDescription>{t('employees.CreateUserDescription')}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CreateEmployeeForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateEmployee
