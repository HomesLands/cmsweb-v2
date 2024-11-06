import { Trash2, TriangleAlert } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { IProductInfo } from '@/types'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useDeleteProduct } from '@/hooks'
import { showToast } from '@/utils'

export default function DialogDeleteProduct({ product }: { product: IProductInfo }) {
  const { t } = useTranslation('products')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteProduct } = useDeleteProduct()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (productSlug: string) => {
    setIsOpen(false)
    // showToast(tToast('toast.deleteProductSuccess'))
    deleteProduct(productSlug, {
      onSuccess: () => {
        showToast(tToast('toast.deleteProductSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <Trash2 className="icon" />
          {t('products.delete')}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('products.delete')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('products.deleteProductDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('products.deleteProductWarning')} <span className="font-bold">{product.name}</span> .
            <br />
            {t('products.deleteProductConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('products.cancel')}
          </Button>
          <Button variant="destructive" onClick={() => product && handleSubmit(product.slug || '')}>
            {t('products.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
