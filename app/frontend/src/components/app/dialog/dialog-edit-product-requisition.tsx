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

import { IProductRequisitionInfo } from '@/types'
import { EditProductRequisitionForm } from '../form/edit-product-requisition-form'

interface DialogRequisitionDetailProps {
  handleEditProduct: (product: IProductRequisitionInfo) => void
  openDialog: boolean
  requisition?: IProductRequisitionInfo | null
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogEditProductRequisition({
  handleEditProduct,
  openDialog,
  requisition,
  component,
  onOpenChange
}: DialogRequisitionDetailProps) {
  const { t } = useTranslation('productRequisition')

  const handleConfirm = (data: IProductRequisitionInfo) => {
    handleEditProduct(data)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="max-w-[64rem] p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{t('productRequisition.productInformation')}</DialogTitle>
              <DialogDescription>
                {requisition?.isExistProduct
                  ? t('productRequisition.existingProductDescription')
                  : t('productRequisition.newProductDescription')}
              </DialogDescription>
            </DialogHeader>
            <EditProductRequisitionForm onSubmit={handleConfirm} data={requisition || undefined} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
