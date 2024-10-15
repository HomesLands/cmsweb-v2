import { FC } from 'react'
import ReactSelect, { SingleValue } from 'react-select'

import { AuthorityType } from '@/constants/assigned-approver'

interface SelectRoleApprovalProps {
  onChange: (
    values: SingleValue<{
      value: AuthorityType
      label: string
    }>
  ) => void
}

export const SelectRoleApproval: FC<SelectRoleApprovalProps> = ({ onChange }) => {
  const formTypeOptions = Object.entries(AuthorityType).map(([key, value]) => ({
    value,
    label: `${key}`
  }))

  return <ReactSelect options={formTypeOptions} onChange={onChange} />
}
