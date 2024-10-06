import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { SingleValue } from 'react-select'

import { useUnits } from '@/hooks'

interface SelectUnitProps {
  onChange: (
    values: SingleValue<{
      value: string
      label: string
    }>
  ) => void
  defaultValue?: { value: string; label: string }
  isDisabled?: boolean
}

export const SelectUnit: FC<SelectUnitProps> = ({ onChange, defaultValue, isDisabled }) => {
  const [allUnits, setAllUnits] = useState<{ value: string; label: string }[]>([])
  const { t } = useTranslation('productRequisition')
  const { data: units } = useUnits()

  const handleScrollToBottom = () => {
    if (units?.result) {
      const newUnits = units.result.map((item) => ({
        value: item.slug || '',
        label: item.name || ''
      }))
      // Append new roles to the previous roles
      setAllUnits((prevUnits) => [...prevUnits, ...newUnits])
    }
  }

  // Effect to append new roles to the local state when roles are fetched
  useEffect(() => {
    if (units?.result) {
      const newUnits = units.result.map((item) => ({
        value: item.slug || '',
        label: item.name || ''
      }))
      // Append new roles to the previous roles
      setAllUnits((prevUnits) => [...prevUnits, ...newUnits])
    }
  }, [units])

  const handleChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    console.log('Selected unit:', selectedOption)
    onChange(selectedOption)
  }

  return (
    <ReactSelect
      onMenuScrollToBottom={handleScrollToBottom}
      options={allUnits}
      onChange={handleChange}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: '8px',
          padding: '2px',
          borderColor: '#E2E8F0',
          boxShadow: 'none'
        })
      }}
    />
  )
}
