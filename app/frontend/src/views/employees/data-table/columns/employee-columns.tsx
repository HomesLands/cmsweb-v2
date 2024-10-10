import { ColumnDef } from '@tanstack/react-table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DataTableColumnHeader,
  DropdownMenuSeparator,
  Dialog,
  Button,
  DropdownMenuLabel,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  UserAvatar
} from '@/components/ui'
import { IUserInfo } from '@/types/user.type'
import { MoreHorizontal } from 'lucide-react'
import { AddEmployeeRoleForm } from '@/components/app/form'
import { TCreateUserRoleSchema } from '@/schemas'
import { ICreateUserRole } from '@/types'
import { useCreateUserRole } from '@/hooks'
import toast from 'react-hot-toast'
import { baseURL } from '@/constants'

export const useEmployeeColumns = (): ColumnDef<IUserInfo>[] => {
  const mutation = useCreateUserRole()
  const handleSubmit = (values: TCreateUserRoleSchema) => {
    const requestData = {
      roleSlug: values.role.value,
      userSlug: values.user.value
    } as ICreateUserRole
    mutation.mutate(requestData, {
      onSuccess: () => {
        toast.success('Thêm quyền thành công')
      }
    })
  }
  return [
    {
      accessorKey: 'avatar',
      header: 'Ảnh',
      cell: ({ row }) => {
        const { avatar } = row.original
        const imageUrl = `${baseURL}/files/${avatar}`
        return <UserAvatar src={imageUrl} />
      }
    },
    {
      accessorKey: 'fullname',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tên nhân sự" />
    },
    {
      accessorKey: 'dob',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày sinh" />
    },
    {
      id: 'actions',
      cell: () => {
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
              <Dialog>
                <DialogTrigger>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Thêm quyền
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Thêm quyền</DialogTitle>
                    <DialogDescription>Thêm quyền cho nhân sự</DialogDescription>
                  </DialogHeader>
                  <AddEmployeeRoleForm onSubmit={handleSubmit} />
                </DialogContent>
              </Dialog>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
}
