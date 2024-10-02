import React from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { CreatePermissionForm } from '@/components/app/form'
import { TCreateAuthoritySchema } from '@/schemas'
import { ICreateAuthority } from '@/types'
import { useCreateAuthority } from '@/hooks'
import toast from 'react-hot-toast'

const CreatePermission: React.FC = () => {
  const { t } = useTranslation(['permissions'])
  const mutation = useCreateAuthority()

  const onSubmit = (values: TCreateAuthoritySchema) => {
    const requestData = { ...values } as ICreateAuthority
    mutation.mutate(requestData, {
      onSuccess: () => {
        toast.success(t('permissions.createPermissionSuccessfully'))
      }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between w-full border-b">
          <div className="flex flex-col items-start gap-2 py-2">
            <CardTitle>{t('permissions.createPermission')}</CardTitle>
            <CardDescription>{t('permissions.createPermissionDescription')}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CreatePermissionForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  )
}

export default CreatePermission
