import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
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
  ProductRequisitionRoleApproval,
  ProductRequisitionStatus
} from '@/types'
import { ProductRequisitionStatusBadge } from '@/components/app/badge'
import { RequisitionTypeBadge } from '@/components/app/badge'
import { DialogRequisitionDetail } from '@/components/app/dialog'
import { UserApprovalStage } from '@/constants'

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
      accessorKey: 'productRequisitionForm.creator.fullname',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Người tạo" />
    },
    {
      accessorKey: 'productRequisitionForm.creator.userDepartments[0].department.site.company.name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Công ty" />,
      cell: ({ row }) => {
        const { company } =
          row.original.productRequisitionForm.creator.userDepartments[0].department.site
        return <div>{company.name}</div>
      }
    },
    {
      accessorFn: (row) => row.productRequisitionForm.status,
      id: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
      cell: ({ row }) => {
        return (
          <ProductRequisitionStatusBadge
            isRecalled={row.original.productRequisitionForm.isRecalled}
            status={row.original.productRequisitionForm.status as ProductRequisitionStatus}
            roleApproval={row.original.roleApproval as ProductRequisitionRoleApproval}
          />
        )
      },
      filterFn: (row, id, value) => {
        return row.original.productRequisitionForm.status === value
      }
    }
  ]
}
