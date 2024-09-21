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
import { useRequisitionStore } from '@/stores'

interface DialogAddProductRequestProps {
  openDialog: boolean
  product: IRequestProduct
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogAddProductRequest({
  openDialog,
  product,
  component,
  onOpenChange
}: DialogAddProductRequestProps) {
  const { addProductToRequisition } = useRequisitionStore()

  const handleAddRequest = (product: IRequestProduct) => {
    addProductToRequisition(product)
    onOpenChange()
  }
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
          <DialogTitle>Thêm vật tư yêu cầu</DialogTitle>
          <DialogDescription>Nhập đầy đủ thông tin bên dưới để thêm vật tư mới</DialogDescription>
        </DialogHeader>
        <AddNewProductRequestForm data={product || undefined} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
