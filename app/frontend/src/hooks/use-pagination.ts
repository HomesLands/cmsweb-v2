import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PaginationState } from '@tanstack/react-table'

export const usePagination = ({ isSearchParams = true }: { isSearchParams?: boolean } = {}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = isSearchParams ? parseInt(searchParams.get('page') || '1', 10) : 1
  const pageSize = isSearchParams ? parseInt(searchParams.get('pageSize') || '10', 10) : 10
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize
  })

  useEffect(() => {
    if (isSearchParams)
      setSearchParams({
        page: pagination.pageIndex.toString(),
        pageSize: pagination.pageSize.toString()
      })
  }, [isSearchParams, pagination, setSearchParams])

  const handlePageChange = (pageIndex: number) => {
    setPagination((prev) => ({ ...prev, pageIndex }))
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize, pageIndex: 1 }))
  }

  return { pagination, handlePageChange, handlePageSizeChange }
}
