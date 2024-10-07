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
import { IProductRequisitionInfo } from '@/types'
import { DialogEditProductRequisition } from '@/components/app/dialog'
import { DialogDeleteProductRequisition } from '@/components/app/dialog/dialog-delete-product-requisition'

export const useColumnsResult = (
  handleEditProduct: (product: IProductRequisitionInfo) => void,
  handleDeleteProduct: (product: IProductRequisitionInfo) => void
): ColumnDef<IProductRequisitionInfo>[] => {
  const [selectedProduct, setSelectedProduct] = useState<IProductRequisitionInfo | null>(null)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleEdit = (product: IProductRequisitionInfo) => {
    setOpenEdit(true)
    setSelectedProduct(product)
  }

  const handleDelete = (product: IProductRequisitionInfo) => {
    setOpenDelete(true)
    setSelectedProduct(product)
  }

  const onOpenChange = () => {
    setOpenEdit(false)
  }

  const onOpenDeleteChange = () => {
    setOpenDelete(false)
  }

  return [
    {
      accessorKey: 'product.code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productCode')} />
      )
    },
    {
      accessorKey: 'product.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productName')} />
      )
    },
    {
      accessorKey: 'product.provider',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.provider')} />
      )
    },
    {
      accessorKey: 'requestQuantity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.quantity')} />
      )
    },
    {
      accessorKey: 'product.unit.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.unit')} />
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
                <Button variant="ghost" className="w-8 h-8 p-0">
                  <span className="sr-only">Actions</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(product)}>
                  Chỉnh sửa thông tin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(product)}>
                  Xóa vật tư
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogEditProductRequisition
              handleEditProduct={handleEditProduct}
              openDialog={openEdit}
              requisition={selectedProduct}
              component={null}
              onOpenChange={onOpenChange}
            />
            {selectedProduct === product && openDelete && (
              <DialogDeleteProductRequisition
                handleDeleteProduct={handleDeleteProduct}
                openDialog={openDelete}
                product={product}
                component={null}
                onOpenChange={onOpenDeleteChange}
              />
            )}
          </div>
        )
      }
    }
  ]
}
