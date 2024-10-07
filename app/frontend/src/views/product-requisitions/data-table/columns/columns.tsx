import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { DataTableColumnHeader } from '@/components/ui'
import { IRequisitionFormResponseForApprover, ProductRequisitionStatus } from '@/types'
import { ProductRequisitionStatusBadge } from '@/components/app/badge'
import { RequisitionTypeBadge } from '@/components/app/badge'

export const useColumnsRequisitionList = (): ColumnDef<IRequisitionFormResponseForApprover>[] => {
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
      id: 'company',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Công ty" />,
      cell: ({ row }) => {
        const { creator } = row.original.productRequisitionForm
        const companyName = creator?.userDepartments?.[0]?.department?.site?.company?.name
        return <div className="min-w-[12rem] text-[0.8rem]">{companyName || 'Không có'}</div>
      }
    },
    {
      accessorFn: (row) => row.productRequisitionForm.status,
      id: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
      cell: ({ row }) => {
        return (
          <ProductRequisitionStatusBadge
            roleApproval={row.original.roleApproval}
            isRecalled={row.original.productRequisitionForm.isRecalled}
            status={row.original.productRequisitionForm.status as ProductRequisitionStatus}
          />
        )
      },
      filterFn: (row, id, value) => {
        return row.original.productRequisitionForm.status === value
      }
    }
  ]
}
