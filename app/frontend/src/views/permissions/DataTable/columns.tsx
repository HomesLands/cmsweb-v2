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
import { IPermission } from '@/types'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

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
      accessorKey: 'nameDisplay',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('permissions.roleNameDisplay')} />
      ),
      cell: ({ row }) => {
        const { role } = row.original
        return <div>{role?.nameNormalize}</div>
      }
    },
    {
      accessorKey: 'nameDisplay',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('permissions.authorityNameDisplay')} />
      ),
      cell: ({ row }) => {
        const { authority } = row.original
        return <div>{authority?.nameNormalize}</div>
      }
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
                <Button variant="ghost" className="w-8 h-8 p-0">
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
