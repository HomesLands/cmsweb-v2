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

import { UpdateProductRequisitionForm } from '@/components/app/form'
import {
  IRequestProductInfo,
  IRequestProductInfoUpdate,
  IUpdateProductRequisitionQuantity
} from '@/types'

interface DialogUpdateRequisitionProps {
  handleEditProduct: (product: IUpdateProductRequisitionQuantity) => void
  openDialog: boolean
  requisition: IRequestProductInfoUpdate
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogUpdateProductRequisition({
  handleEditProduct,
  openDialog,
  requisition,
  component,
  onOpenChange
}: DialogUpdateRequisitionProps) {
  const { t } = useTranslation('productRequisition')
  console.log('requisition', requisition)

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
            <UpdateProductRequisitionForm onSubmit={handleEditProduct} data={requisition} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
