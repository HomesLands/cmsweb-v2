import { TriangleAlert } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui'

import { ICreateCompany } from '@/types'
import { useTranslation } from 'react-i18next'

interface DialogConfirmCreateCompanyProps {
  handleCreateCompany: (company: ICreateCompany) => void
  openDialog: boolean
  company: ICreateCompany | null
  onOpenChange: () => void
}

export function DialogConfirmCreateCompany({
  handleCreateCompany,
  openDialog,
  company,
  onOpenChange
}: DialogConfirmCreateCompanyProps) {
  const { t } = useTranslation('companies')
  const handleSubmit = (data: ICreateCompany) => {
    const completeData: ICreateCompany = {
      ...data
    }
    handleCreateCompany(completeData)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-primary text-primary">
            <div className="flex gap-2 items-center">
              <TriangleAlert className="w-6 h-6" />
              {t('companies.confirmCreateCompany')}
            </div>
          </DialogTitle>

          <div className="py-4 text-sm text-gray-500">
            {t('companies.confirmCreateCompanyDescription')}
            <br />
            <span className="font-bold">{company?.name}</span>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>
            {t('companies.cancelCreateCompany')}
          </Button>
          <Button variant="default" onClick={() => company && handleSubmit(company)}>
            {t('companies.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
