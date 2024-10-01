import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/ui'
import { IRole } from '@/types'

export const useRoleColumns = (): ColumnDef<IRole>[] => {
  return [
    {
      accessorKey: 'nameNormalize',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name normalize" />
    },
    {
      accessorKey: 'description',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />
      // cell: ({ row }) => {
      //   const { type } = row.original.description
      //   return <RequisitionTypeBadge type={type} />
      // }
    }
    // {
    //   id: 'actions',
    //   header: 'Thao tác',
    //   cell: ({ row }) => {
    //     const requisition = row.original
    //     const { roleApproval } = requisition
    //     console.log('requisition info', requisition)
    //     return (
    //       <div>
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Button variant="ghost" className="w-8 h-8 p-0">
    //               <span className="sr-only">Thao tác</span>
    //               <MoreHorizontal className="w-4 h-4" />
    //             </Button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="end">
    //             <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
    //             {roleApproval === 'approval_stage_1' && (
    //               <DropdownMenuItem className="text-red-500">Hủy</DropdownMenuItem>
    //             )}
    //             {roleApproval === 'approval_stage_2' && (
    //               <>
    //                 <DropdownMenuItem>Hoàn lại</DropdownMenuItem>
    //                 <DropdownMenuItem className="text-red-500">Hủy</DropdownMenuItem>
    //               </>
    //             )}
    //             {roleApproval === 'approval_stage_3' && (
    //               <>
    //                 <DropdownMenuItem>Hoàn lại</DropdownMenuItem>
    //                 <DropdownMenuItem className="text-red-500">Hủy</DropdownMenuItem>
    //               </>
    //             )}
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //         {selectedRequisition === requisition && openDialog && (
    //           <DialogRequisitionDetail
    //             openDialog={openDialog}
    //             requisition={requisition.productRequisitionForm}
    //             component={null}
    //             onOpenChange={onOpenChange}
    //           />
    //         )}
    //       </div>
    //     )
    //   }
    // }
  ]
}
