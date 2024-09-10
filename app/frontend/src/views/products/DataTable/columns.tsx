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
  Checkbox,
  DataTableColumnHeader
} from '@/components/ui'
import { IProductApprovalInfo, IUserInfo } from '@/types'

export const columns: ColumnDef<IProductApprovalInfo>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'createdBy',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Người yêu cầu" />
  },
  {
    accessorKey: 'commanderApprovalStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CHT" />
  },
  {
    accessorKey: 'commanderApprovalContent',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nội dung" />
  },
  {
    accessorKey: 'projectManagerApprovalStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="TPDA" />
  },
  {
    accessorKey: 'projectManagerApprovalContent',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nội dung" />
  },
  {
    accessorKey: 'directorApprovalStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="GĐ" />
  },
  {
    accessorKey: 'directorApprovalContent',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nội dung" />
  },
  {
    accessorKey: 'notes',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ghi chú" />
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Actions</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
