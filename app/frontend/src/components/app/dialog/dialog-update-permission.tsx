import { useState } from 'react'
import { SquarePen } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea
} from '@/components/ui'

import { IDepartment, IPermission, IUpdateDepartment, IUpdatePermission } from '@/types'
import { showToast } from '@/utils'
import { useUpdateDepartment, useUpdatePermission } from '@/hooks'
import { UpdateDepartmentForm } from '@/components/app/form'

export default function DialogUpdatePermission({ permission }: { permission: IPermission }) {
  const { t } = useTranslation('permissions')
  const { t: tToast } = useTranslation('toast')
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: updatePermission } = useUpdatePermission()

  const handleSubmit = (values: IUpdatePermission) => {
    setIsOpen(false)
    updatePermission(values, {
      onSuccess: () => {
        showToast(tToast('toast.updatePermissionSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="flex justify-start w-full">
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <SquarePen className="icon" />
          {t('permissions.updatePermission')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[64rem] p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{t('department.updateDepartment')}</DialogTitle>
              <DialogDescription>{t('department.updateDepartmentDescription')}</DialogDescription>
            </DialogHeader>
            {/* <UpdatePermissionForm onSubmit={handleSubmit} permission={permission} /> */}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
