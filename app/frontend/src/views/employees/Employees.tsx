import React, { useEffect } from 'react'
import { DataTable, Label } from '@/components/ui'
import { columns } from './DataTable/columns'
import NProgress from 'nprogress'
import { useUsers } from '@/hooks/useUsers'
import { ReaderIcon } from '@radix-ui/react-icons'
import { CustomComponent } from './CustomComponent'
import usePaging from '@/hooks/usePaging'

const Employees: React.FC = () => {
  const { pagination, handlePageChange, handlePageSizeChange } = usePaging()
  const { data, isLoading } = useUsers(pagination.pageIndex + 1, pagination.pageSize)

  useEffect(() => {
    if (isLoading) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [isLoading])

  return (
    <div className="flex flex-col gap-2">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        Danh sách nhân viên
      </Label>
      <DataTable
        columns={columns}
        data={data?.items || []}
        total={data?.total || 0}
        pages={data?.pages || 0}
        page={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        CustomComponent={CustomComponent}
      />
    </div>
  )
}

export default Employees
