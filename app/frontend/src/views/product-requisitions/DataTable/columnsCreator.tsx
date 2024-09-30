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
import { IRequestRequisitionInfo, RequestRequisitionStatus } from '@/types'
import { ProductRequisitionByCreatorStatusBadge } from '@/components/app/badge'
import { RequisitionTypeBadge } from '@/components/app/badge'
import { DialogRequisitionDetail } from '@/components/app/dialog'

export const useColumnsRequisitionListCreator = (
  companyName: string
): ColumnDef<IRequestRequisitionInfo>[] => {
  console.log(companyName)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedRequisition, setSelectedRequisition] = useState<IRequestRequisitionInfo | null>(
    null
  )
  const handleOpenDialog = (requisition: IRequestRequisitionInfo) => {
    setOpenDialog(true)
    setSelectedRequisition(requisition)
  }
  const onOpenChange = () => {
    setOpenDialog(false)
  }

  // Add this new function
  const handleEditRequisition = (requisition: IRequestRequisitionInfo) => {
    // Implement the logic for editing the requisition
    console.log('Editing requisition:', requisition)
    // You might want to open a modal for editing or navigate to an edit page
  }

  return [
    {
      accessorKey: 'code',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã yêu cầu" />
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
      accessorKey: 'creator',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Người tạo" />
    },
    {
      id: 'company',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Công ty" />,
      cell: () => companyName
    },
    {
      accessorFn: (row) => row.status,
      id: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
      cell: ({ row }) => {
        return (
          <ProductRequisitionByCreatorStatusBadge
            isRecalled={row.original.isRecalled}
            status={row.original.status as RequestRequisitionStatus}
          />
        )
      },
      filterFn: (row, id, value) => {
        return row.original.status === value
      }
    },
    {
      id: 'actions',
      header: () => <div className="text-[0.8rem] min-w-20">Thao tác</div>,
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
                <DropdownMenuItem onClick={() => handleOpenDialog(requisition)}>
                  Xem chi tiết
                </DropdownMenuItem>
                {canEdit && (
                  <DropdownMenuItem onClick={() => handleEditRequisition(requisition)}>
                    Sửa yêu cầu
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {selectedRequisition === requisition && openDialog && (
              <DialogRequisitionDetail
                openDialog={openDialog}
                requisition={requisition}
                component={null}
                companyName={companyName}
                onOpenChange={onOpenChange}
              />
            )}
          </div>
        )
      }
    }
  ]
}
