import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { requestProdcuctSchema } from '@/schemas'
import { AddNewProductRequestForm } from '@/components/app/form'
import { IRequestProduct } from '@/types'

interface DialogEditProductRequisitionProps {
  handleAddRequest: (product: IRequestProduct) => void
  openDialog: boolean
  product: IRequestProduct
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
  const handleSubmit = (data: IRequestProduct) => {
    const completeData: IRequestProduct = {
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
          <DialogTitle>Chỉnh sửa thông tin vật tư</DialogTitle>
          <DialogDescription>
            Nhập đầy đủ thông tin bên dưới để chỉnh sửa thông tin vật tư
          </DialogDescription>
        </DialogHeader>
        <AddNewProductRequestForm data={product} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
