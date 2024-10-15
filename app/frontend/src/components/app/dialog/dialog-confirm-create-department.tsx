import { TriangleAlert } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui'

import { ICreateDepartment } from '@/types'
import { useTranslation } from 'react-i18next'

interface DialogConfirmCreateDepartmentProps {
  handleCreateDepartment: (department: ICreateDepartment) => void
  openDialog: boolean
  department: ICreateDepartment | null
  onOpenChange: () => void
}

export function DialogConfirmCreateDepartment({
  handleCreateDepartment,
  openDialog,
  department,
  onOpenChange
}: DialogConfirmCreateDepartmentProps) {
  const { t } = useTranslation('department')
  const handleSubmit = (data: ICreateDepartment) => {
    const completeData: ICreateDepartment = {
      ...data
    }
    handleCreateDepartment(completeData)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-primary text-primary">
            <div className="flex gap-2 items-center">
              <TriangleAlert className="w-6 h-6" />
              {t('department.confirmCreate')}
            </div>
          </DialogTitle>

          <div className="py-4 text-sm text-gray-500">
            {t('department.confirmCreateDescription')}
            <br />
            <span className="font-bold">{department?.nameNormalize}</span>{' '}
            {t('department.belongsToLocation')}{' '}
            <span className="font-bold">{department?.siteName}</span>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>
            {t('department.cancelCreate')}
          </Button>
          <Button variant="default" onClick={() => department && handleSubmit(department)}>
            {t('department.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
