import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Button,
  DataTableColumnHeader
} from '@/components/ui'
import {
  IRequisitionFormResponseForApprover,
  RequestRequisitionRoleApproval,
  RequestRequisitionStatus
} from '@/types'
import { ProductRequisitionStatusBadge } from '@/components/app/badge'
import { RequisitionTypeBadge } from '@/components/app/badge/RequisitionTypeBadge'
import { useState } from 'react'
import { DialogRequisitionDetail } from '@/components/app/dialog/dialog-requisition-detail'
import { UserApprovalStage } from '@/constants'
import { format } from 'date-fns'

export const useColumnsRequisitionList = (): ColumnDef<IRequisitionFormResponseForApprover>[] => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedRequisition] = useState<IRequisitionFormResponseForApprover | null>(null)
  const onOpenChange = () => {
    setOpenDialog(false)
  }
  const formatDate = (date: Date) => {
    return format(date, 'HH:mm dd/MM/yyyy')
  }
  return [
    {
      accessorKey: 'productRequisitionForm.code',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã yêu cầu" />
    },
    {
      accessorKey: 'productRequisitionForm',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Loại yêu cầu" />,
      cell: ({ row }) => {
        const { type } = row.original.productRequisitionForm
        return <RequisitionTypeBadge type={type} />
      }
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
      cell: ({ row }) => {
        const { createdAt } = row.original
        return <div>{formatDate(new Date(createdAt))}</div>
      }
    },
    {
      accessorKey: 'productRequisitionForm.creator',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Người tạo" />
    },
    {
      accessorKey: 'productRequisitionForm.company',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Công ty" />
    },
    {
      accessorFn: (row) => row.productRequisitionForm.status,
      id: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
      cell: ({ row }) => {
        return (
          <ProductRequisitionStatusBadge
            isRecalled={row.original.productRequisitionForm.isRecalled}
            status={row.original.productRequisitionForm.status as RequestRequisitionStatus}
            roleApproval={row.original.roleApproval as RequestRequisitionRoleApproval}
          />
        )
      },
      filterFn: (row, id, value) => {
        return row.original.productRequisitionForm.status === value
      }
    },
    {
      id: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        const requisition = row.original
        const { roleApproval } = requisition
        console.log('requisition info', requisition)
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                  <span className="sr-only">Thao tác</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                {roleApproval === UserApprovalStage.APPROVAL_STAGE_1 && (
                  <DropdownMenuItem className="text-red-500">Hủy</DropdownMenuItem>
                )}
                {roleApproval === UserApprovalStage.APPROVAL_STAGE_2 && (
                  <>
                    <DropdownMenuItem>Hoàn lại</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Hủy</DropdownMenuItem>
                  </>
                )}
                {roleApproval === UserApprovalStage.APPROVAL_STAGE_3 && (
                  <>
                    <DropdownMenuItem>Hoàn lại</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Hủy</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {selectedRequisition === requisition && openDialog && (
              <DialogRequisitionDetail
                openDialog={openDialog}
                requisition={requisition.productRequisitionForm}
                component={null}
                companyName={requisition.productRequisitionForm.company}
                onOpenChange={onOpenChange}
              />
            )}
          </div>
        )
      }
    }
  ]
}
