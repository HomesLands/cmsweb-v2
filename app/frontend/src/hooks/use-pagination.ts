import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PaginationState } from '@tanstack/react-table'

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize
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

  return { pagination, handlePageChange, handlePageSizeChange }
}
