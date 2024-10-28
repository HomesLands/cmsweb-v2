import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PaginationState } from '@tanstack/react-table'

export const usePagination = ({ isSearchParams = true }: { isSearchParams?: boolean } = {}) => {
  const [searchParams] = useSearchParams()
  const page = isSearchParams ? parseInt(searchParams.get('page') || '1', 10) : 1
  const pageSize = isSearchParams ? parseInt(searchParams.get('pageSize') || '10', 10) : 10
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize
  })

  const handlePageChange = (pageIndex: number) => {
    setPagination((prev) => ({ ...prev, pageIndex }))
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize, pageIndex: 1 }))
  }

  return { pagination, handlePageChange, handlePageSizeChange }
}
