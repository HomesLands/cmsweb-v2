import React from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { CreateRoleForm } from '@/components/app/form'
import { TCreateRoleSchema } from '@/schemas'
import { ICreateRole } from '@/types'
import { useCreateRole } from '@/hooks'
import toast from 'react-hot-toast'

const CreateRole: React.FC = () => {
  const { t } = useTranslation(['roles'])
  const mutation = useCreateRole()

  const onSubmit = (values: TCreateRoleSchema) => {
    const requestData = { ...values } as ICreateRole
    mutation.mutate(requestData, {
      onSuccess: () => {
        toast.success('Tạo chức vụ thành công')
      }
    })
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full border-b font-beVietNam">
          <div className="flex flex-col gap-1 items-start py-2">
            <CardTitle>{t('roles.createRole')}</CardTitle>
            <CardDescription>{t('roles.CreateRoleDescription')}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CreateRoleForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateRole
