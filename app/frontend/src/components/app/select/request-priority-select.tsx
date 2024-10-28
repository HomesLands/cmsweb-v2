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
  value?: 'normal' | 'urgent'
}

import { cn } from '@/lib/utils'

export const RequestPrioritySelect: FC<RequestPrioritySelectProps> = ({
  onChange,
  defaultValue,
  value
}) => {
  const { t } = useTranslation('productRequisition')
  const priorities = useRequestPriorities()

  const handleValueChange = (value: string) => {
    onChange(value as 'normal' | 'urgent')
  }

  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={t('productRequisition.selectPriority')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('productRequisition.priority')}</SelectLabel>
          {priorities.map((requestPriority) => (
            <SelectItem
              key={requestPriority.value}
              value={requestPriority.value}
              className={cn(requestPriority.value === 'urgent' && 'text-red-600 font-semibold')}
            >
              <span
                className={cn(requestPriority.value === 'urgent' && 'text-red-600 font-semibold')}
              >
                {requestPriority.label}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
