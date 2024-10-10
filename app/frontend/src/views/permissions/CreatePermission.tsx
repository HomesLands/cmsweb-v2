import React from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { CreatePermissionForm } from '@/components/app/form'
import { TCreatePermissionSchema } from '@/schemas'
import { ICreatePermission } from '@/types'
import { useCreatePermission } from '@/hooks'

const CreatePermission: React.FC = () => {
  const { t } = useTranslation(['permissions'])
  const mutation = useCreatePermission()

  const onSubmit = (values: TCreatePermissionSchema) => {
    const requestData = {
      resourceSlug: values.resource.value,
      authoritySlug: values.authority.value,
      requiredOwner: values.requiredOwner
    } as ICreatePermission
    mutation.mutate(requestData, {
      onSuccess: () => {
        toast.success(t('permissions.createPermissionSuccessfully'))
      }
    })
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full border-b">
          <div className="flex flex-col gap-2 items-start py-2">
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
