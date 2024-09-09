import React, { useEffect, useState } from 'react'

import { DataTable } from '@/components/ui'
import { columns } from './DataTable/columns'
import NProgress from 'nprogress'
import { useUsers } from '@/hooks'
import { useSearchParams } from 'react-router-dom'
import { PaginationState } from '@tanstack/react-table'

const Employees: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize
  })

  const { data, isLoading, error } = useUsers({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  })

  useEffect(() => {
    setSearchParams({
      page: (pagination.pageIndex + 1).toString(),
      pageSize: pagination.pageSize.toString()
    })
  }, [pagination, setSearchParams])

  const handlePageChange = (pageIndex: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: pageIndex - 1 }))
    setSearchParams({
      page: pageIndex.toString(),
      pageSize: pagination.pageSize.toString()
    })
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize }))
    setSearchParams({
      page: (pagination.pageIndex + 1).toString(),
      pageSize: pageSize.toString()
    })
  }

  if (isLoading) {
    NProgress.start()
  } else {
    NProgress.done()
  }

  return (
    <div className="w-full gap-6">
      {data && data.items ? (
        <DataTable
          columns={columns}
          data={data?.items || []}
          total={data?.total || 0}
          pages={data?.pages || 0}
          page={pagination.pageIndex + 1}
          pageSize={pagination.pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      ) : (
        <div className="flex items-center justify-center">
          {error && <div className="text-red-500">Không có dữ liệu</div>}
        </div>
      )}
    </div>
  )
}

export default Employees
