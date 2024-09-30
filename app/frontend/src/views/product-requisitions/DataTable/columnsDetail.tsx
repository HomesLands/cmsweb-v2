import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import { MoreHorizontal } from 'lucide-react'

import {
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui'
import { IProductRequisitionInfo } from '@/types'
import { useState } from 'react'
import { DialogEditProductRequisition } from '@/components/app/dialog'
import { DialogDeleteProductRequisition } from '@/components/app/dialog/dialog-delete-product-requisition'

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
      accessorKey: 'product.unit',
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
