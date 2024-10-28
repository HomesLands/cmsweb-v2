import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import React from 'react'

import { DataTableColumnHeader } from '@/components/ui'
import { IUserApprovalInfo } from '@/types'
import { ApprovalLogStatus, UserApprovalStage } from '@/constants'

export const useColumnsApprovalLogStage3 = (): ColumnDef<IUserApprovalInfo>[] => {
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
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('tableData.status')} />
      ),
      cell: ({ row }) => {
        const approvalLogs = row.original.approvalLogs
        if (approvalLogs && approvalLogs.length > 0) {
          const status = approvalLogs[0].status
          switch (status) {
            case ApprovalLogStatus.ACCEPT:
              return t('status.accept')
            case ApprovalLogStatus.REJECT:
              return t('status.reject')
            case ApprovalLogStatus.GIVE_BACK:
              return t('status.giveBack')
          }
        }
        return t('status.waiting')
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
          return (
            <div className="space-y-2">
              {approvalLogs.map((log) => (
                <div key={log.slug}>
                  <div className="text-lg font-semibold">{log.content}</div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(log.createdAt), 'HH:mm dd/MM/yyyy')}
                  </div>
                </div>
              ))}
            </div>
          )
        }
        return ''
      }
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('tableData.approvalTime')} />
      ),
      cell: ({ row }) => {
        const approvalLogs = row.original.approvalLogs
        if (approvalLogs && approvalLogs.length > 0) {
          const { createdAt } = approvalLogs[0]
          return format(new Date(createdAt), 'HH:mm dd/MM/yyyy')
        }
        return ''
      }
    }
  ]
}
