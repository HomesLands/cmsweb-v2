import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

import { DataTableColumnHeader } from '@/components/ui'
import { IUserApprovalInfo } from '@/types'
import { UserApprovalStage } from '@/constants'

export const useColumnsApprovalLog = (): ColumnDef<IUserApprovalInfo>[] => {
  const { t } = useTranslation('productRequisition')

  return [
    {
      accessorKey: 'userFullname',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('tableData.approverName')} />
      )
    },
    {
      accessorKey: 'assignedUserApproval.roleApproval',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('tableData.approvalLevel')} />
      ),
      cell: ({ row }) => {
        const roleApproval = row.original.assignedUserApproval?.roleApproval
        switch (roleApproval) {
          case UserApprovalStage.APPROVAL_STAGE_1:
            return t('roleApproval.approvalStage1')
          case UserApprovalStage.APPROVAL_STAGE_2:
            return t('roleApproval.approvalStage2')
          case UserApprovalStage.APPROVAL_STAGE_3:
            return t('roleApproval.approvalStage3')
          default:
            return ''
        }
      }
    },
    {
      accessorKey: 'approvalLogs',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('tableData.approvalContent')} />
      ),
      cell: ({ row }) => {
        const approvalLogs = row.original.approvalLogs
        if (approvalLogs && approvalLogs.length > 0) {
          return approvalLogs[0].content
        }
        return ''
      }
    }
  ]
}
