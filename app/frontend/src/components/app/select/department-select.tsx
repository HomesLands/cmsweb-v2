import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { SingleValue } from 'react-select'

import { usePagination, useRoles } from '@/hooks'
import { useDepartments } from '@/hooks/use-departments'

interface SelectDepartmentProps {
  onChange: (
    values: SingleValue<{
      value: string
      label: string
    }>
  ) => void
}

export const SelectDepartment: FC<SelectDepartmentProps> = ({ onChange }) => {
  const [allDepartments, setAllDepartments] = useState<{ value: string; label: string }[]>([])
  const { t } = useTranslation('productRequisition')
  const { pagination, handlePageChange } = usePagination({ isSearchParams: false })
  const { data: departments } = useDepartments()

  const handleScrollToBottom = () => {
    if (departments?.result && departments.result.length > 0) {
      if (departments.result.length < pagination.pageSize)
        handlePageChange(pagination.pageIndex + 1)
    }
  }

  // Effect to append new roles to the local state when roles are fetched
  useEffect(() => {
    if (departments?.result) {
      const newDepartments = departments.result.map((item) => ({
        value: item.slug || '',
        label: `${item.description} (${item.nameNormalize})`
      }))
      // Append new roles to the previous roles
      setAllDepartments((prevDepartments) => [...prevDepartments, ...newDepartments])
    }
  }, [departments])

  return (
    <ReactSelect
      // onMenuScrollToBottom={handleScrollToBottom}
      options={allDepartments}
      onChange={onChange}
    />
  )
}
