import { TriangleAlert } from 'lucide-react'

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

interface DialogDeleteProductInRequisitionUpdateProps {
  handleDeleteProduct: (requestProductSlug: string) => void
  openDialog: boolean
  product: IRequestProductInfoUpdate | null
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogDeleteProductInRequisitionUpdate({
  handleDeleteProduct,
  openDialog,
  product,
  component,
  onOpenChange
}: DialogDeleteProductInRequisitionUpdateProps) {
  console.log(product)
  const handleSubmit = (data: IRequestProductInfo) => {
    handleDeleteProduct(data.slug)
    onOpenChange()
  }

  const productName = product?.product?.name || product?.temporaryProduct?.name || 'Không xác định'
  const productCode = product?.product?.code || product?.temporaryProduct?.code || 'Không xác định'

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
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
          <Button variant="outline" onClick={onOpenChange}>
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
