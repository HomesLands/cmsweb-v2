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
import { sites } from '@/menus/site'

interface SelectUserRoleProps {
  value: string
  onChange: (value: string) => void
}

export const SelectSite: FC<SelectUserRoleProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Bộ phận</SelectLabel>
          {sites.map((site) => (
            <SelectItem key={site.value} value={site.value}>
              {site.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
