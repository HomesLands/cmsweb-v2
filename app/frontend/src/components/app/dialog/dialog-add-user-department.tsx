import React, { useState } from 'react'
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
import { TCreateUserDepartmentSchema, TCreateUserRoleSchema } from '@/schemas'
import { AddEmployeeDepartmentForm } from '@/components/app/form'
import { ICreateUserRole, IUserInfo } from '@/types'
import { useCreateUserRole } from '@/hooks'
import { showToast } from '@/utils'
import { ICreateUserDepartment } from '@/types/user-department.type'
import { useCreateUserDepartment } from '@/hooks/use-user-departments'

export function DialogAddUserDepartment({ user }: { user: IUserInfo }) {
  const { t } = useTranslation('employees')
  const { t: tToast } = useTranslation('toast')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { mutate: createUserDepartment } = useCreateUserDepartment()
  const handleSubmit = (values: TCreateUserDepartmentSchema) => {
    const requestData = {
      departmentSlug: values.department.value,
      userSlug: values.user.value
    } as ICreateUserDepartment
    createUserDepartment(requestData, {
      onSuccess: () => {
        showToast(tToast('addDepartmentSuccess'))
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger className="justify-start" asChild>
        <Button variant="ghost" className="gap-1 text-sm">
          <PlusCircledIcon className="icon" />
          {t('employees.addDepartment')}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{t('employees.addDepartment')}</DialogTitle>
          <DialogDescription>{t('employees.addDepartmentDescription')}</DialogDescription>
        </DialogHeader>
        <AddEmployeeDepartmentForm
          user={user}
          onSubmit={handleSubmit}
          onClose={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
