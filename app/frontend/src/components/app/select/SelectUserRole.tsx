import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export function SelectUserRole() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Giám đốc</SelectLabel>
          <SelectItem value="apple">Phó giám đốc</SelectItem>
          <SelectItem value="banana">Kế toán trưởng</SelectItem>
          <SelectItem value="blueberry">Kế toán</SelectItem>
          <SelectItem value="grapes">IT</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
