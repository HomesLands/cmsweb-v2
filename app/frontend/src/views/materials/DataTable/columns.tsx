import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { DataTableColumnHeader } from './DataTableColumnHeader'
import { MaterialInfo } from '@/types/material.type'

export const columns: ColumnDef<MaterialInfo>[] = [
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
    header: 'Người tạo'
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
    cell: ({ row }) => {
      const dateValue = row.getValue('createdAt') as string | number | Date
      const date = new Date(dateValue)
      const formattedDate = date
        ? new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).format(date)
        : ''
      return formattedDate
    }
  },

  {
    accessorKey: 'commanderApprovalStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái duyệt CHT" />
  },
  {
    accessorKey: 'commanderApprovalContent',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nội dung duyệt" />
  },
  {
    accessorKey: 'projectManagerApprovalStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái duyệt TPDA" />
  },
  {
    accessorKey: 'projectManagerApprovalContent',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nội dung" />
  },
  {
    accessorKey: 'directorApprovalStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="GD" />
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
    cell: ({ row }) => {
      const payment = row.original
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cập nhật</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
