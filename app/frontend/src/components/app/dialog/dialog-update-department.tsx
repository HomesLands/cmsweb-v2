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

import { ICreateDepartment, IDepartment, IUpdateDepartment } from '@/types'
import { showToast } from '@/utils'
import { useUpdateDepartment } from '@/hooks'
import { UpdateDepartmentForm } from '@/components/app/form'

export default function DialogUpdateDepartment({ department }: { department: IDepartment }) {
  const { t } = useTranslation('department')
  const { t: tToast } = useTranslation('toast')
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: updateDepartment } = useUpdateDepartment()

  const handleSubmit = (values: IUpdateDepartment) => {
    setIsOpen(false)
    updateDepartment(values, {
      onSuccess: () => {
        showToast(tToast('toast.updateDepartmentSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="flex justify-start w-full">
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <SquarePen className="icon" />
          {t('department.updateDepartment')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[64rem] p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{t('department.updateDepartment')}</DialogTitle>
              <DialogDescription>{t('department.updateDepartmentDescription')}</DialogDescription>
            </DialogHeader>
            <UpdateDepartmentForm onSubmit={handleSubmit} department={department} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
