import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

import {
  DataTableColumnHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui'
import { IProductInfo } from '@/types'
import { DialogAddProductInRequisitionUpdate } from '@/components/app/dialog'

export const useColumnsAddNewProductInRequisitionUpdate = (): ColumnDef<IProductInfo>[] => {
  const { t } = useTranslation('tableData')

  return [
    {
      accessorKey: 'addRequest',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('tableData.addNewProduct')} />
      ),
      cell: ({ row }) => {
        const product = row.original
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center w-full">
                  <DialogAddProductInRequisitionUpdate product={product} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('tableData.addNewProduct')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
    },
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
      header: ({ column }) => <DataTableColumnHeader column={column} title="Đơn vị" />,
      cell: ({ row }) => {
        const unit = row.original.unit
        return <span>{unit.name}</span>
      }
    },
    {
      accessorKey: 'description',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mô tả" />
    }
  ]
}
