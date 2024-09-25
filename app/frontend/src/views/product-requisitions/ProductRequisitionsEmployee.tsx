import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { columns } from './DataTable/columns'
import { usePagination, useProductRequisitionByApprover } from '@/hooks'
import { CustomComponent } from './CustomComponent'

const ProductRequisitionsEmployee: React.FC = () => {
  const { t } = useTranslation(['productRequisition'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data, isLoading } = useProductRequisitionByApprover({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  })

  const filteredData = useMemo(() => {
    if (!data?.result?.items || data.result.items.length === 0) return []

    const roleApproval = data.result.items[0].roleApproval

    return data.result.items.filter((item) => {
      const { status, isRecalled } = item.productRequisitionForm

      switch (roleApproval) {
        case 'approval_stage_1':
          return (
            (status === 'waiting' && !isRecalled) ||
            (status === 'cancel' && isRecalled) ||
            (status === 'accepted_stage_1' && !isRecalled)
          )
        case 'approval_stage_2':
          return (
            (status === 'accepted_stage_1' && !isRecalled) ||
            (status === 'accepted_stage_1' && isRecalled) ||
            status === 'accepted_stage_2' ||
            (status === 'cancel' && isRecalled) ||
            (status === 'waiting' && isRecalled)
          )
        case 'approval_stage_3':
          return (
            (status === 'accepted_stage_1' && isRecalled) ||
            status === 'waiting_export' ||
            (status === 'cancel' && isRecalled)
          )
        default:
          return false
      }
    })
  }, [data?.result?.items])

  const dataWithDisplayStatus = useMemo(() => {
    return filteredData.map((item) => {
      const { status, isRecalled } = item.productRequisitionForm
      let displayStatus = ''
      let statusColor = ''

      switch (item.roleApproval) {
        case 'approval_stage_1':
          if (status === 'waiting' && !isRecalled) {
            displayStatus = 'Chờ duyệt'
            statusColor = 'yellow'
          } else if (status === 'cancel' && isRecalled) {
            displayStatus = 'Đã hủy'
            statusColor = 'red'
          } else if (status === 'accepted_stage_1' && !isRecalled) {
            displayStatus = 'Đã duyệt'
            statusColor = 'green'
          }
          break
        case 'approval_stage_2':
          if (status === 'accepted_stage_1' && !isRecalled) {
            displayStatus = 'Chờ duyệt bước 2'
            statusColor = 'yellow'
          } else if (status === 'accepted_stage_1' && isRecalled) {
            displayStatus = 'Chờ duyệt bước 2 (bị hoàn lại từ bước trên)'
            statusColor = 'yellow'
          } else if (status === 'accepted_stage_2') {
            displayStatus = 'Đã duyệt'
            statusColor = 'green'
          } else if (status === 'cancel' && isRecalled) {
            displayStatus = 'Hủy'
            statusColor = 'red'
          } else if (status === 'waiting' && isRecalled) {
            displayStatus = 'Bị hoàn lại để xem xét'
            statusColor = 'orange'
          }
          break
        case 'approval_stage_3':
          if (status === 'accepted_stage_1' && isRecalled) {
            displayStatus = 'Đã bị hoàn để xem xét lại'
            statusColor = 'red'
          } else if (status === 'waiting_export') {
            displayStatus = 'Đã duyệt'
            statusColor = 'green'
          } else if (status === 'cancel' && isRecalled) {
            displayStatus = 'Hủy'
            statusColor = 'red'
          }
          break
      }

      return {
        ...item,
        displayStatus,
        statusColor
      }
    })
  }, [filteredData])

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        haha hoho
        {t('productRequisition.list')}
      </Label>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={dataWithDisplayStatus}
        pages={data?.result?.totalPages || 0}
        page={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        CustomComponent={CustomComponent}
      />
    </div>
  )
}

export default ProductRequisitionsEmployee
