import { Trash2, TriangleAlert } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { IRole } from '@/types'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useDeleteRolePermission } from '@/hooks'
import { showToast } from '@/utils'
import { DeleteRolePermissionForm } from '../form'
import { TDeleteRolePermissionSchema } from '@/schemas'

export default function DialogDeleteRolePermission({ role }: { role: IRole }) {
  const { t } = useTranslation('roles')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteRolePermission } = useDeleteRolePermission()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (data: TDeleteRolePermissionSchema) => {
    deleteRolePermission(data, {
      onSuccess: () => {
        setIsOpen(false)
        showToast(tToast('toast.deleteRolePermissionSuccess'))
      }
    })
    // showToast(tToast('toast.deleteRolePermissionSuccess'))
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('roles.deleteRolePermission')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex gap-2 items-center">
              <TriangleAlert className="w-6 h-6" />
              {t('roles.deleteRolePermission')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('roles.deleteRoleDescription')}
          </DialogDescription>

          {/* <div className="py-4 text-sm text-gray-500">
            {t('roles.deleteRoleWarning')} <span className="font-bold">{role.description}</span> .
            <br />
            {t('roles.deleteRoleConfirmation')}
          </div> */}
        </DialogHeader>
        <DeleteRolePermissionForm role={role} onSubmit={handleSubmit} onCancel={handleCancel} />
        {/* <DialogFooter className="flex flex-row gap-2 justify-center">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('roles.cancel')}
          </Button>
          <Button variant="destructive" onClick={() => role && handleSubmit(role.slug || '')}>
            {t('roles.confirmDelete')}
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
