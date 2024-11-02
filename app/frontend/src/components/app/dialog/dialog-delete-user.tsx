import { Trash2, TriangleAlert } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { IUserInfo } from '@/types'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useDeleteUser } from '@/hooks'
import { showToast } from '@/utils'

export default function DialogDeleteUser({ userInfo }: { userInfo: IUserInfo }) {
  const { t } = useTranslation('employees')
  console.log('userInfo', userInfo)
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteEmployee } = useDeleteUser()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (userSlug: string) => {
    console.log('userSlug', userSlug)
    setIsOpen(false)
    deleteEmployee(userSlug, {
      onSuccess: () => {
        showToast(tToast('toast.deleteUserSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('employees.deleteUser')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('employees.deleteUser')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('employees.deleteUserDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('employees.deleteUserWarning')}{' '}
            <span className="font-bold">{userInfo.fullname}</span> .
            <br />
            {t('employees.deleteUserConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('employees.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => userInfo && handleSubmit(userInfo.slug || '')}
          >
            {t('employees.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
