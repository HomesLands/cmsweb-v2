import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

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
import { IExportProductRequisitionFormRequest, IProductRequisitionFormInfo } from '@/types'

import { RequisitionTypeBadge } from '@/components/app/badge'
import { useExportExcelProductRequisition, useExportPDFProductRequisition } from '@/hooks'
import { showToast } from '@/utils'
import { DialogRequisitionDetail } from '@/components/app/dialog'

export const useWarehouseColumns = (): ColumnDef<IProductRequisitionFormInfo>[] => {
  const { t } = useTranslation(['warehouse'])
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [, setSelectedRequisition] = useState<IProductRequisitionFormInfo | null>(null)
  const { mutate: exportPDFProductRequisition } = useExportPDFProductRequisition()
  const { mutate: exportExcelProductRequisition } = useExportExcelProductRequisition()

  const handleOpenViewDialog = (requisition: IProductRequisitionFormInfo) => {
    setOpenViewDialog(true)
    setSelectedRequisition(requisition)
  }

  const onViewDialogOpenChange = () => {
    setOpenViewDialog(false)
  }

  const handleExportPDFProductRequisition = (requestData: IExportProductRequisitionFormRequest) => {
    exportPDFProductRequisition(requestData, {
      onSuccess: () => {
        showToast(t('toast.exportPDFSuccess'))
      }
    })
  }
  const handleExportExcelProductRequisition = (
    requestData: IExportProductRequisitionFormRequest
  ) => {
    exportExcelProductRequisition(requestData, {
      onSuccess: () => {
        showToast(t('toast.exportExcelSuccess'))
      }
    })
  }
  return [
    {
      accessorKey: 'code',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('warehouse.slug')} />
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('warehouse.createdAt')} />
      ),
      cell: ({ row }) => {
        const date = row.original.createdAt ? new Date(row.original.createdAt) : null
        return date ? format(date, 'HH:mm dd/MM/yyyy') : 'Không có'
      }
    },
    {
      accessorKey: 'productRequisitionForm',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Loại yêu cầu" />,
      cell: ({ row }) => {
        const { type } = row.original
        return type ? <RequisitionTypeBadge type={type} /> : 'Không có'
      }
    },
    {
      accessorKey: 'creator.fullname',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('warehouse.creator')} />
      )
    },
    {
      id: 'company',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('warehouse.company')} />
      ),
      cell: ({ row }) => {
        const { creator } = row.original
        const companyName = creator?.userDepartments?.[0]?.department?.site?.company?.name
        return <div className="min-w-[12rem] text-[0.8rem]">{companyName || 'N/A'}</div>
      }
    },
    {
      id: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        const requisition = row.original
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                  <span className="sr-only">Thao tác</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col justify-start">
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogRequisitionDetail requisition={requisition} />
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    handleExportPDFProductRequisition({
                      slug: requisition.slug,
                      code: requisition.code || ''
                    })
                  }
                >
                  {t('warehouse.pdfExport')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleExportExcelProductRequisition({
                      slug: requisition.slug,
                      code: requisition.code || ''
                    })
                  }
                >
                  {t('warehouse.excelExport')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
