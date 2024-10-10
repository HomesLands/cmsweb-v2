import { ColumnDef } from '@tanstack/react-table'

import {
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui'
import { IRole } from '@/types'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const useRoleColumns = (): ColumnDef<IRole>[] => {
  const { t } = useTranslation('roles')
  return [
    {
      accessorKey: 'slug',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã chức vụ" />
    },
    {
      accessorKey: 'nameNormalize',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('roles.nameNormalize')} />
      )
    },
    {
      accessorKey: 'nameDisplay',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('roles.nameDisplay')} />
      )
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('roles.description')} />
      )
    },
    {
      id: 'actions',
      header: t('roles.actions'),
      cell: ({ row }) => {
        const role = row.original
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
                <DropdownMenuItem>{t('roles.edit')}</DropdownMenuItem>
                <DropdownMenuItem>{t('roles.addPermission')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
