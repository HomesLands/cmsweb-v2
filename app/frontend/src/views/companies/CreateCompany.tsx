import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { CreateCompanyForm } from '@/components/app/form'
import { ICreateCompany } from '@/types'
import { useCreateCompany } from '@/hooks'
import { showToast } from '@/utils'
import { DialogConfirmCreateCompany } from '@/components/app/dialog'

const CreateCompany: React.FC = () => {
  const { t } = useTranslation(['companies'])
  const { t: tToast } = useTranslation(['toast'])
  const { mutate: createCompany } = useCreateCompany()
  const [openDialog, setOpenDialog] = useState(false)
  const [company, setCompany] = useState<ICreateCompany | null>(null)

  const handleConfirmCreateCompany = (values: ICreateCompany) => {
    createCompany(values, {
      onSuccess: () => {
        showToast(tToast('toast.createCompanySuccessfully'))
      }
    })
  }

  const onSubmit = (values: ICreateCompany) => {
    setCompany(values)
    setOpenDialog(true)
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full border-b">
          <div className="flex flex-col gap-2 items-start py-2">
            <CardTitle>{t('companies.createCompany')}</CardTitle>
            <CardDescription>{t('companies.createCompanyDescription')}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CreateCompanyForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
      <DialogConfirmCreateCompany
        handleCreateCompany={handleConfirmCreateCompany}
        openDialog={openDialog}
        company={company}
        onOpenChange={() => setOpenDialog(!openDialog)}
      />
    </div>
  )
}

export default CreateCompany
