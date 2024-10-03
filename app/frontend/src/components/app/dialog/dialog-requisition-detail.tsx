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

import { RequisitionDetailForm, RequisitionEditForm } from '@/components/app/form'
import { IProductRequisitionFormInfo } from '@/types'

interface DialogRequisitionDetailProps {
  isEditing?: boolean
  openDialog: boolean
  requisition?: IProductRequisitionFormInfo | null
  component: React.ReactNode
  companyName: string
  onOpenChange: () => void
}

export function DialogRequisitionDetail({
  isEditing,
  openDialog,
  requisition,
  component,
  companyName,
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
            <RequisitionDetailForm companyName={companyName} data={requisition || undefined} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
