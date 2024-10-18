import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { TAddNewProductRequestSchema } from '@/schemas'
import { AddNewProductRequestForm } from '@/components/app/form'
import { IProductInfo, IProductRequisitionInfo } from '@/types'
import { useRequisitionStore } from '@/stores'
import { useTranslation } from 'react-i18next'

interface DialogAddProductRequestProps {
  openDialog: boolean
  product?: IProductInfo | null
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogAddProductRequest({
  openDialog,
  product,
  component,
  onOpenChange
}: DialogAddProductRequestProps) {
  const { t } = useTranslation('tableData')
  const { addProductToRequisition } = useRequisitionStore()
  const handleAddRequest = (product: IProductRequisitionInfo) => {
    addProductToRequisition(product)
    onOpenChange()
  }
  const handleSubmit = (data: TAddNewProductRequestSchema) => {
    handleAddRequest(data)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="rounded-md max-w-[20rem] sm:max-w-[60rem]">
        <DialogHeader>
          <DialogTitle>{t('tableData.addNewProduct')}</DialogTitle>
          <DialogDescription>{t('tableData.addNewProductDescription')}</DialogDescription>
        </DialogHeader>
        <AddNewProductRequestForm
          data={product || undefined}
          onSubmit={(data: TAddNewProductRequestSchema) => handleSubmit(data)}
        />
      </DialogContent>
    </Dialog>
  )
}
