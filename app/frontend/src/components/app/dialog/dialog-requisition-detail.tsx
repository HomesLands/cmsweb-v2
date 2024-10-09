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
  const { t } = useTranslation('productRequisition')

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[95vw] p-0 sm:max-w-[64rem]">
        <ScrollArea className="max-w-[95vw] max-h-[90vh] sm:max-h-[80vh]">
          <div className="p-3 sm:p-6">
            <DialogHeader className="max-w-[90vw]">
              <DialogTitle className="text-base sm:text-xl">
                {t('requisitionDetail.requestDetail')}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-base">
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
