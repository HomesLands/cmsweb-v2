import { useTranslation } from 'react-i18next'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea
} from '@/components/ui'

import { RequisitionDetailForm } from '@/components/app/form'
import { IProductRequisitionFormInfo } from '@/types'

interface DialogRequisitionDetailProps {
  openDialog: boolean
  requisition?: IProductRequisitionFormInfo | null
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogRequisitionDetail({
  openDialog,
  requisition,
  component,
  onOpenChange
}: DialogRequisitionDetailProps) {
  console.log(requisition)
  const { t } = useTranslation('productRequisition')

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="max-w-[64rem] p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{t('requisitionDetail.requestDetail')}</DialogTitle>
              <DialogDescription>
                {t('requisitionDetail.requestDetailDescription')}
              </DialogDescription>
            </DialogHeader>
            <RequisitionDetailForm data={requisition || undefined} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
