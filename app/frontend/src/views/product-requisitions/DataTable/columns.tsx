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

export const useColumnsRequisitionList = (): ColumnDef<IRequisitionFormResponseForApprover>[] => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedRequisition] = useState<IRequisitionFormResponseForApprover | null>(null)
  const onOpenChange = () => {
    setOpenDialog(false)
  }
  return [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && 'indeterminate')
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false
    // },
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
                {roleApproval === 'approval_stage_1' && (
                  <DropdownMenuItem className="text-red-500">Hủy</DropdownMenuItem>
                )}
                {roleApproval === 'approval_stage_2' && (
                  <>
                    <DropdownMenuItem>Hoàn lại</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Hủy</DropdownMenuItem>
                  </>
                )}
                {roleApproval === 'approval_stage_3' && (
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
                onOpenChange={onOpenChange}
              />
            )}
          </div>
        )
      }
    }
  ]
}
