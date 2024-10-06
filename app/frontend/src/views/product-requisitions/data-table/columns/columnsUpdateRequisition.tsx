import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import { MoreHorizontal } from 'lucide-react'

import {
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui'
import { IRequestProductInfo, IUpdateProductRequisitionQuantity } from '@/types'
import { DialogDeleteProductInRequisitionUpdate } from '@/components/app/dialog/dialog-delete-product-in-requisition-update'
import { DialogUpdateProductRequisition } from '@/components/app/dialog/dialog-update-product-quantity-requisition'

export const useColumnsUpdateRequisition = (
  isExistProduct: boolean,
  handleEditProduct: (product: IUpdateProductRequisitionQuantity) => void,
  handleDeleteProduct: (requestProductSlug: string) => void
): ColumnDef<IRequestProductInfo>[] => {
  const [selectedProduct, setSelectedProduct] = useState<IRequestProductInfo | null>(null)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleEdit = (product: IRequestProductInfo) => {
    setOpenEdit(true)
    setSelectedProduct(product)
  }

  const handleDelete = (product: IRequestProductInfo) => {
    setOpenDelete(true)
    setSelectedProduct(product)
  }

  const onOpenEditChange = () => {
    setOpenEdit(false)
  }

  const onOpenDeleteChange = () => {
    setOpenDelete(false)
  }

  const handleConfirmEditProduct = (data: IUpdateProductRequisitionQuantity) => {
    handleEditProduct(data)
    setOpenEdit(false)
  }

  const handleConfirmDeleteProduct = (requestProductSlug: string) => {
    handleDeleteProduct(requestProductSlug)
    setOpenDelete(false)
  }

  return [
    {
      accessorKey: isExistProduct ? 'product.code' : 'temporaryProduct.code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productCode')} />
      )
    },
    {
      accessorKey: isExistProduct ? 'product.name' : 'temporaryProduct.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productName')} />
      )
    },
    {
      accessorKey: isExistProduct ? 'product.provider' : 'temporaryProduct.provider',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.provider')} />
      )
    },
    {
      accessorKey: isExistProduct ? 'product.unit.name' : 'temporaryProduct.unit.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.unit')} />
      )
    },
    {
      accessorKey: 'requestQuantity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.quantity')} />
      )
    },
    {
      accessorKey: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        const product = row.original
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 w-8 h-8">
                  <span className="sr-only">Actions</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(product)}>
                  Chỉnh sửa thông tin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(product)}>
                  Xóa vật tư
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogUpdateProductRequisition
              handleEditProduct={handleConfirmEditProduct}
              openDialog={openEdit}
              requisition={product}
              component={null}
              onOpenChange={onOpenEditChange}
            />
            <DialogDeleteProductInRequisitionUpdate
              handleDeleteProduct={handleConfirmDeleteProduct}
              openDialog={openDelete}
              product={product}
              component={null}
              onOpenChange={onOpenDeleteChange}
            />
          </div>
        )
      }
    }
  ]
}
