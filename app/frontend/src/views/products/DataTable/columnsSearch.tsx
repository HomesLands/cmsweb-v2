import { ColumnDef } from '@tanstack/react-table'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import {
  Button,
  DataTableColumnHeader,
  DataTableColumnAddressHeader,
  DataTableColumnActionHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui'
import { IProductInfo } from '@/types'

export const columnsSearch = (
  handleAddRequest: (data: IProductInfo) => void
): ColumnDef<IProductInfo>[] => [
  {
    accessorKey: 'addRequest',
    header: 'Thêm vào phiếu yêu cầu',
    cell: ({ row }) => {
      const product = row.original
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center w-full">
                <Button variant="ghost" onClick={() => handleAddRequest(product)}>
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
  }
]
