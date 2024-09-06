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
  DataTableColumnHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui'
import { IProductApprovalInfo, IProductInfoSearch } from '@/types'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { RequestStatusBadge } from '@/components/app/badge/RequestStatusBadge'

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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Người tạo" />
  },
  {
    accessorKey: 'commanderApprovalStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CHT" />,
    cell: ({ row }) => {
      return <RequestStatusBadge status={row.original.commanderApprovalStatus} />
    }
  },
  {
    accessorKey: 'commanderApprovalContent',
    header: 'Nội dung'
  },
  {
    accessorKey: 'projectManagerApprovalStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="TPDA" />,
    cell: ({ row }) => {
      return <RequestStatusBadge status={row.original.projectManagerApprovalStatus} />
    }
  },
  {
    accessorKey: 'projectManagerApprovalContent',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nội dung" />
  },
  {
    accessorKey: 'directorApprovalStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="GD" />,
    cell: ({ row }) => {
      return <RequestStatusBadge status={row.original.directorApprovalStatus} />
    }
  },
  {
    accessorKey: 'directorApprovalContent',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nội dung" />
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

export const columnsSearch: ColumnDef<IProductInfoSearch>[] = [
  {
    accessorKey: 'productCode',
    header: 'Mã sản phẩm'
  },
  {
    accessorKey: 'productName',
    header: 'Tên sản phẩm'
  },
  {
    accessorKey: 'modelOrSerialNumber',
    header: 'Model/Số Serial'
  },
  {
    accessorKey: 'supplier',
    header: 'Nhà cung cấp'
  },
  {
    accessorKey: 'importDate',
    header: 'Ngày nhập'
  },
  {
    accessorKey: 'unit',
    header: 'Đơn vị'
  },
  {
    accessorKey: 'quantity',
    header: 'Số lượng'
  },
  {
    accessorKey: 'address',
    header: 'Địa chỉ'
  },
  {
    accessorKey: 'note',
    header: 'Ghi chú'
  },
  {
    accessorKey: 'actions',
    cell: () => {
      // const product = row.original
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="rounded-full">
                <PlusCircledIcon className="" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Thêm vào phiếu vật tư</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  }
]
