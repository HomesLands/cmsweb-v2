import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { addNewProductRequestSchema, TAddNewProductRequestSchema } from '@/schemas'
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
    // const completeData: IProductRequisitionInfo = {
    //   ...data,
    //   requestQuantity: Number(data.product.quantity),
    //   // slug: data.product.slug
    //   // unit: {
    //   //   slug: data.unit.slug,
    //   //   name: data.unit.name
    //   // }
    // }
    // handleAddRequest(completeData)
    handleAddRequest(data)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="max-w-[60rem]">
        <DialogHeader>
          <DialogTitle>{t('tableData.addNewProduct')}</DialogTitle>
          <DialogDescription>{t('tableData.addNewProductDescription')}</DialogDescription>
        </DialogHeader>
        <AddNewProductRequestForm
          data={product || undefined}
          onSubmit={(data: IProductRequisitionInfo) => handleSubmit(data)}
        />
      </DialogContent>
    </Dialog>
  )
}
