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

interface DialogAddUserDepartmentProps {
  user: IUserInfo | null
  open: boolean
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogAddUserDepartment({
  user,
  open,
  component,
  onOpenChange
}: DialogAddUserDepartmentProps) {
  const { t } = useTranslation('employees')
  const { t: tToast } = useTranslation('toast')

  const { mutate: createUserDepartment } = useCreateUserDepartment()
  const handleSubmit = (values: TCreateUserDepartmentSchema) => {
    const requestData = {
      department: values.department.value,
      user: values.user.value
    } as ICreateUserDepartment
    onOpenChange()
    createUserDepartment(requestData, {
      onSuccess: () => {
        showToast(tToast('toast.addDepartmentSuccess'))
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{t('employees.addDepartment')}</DialogTitle>
          <DialogDescription>{t('employees.addDepartmentDescription')}</DialogDescription>
        </DialogHeader>
        {user && <AddEmployeeDepartmentForm user={user} onSubmit={handleSubmit} />}
      </DialogContent>
    </Dialog>
  )
}
