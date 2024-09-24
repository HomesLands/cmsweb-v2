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
import { IRequestRequisitionInfo } from '@/types'
import { ProductRequisitionStatusBadge } from '@/components/app/badge'
import { AcceptRequisitionDropdownMenuItem } from '@/components/app/dropdown/accept-requisition-dropdown'

export const columns: ColumnDef<IRequestRequisitionInfo>[] = [
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
    accessorKey: 'code',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mã yêu cầu" />
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Loại yêu cầu" />,
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      const isUrgent = type.toLowerCase() === 'urgent'
      return (
        <div className={isUrgent ? 'text-red-600 font-bold' : ''}>
          {isUrgent ? 'Cần gấp' : 'Bình thường'}
        </div>
      )
    }
  },
  {
    accessorKey: 'creator',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Người tạo" />
  },
  {
    accessorKey: 'company',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Công ty" />
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
    cell: ({ row }) => {
      return <ProductRequisitionStatusBadge status={row.original.status} />
    }
  },
  {
    id: 'actions',
    cell: () => {
      return (
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
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            <AcceptRequisitionDropdownMenuItem>Duyệt</AcceptRequisitionDropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Hủy</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
