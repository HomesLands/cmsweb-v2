import { FC } from 'react'
import ReactSelect, { SingleValue } from 'react-select'

interface SelectUpdatePermissionProps {
  onChange: (
    value: SingleValue<{
      value: string
      label: string
    }>
  ) => void
  options: { value: string; label: string }[]
  defaultValue?: {
    value: string
    label: string
  }
}

export const SelectUpdatePermission: FC<SelectUpdatePermissionProps> = ({
  onChange,
  options = [],
  defaultValue
}) => {
  return (
    <ReactSelect options={options} onChange={onChange} defaultValue={defaultValue} isClearable />
  )
}
