import React from 'react'

import { DataTable } from '@/components/ui'
import { useGetApprovedProductRequisition, usePagination } from '@/hooks'
import { useWarehouseColumns } from './DataTable/columns'
import { useDownloadStore } from '@/api/products'

const Warehouse: React.FC = () => {
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()
  const { data: approvedProductRequisition, isLoading: isLoadingApprovedProductRequisition } =
    useGetApprovedProductRequisition({
      page: pagination.pageIndex,
      pageSize: pagination.pageSize,
      order: 'DESC'
    })

  return (
    <div className="flex flex-col gap-4 mt-2">
      <DataTable
        columns={useWarehouseColumns()}
        data={approvedProductRequisition?.result.items || []}
        pages={approvedProductRequisition?.result?.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoadingApprovedProductRequisition}
      />
    </div>
  )
}

export default Warehouse
