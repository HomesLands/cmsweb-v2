import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
import { IProductInfo } from '@/types'
import { useRequisitionStore } from '@/stores'
import { PlusCircledIcon } from '@radix-ui/react-icons'

export function DialogAddProductRequest({ product }: { product: IProductInfo | null }) {
  const { t } = useTranslation('tableData')
  const [isOpen, setIsOpen] = useState(false)
  const { addProductToRequisition } = useRequisitionStore()
  const handleSubmit = (data: TAddNewProductRequestSchema) => {
    addProductToRequisition(data)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <PlusCircledIcon className="icon" />
        </Button>
      </DialogTrigger>
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
