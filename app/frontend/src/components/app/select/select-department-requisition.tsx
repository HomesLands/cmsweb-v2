import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'

interface Department {
  nameNormalize: string
  slug: string
  description: string
}

interface SelectDepartmentProps {
  defaultValue?: string
  department: {
    userDepartments: Array<{
      department: Department
    }>
  }
  onChange: (slug: string, name: string) => void
  value?: string
}

export const SelectDepartmentRequisition: FC<SelectDepartmentProps> = ({
  onChange,
  defaultValue,
  value,
  department
}) => {
  const { t } = useTranslation('productRequisition')

  const handleValueChange = (value: string) => {
    const selectedDepartment = department?.userDepartments.find(
      (item) => item.department?.slug === value
    )
    if (selectedDepartment) {
      onChange(selectedDepartment.department?.slug, selectedDepartment.department?.description)
    }
  }

  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={t('productRequisition.selectDepartment')} />
      </SelectTrigger>
      <SelectContent>
        {department.userDepartments
          .filter((item) => item.department)
          .map((item) => (
            <SelectItem key={item.department?.slug} value={item.department?.slug}>
              {item.department?.description}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
