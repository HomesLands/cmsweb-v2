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

export const useColumnsSearchProduct = (): ColumnDef<IProductInfo>[] => {
  const { t } = useTranslation('tableData')

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
                  <DialogAddProductRequest product={product} />
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
      accessorKey: 'quantity',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Số lượng" />
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
    },
    {
      accessorKey: 'provider',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nhà cung cấp" />
    }
  ]
}
