import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui'
import { FC } from 'react'
import { useRequestPriorities } from '@/menus'
import { useTranslation } from 'react-i18next'

interface SelectUserRoleProps {
  value: string
  onChange: (value: string) => void
}

export const RequestPrioritySelect: FC<SelectUserRoleProps> = ({ value, onChange }) => {
  const { t } = useTranslation('productRequisition')
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={t('productRequisition.priority')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('productRequisition.priority')}</SelectLabel>
          {useRequestPriorities().map((requestPriority) => (
            <SelectItem key={requestPriority.value} value={requestPriority.value}>
              <span className="text-normal">{requestPriority.label}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
