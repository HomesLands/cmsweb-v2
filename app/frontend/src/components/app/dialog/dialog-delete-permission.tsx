import { Trash, Trash2, TriangleAlert } from 'lucide-react'

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

import { IDeleteSite, IPermission, IProductRequisitionInfo, ISite } from '@/types'
import { useRequisitionStore } from '@/stores'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useDeletePermission, useDeleteSite } from '@/hooks'
import { showToast } from '@/utils'

export default function DialogDeletePermission({ permission }: { permission: IPermission }) {
  const { t } = useTranslation('permissions')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deletePermission } = useDeletePermission()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (permissionSlug: string) => {
    setIsOpen(false)
    deletePermission(permissionSlug, {
      onSuccess: () => {
        showToast(tToast('toast.deletePermissionSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('permissions.deletePermission')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('permissions.deletePermission')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('permissions.deletePermissionDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('permissions.deletePermissionWarning1')}{' '}
            <span className="font-bold">{permission.authority}</span>{' '}
            {t('permissions.deletePermissionWarning2')}{' '}
            <span className="font-bold">{permission.resource}</span>.
            <br />
            {t('permissions.deletePermissionConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('permissions.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => permission && handleSubmit(permission.slug || '')}
          >
            {t('permissions.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
