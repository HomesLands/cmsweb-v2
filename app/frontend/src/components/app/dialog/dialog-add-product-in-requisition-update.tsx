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
import { IProductInfo, IProductRequisitionInfo, IAddNewProductInRequisitionUpdate } from '@/types'
import { useRequisitionStore } from '@/stores'
import { useTranslation } from 'react-i18next'
import { useAddNewProductInRequisitionUpdate } from '@/hooks'
import { showToast } from '@/utils'

interface DialogAddProductRequestProps {
  openDialog: boolean
  product?: IProductInfo | null
  formSlug: string
  component: React.ReactNode
  handleAddNewProduct: (data: IAddNewProductInRequisitionUpdate) => void
  onOpenChange: () => void
}

export function DialogAddProductInRequisitionUpdate({
  openDialog,
  product,
  formSlug,
  component,
  handleAddNewProduct,
  onOpenChange
}: DialogAddProductRequestProps) {
  const { t } = useTranslation('tableData')
  // const { t: tToast } = useTranslation('toast')
  // const { mutate: addNewProduct } = useAddNewProductInRequisitionUpdate(formSlug)
  const handleSubmit = (data: TAddNewProductRequestSchema) => {
    const newProduct: IAddNewProductInRequisitionUpdate = {
      form: formSlug,
      product: product?.slug || '',
      name: data.product.name,
      provider: data.product.provider,
      description: data.product.description,
      unit: data.product.unit.slug,
      requestQuantity: data.requestQuantity
    }
    if (newProduct) {
      handleAddNewProduct(newProduct)
    }
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
          onSubmit={(data: TAddNewProductRequestSchema) => handleSubmit(data)}
        />
      </DialogContent>
    </Dialog>
  )
}
