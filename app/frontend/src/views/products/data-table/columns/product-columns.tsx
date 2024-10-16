import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DataTableColumnHeader,
  Button,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/components/ui'
import { IProductInfo, IProductInfoCreate, IProductInfoUpdate } from '@/types'
import { useUpdateProduct } from '@/hooks'
import { useState } from 'react'
import { DialogUpdateProduct } from '@/components/app/dialog/dialog-update-product'
import { showToast } from '@/utils'

export const useProductColumns = (): ColumnDef<IProductInfo>[] => {
  const { t } = useTranslation('products')
  const { t: tToast } = useTranslation('toast')
  const [selectedProduct, setSelectedProduct] = useState<IProductInfo | null>(null)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const { mutate: updateProduct } = useUpdateProduct()

  const handleEditProduct = (product: IProductInfo) => {
    setOpenEditDialog(true)
    setSelectedProduct(product)
  }

  const handleConfirmUpdateProduct = (product: IProductInfoUpdate) => {
    updateProduct(product, {
      onSuccess: () => {
        showToast(tToast('toast.updateProductSuccess'))
      }
    })
  }

  const onEditDialogOpenChange = () => {
    setOpenEditDialog(false)
  }

  const handleDeleteProduct = (product: IProductInfo) => {
    setOpenDeleteDialog(true)
    setSelectedProduct(product)
  }

  const onDeleteDialogOpenChange = () => {
    setOpenDeleteDialog(false)
  }

  return [
    {
      accessorKey: 'code',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('products.code')} />
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('products.name')} />
    },
    {
      accessorKey: 'quantity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('products.quantity')} />
      )
    },
    {
      accessorKey: 'provider',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('products.provider')} />
      )
    },
    {
      accessorKey: 'unit.name',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('products.unit')} />
    },
    {
      id: t('employees.actions'),
      cell: ({ row }) => {
        const product = row.original
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 w-8 h-8">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col justify-start" align="end">
                <DropdownMenuLabel>{t('products.actions')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                  {t('products.edit')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteProduct(product)}>
                  {t('products.delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogUpdateProduct
              handleEditProduct={handleConfirmUpdateProduct}
              openDialog={openEditDialog}
              product={selectedProduct}
              component={null}
              onOpenChange={onEditDialogOpenChange}
            />
          </div>
        )
      }
    }
  ]
}
