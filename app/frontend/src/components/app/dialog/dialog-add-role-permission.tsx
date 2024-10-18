import { PlusCircledIcon } from '@radix-ui/react-icons'
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
import { AddRolePermissionForm } from '@/components/app/form'
import { ICreateRolePermission, IRole } from '@/types'
import { useCreateRolePermission } from '@/hooks'
import { TCreateRolePermissionSchema } from '@/schemas'
import { showToast } from '@/utils'

export function DialogAddRolePermission({ role }: { role: IRole }) {
  const { t } = useTranslation('roles')
  const { t: tToast } = useTranslation('toast')
  const { mutate: createRolePermission } = useCreateRolePermission()
  const handleSubmit = (values: TCreateRolePermissionSchema) => {
    const requestData = {
      roleSlug: values.role.value,
      permissionSlug: values.permission.value
    } as ICreateRolePermission
    createRolePermission(requestData, {
      onSuccess: () => {
        showToast(tToast('toast.addRolePermissionSuccess'))
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start w-full gap-1 text-sm">
          <PlusCircledIcon className="icon" />
          {t('roles.addPermission')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[48rem] max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>{t('roles.addPermission')}</DialogTitle>
          <DialogDescription>{t('roles.addPermissionDescription')}</DialogDescription>
        </DialogHeader>
        <AddRolePermissionForm role={role} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
