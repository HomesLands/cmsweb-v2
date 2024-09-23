import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { AddNewProductRequestForm } from '@/components/app/form'
import { IProductRequisitionInfo } from '@/types'
import { addNewProductRequestSchema } from '@/schemas'

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
  console.log('product in dialoggg', product)
  const handleSubmit = (data: z.infer<typeof addNewProductRequestSchema>) => {
    const completeData: IProductRequisitionInfo = {
      ...data,
      requestQuantity: Number(data.requestQuantity)
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
        <AddNewProductRequestForm
          data={product || ({} as IProductRequisitionInfo)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}
