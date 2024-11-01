import { SquarePen, TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui'
import { IConfirmChangePassword } from '@/types'

export function DialogConfirmChangePassword({
  isOpen,
  onConfirm,
  onClose
}: {
  password: IConfirmChangePassword
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
}) {
  const { t } = useTranslation('account')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[36rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-6 text-destructive">
            <div className="flex items-center gap-2">
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
        <DialogFooter className="flex flex-row justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            {t('account.cancel')}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {t('account.confirmChangePassword')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
