import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea
} from '@/components/ui'

import { IProductRequisitionInfo } from '@/types'
import { EditProductRequisitionForm } from '@/components/app/form'
import { useRequisitionStore } from '@/stores'
import { useState } from 'react'

export function DialogEditProductRequisition({
  product
}: {
  product: IProductRequisitionInfo | null
}) {
  const { t } = useTranslation('tableData')
  const { updateProductToRequisition } = useRequisitionStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = (data: IProductRequisitionInfo) => {
    updateProductToRequisition(data, data.requestQuantity)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          {t('tableData.editProduct')}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md max-w-[20rem] sm:max-w-[60rem]">
        <ScrollArea className="max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{t('tableData.editProduct')}</DialogTitle>
            <DialogDescription>{t('tableData.editProductDescription')}</DialogDescription>
          </DialogHeader>
          <EditProductRequisitionForm
            data={product || undefined}
            onSubmit={(data: IProductRequisitionInfo) => handleConfirm(data)}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
