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

import { UpdateUsernameForm } from '@/components/app/form'
import { IUpdateUsername, IUserInfo } from '@/types'
import { useUpdateUsername } from '@/hooks'
import { showToast } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'

export default function DialogUpdateUsername({ userInfo }: { userInfo: IUserInfo }) {
  const { t } = useTranslation('account')
  const { t: tToast } = useTranslation('toast')
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: updateUsername } = useUpdateUsername()
  const queryClient = useQueryClient()
  console.log(userInfo)

  const handleSubmit = (values: IUpdateUsername) => {
    updateUsername(values, {
      onSuccess: () => {
        setIsOpen(false)
        queryClient.invalidateQueries({ queryKey: ['users'] })
        showToast(tToast('toast.updateUsernameSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <SquarePen className="icon" />
          {t('account.editUsername')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[64rem] p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{t('account.updateUserGeneralInfo')}</DialogTitle>
              <DialogDescription>{t('account.updateUserGeneralInfoDescription')}</DialogDescription>
            </DialogHeader>
            <UpdateUsernameForm onSubmit={handleSubmit} data={userInfo} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
