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
import React, { useState } from 'react'
import { useDeleteUserDepartment } from '@/hooks'
import { showToast } from '@/utils'

interface IFormDeleteUserDepartmentProps {
  user: IUserInfo | null
}

const DialogDeleteUserDepartment: React.FC<IFormDeleteUserDepartmentProps> = ({ user }) => {
  const { t } = useTranslation('employees')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteUserDepartment } = useDeleteUserDepartment()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (userDepartmentSlug: string) => {
    setIsOpen(false)
    deleteUserDepartment(userDepartmentSlug, {
      onSuccess: () => {
        showToast(tToast('toast.deleteUserDepartmentSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('employees.deleteUserDepartment')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('employees.deleteUserDepartment')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('employees.deleteUserDepartmentDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('employees.deleteUserDepartmentWarning1')}{' '}
            <span className="font-bold">{user?.userDepartments[0].department.description}</span>
            {t('employees.deleteUserDepartmentWarning2')}{' '}
            <span className="font-bold">{user?.fullname}</span>.
            <br />
            {t('employees.deleteUserDepartmentConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('employees.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => user && handleSubmit(user.userDepartments[0].slug || '')}
          >
            {t('employees.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDeleteUserDepartment
