import { ColumnDef } from '@tanstack/react-table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DataTableColumnHeader,
  DropdownMenuSeparator,
  Button,
  DropdownMenuLabel,
  UserAvatar
} from '@/components/ui'
import { IUserInfo } from '@/types/user.type'
import { MoreHorizontal } from 'lucide-react'
import { TCreateUserRoleSchema } from '@/schemas'
import { ICreateUserRole } from '@/types'
import { useCreateUserRole } from '@/hooks'
import toast from 'react-hot-toast'
import { baseURL } from '@/constants'
import { useTranslation } from 'react-i18next'
import { DialogAddUserRole } from '@/components/app/dialog'

export const useEmployeeColumns = (): ColumnDef<IUserInfo>[] => {
  const { t } = useTranslation('users')

  return [
    {
      accessorKey: 'avatar',
      header: t('users.avatar'),
      cell: ({ row }) => {
        const { avatar } = row.original
        const imageUrl = `${baseURL}/files/${avatar}`
        return <UserAvatar src={imageUrl} />
      }
    },
    {
      accessorKey: 'fullname',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('users.fullname')} />
    },
    {
      accessorKey: 'dob',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('users.role')} />
    },
    {
      id: t('users.actions'),
      cell: ({ row }) => {
        const user = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
              <DialogAddUserRole user={user} />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
}
