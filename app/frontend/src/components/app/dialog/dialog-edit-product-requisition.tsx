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
import {
  IProductRequisitionFormInfo,
  IProductRequisitionInfo,
  IRequestProductInfo,
  IUpdateProductRequisitionQuantity
} from '@/types'
import { EditProductRequisitionForm } from '../form/edit-product-requisition-form'

interface DialogRequisitionDetailProps {
  handleEditProduct: (product: IProductRequisitionInfo) => void
  // isEditing?: boolean
  openDialog: boolean
  requisition?: IProductRequisitionInfo | null
  component: React.ReactNode
  // companyName: string
  onOpenChange: () => void
}

export function DialogEditProductRequisition({
  handleEditProduct,
  openDialog,
  requisition,
  component,
  // companyName,
  onOpenChange
}: DialogRequisitionDetailProps) {
  console.log(requisition)
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
                {t('productRequisition.productInformationDescription')}
              </DialogDescription>
            </DialogHeader>
            <EditProductRequisitionForm
              // onSubmit={handleEditProduct}
              onSubmit={handleConfirm}
              data={requisition || undefined}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
