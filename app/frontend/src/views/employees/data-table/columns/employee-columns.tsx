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
  UserAvatar,
  DropdownMenuSeparator,
  Badge
} from '@/components/ui'
import { IUserInfo } from '@/types'

import { baseURL } from '@/constants'
import {
  DialogAddUserRole,
  DialogAddUserDepartment,
  DialogUpdateUserDepartment,
  DialogDeleteUserDepartment
} from '@/components/app/dialog'

export const useEmployeeColumns = (): ColumnDef<IUserInfo>[] => {
  const { t } = useTranslation('employees')

  return [
    {
      accessorKey: 'avatar',
      header: t('employees.avatar'),
      cell: ({ row }) => {
        const { avatar } = row.original
        const imageUrl = `${baseURL}/files/${avatar}`
        return <UserAvatar src={imageUrl} />
      }
    },
    {
      accessorKey: 'slug',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('employees.slug')} />
    },
    {
      accessorKey: 'fullname',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('employees.fullname')} />
      )
    },
    {
      accessorKey: 'userRoles',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('employees.role')} />,
      cell: ({ row }) => {
        const { userRoles } = row.original
        return (
          <div className="flex flex-col gap-3">
            {userRoles &&
              userRoles.map((item) => {
                return (
                  <div className="font-normal w-fit">
                    {item?.role?.nameDisplay} ({item?.role?.nameNormalize})
                  </div>
                )
              })}
          </div>
        )
      }
    },
    {
      accessorKey: 'userDepartments',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('employees.department')} />
      ),
      cell: ({ row }) => {
        const { userDepartments } = row.original
        return (
          <div className="flex flex-col gap-3">
            {userDepartments &&
              userDepartments.map((item) => {
                return (
                  <Badge className="font-normal bg-green-500 w-fit hover:bg-green-500">
                    {item?.department.description}
                  </Badge>
                )
              })}
          </div>
        )
      }
    },
    {
      id: t('employees.actions'),
      cell: ({ row }) => {
        const user = row.original
        const hasDepartment = user?.userDepartments?.[0]?.department

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
                <DropdownMenuLabel>{t('employees.actions')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogAddUserRole user={user} />
                <DialogAddUserDepartment user={user} />
                {hasDepartment && <DialogUpdateUserDepartment user={user} />}
                {hasDepartment && <DialogDeleteUserDepartment user={user} />}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
