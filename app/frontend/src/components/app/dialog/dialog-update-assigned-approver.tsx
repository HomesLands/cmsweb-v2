import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SquarePen } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  ScrollArea
} from '@/components/ui'
import { IAssignedApprover } from '@/types'
import { useUpdateAssignedApprover } from '@/hooks'
import { TUpdateAssignedApproverSchema } from '@/schemas'
import { showToast } from '@/utils'
import { UpdateAssignedApproverForm } from '@/components/app/form'

export default function DialogUpdateAssignedApprover({
  approver
}: {
  approver: IAssignedApprover
}) {
  const { mutate: updateAssignedApprover } = useUpdateAssignedApprover()
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useTranslation('assignedApprover')
  const { t: tToast } = useTranslation('toast')
  const handleSubmit = (values: TUpdateAssignedApproverSchema) => {
    updateAssignedApprover(values, {
      onSuccess: () => {
        setIsOpen(false)
        showToast(tToast('toast.updateAssignedApproverSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="flex justify-start w-full">
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <SquarePen className="icon" />
          {t('assignedApprover.updateAssignedApprover')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[64rem] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{t('assignedApprover.updateAssignedApprover')}</DialogTitle>
              <DialogDescription>
                {t('assignedApprover.updateAssignedApproverDescription')}
              </DialogDescription>
            </DialogHeader>
            <UpdateAssignedApproverForm onSubmit={handleSubmit} approver={approver} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
