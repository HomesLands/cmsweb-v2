import { useTranslation } from 'react-i18next'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea
} from '@/components/ui'
import { IProductInfo, IProductInfoCreate, IProductInfoUpdate } from '@/types'
import { UpdateProductInfoForm } from '@/components/app/form'

interface DialogUpdateProductProps {
  openDialog: boolean
  handleEditProduct: (product: IProductInfoUpdate) => void
  product?: IProductInfo | null
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogUpdateProduct({
  handleEditProduct,
  openDialog,
  product,
  component,
  onOpenChange
}: DialogUpdateProductProps) {
  const { t } = useTranslation('products')

  const handleSubmit = (values: IProductInfoUpdate) => {
    handleEditProduct(values)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[95vw] p-0 sm:max-w-[64rem]">
        <ScrollArea className="max-w-[95vw] max-h-[90vh] sm:max-h-[80vh]">
          <div className="p-3 sm:p-6">
            <DialogHeader className="max-w-[90vw]">
              <DialogTitle className="text-base sm:text-xl">
                {t('requisitionDetail.requestDetail')}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-base">
                {t('requisitionDetail.requestDetailDescription')}
              </DialogDescription>
            </DialogHeader>
            <UpdateProductInfoForm data={product || undefined} onSubmit={handleSubmit} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
