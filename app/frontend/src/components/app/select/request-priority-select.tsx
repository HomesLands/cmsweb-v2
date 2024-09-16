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
import { requestPriorities } from '@/menus'

interface SelectUserRoleProps {
  value: string
  onChange: (value: string) => void
}

export const SelectRequestPriority: FC<SelectUserRoleProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Chọn mức ưu tiên" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Mức ưu tiên</SelectLabel>
          {requestPriorities.map((requestPriority) => (
            <SelectItem key={requestPriority.value} value={requestPriority.value}>
              <span className="text-normal">{requestPriority.label}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
