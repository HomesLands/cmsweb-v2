import * as React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const LanguageSelect: React.FC = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value)
    console.log('Language changed to:', value)
  }

  return (
    <Select onValueChange={handleLanguageChange} defaultValue="vi">
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent className="w-[80px]">
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem value="en">EN</SelectItem>
          <SelectItem value="vi">VN</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LanguageSelect
