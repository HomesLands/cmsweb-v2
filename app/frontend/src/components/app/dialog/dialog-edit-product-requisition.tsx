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
import { AddNewProductRequestForm, EditProductRequisitionForm } from '@/components/app/form'

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
  const { t } = useTranslation('tableData')

  const handleConfirm = (data: IProductRequisitionInfo) => {
    handleEditProduct(data)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="rounded-md max-w-[20rem] sm:max-w-[60rem]">
        <DialogHeader>
          <DialogTitle>{t('tableData.editProduct')}</DialogTitle>
          <DialogDescription>{t('tableData.editProductDescription')}</DialogDescription>
        </DialogHeader>
        <EditProductRequisitionForm
          data={requisition || undefined}
          onSubmit={(data: IProductRequisitionInfo) => handleConfirm(data)}
        />
      </DialogContent>
    </Dialog>
  )
}
