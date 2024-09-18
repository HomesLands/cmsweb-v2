import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { addNewProductRequestSchema } from '@/schemas'
import { AddNewProductRequestForm } from '@/components/app/form'
import { IProductInfo } from '@/types'

interface DialogEditProductRequisitionProps {
  handleAddRequest: (product: IProductInfo) => void
  openDialog: boolean
  product: IProductInfo | null
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
  const handleSubmit = (data: z.infer<typeof addNewProductRequestSchema>) => {
    const completeData: IProductInfo = {
      ...data
    }
    handleAddRequest(completeData)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="max-w-[44rem]">
        <DialogHeader>
          <DialogTitle>Thêm vật tư mới</DialogTitle>
          <DialogDescription>Nhập đầy đủ thông tin bên dưới để thêm vật tư mới</DialogDescription>
        </DialogHeader>
        <AddNewProductRequestForm
          data={product || ({} as IProductInfo)}
          onSubmit={handleSubmit}
          handleAddRequest={handleAddRequest}
        />
      </DialogContent>
    </Dialog>
  )
}
