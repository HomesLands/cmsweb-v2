import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui'
import { IPermission } from '@/types'
import { DialogDeletePermission, DialogUpdatePermission } from '@/components/app/dialog'

export const usePermissionColumns = (): ColumnDef<IPermission>[] => {
  const { t } = useTranslation(['permissions'])
  return [
    {
      accessorKey: 'slug',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('permissions.slug')} />
      )
    },
    {
      accessorKey: 'authority',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('permissions.authority')} />
      ),
      cell: ({ row }) => {
        const { authority } = row.original
        return <div>{authority}</div>
      }
    },
    {
      accessorKey: 'resource',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('permissions.resource')} />
      ),
      cell: ({ row }) => {
        const { resource } = row.original
        return <div>{resource}</div>
      }
    },
    {
      accessorKey: 'requiredOwner',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('permissions.requiredOwner')} />
      ),
      cell: ({ row }) => {
        const { requiredOwner } = row.original
        return (
          <div className="font-bold text-red-400">{requiredOwner ? 'Yêu cầu chủ sở hữu' : ''}</div>
        )
      }
    },
    {
      id: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        const permission = row.original
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
                <DialogUpdatePermission permission={permission} />
                <DialogDeletePermission permission={permission} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
