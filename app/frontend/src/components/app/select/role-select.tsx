import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { SingleValue } from 'react-select'

import { usePagination, useRoles } from '@/hooks'

interface SelectRoleProps {
  onChange: (
    values: SingleValue<{
      value: string
      label: string
    }>
  ) => void
}

export const SelectRole: FC<SelectRoleProps> = ({ onChange }) => {
  const [allRoles, setAllRoles] = useState<{ value: string; label: string }[]>([])
  const { t } = useTranslation('productRequisition')
  const { pagination, handlePageChange } = usePagination({ isSearchParams: false })
  const { data: roles } = useRoles({
    order: 'DESC',
    page: pagination.pageIndex,
    pageSize: 1000
  })

  const handleScrollToBottom = () => {
    if (roles?.page && roles.totalPages) {
      if (roles.page < roles.totalPages) handlePageChange(pagination.pageIndex + 1)
    }
  }

  // Effect to append new roles to the local state when roles are fetched
  useEffect(() => {
    if (roles?.items) {
      const newRoles = roles.items.map((item) => ({
        value: item.slug || '',
        label: `${item.nameDisplay}(${item.nameNormalize})`
      }))
      // Append new roles to the previous roles
      setAllRoles((prevRoles) => [...prevRoles, ...newRoles])
    }
  }, [roles])

  return (
    <ReactSelect
      // onMenuScrollToBottom={handleScrollToBottom}
      options={allRoles}
      onChange={onChange}
    />
  )
}
