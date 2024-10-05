import React from 'react'

import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { usePagination, useUsers } from '@/hooks'
import { employeeColumns } from './data-table'

const Employees: React.FC = () => {
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data, isLoading } = useUsers({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    order: 'DESC'
  })

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        Danh sách nhân sự
      </Label>
      <DataTable
        isLoading={isLoading}
        columns={employeeColumns}
        data={data?.result.items || []}
        pages={data?.result.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}

export default Employees
