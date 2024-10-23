import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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

import { IDepartment } from '@/types'

import { useDeleteDepartment } from '@/hooks'
import { showToast } from '@/utils'

export default function DialogDeleteDepartment({ department }: { department: IDepartment }) {
  const { t } = useTranslation('department')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteDepartment } = useDeleteDepartment()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (departmentSlug: string) => {
    setIsOpen(false)
    deleteDepartment(departmentSlug, {
      onSuccess: () => {
        showToast(tToast('toast.deleteDepartmentSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('department.deleteDepartment')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('department.deleteDepartment')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('department.deleteDepartmentDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('department.deleteDepartmentWarning1')}{' '}
            <span className="font-bold">{department?.description}</span>{' '}
            {t('department.deleteDepartmentWarning2')}{' '}
            <span className="font-bold">{department?.site.name}</span>.
            <br />
            {t('department.deleteDepartmentConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('department.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => department && handleSubmit(department.slug || '')}
          >
            {t('department.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
