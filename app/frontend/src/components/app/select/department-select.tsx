import { FC, useEffect, useState } from 'react'
import ReactSelect, { SingleValue } from 'react-select'

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
  const { data: departments } = useDepartments()

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

  return <ReactSelect options={allDepartments} onChange={onChange} />
}
