import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui'
import React from 'react'

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="w-[100px] flex flex-row justify-center items-center gap-2">
      <Button variant="outline" onClick={() => changeLanguage('en')}>
        EN
      </Button>
      <Button variant="outline" onClick={() => changeLanguage('vi')}>
        VI
      </Button>
    </div>
  )
}

export default LanguageSwitcher
