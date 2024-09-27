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
import {
  IRequisitionFormResponseForApprover,
  RequestRequisitionRoleApproval,
  RequestRequisitionStatus
} from '@/types'
import { ProductRequisitionStatusBadge } from '@/components/app/badge'
import { AcceptRequisitionDropdownMenuItem } from '@/components/app/dropdown/accept-requisition-dropdown'
import { RequisitionTypeBadge } from '@/components/app/badge/RequisitionTypeBadge'

export const columns: ColumnDef<IRequisitionFormResponseForApprover>[] = [
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
    accessorKey: 'productRequisitionForm.code',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mã yêu cầu" />
  },
  {
    accessorKey: 'productRequisitionForm',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Loại yêu cầu" />,
    cell: ({ row }) => {
      const { type } = row.original.productRequisitionForm
      return <RequisitionTypeBadge type={type} />
    }
  },
  {
    accessorKey: 'productRequisitionForm.creator',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Người tạo" />
  },
  {
    accessorKey: 'productRequisitionForm.company',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Công ty" />
  },
  {
    accessorFn: (row) => row.productRequisitionForm.status,
    id: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
    cell: ({ row }) => {
      return (
        <ProductRequisitionStatusBadge
          isRecalled={row.original.productRequisitionForm.isRecalled}
          status={row.original.productRequisitionForm.status as RequestRequisitionStatus}
          roleApproval={row.original.roleApproval as RequestRequisitionRoleApproval}
        />
      )
    },
    filterFn: (row, id, value) => {
      return row.original.productRequisitionForm.status === value
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
