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
import { IDepartment } from '@/types'
import { DialogDeleteDepartment, DialogUpdateDepartment } from '@/components/app/dialog'

export const useDepartmentColumns = (): ColumnDef<IDepartment>[] => {
  const { t } = useTranslation(['department'])
  return [
    {
      accessorKey: 'slug',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('department.slug')} />
    },
    {
      accessorKey: 'nameNormalize',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('department.nameNormalize')} />
      )
    },
    {
      accessorKey: 'site.name',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('department.site')} />
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('department.description')} />
      )
    },
    {
      id: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        const department = row.original
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
                <DialogUpdateDepartment department={department} />
                <DialogDeleteDepartment department={department} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
