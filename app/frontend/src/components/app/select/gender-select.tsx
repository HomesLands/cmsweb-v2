import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { SingleValue } from 'react-select'

import { Gender } from '@/constants'

interface SelectGenderProps {
  defaultValue?: string
  onChange: (gender: string) => void
  value?: string
}

const genderOptions = [
  { value: Gender.MALE, label: Gender.MALE },
  { value: Gender.FEMALE, label: Gender.FEMALE }
  // { value: Gender.OTHER, label: Gender.OTHER }
]

export const SelectGender: FC<SelectGenderProps> = ({ onChange, defaultValue, value }) => {
  const { t } = useTranslation('employees')

  const options = genderOptions.map((option) => ({
    value: option.value,
    label: t(`employees.${option.label.toLowerCase()}`) // Lấy nhãn đã dịch
  }))

  const handleChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    if (selectedOption) {
      onChange(selectedOption.value)
    }
  }

  return (
    <ReactSelect
      options={options}
      onChange={handleChange}
      defaultValue={options.find((option) => option.value === defaultValue)}
      value={options.find((option) => option.value === value)}
      placeholder={t('employees.genderDescription')}
    />
  )
}
