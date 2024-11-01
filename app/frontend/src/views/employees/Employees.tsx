import React from 'react'

import { DataTable } from '@/components/ui'
import { usePagination, useUsers } from '@/hooks'
import { useEmployeeColumns } from './data-table'

const Employees: React.FC = () => {
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data, isLoading } = useUsers({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    order: 'DESC'
  })

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        isLoading={isLoading}
        columns={useEmployeeColumns()}
        data={data?.result.items || []}
        pages={data?.result.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}

export default Employees
