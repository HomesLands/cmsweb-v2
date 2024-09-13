import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/ui'
import { IProductInfo } from '@/types'

export const columnsResult = (): ColumnDef<IProductInfo>[] => [
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
