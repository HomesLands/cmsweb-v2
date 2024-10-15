import { TriangleAlert } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui'

import { ICreateSite } from '@/types'
import { useTranslation } from 'react-i18next'

interface DialogConfirmCreateSiteProps {
  handleCreateSite: (site: ICreateSite) => void
  openDialog: boolean
  site: ICreateSite | null
  onOpenChange: () => void
}

export function DialogConfirmCreateSite({
  handleCreateSite,
  openDialog,
  site,
  onOpenChange
}: DialogConfirmCreateSiteProps) {
  const { t } = useTranslation('sites')
  const handleSubmit = (data: ICreateSite) => {
    const completeData: ICreateSite = {
      ...data
    }
    handleCreateSite(completeData)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-primary text-primary">
            <div className="flex gap-2 items-center">
              <TriangleAlert className="w-6 h-6" />
              {t('sites.confirmCreateSite')}
            </div>
          </DialogTitle>

          <div className="py-4 text-sm text-gray-500">
            {t('sites.confirmCreateSiteDescription')}
            <br />
            <span className="font-bold">{site?.name}</span> {t('sites.belongsToCompany')}{' '}
            <span className="font-bold">{site?.companyName}</span>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>
            {t('sites.cancelCreateSite')}
          </Button>
          <Button variant="default" onClick={() => site && handleSubmit(site)}>
            {t('sites.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
