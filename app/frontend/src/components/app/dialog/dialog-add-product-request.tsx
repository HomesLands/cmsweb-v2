import { useEffect, useState } from 'react'
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
import { useRequisitionStore } from '@/stores'

interface DialogAddProductRequestProps {
  openDialog: boolean
  product?: IProductInfo | null
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

  const handleAddRequest = (product: IProductInfo) => {
    addProductToRequisition(product)
    onOpenChange()
  }
  const handleSubmit = (data: z.infer<typeof addNewProductRequestSchema>) => {
    const completeData: IProductInfo = {
      ...data,
      createdAt: new Date().toISOString()
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
        <AddNewProductRequestForm data={product || undefined} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
