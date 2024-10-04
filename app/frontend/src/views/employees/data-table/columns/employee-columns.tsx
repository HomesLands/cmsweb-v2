import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  DataTableColumnHeader
} from '@/components/ui'
import { IUserInfo } from '@/types/user.type'
import { hasRequiredPermissions } from '@/utils/auth'
import { Authority } from '@/constants'

export const employeeColumns: ColumnDef<IUserInfo>[] = [
  {
    accessorKey: 'avatar',
    header: 'Ảnh'
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
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Chức năng</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Chức năng</DropdownMenuLabel>
            {hasRequiredPermissions([Authority.CREATE_USER_ROLE]) && (
              <>
                <DropdownMenuItem>Thêm chức vụ</DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
