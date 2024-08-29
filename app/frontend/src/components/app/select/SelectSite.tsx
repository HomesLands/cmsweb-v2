import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui'

export function SelectSite() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Chọn bộ phận" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Văn phòng</SelectLabel>
          <SelectItem value="apple">Site Quận 9</SelectItem>
          <SelectItem value="banana">Site P&G</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
