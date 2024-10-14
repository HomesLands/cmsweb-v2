import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { Card, CardContent, Label } from '@/components/ui'
import { PersonalAccountForm } from '@/components/app/form'

const PersonalAccount: React.FC = () => {
  const { t } = useTranslation(['account'])

  return (
    <div className="flex flex-col gap-2">
      <Label className="flex gap-1 items-center mt-2 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('account.title')}
      </Label>
      <Card className="border-none shadow-none">
        <CardContent className="flex flex-col p-0">
          <PersonalAccountForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default PersonalAccount
