import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Button,
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
  requisition?: IProductRequisitionFormInfo | null
}

export default function DialogRequisitionDetail({ requisition }: DialogRequisitionDetailProps) {
  const { t } = useTranslation('productRequisition')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="flex justify-start w-full px-2">
        <Button
          variant="ghost"
          className="flex justify-start gap-1 text-sm"
          onClick={() => setIsOpen(true)}
        >
          {t('productRequisition.viewDetail')}
        </Button>
      </DialogTrigger>
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
