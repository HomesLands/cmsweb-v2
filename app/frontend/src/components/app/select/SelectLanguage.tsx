import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { USFlag, VIFlag } from '@/assets/images'
import { showToast } from '@/utils'

export const SelectLanguage: React.FC = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value)
    if (value === 'en') {
      showToast('Current language: English')
    } else {
      showToast('Ngôn ngữ hiện tại: Tiếng Việt')
    }
  }

  return (
    <Select onValueChange={handleLanguageChange} defaultValue="vi">
      <SelectTrigger className="w-[80px]">
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
