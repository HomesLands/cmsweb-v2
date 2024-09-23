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
      console.log('row', row)
      return <ProductRequisitionStatusBadge status={row.original.status} />
    }
  },
  // {
  //   accessorKey: 'commanderApprovalStatus',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Chỉ huy trưởng" />,
  //   cell: ({ row }) => {
  //     return <ProductRequisitionStatusBadge status={row.original.commanderApprovalStatus} />
  //   }
  // },
  // {
  //   accessorKey: 'commanderApprovalContent',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Nội dung" />
  // },
  // {
  //   accessorKey: 'projectManagerApprovalStatus',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Trưởng phòng dự án" />,
  //   cell: ({ row }) => {
  //     return <ProductRequisitionStatusBadge status={row.original.projectManagerApprovalStatus} />
  //   }
  // },
  // {
  //   accessorKey: 'projectManagerApprovalContent',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Nội dung" />
  // },
  // {
  //   accessorKey: 'directorApprovalStatus',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Giám đốc" />,
  //   cell: ({ row }) => {
  //     return <ProductRequisitionStatusBadge status={row.original.directorApprovalStatus} />
  //   }
  // },
  // {
  //   accessorKey: 'directorApprovalContent',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Nội dung" />
  // },
  // {
  //   accessorKey: 'notes',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Ghi chú" />
  // },
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
