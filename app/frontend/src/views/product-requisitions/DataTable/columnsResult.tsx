import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/ui'
import { IProductInfo } from '@/types'

export const columnsResult = (): ColumnDef<IProductInfo>[] => [
  {
    accessorKey: 'code',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mã vật tư" />
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên vật tư" />
  },
  {
    accessorKey: 'provider',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nhà cung cấp" />
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Đơn vị" />
  }
]
