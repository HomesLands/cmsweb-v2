import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { addNewProductRequestSchema } from '@/schemas'
import { AddNewProductRequestForm } from '@/components/app/form'
import { IProductRequisitionInfo } from '@/types'
import { useRequisitionStore } from '@/stores'
import { useTranslation } from 'react-i18next'

interface DialogAddProductRequestProps {
  openDialog: boolean
  product?: IProductRequisitionInfo | null
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
  const handleSubmit = (data: z.infer<typeof addNewProductRequestSchema>) => {
    const completeData: IProductRequisitionInfo = {
      ...data,
      description: '',
      requestQuantity: Number(data.requestQuantity),
      unit: {
        slug: data.unit.slug,
        name: data.unit.name
      }
    }
    handleAddRequest(completeData)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="max-w-[44rem]">
        <DialogHeader>
          <DialogTitle>{t('tableData.addNewProduct')}</DialogTitle>
          <DialogDescription>{t('tableData.addNewProductDescription')}</DialogDescription>
        </DialogHeader>
        <AddNewProductRequestForm data={product || undefined} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
