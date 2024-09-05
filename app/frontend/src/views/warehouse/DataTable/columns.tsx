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
    accessorKey: 'productCode',
    header: 'Mã vật tư'
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
  // {
  //   accessorKey: 'createdBy',
  //   header: 'Người tạo'
  // },
  {
    accessorKey: 'productName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên vật tư" />
  },
  {
    accessorKey: 'modelOrSerialNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Model" />
  },
  {
    accessorKey: 'supplier',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nhà cung cấp" />
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Đơn vị" />
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Số lượng" />
  },
  {
    accessorKey: 'address',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Địa chỉ" />
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
