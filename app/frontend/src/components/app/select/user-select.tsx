import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { SingleValue } from 'react-select'

import { usePagination, useUsers } from '@/hooks'

interface SelectUserProps {
  defaultValue?: string
  onChange: (value: string) => void
}

export const SelectUser: FC<SelectUserProps> = ({ defaultValue, onChange }) => {
  const [allUsers, setAllUsers] = useState<{ value: string; label: string }[]>([])
  const [selectedUser, setSelectedUser] = useState<{ value: string; label: string } | null>(null)
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

  // Effect to append new users to the local state when users are fetched
  useEffect(() => {
    if (data?.result?.items) {
      const newUsers = data.result.items.map((item) => ({
        value: item.slug || '',
        label: item.fullname || ''
      }))
      // Append new users to the previous users
      setAllUsers((prevUsers) => [...prevUsers, ...newUsers])
    }
  }, [data])

  // Set default value when it's available
  useEffect(() => {
    if (defaultValue && allUsers.length > 0) {
      const defaultOption = allUsers.find((user) => user.value === defaultValue)
      if (defaultOption) {
        setSelectedUser(defaultOption)
      }
    }
  }, [defaultValue, allUsers])

  const handleChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    if (selectedOption) {
      setSelectedUser(selectedOption)
      onChange(selectedOption.value) // Only pass the value (slug)
    }
  }

  return (
    <ReactSelect
      value={selectedUser}
      onMenuScrollToBottom={handleScrollToBottom}
      options={allUsers}
      onChange={handleChange}
      defaultValue={selectedUser}
    />
  )
}
