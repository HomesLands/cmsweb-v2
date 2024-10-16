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
  DropdownMenuSeparator
} from '@/components/ui'
import { IProductInfo } from '@/types'

export const useProductColumns = (): ColumnDef<IProductInfo>[] => {
  const { t } = useTranslation('products')

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
      cell: () => {
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
                <DropdownMenuLabel>{t('employees.actions')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
