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
import { AcceptRequisitionDropdownMenuItem } from '@/components/app/dropdown/accept-requisition-dropdown'
import { RequisitionTypeBadge } from '@/components/app/badge/RequisitionTypeBadge'
import { useState } from 'react'
import { DialogRequisitionDetail } from '@/components/app/dialog/dialog-requisition-detail'

export const useColumnsRequisitionListCreator = (): ColumnDef<IRequestRequisitionInfo>[] => {
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
      accessorKey: 'company',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Công ty" />
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

                <AcceptRequisitionDropdownMenuItem>Duyệt</AcceptRequisitionDropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Hủy</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {selectedRequisition === requisition && openDialog && (
              <DialogRequisitionDetail
                openDialog={openDialog}
                requisition={requisition}
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
