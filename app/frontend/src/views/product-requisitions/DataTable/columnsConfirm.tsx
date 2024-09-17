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

export const columnsConfirm = (): ColumnDef<IProductInfo>[] => {
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
      accessorKey: 'unit',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.unit')} />
      )
    },
    {
      id: 'actions',
      cell: () => {
        return (
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
              <DropdownMenuItem>Chỉnh sửa thông tin</DropdownMenuItem>
              <DropdownMenuItem>Xóa vật tư</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
}
