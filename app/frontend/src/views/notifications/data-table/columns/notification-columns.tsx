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
import { INotification } from '@/types'
import { format } from 'date-fns'

export const useNotificationColumns = (): ColumnDef<INotification>[] => {
  const { t } = useTranslation('notifications')

  return [
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('notifications.createdAt')} />
      ),
      cell: ({ row }) => {
        const { createdAt } = row.original
        return createdAt ? format(createdAt, 'HH:mm dd/MM/yyyy') : 'N/A'
      }
    },
    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('notifications.notificationTitle')} />
      )
    },
    {
      accessorKey: 'message',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('notifications.content')} />
      )
    },
    {
      id: t('employees.actions'),
      cell: ({ row }) => {
        const product = row.original
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col justify-start" align="end">
                <DropdownMenuLabel>{t('notifications.actions')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DialogUpdateProduct product={product} /> */}
                {/* <DialogDeleteProduct product={product} /> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
