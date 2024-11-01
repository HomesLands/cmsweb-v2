import { SquarePen, TriangleAlert } from 'lucide-react'

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

import { IRequestProductInfo, IRequestProductInfoUpdate } from '@/types'
import { useDeleteProductInRequisition } from '@/hooks'
import { useParams } from 'react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function DialogDeleteProductInRequisitionUpdate({
  product
}: {
  product: IRequestProductInfoUpdate | null
}) {
  const { t } = useTranslation('productRequisition')
  const { slug } = useParams()
  const { mutate: deleteProduct } = useDeleteProductInRequisition(slug as string)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (data: IRequestProductInfo) => {
    setIsOpen(false)
    deleteProduct(data.slug)
    // handleDeleteProduct(data.slug)
  }

  const productName = product?.product?.name || product?.temporaryProduct?.name || 'Không xác định'
  const productCode = product?.product?.code || product?.temporaryProduct?.code || 'Không xác định'

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="flex justify-start w-full">
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <SquarePen className="icon" />
          {t('productRequisition.deleteProduct')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[36rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-6 text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              Xóa vật tư
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            Lưu ý: Hành động này không thể hoàn tác!
          </DialogDescription>

          <div className="py-2 text-sm text-gray-500 ">
            Bạn sắp sửa xóa vật tư <span className="font-bold">{productName}</span> với mã vật tư{' '}
            <span className="font-bold">{productCode}</span>.
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={() => product && handleSubmit(product)}>
            Tôi đã hiểu, xóa vật tư này
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
