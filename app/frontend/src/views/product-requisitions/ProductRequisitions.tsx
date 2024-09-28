import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTableByCreator, Label } from '@/components/ui'
import { usePagination, useProductRequisitionByCreator } from '@/hooks'
import { CustomComponent } from './CustomComponent'
import { useColumnsRequisitionListCreator } from './DataTable/columnsCreator'
import { useUserStore } from '@/stores'

const ProductRequisitions: React.FC = () => {
  const { t } = useTranslation(['productRequisition'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()
  const { userInfo } = useUserStore()

  const { data, isLoading } = useProductRequisitionByCreator({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  })

  const filteredData = useMemo(() => {
    if (!data?.result?.items || data.result.items.length === 0 || !userInfo) return []

    return data.result.items.filter((item) => item.creatorSlug === userInfo.slug)
  }, [data?.result.items, userInfo])

  const dataWithDisplayStatus = useMemo(() => {
    return filteredData.map((item) => {
      const { status, isRecalled } = item
      let displayStatus = ''
      let statusColor = ''

      if (status === 'waiting' && !isRecalled) {
        displayStatus = 'Vừa tạo, đang chờ duyệt bước 1'
        statusColor = 'yellow'
      } else if (status === 'cancel' && isRecalled) {
        displayStatus = 'Đã bị hoàn ở bước 1'
        statusColor = 'orange'
      } else if (status === 'accepted_stage_1' && !isRecalled) {
        displayStatus = 'Đã duyệt bước 1'
        statusColor = 'green'
      } else if (status === 'waiting' && isRecalled) {
        displayStatus = 'Đã bị hoàn ở bước 2'
        statusColor = 'orange'
      } else if (status === 'accepted_stage_2' && !isRecalled) {
        displayStatus = 'Đã duyệt bước 2'
        statusColor = 'green'
      } else if (status === 'accepted_stage_1' && isRecalled) {
        displayStatus = 'Đã bị hoàn ở bước 3'
        statusColor = 'orange'
      } else if (status === 'waiting_export' && !isRecalled) {
        displayStatus = 'Đã duyệt bước 3'
        statusColor = 'blue'
      } else if (status === 'cancel' && !isRecalled) {
        displayStatus = 'Đã bị hủy'
        statusColor = 'red'
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
        {t('productRequisition.listEmployee')}
      </Label>
      <DataTableByCreator
        isLoading={isLoading}
        columns={useColumnsRequisitionListCreator()}
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

export default ProductRequisitions
