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

import { IAssignedApprover } from '@/types'

import { useDeleteAssignedApprover } from '@/hooks'
import { showToast } from '@/utils'

export default function DialogDeleteAssignedApprover({
  approver
}: {
  approver: IAssignedApprover
}) {
  const { t } = useTranslation('assignedApprover')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteAssignedApprover } = useDeleteAssignedApprover()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (assignedApproverSlug: string) => {
    deleteAssignedApprover(assignedApproverSlug, {
      onSuccess: () => {
        setIsOpen(false)
        showToast(tToast('toast.deleteAssignedApproverSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('assignedApprover.deleteAssignedApprover')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('assignedApprover.deleteAssignedApprover')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('assignedApprover.deleteAssignedApproverDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('assignedApprover.deleteAssignedApproverWarning1')}{' '}
            <span className="font-bold">{approver?.roleApproval}</span>{' '}
            {t('assignedApprover.deleteAssignedApproverWarning2')}{' '}
            <span className="font-bold">{approver?.formType}</span>{' '}
            {t('assignedApprover.deleteAssignedApproverWarning3')}{' '}
            <span className="font-bold">{approver?.user.fullname}</span>.
            <br />
            <br />
            {t('assignedApprover.deleteAssignedApproverConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('assignedApprover.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => approver && handleSubmit(approver.slug || '')}
          >
            {t('assignedApprover.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
