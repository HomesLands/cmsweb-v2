import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
import { IApiResponse, ICreateUserDepartment, IUserInfo } from '@/types'
import { showErrorToast, showToast } from '@/utils'
import { useCreateUserDepartment } from '@/hooks'
import { CirclePlus, SquarePen } from 'lucide-react'
import { isAxiosError } from 'axios'
import { AxiosError } from 'axios'

export function DialogAddUserDepartment({ user }: { user: IUserInfo | null }) {
  const { t } = useTranslation('employees')
  const { t: tToast } = useTranslation('toast')
  const [isOpen, setIsOpen] = useState(false)

  const { mutate: createUserDepartment } = useCreateUserDepartment()
  const handleSubmit = (values: TCreateUserDepartmentSchema) => {
    setIsOpen(false)
    const requestData = {
      department: values.department.value,
      user: values.user.value
    } as ICreateUserDepartment
    createUserDepartment(requestData, {
      onSuccess: () => {
        showToast(tToast('toast.addDepartmentSuccess'))
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<IApiResponse<void>>
          if (axiosError.response?.data.code) showErrorToast(axiosError.response.data.code)
        }
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="flex justify-start w-full">
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <CirclePlus className="icon" />
          {t('employees.addDepartment')}
        </Button>
      </DialogTrigger>
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
