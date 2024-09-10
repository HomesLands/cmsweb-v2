import { ColumnDef } from '@tanstack/react-table'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import {
  Button,
  Checkbox,
  DataTableColumnHeader,
  DataTableColumnAddressHeader,
  DataTableColumnActionHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui'
import { IProductInfo } from '@/types'

export const columnsSearch: ColumnDef<IProductInfo>[] = [
  {
    accessorKey: 'addRequest',
    header: ({ column }) => (
      <DataTableColumnActionHeader column={column} title="Thêm vào phiếu yêu cầu" />
    ),
    cell: () => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center w-full">
                <Button variant="ghost">
                  <PlusCircledIcon className="w-4 h-4" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Thêm vào phiếu yêu cầu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
  {
    accessorKey: 'createdBy',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Người thêm" />
  },
  {
    accessorKey: 'productCode',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mã vật tư" />
  },
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
    header: ({ column }) => <DataTableColumnAddressHeader column={column} title="Địa chỉ" />
  },
  {
    accessorKey: 'notes',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ghi chú" />
  },
  {
    accessorKey: 'addRequest',
    header: ({ column }) => (
      <DataTableColumnActionHeader column={column} title="Thêm vào phiếu yêu cầu" />
    ),
    cell: () => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center w-full">
                <Button variant="ghost">
                  <PlusCircledIcon className="w-4 h-4" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Thêm vào phiếu yêu cầu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  }
]
