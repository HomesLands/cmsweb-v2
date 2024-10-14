import { TriangleAlert } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui'

import { ICreateProject, ICreateResource } from '@/types'
import { useTranslation } from 'react-i18next'

interface DialogConfirmCreateResourceProps {
  handleCreateResource: (resource: ICreateResource) => void
  openDialog: boolean
  resource: ICreateResource | null
  onOpenChange: () => void
}

export function DialogConfirmCreateResource({
  handleCreateResource,
  openDialog,
  resource,
  onOpenChange
}: DialogConfirmCreateResourceProps) {
  const { t } = useTranslation('projects')
  const handleSubmit = (data: ICreateResource) => {
    handleCreateResource(data)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-primary text-primary">
            <div className="flex gap-2 items-center">
              <TriangleAlert className="w-6 h-6" />
              {t('projects.confirmCreate')}
            </div>
          </DialogTitle>

          <div className="py-4 text-sm text-gray-500">
            {t('projects.confirmCreateDescription')}
            <br />
            <span className="font-bold">{resource?.name}</span>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>
            {t('projects.cancelCreate')}
          </Button>
          <Button variant="default" onClick={() => resource && handleSubmit(resource)}>
            {t('projects.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
