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

interface RequestPrioritySelectProps {
  onChange: (value: 'normal' | 'urgent') => void
  defaultValue?: 'normal' | 'urgent'
}

export const RequestPrioritySelect: FC<RequestPrioritySelectProps> = ({
  onChange,
  defaultValue
}) => {
  const { t } = useTranslation('productRequisition')
  const priorities = useRequestPriorities()

  const handleValueChange = (value: string) => {
    onChange(value as 'normal' | 'urgent')
  }

  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={t('productRequisition.priority')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('productRequisition.priority')}</SelectLabel>
          {priorities.map((requestPriority) => (
            <SelectItem key={requestPriority.value} value={requestPriority.value}>
              {requestPriority.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
