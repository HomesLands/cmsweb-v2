import { z } from 'zod'

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

import { TriangleAlert } from 'lucide-react'

interface DialogDeleteProductRequisitionProps {
  handleDeleteProduct: (product: IProductInfo) => void

  openDialog: boolean
  product: IProductInfo | null

  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogDeleteProductRequisition({
  handleDeleteProduct,

  openDialog,

  product,

  component,
  onOpenChange
}: DialogDeleteProductRequisitionProps) {
  const handleSubmit = (data: IProductInfo) => {
    const completeData: IProductInfo = {
      ...data,

      id: '',
      createdBy: '',

      address: ''
    }

    handleDeleteProduct(completeData)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>

      <DialogContent className="max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              Xóa vật tư
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            Lưu ý: Hành động này không thể hoàn tác!
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            Bạn sắp sửa xóa vật tư <span className="font-bold">{product?.productName}</span> với mã
            vật tư <span className="font-bold">{product?.productCode}</span>.
            <br />
            Hành động này không thể hoàn tác. Dữ liệu về vật tư sẽ bị xóa khỏi yêu cầu vật tư!
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
