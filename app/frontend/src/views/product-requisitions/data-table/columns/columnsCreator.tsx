import { useState } from 'react'
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

export const useColumnsRequisitionListCreator = (): ColumnDef<IProductRequisitionFormInfo>[] => {
  const [openViewDialog, setOpenViewDialog] = useState(false)
  const [selectedRequisition, setSelectedRequisition] =
    useState<IProductRequisitionFormInfo | null>(null)
  const navigate = useNavigate()

  const handleOpenViewDialog = (requisition: IProductRequisitionFormInfo) => {
    setOpenViewDialog(true)
    setSelectedRequisition(requisition)
  }

  const onViewDialogOpenChange = () => {
    setOpenViewDialog(false)
  }

  const handleEditRequisition = (requisition: IProductRequisitionFormInfo) => {
    navigate(`/product-requisitions/edit/${requisition.slug}`)
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
        return <div className="min-w-[12rem] text-[0.8rem]">{companyName || 'Không có'}</div>
      }
    },
    {
      accessorKey: 'isRecalled',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái hoàn" />,
      cell: ({ row }) => {
        const { status, isRecalled } = row.original
        return <RecalledStatusBadge status={status} isRecalled={isRecalled} />
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
                <Button variant="ghost" className="p-0 w-8 h-8">
                  <span className="sr-only">Thao tác</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleOpenViewDialog(requisition)}>
                  Xem chi tiết
                </DropdownMenuItem>
                {canEdit && (
                  <DropdownMenuItem onClick={() => handleEditRequisition(requisition)}>
                    Sửa yêu cầu
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {selectedRequisition === requisition && openViewDialog && (
              <DialogRequisitionDetail
                openDialog={openViewDialog}
                requisition={requisition}
                component={null}
                onOpenChange={onViewDialogOpenChange}
              />
            )}
          </>
        )
      }
    }
  ]
}
