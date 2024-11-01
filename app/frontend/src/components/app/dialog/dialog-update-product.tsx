import { useTranslation } from 'react-i18next'
import { SquarePen } from 'lucide-react'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea
} from '@/components/ui'
import { IProductInfo, IProductInfoUpdate } from '@/types'
import { UpdateProductInfoForm } from '@/components/app/form'
import { useUpdateProduct } from '@/hooks'
import { showToast } from '@/utils'
import { useState } from 'react'

export default function DialogUpdateProduct({ product }: { product: IProductInfo | null }) {
  const { t } = useTranslation('products')
  const { t: tToast } = useTranslation('toast')
  const { mutate: updateProductMutation } = useUpdateProduct()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (values: IProductInfoUpdate) => {
    setIsOpen(false)
    updateProductMutation(values, {
      onSuccess: () => {
        showToast(tToast('toast.updateProductSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <SquarePen className="icon" />
          {t('products.edit')}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[95vw] p-0 sm:max-w-[64rem]">
        <ScrollArea className="max-w-[95vw] max-h-[90vh] sm:max-h-[80vh]">
          <div className="p-3 sm:p-6">
            <DialogHeader className="max-w-[90vw]">
              <DialogTitle className="text-base sm:text-xl">{t('products.editTitle')}</DialogTitle>
              <DialogDescription className="text-xs sm:text-base">
                {t('products.editDescription')}
              </DialogDescription>
            </DialogHeader>
            <UpdateProductInfoForm data={product || undefined} onSubmit={handleSubmit} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
