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
import { IProductInfo } from '@/types'
import { useState } from 'react'
import { DialogEditProductRequisition } from '@/components/app/dialog'
import { DialogDeleteProductRequisition } from '@/components/app/dialog/dialog-delete-product-requisition'

export const useColumnsConfirm = (
  handleEditRequest: (product: IProductInfo) => void,
  handleDeleteProduct: (product: IProductInfo) => void
): ColumnDef<IProductInfo>[] => {
  const [selectedProduct, setSelectedProduct] = useState<IProductInfo | null>(null)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleEdit = (product: IProductInfo) => {
    setOpenEdit(true)
    setSelectedProduct(product)
  }

  const handleDelete = (product: IProductInfo) => {
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
      accessorKey: 'productCode',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productCode')} />
      )
    },
    {
      accessorKey: 'productName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productName')} />
      )
    },
    {
      accessorKey: 'modelOrSerialNumber',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.model')} />
      )
    },
    {
      accessorKey: 'supplier',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.supplier')} />
      )
    },
    {
      accessorKey: 'quantity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.quantity')} />
      )
    },
    {
      accessorKey: 'unit',
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
            {selectedProduct === product && openEdit && (
              <DialogEditProductRequisition
                handleAddRequest={handleEditRequest}
                openDialog={openEdit}
                product={product}
                component={null}
                onOpenChange={onOpenChange}
              />
            )}
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
