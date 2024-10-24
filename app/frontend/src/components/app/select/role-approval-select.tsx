import { FC } from 'react'
import ReactSelect, { SingleValue } from 'react-select'

import { AuthorityType } from '@/constants/assigned-approver'

interface SelectRoleApprovalProps {
  defaultValue?: string
  onChange: (
    values: SingleValue<{
      value: AuthorityType
      label: string
    }>
  ) => void
}

export const SelectRoleApproval: FC<SelectRoleApprovalProps> = ({ defaultValue, onChange }) => {
  const formTypeOptions = Object.entries(AuthorityType).map(([key, value]) => ({
    value,
    label: `${key}`
  }))

  // Map default value from string to the option object
  const defaultOption = formTypeOptions.find((option) => option.value === defaultValue)

  return (
    <ReactSelect
      options={formTypeOptions}
      onChange={onChange}
      defaultValue={defaultOption} // Use defaultOption here
    />
  )
}
