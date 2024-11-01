import { TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

interface DialogConfirmBackupDbProps {
  handleBackupDb: () => void
  openDialog: boolean
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogConfirmBackupDb({
  handleBackupDb,
  openDialog,
  component,
  onOpenChange
}: DialogConfirmBackupDbProps) {
  const { t } = useTranslation('backups')

  const handleSubmit = () => {
    handleBackupDb()
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="max-w-[36rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-6 text-destructive">
            <div className="flex gap-2 items-center">
              <TriangleAlert className="w-6 h-6" />
              {t('backups.confirmDialog.title')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('backups.confirmDialog.warning')}
          </DialogDescription>

          <div className="py-2 text-sm text-gray-500">{t('backups.confirmDialog.description')}</div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>
            {t('backups.confirmDialog.cancel')}
          </Button>
          <Button variant="destructive" onClick={handleSubmit}>
            {t('backups.confirmDialog.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
