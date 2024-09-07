import React, { useEffect, useState } from 'react'
import { PaginationState } from '@tanstack/react-table'

import { DataTable } from '@/components/ui'
import { columns } from './DataTable/columns'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '@/hooks/useUsers'

const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize
  })

  const { data } = useProducts(pagination.pageIndex + 1, pagination.pageSize)

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

  return (
    <div
      className="relative flex items-start flex-1 rounded-lg shadow-none"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="grid items-start w-full gap-6 mx-auto">
        <div className="grid w-full gap-6">
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
        </div>
      </div>
    </div>
  )
}

export default Projects
