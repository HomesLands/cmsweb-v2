import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { ICreateDepartment } from '@/types'
import { DialogConfirmCreateDepartment } from '@/components/app/dialog'
import { useCreateDepartment } from '@/hooks/use-departments'
import { CreateDepartmentForm } from '@/components/app/form/create-department-form'
import { showToast } from '@/utils'

const CreateDepartment: React.FC = () => {
  const { t } = useTranslation(['department'])
  const { t: tToast } = useTranslation(['toast'])
  const { mutate: createDepartment } = useCreateDepartment()
  const [openDialog, setOpenDialog] = useState(false)
  const [department, setDepartment] = useState<ICreateDepartment | null>(null)

  const handleConfirmCreateDepartment = (values: ICreateDepartment) => {
    createDepartment(values, {
      onSuccess: () => {
        showToast(tToast('toast.createDepartmentSuccessfully'))
      }
    })
  }

  const onSubmit = (values: ICreateDepartment) => {
    setDepartment(values)
    setOpenDialog(true)
  }

  return (
    <div className="flex flex-col gap-4 mt-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between w-full border-b">
          <div className="flex flex-col items-start gap-2 py-2">
            <CardTitle>{t('department.create')}</CardTitle>
            <CardDescription>{t('department.createDescription')}</CardDescription>
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
