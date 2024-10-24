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
      ),
      cell: ({ row }) => {
        const { isExistProduct, product } = row.original
        return isExistProduct ? <div>{product.code}</div> : <div>N/A</div>
      }
    },
    {
      accessorKey: 'product.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productName')} />
      ),
      cell: ({ row }) => {
        const { isExistProduct, product, temporaryProduct } = row.original
        return isExistProduct ? <div>{product.code}</div> : <div>{temporaryProduct?.name}</div>
      }
    },
    {
      accessorKey: 'product.provider',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.provider')} />
      ),
      cell: ({ row }) => {
        const { isExistProduct, product, temporaryProduct } = row.original
        return isExistProduct ? (
          <div>{product.provider}</div>
        ) : (
          <div>{temporaryProduct?.provider}</div>
        )
      }
    },
    {
      accessorKey: 'product.unit.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.unit')} />
      ),
      cell: ({ row }) => {
        const { isExistProduct, product, temporaryProduct } = row.original
        return isExistProduct ? (
          <div>{product.unit.name}</div>
        ) : (
          <div>{temporaryProduct?.unit?.name}</div>
        )
      }
    },
    {
      accessorKey: 'requestQuantity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.quantity')} />
      )
    }
  ]
}
