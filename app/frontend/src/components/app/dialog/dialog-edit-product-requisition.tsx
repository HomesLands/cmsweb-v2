import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { IProductRequisitionInfo } from '@/types'
import { TAddNewProductRequestSchema } from '@/schemas'
import { EditProductRequisitionForm } from '../form/edit-product-requisition-form'

interface DialogEditProductRequisitionProps {
  handleAddRequest: (product: IProductRequisitionInfo) => void
  openDialog: boolean
  product: IProductRequisitionInfo | null
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogEditProductRequisition({
  handleAddRequest,
  openDialog,
  product,
  component,
  onOpenChange
}: DialogEditProductRequisitionProps) {
  const handleSubmit = (data: TAddNewProductRequestSchema) => {
    const completeData: IProductRequisitionInfo = {
      ...data,
      requestQuantity: Number(data.requestQuantity)
      // description: data.description
      // slug: product?.slug || ''
    }
    handleAddRequest(completeData)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="max-w-[44rem]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin vật tư</DialogTitle>
          <DialogDescription>
            Nhập đầy đủ thông tin bên dưới để chỉnh sửa thông tin vật tư
          </DialogDescription>
        </DialogHeader>
        <EditProductRequisitionForm data={product ?? undefined} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
