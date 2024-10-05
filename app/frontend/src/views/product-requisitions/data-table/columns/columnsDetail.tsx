import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'

import { DataTableColumnHeader } from '@/components/ui'
import { IProductRequisitionInfo } from '@/types'

export const useColumnsDetail = (): ColumnDef<IProductRequisitionInfo>[] => {
  return [
    {
      accessorKey: 'product.code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productCode')} />
      )
    },
    {
      accessorKey: 'product.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productName')} />
      )
    },
    {
      accessorKey: 'product.provider',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.provider')} />
      )
    },
    {
      accessorKey: 'product.unit.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.unit')} />
      )
    },
    {
      accessorKey: 'requestQuantity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.quantity')} />
      )
    }
  ]
}
