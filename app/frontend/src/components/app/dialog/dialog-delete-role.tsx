import { Trash2, TriangleAlert } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { IProductInfo, IRole } from '@/types'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useDeleteProduct, useDeleteRole } from '@/hooks'
import { showToast } from '@/utils'

export default function DialogDeleteRole({ role }: { role: IRole }) {
  const { t } = useTranslation('roles')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteRole } = useDeleteRole()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (roleSlug: string) => {
    setIsOpen(false)
    deleteRole(roleSlug, {
      onSuccess: () => {
        showToast(tToast('toast.deleteRoleSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('roles.delete')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('roles.delete')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('roles.deleteRoleDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('roles.deleteRoleWarning')} <span className="font-bold">{role.description}</span> .
            <br />
            {t('roles.deleteRoleConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('roles.cancel')}
          </Button>
          <Button variant="destructive" onClick={() => role && handleSubmit(role.slug || '')}>
            {t('roles.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
