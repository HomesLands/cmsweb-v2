import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  DataTableColumnHeader
} from '@/components/ui'
import { IProductRequisitionFormInfo, ProductRequisitionStatus } from '@/types'
import { ProductRequisitionByCreatorStatusBadge } from '@/components/app/badge'
import { RequisitionTypeBadge } from '@/components/app/badge'
import { DialogRequisitionDetail } from '@/components/app/dialog'
import { RecalledStatusBadge } from '@/components/app/badge'
import { ROUTE } from '@/constants'
import { useTranslation } from 'react-i18next'

export const useColumnsRequisitionListCreator = (): ColumnDef<IProductRequisitionFormInfo>[] => {
  const navigate = useNavigate()
  const { t } = useTranslation('productRequisition')

  const handleEditRequisition = (requisition: IProductRequisitionFormInfo) => {
    navigate(ROUTE.EDIT_PRODUCT_REQUISITIONS.replace(':slug', requisition.slug))
  }

  return [
    {
      accessorKey: 'code',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã yêu cầu" />,
      cell: ({ row }) => row.original.code || 'Không có'
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
      cell: ({ row }) => {
        const date = row.original.createdAt ? new Date(row.original.createdAt) : null
        return date ? format(date, 'HH:mm dd/MM/yyyy') : 'Không có'
      }
    },
    {
      accessorKey: 'deadlineApproval',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Thời hạn duyệt" />,
      cell: ({ row }) => {
        const date = row.original.deadlineApproval ? new Date(row.original.deadlineApproval) : null
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
      header: ({ column }) => <DataTableColumnHeader column={column} title="Người tạo" />,
      cell: ({ row }) => row.original.creator?.fullname || 'Không có'
    },
    {
      id: 'company',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Công ty" />,
      cell: ({ row }) => {
        const { creator } = row.original
        const companyName = creator?.userDepartments?.[0]?.department?.site?.company?.name
        return <div className="min-w-[12rem] text-[0.8rem]">{companyName || ''}</div>
      }
    },
    {
      accessorKey: 'isRecalled',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái hoàn" />,
      cell: ({ row }) => {
        const { status, isRecalled } = row.original
        return (
          <div className="min-w-[8rem]">
            <RecalledStatusBadge status={status} isRecalled={isRecalled} />
          </div>
        )
      }
    },
    {
      accessorFn: (row) => row.status,
      id: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
      cell: ({ row }) => {
        return (
          <ProductRequisitionByCreatorStatusBadge
            isRecalled={row.original.isRecalled}
            status={row.original.status as ProductRequisitionStatus}
          />
        )
      },
      filterFn: (row, id, value) => {
        return row.original.status === value
      }
    },
    {
      id: 'actions',
      header: () => <div className="text-[0.8rem] min-w-[4rem]">Thao tác</div>,
      cell: ({ row }) => {
        const requisition = row.original
        const canEdit =
          (requisition.status === 'waiting' && !requisition.isRecalled) ||
          (requisition.status === 'cancel' && requisition.isRecalled) ||
          (requisition.status === 'cancel' && !requisition.isRecalled)

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                  <span className="sr-only">Thao tác</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogRequisitionDetail requisition={requisition} />
                {canEdit && (
                  <DropdownMenuItem onClick={() => handleEditRequisition(requisition)}>
                    {t('requisitionEdit.requestEdit')}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      }
    }
  ]
}
