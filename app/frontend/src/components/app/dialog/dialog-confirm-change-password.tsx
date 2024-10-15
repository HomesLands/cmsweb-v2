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

import { IConfirmChangePassword } from '@/types'

interface DialogDeleteProductInRequisitionUpdateProps {
  handleConfirmChangePassword: (password: IConfirmChangePassword) => void
  openDialog: boolean
  password: IConfirmChangePassword | null
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogConfirmChangePassword({
  handleConfirmChangePassword,
  openDialog,
  password,
  component,
  onOpenChange
}: DialogDeleteProductInRequisitionUpdateProps) {
  const { t } = useTranslation('account')

  const handleSubmit = (data: IConfirmChangePassword) => {
    handleConfirmChangePassword(data)
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
              {t('account.changePassword')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('account.changePasswordWarning')}
          </DialogDescription>

          <div className="py-2 text-sm text-gray-500">
            {t('account.changePasswordConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>
            {t('account.cancel')}
          </Button>
          <Button variant="destructive" onClick={() => password && handleSubmit(password)}>
            {t('account.confirmChangePassword')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
