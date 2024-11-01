import { useTranslation } from 'react-i18next'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
  DialogFooter
} from '@/components/ui'

export function DialogLogout({
  open,
  setOpen,
  handleLogout
}: {
  open: boolean
  setOpen: (open: boolean) => void
  handleLogout: () => void
}) {
  const { t } = useTranslation('auth')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-lg max-w-[18rem] sm:max-w-[28rem] sm:max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>{t('logout.title')}</DialogTitle>
          <DialogDescription>{t('logout.description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-2 justify-between sm:justify-end">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => setOpen(false)}>
            {t('logout.cancel')}
          </Button>
          <Button variant="destructive" className="w-full sm:w-auto" onClick={() => handleLogout()}>
            {t('logout.title')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
