import { useTranslation } from 'react-i18next'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button
} from '@/components/ui'

import { TCreateUserRoleSchema } from '@/schemas'
import { AddEmployeeRoleForm } from '@/components/app/form'
import { ICreateUserRole, IUserInfo } from '@/types'
import { useCreateUserRole } from '@/hooks'
import { showToast } from '@/utils'

export function DialogAddUserRole({ user }: { user: IUserInfo }) {
  const { t } = useTranslation('employees')
  const { t: tToast } = useTranslation('toast')
  const mutation = useCreateUserRole()
  const handleSubmit = (values: TCreateUserRoleSchema) => {
    const requestData = {
      role: values.role.value,
      user: values.user.value
    } as ICreateUserRole
    mutation.mutate(requestData, {
      onSuccess: () => {
        showToast(tToast('toast.addRoleSuccess'))
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger className="justify-start" asChild>
        <Button variant="ghost" className="gap-1 text-sm">
          <PlusCircledIcon className="icon" />
          {t('employees.createUserRole')}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{t('employees.createUserRole')}</DialogTitle>
          <DialogDescription>{t('employees.createUserRoleDescription')}</DialogDescription>
        </DialogHeader>
        <AddEmployeeRoleForm user={user} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
