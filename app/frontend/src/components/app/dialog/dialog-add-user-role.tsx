import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { TCreateUserRoleSchema } from '@/schemas'
import { AddEmployeeRoleForm } from '@/components/app/form'
import { ICreateUserRole, IUserInfo } from '@/types'
import { useCreateUserRole } from '@/hooks'
import { showToast } from '@/utils'
import { useState } from 'react'
import { CirclePlus } from 'lucide-react'

export function DialogAddUserRole({ user }: { user: IUserInfo | null }) {
  const { t } = useTranslation('employees')
  const { t: tToast } = useTranslation('toast')
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: createUserRole } = useCreateUserRole()

  const handleSubmit = (values: TCreateUserRoleSchema) => {
    const requestData = {
      roleSlug: values.role.value,
      userSlug: values.user.value
    } as ICreateUserRole
    setIsOpen(false)
    createUserRole(requestData, {
      onSuccess: () => {
        showToast(tToast('toast.addRoleSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="flex justify-start w-full">
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <CirclePlus className="icon" />
          {t('employees.createUserRole')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('employees.createUserRole')}</DialogTitle>
          <DialogDescription>{t('employees.createUserRoleDescription')}</DialogDescription>
        </DialogHeader>
        {user && <AddEmployeeRoleForm user={user} onSubmit={handleSubmit} />}
      </DialogContent>
    </Dialog>
  )
}
