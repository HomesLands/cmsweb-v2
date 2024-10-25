import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { SingleValue } from 'react-select'

import { FormApprovalType } from '@/constants/assigned-approver'

interface SelectFormTypeProps {
  defaultValue?: FormApprovalType
  onChange: (
    values: SingleValue<{
      value: FormApprovalType
      label: string
    }>
  ) => void
}

export const SelectFormType: FC<SelectFormTypeProps> = ({ defaultValue, onChange }) => {
  const [selectedFormType, setSelectedFormType] = useState<{
    value: FormApprovalType
    label: string
  } | null>(null)

  const formTypeOptions = Object.entries(FormApprovalType).map(([key, value]) => ({
    value: value as FormApprovalType,
    label: `${key}`
  }))

  // Set default value when it's available
  useEffect(() => {
    if (defaultValue && formTypeOptions.length > 0) {
      const defaultOption = formTypeOptions.find((option) => option.value === defaultValue)
      if (defaultOption) {
        setSelectedFormType(defaultOption)
      }
    }
  }, [defaultValue, formTypeOptions])

  const handleChange = (
    selectedOption: SingleValue<{ value: FormApprovalType; label: string }>
  ) => {
    if (selectedOption) {
      setSelectedFormType(selectedOption)
      onChange(selectedOption)
    }
  }

  return (
    <ReactSelect
      value={selectedFormType}
      options={formTypeOptions}
      onChange={handleChange}
      defaultValue={selectedFormType}
    />
  )
}
