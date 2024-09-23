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
import { IProductRequisitionInfo } from '@/types'
import { useRequisitionStore } from '@/stores'

interface DialogAddProductRequestProps {
  openDialog: boolean
  product?: IProductRequisitionInfo | null
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
  console.log('product in dialog ne hihi', product) //co slug
  const handleAddRequest = (product: IProductRequisitionInfo) => {
    console.log('product in dialog ne hihihaha', product) //co slug
    addProductToRequisition(product)
    onOpenChange()
  }
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
          <DialogTitle>Thêm vật tư yêu cầu</DialogTitle>
          <DialogDescription>Nhập đầy đủ thông tin bên dưới để thêm vật tư mới</DialogDescription>
        </DialogHeader>
        <AddNewProductRequestForm data={product || undefined} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
