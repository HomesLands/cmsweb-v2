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
import { IRequestRequisitionInfo } from '@/types'

interface DialogRequisitionDetailProps {
  isEditing?: boolean
  openDialog: boolean
  requisition?: IRequestRequisitionInfo | null
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogRequisitionDetail({
  isEditing,
  openDialog,
  requisition,
  component,
  onOpenChange
}: DialogRequisitionDetailProps) {
  const { t } = useTranslation('productRequisition')

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="max-w-[64rem] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t('requisitionEdit.requestEdit') : t('requisitionDetail.requestDetail')}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {isEditing
              ? t('requisitionEdit.requestEditDescription')
              : t('requisitionDetail.requestDetailDescription')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[calc(90vh-120px)]">
          {isEditing ? (
            <RequisitionEditForm data={requisition as IRequestRequisitionInfo} />
          ) : (
            <RequisitionDetailForm data={requisition as IRequestRequisitionInfo} />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
