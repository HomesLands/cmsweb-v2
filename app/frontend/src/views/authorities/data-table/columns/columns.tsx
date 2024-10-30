import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui'
import { IAuthority } from '@/types'
import { DialogDeleteAuthority, DialogUpdateAuthority } from '@/components/app/dialog'

export const useAuthorityColumns = (): ColumnDef<IAuthority>[] => {
  const { t } = useTranslation(['authorities'])
  return [
    {
      accessorKey: 'slug',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('authorities.slug')} />
      )
    },
    {
      accessorKey: 'nameNormalize',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('authorities.nameNormalize')} />
      )
    },
    {
      accessorKey: 'nameDisplay',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('authorities.nameDisplay')} />
      )
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('authorities.description')} />
      )
    },
    {
      id: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        const authority = row.original
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                  <span className="sr-only">Thao tác</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogUpdateAuthority authority={authority} />
                <DialogDeleteAuthority authority={authority} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
