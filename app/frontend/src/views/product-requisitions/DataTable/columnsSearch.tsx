import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

import {
  Button,
  DataTableColumnHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui'
import { IProductInfo } from '@/types'
import { DialogAddProductRequest } from '@/components/app/dialog'

export const useColumnsSearch = (): ColumnDef<IProductInfo>[] => {
  const { t } = useTranslation('tableData')
  const [selectedProduct, setSelectedProduct] = useState<IProductInfo | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleButtonClick = (product: IProductInfo) => {
    setOpenDialog(true)
    console.log(product)
    // const { name, quantity, slug, unit, ...rest } = product
    setSelectedProduct(product)
    console.log(selectedProduct)
  }

  const onOpenChange = () => {
    setOpenDialog(false)
  }

  return [
    {
      accessorKey: 'addRequest',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('tableData.addNewProduct')} />
      ),
      cell: ({ row }) => {
        const product = row.original
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center w-full">
                  <Button variant="ghost" onClick={() => handleButtonClick(product)}>
                    <PlusCircledIcon className="w-4 h-4" />
                  </Button>
                  {selectedProduct && selectedProduct.slug === product.slug && (
                    <DialogAddProductRequest
                      openDialog={openDialog}
                      product={product}
                      component={null}
                      onOpenChange={onOpenChange}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('tableData.addNewProduct')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
    },
    {
      accessorKey: 'code',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã vật tư" />
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tên vật tư" />
    },
    {
      accessorKey: 'provider',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nhà cung cấp" />
    },
    {
      accessorKey: 'unit',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Đơn vị" />,
      cell: ({ row }) => {
        const unit = row.original.unit
        return <span>{unit.name}</span>
      }
    },
    {
      accessorKey: 'description',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mô tả" />
    }
  ]
}
