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
import { TCreateUserDepartmentSchema } from '@/schemas'
import { AddEmployeeDepartmentForm } from '@/components/app/form'
import { ICreateUserDepartment, IUserInfo } from '@/types'
import { showToast } from '@/utils'
import { useCreateUserDepartment } from '@/hooks'

export function DialogAddUserDepartment({ user }: { user: IUserInfo }) {
  const { t } = useTranslation('employees')
  const { t: tToast } = useTranslation('toast')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { mutate: createUserDepartment } = useCreateUserDepartment()
  const handleSubmit = (values: TCreateUserDepartmentSchema) => {
    const requestData = {
      department: values.department.value,
      user: values.user.value
    } as ICreateUserDepartment
    createUserDepartment(requestData, {
      onSuccess: () => {
        showToast(tToast('toast.addDepartmentSuccess'))
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
