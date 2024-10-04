import { Label, DataTable } from '@/components/ui'
import { usePagination, useProjects } from '@/hooks'
import { ReaderIcon } from '@radix-ui/react-icons'
import React from 'react'
import { columns } from './DataTable/columns'

const Projects: React.FC = () => {
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data, isLoading } = useProjects()

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        Danh sách nhân viên
      </Label>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={data?.result || []}
        pages={0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}

export default Projects
