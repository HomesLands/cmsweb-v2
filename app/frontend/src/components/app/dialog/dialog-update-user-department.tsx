import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SquarePen } from 'lucide-react'
import { isAxiosError, AxiosError } from 'axios'

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
import { IApiResponse, IUpdateUserDepartment, IUserInfo } from '@/types'
import { showErrorToast, showToast } from '@/utils'
import { useUpdateUserDepartment } from '@/hooks'
import { UpdateEmployeeDepartmentForm } from '@/components/app/form'

export default function DialogUpdateUserDepartment({ user }: { user: IUserInfo | null }) {
  const { t } = useTranslation('employees')
  const { t: tToast } = useTranslation('toast')
  const [isOpen, setIsOpen] = useState(false)
  console.log('user', user)

  const { mutate: updateUserDepartment } = useUpdateUserDepartment()
  const handleSubmit = (values: TCreateUserDepartmentSchema) => {
    setIsOpen(false)
    const requestData = {
      department: values.department.value,
      slug: values.user.value
    } as IUpdateUserDepartment
    updateUserDepartment(requestData, {
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
          <SquarePen className="icon" />
          {t('employees.updateDepartment')}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{t('employees.updateDepartment')}</DialogTitle>
          <DialogDescription>{t('employees.updateDepartmentDescription')}</DialogDescription>
        </DialogHeader>
        {user && <UpdateEmployeeDepartmentForm user={user} onSubmit={handleSubmit} />}
      </DialogContent>
    </Dialog>
  )
}
