import React from 'react'

import { ReaderIcon } from '@radix-ui/react-icons'

import { Label } from '@/components/ui'
import { usePagination } from '@/hooks'

const Employees: React.FC = () => {
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  // const { data, isLoading } = useUsers({
  //   page: pagination.pageIndex + 1,
  //   pageSize: pagination.pageSize
  // })

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        Danh sách nhân viên
      </Label>
      {/* <DataTable
        isLoading={isLoading}
        columns={columns}
        data={data?.result.items || []}
        pages={data?.result.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      /> */}
    </div>
  )
}

export default Employees
