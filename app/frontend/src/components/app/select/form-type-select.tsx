import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { SingleValue } from 'react-select'

import { FormApprovalType } from '@/constants/assigned-approver'

interface SelectFormTypeProps {
  onChange: (
    values: SingleValue<{
      value: FormApprovalType
      label: string
    }>
  ) => void
}

export const SelectFormType: FC<SelectFormTypeProps> = ({ onChange }) => {
  const formTypeOptions = Object.entries(FormApprovalType).map(([key, value]) => ({
    value,
    label: `${key}`
  }))

  return <ReactSelect options={formTypeOptions} onChange={onChange} />
}
