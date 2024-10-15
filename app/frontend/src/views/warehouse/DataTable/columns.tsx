import { ColumnDef } from '@tanstack/react-table'

import {
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui'
import { ISite } from '@/types'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const useWarehouseColumns = (): ColumnDef<ISite>[] => {
  const { t } = useTranslation(['warehouse'])
  return [
    {
      accessorKey: 'slug',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('warehouse.slug')} />
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('warehouse.name')} />
    },
    {
      accessorKey: 'company.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('warehouse.companyName')} />
      )
    },
    {
      accessorKey: 'company.slug',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('warehouse.companySlug')} />
      )
    },
    {
      id: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        const requisition = row.original
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 w-8 h-8">
                  <span className="sr-only">Thao tác</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                <DropdownMenuItem>Xóa</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
