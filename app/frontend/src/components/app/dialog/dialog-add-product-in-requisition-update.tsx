import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { TAddNewProductRequestSchema } from '@/schemas'
import { AddNewProductRequestForm } from '@/components/app/form'
import { IProductInfo, IAddNewProductInRequisitionUpdate } from '@/types'
import { useAddNewProductInRequisitionUpdate } from '@/hooks'
import { showToast } from '@/utils'
import { PlusCircledIcon } from '@radix-ui/react-icons'

export function DialogAddProductInRequisitionUpdate({ product }: { product: IProductInfo | null }) {
  const { slug } = useParams()
  const { t } = useTranslation('tableData')
  const { t: tToast } = useTranslation('toast')
  const { mutate: addNewProduct } = useAddNewProductInRequisitionUpdate(slug as string)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (data: TAddNewProductRequestSchema) => {
    const newProduct: IAddNewProductInRequisitionUpdate = {
      form: slug as string,
      product: product?.slug || '',
      name: data.product.name,
      provider: data.product.provider,
      description: data.product.description,
      unit: data.product.unit.slug,
      requestQuantity: data.requestQuantity
    }
    if (newProduct) {
      addNewProduct(newProduct)
    }
    showToast(tToast('toast.addNewProductSuccess'))
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <PlusCircledIcon className="icon" />
        </Button>
      </DialogTrigger>
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
