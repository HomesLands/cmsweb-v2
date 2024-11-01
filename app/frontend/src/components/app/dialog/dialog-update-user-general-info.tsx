import { useState } from 'react'
import { SquarePen } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea
} from '@/components/ui'

import { FormUpdateUserGeneralInfo } from '@/components/app/form'
import { IUpdateUserGeneralInfo, IUserInfo } from '@/types'
import { useUpdateUser } from '@/hooks'
import { showToast } from '@/utils'

export default function DialogUpdateUserGeneralInfo({ userInfo }: { userInfo: IUserInfo }) {
  const { t } = useTranslation('account')
  const { t: tToast } = useTranslation('toast')
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: updateUserInfo } = useUpdateUser()

  const handleSubmit = (values: IUpdateUserGeneralInfo) => {
    updateUserInfo(values, {
      onSuccess: () => {
        setIsOpen(false)
        showToast(tToast('toast.updateUserSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <SquarePen className="icon" />
          {t('account.edit')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[64rem] p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{t('account.updateUserGeneralInfo')}</DialogTitle>
              <DialogDescription>{t('account.updateUserGeneralInfoDescription')}</DialogDescription>
            </DialogHeader>
            <FormUpdateUserGeneralInfo onSubmit={handleSubmit} data={userInfo} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
