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
import {
  IRequestProductInfo,
  IRequestProductInfoUpdate,
  IUpdateProductRequisitionQuantity
} from '@/types'
import { DialogDeleteProductInRequisitionUpdate } from '@/components/app/dialog/dialog-delete-product-in-requisition-update'
import { DialogUpdateProductRequisition } from '@/components/app/dialog/dialog-update-product-quantity-requisition'
import ProductRequisitions from '../../ProductRequisitions'

export const useColumnsUpdateRequisition = (
  isExistProduct: boolean,
  handleEditProduct: (product: IUpdateProductRequisitionQuantity) => void,
  handleDeleteProduct: (requestProductSlug: string) => void
): ColumnDef<IRequestProductInfoUpdate>[] => {
  const [selectedProduct, setSelectedProduct] = useState<IRequestProductInfoUpdate>()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleEdit = (product: IRequestProductInfoUpdate) => {
    console.log('product', product)
    setOpenEdit(true)
    setSelectedProduct(product)
  }

  const handleDelete = (product: IRequestProductInfoUpdate) => {
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
      accessorKey: 'code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productCode')} />
      ),
      accessorFn: (row) => row.product?.code ?? row.temporaryProduct?.code ?? ''
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productName')} />
      ),
      accessorFn: (row) => row.product?.name ?? row.temporaryProduct?.name ?? ''
    },
    {
      accessorKey: 'provider',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.provider')} />
      ),
      accessorFn: (row) => row.product?.provider ?? row.temporaryProduct?.provider ?? ''
    },
    {
      accessorKey: 'unit',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.unit')} />
      ),
      accessorFn: (row) => row.product?.unit?.name ?? row.temporaryProduct?.unit?.name ?? ''
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
        const rowData = row.original
        // console.log('rowData', rowData)
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
                <DropdownMenuItem onClick={() => handleEdit(rowData)}>
                  Chỉnh sửa thông tin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(rowData)}>
                  Xóa vật tư
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogUpdateProductRequisition
              handleEditProduct={handleConfirmEditProduct}
              openDialog={openEdit}
              requisition={selectedProduct as IRequestProductInfoUpdate}
              component={null}
              onOpenChange={onOpenEditChange}
            />
            <DialogDeleteProductInRequisitionUpdate
              handleDeleteProduct={handleConfirmDeleteProduct}
              openDialog={openDelete}
              product={rowData}
              component={null}
              onOpenChange={onOpenDeleteChange}
            />
          </div>
        )
      }
    }
  ]
}
