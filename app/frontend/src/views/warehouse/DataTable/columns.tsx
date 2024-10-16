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
  DropdownMenuTrigger
} from '@/components/ui'
import { IProductRequisitionFormInfo } from '@/types'

import { RequisitionTypeBadge } from '@/components/app/badge'
import { useExportExcelProductRequisition, useExportPDFProductRequisition } from '@/hooks'
import { showToast } from '@/utils'
import { DialogRequisitionDetail } from '@/components/app/dialog'

export const useWarehouseColumns = (): ColumnDef<IProductRequisitionFormInfo>[] => {
  const { t } = useTranslation(['warehouse'])
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [selectedRequisition, setSelectedRequisition] =
    useState<IProductRequisitionFormInfo | null>(null)
  const { mutate: exportPDFProductRequisition } = useExportPDFProductRequisition()
  const { mutate: exportExcelProductRequisition } = useExportExcelProductRequisition()

  const handleOpenViewDialog = (requisition: IProductRequisitionFormInfo) => {
    setOpenViewDialog(true)
    setSelectedRequisition(requisition)
  }

  const onViewDialogOpenChange = () => {
    setOpenViewDialog(false)
  }

  const handleExportPDFProductRequisition = (slug: string) => {
    exportPDFProductRequisition(slug, {
      onSuccess: () => {
        showToast(t('toast.exportPDFSuccess'))
      }
    })
  }
  const handleExportExcelProductRequisition = (slug: string) => {
    exportExcelProductRequisition(slug, {
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
    // {
    //   accessorKey: 'isRecalled',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái hoàn" />,
    //   cell: ({ row }) => {
    //     const { status, isRecalled } = row.original
    //     return (
    //       <div className="min-w-[8rem]">
    //         <RecalledStatusBadge status={status} isRecalled={isRecalled} />
    //       </div>
    //     )
    //   }
    // },
    // {
    //   accessorFn: (row) => row.status,
    //   id: 'status',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
    //   cell: ({ row }) => {
    //     return (
    //       <ProductRequisitionByCreatorStatusBadge
    //         isRecalled={row.original.isRecalled}
    //         status={row.original.status as ProductRequisitionStatus}
    //       />
    //     )
    //   },
    //   filterFn: (row, id, value) => {
    //     return row.original.status === value
    //   }
    // },
    {
      id: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        const requisition = row.original
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 w-8 h-8">
                  <span className="sr-only">Thao tác</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleOpenViewDialog(requisition)}>
                  {t('warehouse.detail')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleExportPDFProductRequisition(requisition.slug)}
                >
                  {t('warehouse.pdfExport')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleExportExcelProductRequisition(requisition.slug)}
                >
                  {t('warehouse.excelExport')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogRequisitionDetail
              openDialog={openViewDialog}
              requisition={requisition}
              component={null}
              onOpenChange={onViewDialogOpenChange}
            />
          </div>
        )
      }
    }
  ]
}
