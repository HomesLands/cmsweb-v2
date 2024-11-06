import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { ICreateSite } from '@/types'
import { useCreateSite } from '@/hooks'
import { CreateSiteForm } from '@/components/app/form'
import { showToast } from '@/utils'
import { DialogConfirmCreateSite } from '@/components/app/dialog/dialog-confirm-create-site'

const CreateSite: React.FC = () => {
  const { t } = useTranslation(['sites'])
  const { t: tToast } = useTranslation(['toast'])
  const { mutate: createSite } = useCreateSite()
  const [openDialog, setOpenDialog] = useState(false)
  const [site, setSite] = useState<ICreateSite | null>(null)

  const handleConfirmCreateSite = (values: ICreateSite) => {
    createSite(values, {
      onSuccess: () => {
        showToast(tToast('toast.createSiteSuccessfully'))
      }
    })
  }

  const onSubmit = (values: ICreateSite) => {
    setSite(values)
    setOpenDialog(true)
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between w-full border-b">
          <div className="flex flex-col items-start gap-2 py-2">
            <CardTitle>{t('sites.createSite')}</CardTitle>
            <CardDescription>{t('sites.createSiteDescription')}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CreateSiteForm onSubmitCreateSite={onSubmit} />
        </CardContent>
      </Card>
      <DialogConfirmCreateSite
        handleCreateSite={handleConfirmCreateSite}
        openDialog={openDialog}
        site={site}
        onOpenChange={() => setOpenDialog(!openDialog)}
      />
    </div>
  )
}

export default CreateSite
