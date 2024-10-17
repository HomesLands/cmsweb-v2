import { useState } from 'react'
import { FileWarningIcon, Loader2, LogOutIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { IconWrapper } from '@/components/app/drawer'
import { Button } from '@/components/ui'
import { useExportDatabase } from '@/hooks'
import { showToast } from '@/utils'
import { DialogConfirmBackupDb } from '@/components/app/dialog'

export default function Backups() {
  const { t } = useTranslation('backups')
  const { t: tToast } = useTranslation('toast')
  const [openDialog, setOpenDialog] = useState(false)
  const { mutate: exportDatabase, isPending: isExporting } = useExportDatabase()

  function handleSubmit() {
    setOpenDialog(true)
  }

  const handleConfirmBackupDb = () => {
    setOpenDialog(false)
    exportDatabase(undefined, {
      onSuccess: () => {
        showToast(tToast('toast.exportDatabaseSuccess'))
      }
    })
  }

  return (
    <div className="mt-5 rounded-sm border border-destructive">
      <div className="p-3 text-white uppercase bg-destructive">
        <span className="flex gap-1 items-center">{t('backups.title')}</span>
      </div>
      <div className="p-3 mt-4 text-sm">
        <p>{t('backups.description')}</p>
        <p className="flex gap-1 items-center mt-2 text-sm text-destructive">
          <IconWrapper Icon={FileWarningIcon} className="w-4 text-destructive" />
          {t('backups.warning')}
        </p>
        <Button
          disabled={isExporting}
          variant="destructive"
          className="flex gap-1 items-center mt-5"
          onClick={handleSubmit}
        >
          {isExporting ? (
            <IconWrapper Icon={Loader2} className="w-4" />
          ) : (
            <IconWrapper Icon={LogOutIcon} className="w-4" />
          )}
          {isExporting ? t('backups.button.loading') : t('backups.button.default')}
        </Button>
      </div>
      <DialogConfirmBackupDb
        handleBackupDb={handleConfirmBackupDb}
        openDialog={openDialog}
        component={null}
        onOpenChange={() => setOpenDialog(false)}
      />
    </div>
  )
}
