import toast from 'react-hot-toast'
import { PenIcon, SquarePen } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button
} from '@/components/ui'
import { UpdateRoleForm } from '@/components/app/form'
import { IRole, IUpdateRole } from '@/types'
import { useUpdateRole } from '@/hooks'
import { TUpdateRoleSchema } from '@/schemas'
import { showToast } from '@/utils'
import { useTranslation } from 'react-i18next'

export default function DialogUpdateRole({ role }: { role: IRole }) {
  const { mutate: updateRoleMutation } = useUpdateRole()
  const { t } = useTranslation('roles')
  const { t: tToast } = useTranslation('toast')
  const handleSubmit = (values: TUpdateRoleSchema) => {
    const requestData = {
      ...values
    } as IUpdateRole
    updateRoleMutation(requestData, {
      onSuccess: () => {
        showToast(tToast('toast.updateRoleSuccess'))
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm">
          <SquarePen className="icon" />
          {t('roles.editRole')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[48rem] max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>{t('roles.editRole')}</DialogTitle>
          <DialogDescription>{t('roles.editRoleDescription')}</DialogDescription>
        </DialogHeader>
        <UpdateRoleForm role={role} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
