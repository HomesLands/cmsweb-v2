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

import { UpdateProductRequisitionForm } from '@/components/app/form'
import { IRequestProductInfoUpdate, IUpdateProductRequisitionQuantity } from '@/types'
import { useParams } from 'react-router'
import { useUpdateProductRequisitionQuantity } from '@/hooks'
import { useState } from 'react'
import { SquarePen } from 'lucide-react'

export function DialogUpdateProductRequisition({
  product
}: {
  product: IRequestProductInfoUpdate
}) {
  const { t } = useTranslation('productRequisition')
  const { slug } = useParams()
  const { mutate: updateProduct } = useUpdateProductRequisitionQuantity(slug as string)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (data: IUpdateProductRequisitionQuantity) => {
    setIsOpen(false)
    updateProduct(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="flex justify-start w-full">
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <SquarePen className="icon" />
          {t('productRequisition.updateProduct')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[64rem] p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{t('requisitionDetail.requestDetail')}</DialogTitle>
              <DialogDescription>
                {t('requisitionDetail.requestDetailDescription')}
              </DialogDescription>
            </DialogHeader>
            <UpdateProductRequisitionForm onSubmit={handleSubmit} data={product} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
