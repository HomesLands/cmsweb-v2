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
import { IRequestProductInfoUpdate, IUpdateProductRequisitionQuantity } from '@/types'
import {
  DialogDeleteProductInRequisitionUpdate,
  DialogUpdateProductRequisition
} from '@/components/app/dialog'

export const useColumnsUpdateRequisition = () // isExistProduct: boolean,
// handleEditProduct: (product: IUpdateProductRequisitionQuantity) => void,
// handleDeleteProduct: (requestProductSlug: string) => void
: ColumnDef<IRequestProductInfoUpdate>[] => {
  const [selectedProduct, setSelectedProduct] = useState<IRequestProductInfoUpdate>()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleEdit = (product: IRequestProductInfoUpdate) => {
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
    // handleEditProduct(data)
    setOpenEdit(false)
  }

  const handleConfirmDeleteProduct = (requestProductSlug: string) => {
    // handleDeleteProduct(requestProductSlug)
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
              <DropdownMenuContent align="end" className="flex flex-col justify-start w-full">
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogUpdateProductRequisition
                  // handleEditProduct={handleConfirmEditProduct}
                  // isExistProduct={isExistProduct}
                  // openDialog={openEdit}
                  product={product as IRequestProductInfoUpdate}
                  // component={null}
                  // onOpenChange={onOpenEditChange}
                />
                <DialogDeleteProductInRequisitionUpdate
                  // handleDeleteProduct={handleConfirmDeleteProduct}
                  // openDialog={openDelete}
                  product={product as IRequestProductInfoUpdate}
                  // component={null}
                  // onOpenChange={onOpenDeleteChange}
                />
                {/* <DropdownMenuItem onClick={() => handleDelete(rowData)}>
                  Xóa vật tư
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
