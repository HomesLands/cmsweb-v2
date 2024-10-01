import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
  DialogFooter
} from '@/components/ui'
import { useTranslation } from 'react-i18next'

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
      <DialogContent className="max-w-[28rem] max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>{t('logout.title')}</DialogTitle>
          <DialogDescription>{t('logout.description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t('logout.cancel')}
          </Button>
          <Button variant="destructive" onClick={() => handleLogout()}>
            {t('logout.title')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
