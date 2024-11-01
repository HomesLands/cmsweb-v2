import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button
} from '@/components/ui'
import { IProductInfoCreate } from '@/types'

interface DialogConfirmProductProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  productData: IProductInfoCreate | null
}

export const DialogConfirmAddProduct: React.FC<DialogConfirmProductProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productData
}) => {
  const { t } = useTranslation('products')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('products.confirmProductTitle')}</DialogTitle>
          <DialogDescription>{t('products.confirmProductDescription')}</DialogDescription>
        </DialogHeader>

        {productData && (
          <div className="py-4">
            <table className="p-2 w-full">
              <tbody>
                <tr className="leading-8">
                  <td className="pr-4 font-semibold">{t('products.code')}</td>
                  <td className="text-sm text-muted-foreground">{productData.code}</td>
                </tr>
                <tr className="leading-8">
                  <td className="pr-4 font-semibold">{t('products.name')}</td>
                  <td className="text-sm text-muted-foreground">{productData.name}</td>
                </tr>
                <tr className="leading-8">
                  <td className="pr-4 font-semibold">{t('products.provider')}</td>
                  <td className="text-sm text-muted-foreground">{productData.provider}</td>
                </tr>
                <tr className="leading-8">
                  <td className="pr-4 font-semibold">{t('products.unit')}</td>
                  <td className="text-sm text-muted-foreground">{productData.unit.name}</td>
                </tr>
                <tr className="leading-8">
                  <td className="pr-4 font-semibold">{t('products.description')}</td>
                  <td className="text-sm text-muted-foreground">{productData.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('products.confirmProductCancel')}
          </Button>
          <Button onClick={onConfirm}>{t('products.confirmProductCreate')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
