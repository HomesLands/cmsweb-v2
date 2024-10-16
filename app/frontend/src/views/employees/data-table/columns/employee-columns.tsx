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
  DropdownMenuItem,
  Badge
} from '@/components/ui'
import { IUserInfo } from '@/types'

import { baseURL } from '@/constants'
import { DialogAddUserRole, DialogAddUserDepartment } from '@/components/app/dialog'
import { useState } from 'react'

export const useEmployeeColumns = (): ColumnDef<IUserInfo>[] => {
  const { t } = useTranslation('employees')
  const [selectedUser, setSelectedUser] = useState<IUserInfo | null>(null)
  const [openDialogAddUserRole, setOpenDialogAddUserRole] = useState(false)
  const [openDialogAddUserDepartment, setOpenDialogAddUserDepartment] = useState(false)

  const handleOpenDialogAddUserRole = (user: IUserInfo) => {
    setSelectedUser(user)
    setOpenDialogAddUserRole(true)
  }

  const handleCloseDialogAddUserRole = () => {
    setOpenDialogAddUserRole(false)
  }

  const handleOpenDialogAddUserDepartment = (user: IUserInfo) => {
    setSelectedUser(user)
    setOpenDialogAddUserDepartment(true)
  }

  const handleCloseDialogAddUserDepartment = () => {
    setOpenDialogAddUserDepartment(false)
  }

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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('employees.userRoles')} />
      ),
      cell: ({ row }) => {
        const { userRoles } = row.original
        return (
          <div className="flex flex-col gap-3">
            {userRoles &&
              userRoles.map((item) => {
                return (
                  <div className="w-fit font-normal">
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
        <DataTableColumnHeader column={column} title={t('employees.userDepartments')} />
      ),
      cell: ({ row }) => {
        const { userDepartments } = row.original
        return (
          <div className="flex flex-col gap-3">
            {userDepartments &&
              userDepartments.map((item) => {
                return (
                  <Badge className="w-fit font-normal bg-green-500 hover:bg-green-500">
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
                <DropdownMenuItem onClick={() => handleOpenDialogAddUserRole(user)}>
                  {t('employees.addRole')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleOpenDialogAddUserDepartment(user)}>
                  {t('employees.addDepartment')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogAddUserRole
              user={selectedUser}
              open={openDialogAddUserRole}
              onOpenChange={handleCloseDialogAddUserRole}
              component={null}
            />
            <DialogAddUserDepartment
              user={selectedUser}
              open={openDialogAddUserDepartment}
              onOpenChange={handleCloseDialogAddUserDepartment}
              component={null}
            />
          </div>
        )
      }
    }
  ]
}
