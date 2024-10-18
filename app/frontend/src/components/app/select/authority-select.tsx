import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuthorities, usePagination } from '@/hooks'
import ReactSelect, { SingleValue } from 'react-select'

interface SelectAuthorityProps {
  onChange: (
    values: SingleValue<{
      value: string
      label: string
    }>
  ) => void
}

export const SelectAuthority: FC<SelectAuthorityProps> = ({ onChange }) => {
  const [allAuthorities, setAllAuthorities] = useState<{ value: string; label: string }[]>([])
  const { t } = useTranslation('productRequisition')
  const { pagination, handlePageChange } = usePagination({ isSearchParams: false })
  const { data: authorities } = useAuthorities({
    order: 'DESC',
    page: pagination.pageIndex,
    pageSize: 1000
  })

  const handleScrollToBottom = () => {
    if (authorities?.page && authorities.totalPages) {
      if (authorities.page < authorities.totalPages) handlePageChange(pagination.pageIndex + 1)
    }
  }

  // Effect to append new authorities to the local state when roles are fetched
  useEffect(() => {
    if (authorities?.items) {
      const newAuthorities = authorities.items.map((item) => ({
        value: item.slug || '',
        label: item.nameNormalize || ''
      }))
      // Append new roles to the previous roles
      setAllAuthorities((prevRoles) => [...prevRoles, ...newAuthorities])
    }
  }, [authorities])

  return (
    <ReactSelect
      // onMenuScrollToBottom={handleScrollToBottom}
      options={allAuthorities}
      onChange={onChange}
    />
  )
}
