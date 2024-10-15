import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { ICreateDepartment, ICreateSite } from '@/types'
import { useCreateSite } from '@/hooks'
import { CreateSiteForm } from '@/components/app/form'
import { showToast } from '@/utils'
import { DialogConfirmCreateSite } from '@/components/app/dialog/dialog-confirm-create-site'
import { DialogConfirmCreateDepartment } from '@/components/app/dialog'
import { useCreateDepartment } from '@/hooks/use-departments'
import { CreateDepartmentForm } from '@/components/app/form/create-department-form'

const CreateDepartment: React.FC = () => {
  const { t } = useTranslation(['sites'])
  const { t: tToast } = useTranslation(['toast'])
  const { mutate: createDepartment } = useCreateDepartment()
  const [openDialog, setOpenDialog] = useState(false)
  const [department, setDepartment] = useState<ICreateDepartment | null>(null)

  const handleConfirmCreateDepartment = (values: ICreateDepartment) => {
    createDepartment(values, {
      onSuccess: () => {
        showToast(tToast('toast.createSiteSuccessfully'))
      }
    })
  }

  const onSubmit = (values: ICreateDepartment) => {
    console.log(values)
    setDepartment(values)
    setOpenDialog(true)
  }

  return (
    <div className="flex flex-col gap-4 mt-3">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full border-b">
          <div className="flex flex-col gap-2 items-start py-2">
            <CardTitle>{t('sites.createSite')}</CardTitle>
            <CardDescription>{t('sites.createSiteDescription')}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CreateDepartmentForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
      <DialogConfirmCreateDepartment
        handleCreateDepartment={handleConfirmCreateDepartment}
        openDialog={openDialog}
        department={department}
        onOpenChange={() => setOpenDialog(!openDialog)}
      />
    </div>
  )
}

export default CreateDepartment
