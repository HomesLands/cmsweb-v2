import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { CreateAuthorityForm, CreateResourceForm } from '@/components/app/form'
import { TCreateAuthoritySchema, TCreateResourceSchema } from '@/schemas'
import { ICreateAuthority, ICreateResource } from '@/types'
import { useCreateAuthority, useCreateResource } from '@/hooks'
import toast from 'react-hot-toast'
import { DialogConfirmCreateResource } from '@/components/app/dialog'

const CreateResource: React.FC = () => {
  const { t } = useTranslation(['resources'])
  const { mutate: createResource } = useCreateResource()
  const [openDialog, setOpenDialog] = useState(false)
  const [resource, setResource] = useState<ICreateResource | null>(null)

  const handleConfirmCreateResource = (values: TCreateResourceSchema) => {
    const requestData = { ...values } as ICreateResource
    createResource(requestData, {
      onSuccess: () => {
        toast.success(t('resources.createResourceSuccessfully'))
      }
    })
  }

  const onSubmit = (values: ICreateResource) => {
    setResource(values)
    setOpenDialog(true)
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full border-b">
          <div className="flex flex-col gap-2 items-start py-2">
            <CardTitle>{t('resources.createResource')}</CardTitle>
            <CardDescription>{t('resources.createResourceDescription')}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CreateResourceForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
      <DialogConfirmCreateResource
        handleCreateResource={handleConfirmCreateResource}
        openDialog={openDialog}
        resource={resource}
        onOpenChange={() => setOpenDialog(!openDialog)}
      />
    </div>
  )
}

export default CreateResource
