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
import { IAssignedApprover } from '@/types'
import { DialogDeleteAssignedApprover, DialogUpdateAssignedApprover } from '@/components/app/dialog'

export const useAssignedApproverColumns = (): ColumnDef<IAssignedApprover>[] => {
  const { t } = useTranslation(['assignedApprover'])
  return [
    {
      accessorKey: 'formType',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('assignedApprover.formType')} />
      )
    },
    {
      accessorKey: 'roleApproval',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('assignedApprover.roleApproval')} />
      )
    },
    {
      accessorKey: 'user.fullname',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('assignedApprover.fullname')} />
      )
    },
    {
      accessorKey: 'site.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('assignedApprover.site')} />
      )
    },
    {
      accessorKey: 'site.company.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('assignedApprover.company')} />
      )
    },
    {
      id: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        const approver = row.original
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
                <DialogUpdateAssignedApprover approver={approver} />
                <DialogDeleteAssignedApprover approver={approver} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
