import { DataTable } from '@/components/ui'
import { useAllProductRequisition, usePagination } from '@/hooks'
import { CustomComponent } from '@/views/product-requisitions/CustomComponent'
import { columns } from '@/views/product-requisitions/DataTable/columns'
import React from 'react'
import { useTranslation } from 'react-i18next'

const RequisitionStage1Table: React.FC = () => {
  const { t } = useTranslation(['productRequisition'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()
  const { data, isLoading } = useAllProductRequisition({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  })
  return (
    <div>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={data?.result?.items || []}
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

export default RequisitionStage1Table
