import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { USFlag, VIFlag } from '@/assets/images'

export const SelectLanguage: React.FC = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value)
  }

  return (
    <Select onValueChange={handleLanguageChange} defaultValue="vi">
      <SelectTrigger className="p-0 border-none">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent className="">
        <SelectItem value="en">
          <img src={USFlag} className="w-10" />
        </SelectItem>
        <SelectItem value="vi">
          <img src={VIFlag} className="w-10" />
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
