import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

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
import { DialogRequisitionDetail } from '@/components/app/dialog/dialog-requisition-detail'
import { RecalledStatusBadge } from '@/components/app/badge'

import { format } from 'date-fns'
import { useNavigate } from 'react-router'

export const useColumnsRequisitionListCreator = (): ColumnDef<IProductRequisitionFormInfo>[] => {
  const [openViewDialog, setOpenViewDialog] = useState(false)
  // const [openEditDialog, setOpenEditDialog] = useState(false)
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

  // Replace handleEditRequisition function
  const handleEditRequisition = (requisition: IProductRequisitionFormInfo) => {
    navigate(`/product-requisitions/edit/${requisition.slug}`)
  }

  return [
    {
      accessorKey: 'code',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã yêu cầu" />
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt || '')
        return format(date, 'HH:mm dd/MM/yyyy')
      }
    },
    {
      accessorKey: 'productRequisitionForm',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Loại yêu cầu" />,
      cell: ({ row }) => {
        const { type } = row.original
        return <RequisitionTypeBadge type={type} />
      }
    },
    {
      accessorKey: 'creator.fullname',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Người tạo" />
    },
    {
      id: 'creator.company',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Công ty" />
      // cell: () => {
      //   return <div className="min-w-[12rem] text-[0.8rem]">{companyName}</div>
      // }
    },
    // {
    //   id: 'company',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Công ty" />,
    //   cell: () => {
    //     return <div className="min-w-[12rem] text-[0.8rem]">{companyName}</div>
    //   }
    // },
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
                // companyName={companyName}
                onOpenChange={onViewDialogOpenChange}
              />
            )}
            {/* {selectedRequisition === requisition && openEditDialog && (
              <DialogRequisitionDetail
                openDialog={openEditDialog}
                requisition={requisition}
                component={null}
                companyName={companyName}
                onOpenChange={onEditDialogOpenChange}
                isEditing={true}
              />
            )} */}
          </div>
        )
      }
    }
  ]
}
