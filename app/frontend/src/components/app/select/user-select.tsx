import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { SingleValue } from 'react-select'

import { usePagination, useUsers } from '@/hooks'

interface SelectUserProps {
  onChange: (value: string) => void
}

export const SelectUser: FC<SelectUserProps> = ({ onChange }) => {
  const [allUsers, setAllUsers] = useState<{ value: string; label: string }[]>([])
  const { t } = useTranslation('productRequisition')
  const { pagination, handlePageChange } = usePagination({ isSearchParams: false })
  const { data } = useUsers({
    order: 'DESC',
    page: pagination.pageIndex,
    pageSize: pagination.pageSize
  })

  const handleScrollToBottom = () => {
    if (data?.result?.page && data.result.totalPages) {
      if (data.result.page < data.result.totalPages) handlePageChange(pagination.pageIndex + 1)
    }
  }

  // Effect to append new roles to the local state when roles are fetched
  useEffect(() => {
    if (data?.result?.items) {
      const newUsers = data.result.items.map((item) => ({
        value: item.slug || '',
        label: item.fullname || ''
      }))
      // Append new roles to the previous roles
      setAllUsers((prevUsers) => [...prevUsers, ...newUsers])
    }
  }, [data])

  const handleChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    if (selectedOption) {
      onChange(selectedOption.value) // Only pass the value (slug)
    }
  }

  return (
    <ReactSelect
      onMenuScrollToBottom={handleScrollToBottom}
      options={allUsers}
      onChange={handleChange}
    />
  )
}
